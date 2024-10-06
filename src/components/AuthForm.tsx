import { useState, FormEvent, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface AuthFormProps {
  mode: "Signup" | "Login";
  onSubmit: (data: {
    email: string;
    password: string;
    confirmPassword?: string;
  }) => void;
  resetForm?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, resetForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (resetForm) {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  }, [resetForm]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (mode === "Signup" && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    onSubmit({
      email,
      password,
      ...(mode === "Signup" && { confirmPassword }),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        {mode === "Signup" ? "Create an Account" : "Login"}
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 
                         text-gray-700 bg-gray-100
                         focus:ring-2 focus:ring-indigo-500
                         focus:border-transparent
                         placeholder-gray-500 transition duration-200 ease-in-out"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 
                         text-gray-700 bg-gray-100
                         focus:ring-2 focus:ring-indigo-500
                         focus:border-transparent
                         placeholder-gray-500 transition duration-200 ease-in-out pr-10"
          />
          <span
            className="absolute inset-y-0 right-0 pr-3 mt-5 flex items-center cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="text-gray-500"
            />
          </span>
        </div>
        {mode === "Signup" && (
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 
                           text-gray-700 bg-gray-100
                           focus:ring-2 focus:ring-indigo-500
                           focus:border-transparent
                           placeholder-gray-500 transition duration-200 ease-in-out pr-10"
            />
            <span
              className="absolute inset-y-0 right-0 mt-5 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="text-gray-500"
              />
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember-me"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-700"
          >
            Remember me
          </label>
        </div>
        <div className="text-sm">
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
          >
            Forgot password?
          </a>
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-3 px-4 rounded-lg text-sm font-medium
                   text-white bg-indigo-600 hover:bg-indigo-700
                   focus:outline-none focus:ring-2 
                   focus:ring-offset-2 focus:ring-indigo-500
                   transition duration-200 ease-in-out transform hover:-translate-y-1"
      >
        {mode === "Signup" ? "Sign Up" : "Log In"}
      </button>
      <p className="text-center text-sm text-gray-600 mt-6">
        {mode === "Signup"
          ? "Already have an account?"
          : "Don't have an account?"}{" "}
        <a
          href={mode === "Signup" ? "/password/login" : "/password/signup"}
          className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
        >
          {mode === "Signup" ? "Log In" : "Sign Up"}
        </a>
      </p>
    </form>
  );
};

export default AuthForm;