"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import AuthForm from "../../../components/AuthForm";
import Link from "next/link";
import Image from "next/image";

const Signup: React.FC = () => {
  const router = useRouter(); // Initialize the router for redirection
  const [message, setMessage] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleSignup = async (data: { email: string; password: string }) => {
    const res = await fetch("/api/auth/password/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setMessage(result.message);

    if (res.status === 201) {
      setIsSuccessful(true);
      router.replace("/dashboard");
    } else {
      setIsSuccessful(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 to-indigo-800">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 animate-gradient-x opacity-40"></div>

      {/* Animated background shapes */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-16 right-10 w-64 h-64 bg-white opacity-20 clip-path-triangle"></div>
      <div className="absolute top-1/4 left-1/2 w-96 h-1 bg-white transform rotate-45 opacity-20 animate-spin-slow"></div>
      <div className="absolute top-16 right-32 w-24 h-24 bg-white rounded-full opacity-20"></div>

      {/* Logo */}
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Image src="/PREPEX.png" alt="PREPEX Logo" width={50} height={50} className="drop-shadow-lg" />
        </Link>
      </div>

      {/* Centered Signup Form */}
      <div className="relative z-10 w-full max-w-md">
          <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-lg shadow-lg">
            <AuthForm mode="Signup" onSubmit={handleSignup} />
          </div>
      </div>
    </div>
  );
};

export default Signup;
