"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AuthForm from "../../../components/AuthForm";

const Login: React.FC = () => {
  const router = useRouter();

  const handleLogin = async (data: { email: string; password: string }) => {
    const res = await fetch("/api/auth/password/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.status === 200) {
      router.replace("/dashboard");
    } else {
      // Handle error
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 to-indigo-800">
      {/* Animated background shapes */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 animate-gradient-x opacity-40"></div>

      {/* Background shapes */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-16 right-10 w-64 h-64 bg-white opacity-20 clip-path-triangle"></div>
      <div className="absolute top-1/4 left-1/2 w-96 h-1 bg-white transform rotate-45 opacity-20 animate-spin-slow"></div>
      <div className="absolute top-16 right-32 w-24 h-24 bg-white rounded-full opacity-20"></div>

      {/* Logo */}
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Image src='/PREPEX.png' alt="PREPEX Logo" width={50} height={50} className="drop-shadow-lg" />
        </Link>
      </div>

      {/* Centered Form */}
      <div className="relative z-10 w-full max-w-md">
        <AuthForm mode="Login" onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
