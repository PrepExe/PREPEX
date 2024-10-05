"use client";
import { useState, FormEvent, useEffect } from "react";

interface AuthFormProps {
  mode: "Signup" | "Login";
  onSubmit: (data: { email: string; password: string; confirmPassword?: string }) => void;
  resetForm?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, resetForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password

  useEffect(() => {
    if (resetForm) {
      setEmail("");
      setPassword("");
      setConfirmPassword(""); // Reset confirm password as well
    }
  }, [resetForm]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (mode === "Signup" && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    onSubmit({ email, password, ...(mode === "Signup" && { confirmPassword }) });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md mx-auto"
    >
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800 dark:text-gray-100">
        {mode === "Signup" ? "Create an Account" : "Welcome Back"}
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="mt-1 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            className="mt-1 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          />
        </div>

        {mode === "Signup" && (
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
              className="mt-1 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            />
          </div>
        )}
      </div>
      
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-transform transform hover:scale-105 duration-200"
      >
        {mode === "Signup" ? "Sign Up" : "Log In"}
      </button>
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
        {mode === "Signup"
          ? "Already have an account?"
          : "Don't have an account?"}{" "}
        <a
          href={mode === "Signup" ? "/password/login" : "/password/signup"}
          className="text-blue-500 hover:underline"
        >
          {mode === "Signup" ? "Log In" : "Sign Up"}
        </a>
      </p>
    </form>
  );
};

export default AuthForm;
