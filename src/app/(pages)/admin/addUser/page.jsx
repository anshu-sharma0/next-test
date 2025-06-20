'use client'
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { AddUser } from '../../../../components/component';
import { addUser } from '../../../../services/userService';
const page = ({ }) => {
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('');

    const handleForm = async (e) => {
        e.preventDefault();
        try {
            const data = await addUser({ name: userName, role: userRole });
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
        <div className='bg-gray-50 min-h-[calc(100vh-64px)] flex justify-center items-center w-full'>
            <AddUser
                handleForm={handleForm}
                userName={userName}
                setUserName={setUserName}
                userRole={userRole}
                setUserRole={setUserRole}
            />
        </div>
    )
}

export default page