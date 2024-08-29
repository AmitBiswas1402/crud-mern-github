import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserForm({ fetchUsers, currentUser, setCurrentUser }) {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        address: '',
        sex: 'Male',
    });

    useEffect(() => {
        if (currentUser) {
            setFormData({
                name: currentUser.name,
                age: currentUser.age,
                address: currentUser.address,
                sex: currentUser.sex,
            });
        } else {
            setFormData({
                name: '',
                age: '',
                address: '',
                sex: 'Male',
            });
        }
    }, [currentUser]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentUser) {
                await axios.put(`http://localhost:5000/api/users/${currentUser._id}`, formData);
                setCurrentUser(null);
            } else {
                await axios.post('http://localhost:5000/api/users', formData);
            }
            setFormData({ name: '', age: '', address: '', sex: 'Male' });
            fetchUsers();
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const handleCancel = () => {
        setCurrentUser(null);
        setFormData({
            name: '',
            age: '',
            address: '',
            sex: 'Male',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
            />
            <select name="sex" value={formData.sex} onChange={handleChange} required>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            <button type="submit">{currentUser ? 'Update' : 'Add'} User</button>
            {currentUser && (
                <button type="button" onClick={handleCancel}>
                    Cancel
                </button>
            )}
        </form>
    );
}

export default UserForm;
