'use client';

import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Background } from '@/components/background';
import Header from '@/components/Header';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formSubmitURL = 'https://formsubmit.co/mr.shehzad457@gmail.com'; // Your FormSubmit URL

        // Prepare the data as URL encoded format
        const formData = new URLSearchParams();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);

        try {
            const response = await fetch(formSubmitURL, {
                method: 'POST',
                body: formData, // Send data as URL encoded format
            });

            if (response.ok) {
                toast.success('Message sent successfully!');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                toast.error('Failed to send message');
            }
        } catch (err) {
            toast.error('Failed to send message');
            console.error(err); // Log the error if necessary
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="fixed bg-transparent top-0 inset-0 h-full w-full">
                {/* Background */}
                <Background />
            </div>
            <Header />
            <div className="flex items-center justify-center min-h-screen bg-transparent">
                <div className="w-full max-w-5xl p-8 space-y-6 z-10 mt-24 bg-transparent backdrop-blur-sm">
                    <h1 className="text-4xl font-semibold text-center text-purple-600">Contact Me</h1>
                    <form onSubmit={handleSubmit} className="bg-transparent space-y-6">
                        <div>
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full p-4 text-purple-400 bg-transparent border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-4 text-purple-400 bg-transparent border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder="Your Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                rows={4}
                                className="w-full p-4 text-purple-400 bg-transparent border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full p-4 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </>
    );
};

export default Contact;
