import React from 'react';
import axios from 'axios';

function UserList({ users, fetchUsers, setCurrentUser }) {

    const handleEdit = (user) => {
        setCurrentUser(user);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`);
            fetchUsers(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <ul>
            {users.map(user => (
                <li key={user._id}>
                    <div>
                        <strong>Name:</strong> {user.name} <br />
                        <strong>Age:</strong> {user.age} <br />
                        <strong>Address:</strong> {user.address} <br />
                        <strong>Sex:</strong> {user.sex}
                    </div>
                    <div>
                        <button onClick={() => handleEdit(user)}>Edit</button>
                        <button onClick={() => handleDelete(user._id)}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default UserList;
