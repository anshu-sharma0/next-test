'use client';
import { useState } from 'react';
import getIP from '../../../../utils/getIP';
import getBrowserMeta from '../../../../utils/getBrowserMeta';
import LogForm from '../../../../components/form/logForm';
import toast from 'react-hot-toast';
import fetchApi from '../../../../lib/fetchApi';

export default function AuditLogsPage() {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        email: '',
        password: '',
    });

    function onChange(e) {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    async function onSubmit(e) {
        e.preventDefault();

        try {
            const [ip, browserMeta] = await Promise.all([
                getIP(),
                getBrowserMeta(),
            ]);

            const meta = {
                ...browserMeta,
                ip,
            };

            await fetchApi('/api/admin/logs', 'POST', { ...formData, meta });

            toast.success('Audit log created successfully!');
            setFormData({ name: '', email: '', password: '', role: '' });
        } catch (err) {
            toast.error('An error occurred while creating the log');
        }
    }


    return (
        <div className="p-6 max-w-4xl mx-auto">
            <LogForm formData={formData} onChange={onChange} onSubmit={onSubmit} />
        </div>
    );
}
