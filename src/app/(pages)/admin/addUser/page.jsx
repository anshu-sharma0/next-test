'use client'
import React from 'react'
import { addUser } from '../../../../services/userService';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { AddUser } from '../../../../components/component';
const page = ({ }) => {
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('');

    const handleForm = async (e) => {
        e.preventDefault();
        try {
            const data = await addUser({ name: userName, role: userRole });
            console.log({ data })
            if (data?.status === 200) {
                toast.success(data?.message || 'User added successfully');
            } else {
                toast.error(data?.error || 'User added successfully');
            }
            setUserName('');
            setUserRole('');
        } catch (error) {
            console.error('Error adding user:', error);
            toast.error(error.message);
        }
    };

    return (
        <AddUser
            handleForm={handleForm}
            userName={userName}
            setUserName={setUserName}
            userRole={userRole}
            setUserRole={setUserRole}
        />
    )
}

export default page