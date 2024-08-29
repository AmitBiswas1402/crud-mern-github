import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';

function Home() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>User Management</h1>
            <UserForm fetchUsers={fetchUsers} />
            <UserList users={users} deleteUser={deleteUser} />
        </div>
    );
}

export default Home;
