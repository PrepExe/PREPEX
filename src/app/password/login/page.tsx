"use client";
import { useState } from "react";
import AuthForm from "../../../components/AuthForm";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Login: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleLogin = async (data: { email: string; password: string }) => {
    const res = await fetch("/api/auth/password/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (res.status === 200) {
      setIsSuccess(true);
      router.replace("/dashboard");
    } else {
      setIsSuccess(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600">
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Image src='/PREPEX.png' alt="PREPEX Logo" width={50} height={50} />
        </Link>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md ">
        <AuthForm mode="Login" onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
