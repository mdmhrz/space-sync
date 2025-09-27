'use client'
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { usePathname, useRouter } from 'next/navigation';
import AuthHeader from '../AuthHeader';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';

const Header = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    // Fetch user details
    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return;
            try {
                const res = await axios.get(
                    "https://apitest.softvencefsd.xyz/api/user-detail",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setUser(res.data); // adjust if response is res.data.user
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };
        fetchUser();
    }, [token]);

    // Logout handler
    const handleLogout = async () => {
        const confirmed = window.confirm("Are you sure you want to logout?");
        if (!confirmed) return;

        try {
            await axios.post(
                "https://apitest.softvencefsd.xyz/api/logout",
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            // Clear localStorage token and reset user
            localStorage.removeItem("authToken");
            toast.success("Logged out successfully")
            setUser(null);

        } catch (err) {
            console.error("Logout failed:", err);
            alert("Logout failed. Please try again.");
        }
    };

    const pathName = usePathname() || "";
    if (pathName.startsWith("/auth")) return <AuthHeader />;

    return (
        <nav className='border-b border-border sticky top-0 z-10 bg-background'>
            <div className='container mx-auto max-w-7xl py-4 px-6 flex items-center justify-between'>
                <img src="./header-logo.svg" alt="logo" />

                {user ? (
                    <div className='flex items-center gap-3'>
                        <span>{user.name || user.email}</span>
                        <Button onClick={handleLogout} className="ml-4 bg-red-500 hover:bg-red-600">
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Link href={"/auth/register"}>
                        <Button>Get Started</Button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Header;
