"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const hasEmailValue = email.trim() !== "";
  const isEmailValid = emailRegex.test(email.trim());
  const showEmailError = emailTouched && hasEmailValue && !isEmailValid;
  const isLoginEnabled = hasEmailValue && isEmailValid && password.trim() !== "";

  async function handleLogin() {
    if (!isLoginEnabled || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitMessage(data.error || "Unable to save login details");
        return;
      }

      setSubmitMessage("Login details saved successfully");
      setEmail("");
      setPassword("");
      setEmailTouched(false);
    } catch {
      setSubmitMessage("Something went wrong while saving login details");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-screen h-screen sm:w-[550px] sm:h-175 bg-white p-8 sm:rounded-2xl shadow-sm">

      {/* Logo */}
      <div className="mb-6 -ml-3">
        <Image
          src="/volopay_logo.png"
          alt="Volopay Logo"
          width={200}
          height={150}
          className="rounded"
        />

      </div>

      {/* Heading */}
      <h1 className="text-4xl font-semibold text-gray-800 mb-2">
        Log in
      </h1>
      <p className="text-sm font-semibold text-gray-500 mt-1 mb-6">
        Hi, Good to see you again 👋
      </p>

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <button className="flex-1 border border-gray-200 rounded-lg py-2 text-sm flex items-center justify-center gap-2 hover:bg-gray-50 cursor-pointer">
          <Image src="/google-logo.png" alt="Google Logo" width={34} height={34} />
          <span className="text-md font-semibold text-gray-500">Login with Google</span>
        </button>

        <button
          type="button"
          disabled
          className="group relative flex-1 overflow-hidden rounded-lg border border-gray-200 hover:bg-gray-50 py-2 text-sm cursor-not-allowed disabled:opacity-100"
        >
          <span className="flex items-center justify-center gap-2 text-md font-semibold text-gray-500 transition-opacity duration-200 group-hover:opacity-0">
            <Icon icon="boxicons:x-shield" width="24" height="24" className="text-gray-500" />
            <span className="text-md font-semibold text-gray-500">Login with SSO</span>
          </span>
          <span className="absolute inset-0 flex items-center justify-center gap-2 text-md font-semibold text-gray-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <Icon icon="streamline:party-popper-remix" width="24" height="24" className="text-gray-500" />
            <span className="text-md font-semibold text-gray-500">Coming soon</span>
          </span>
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-md text-gray-400">OR</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      {/* Email */}
      <div className="mb-4 relative pt-5">
        <input
          id="email"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailTouched(true)}
          className={`peer w-full border-b py-2 outline-none placeholder:text-transparent focus:placeholder:text-gray-400 ${showEmailError
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-blue-500"
            }`}
        />
        <label
          htmlFor="email"
          className={`absolute left-0 top-7 text-[19px] transition-all duration-200 pointer-events-none peer-focus:top-0 peer-focus:text-sm peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-sm ${showEmailError
            ? "text-red-500 peer-focus:text-red-500 peer-[:not(:placeholder-shown)]:text-red-500"
            : "text-gray-700 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-gray-500"
            }`}
        >
          Email address
        </label>
        {showEmailError && (
          <p className="mt-2 text-sm text-red-500">
            Email address is not in correct format
          </p>
        )}
      </div>

      {/* Password */}
      <div className="mb-2 relative pt-5">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="peer w-full border-b border-gray-300 py-2 pr-8 outline-none focus:border-blue-500 placeholder:text-transparent focus:placeholder:text-gray-400"
        />
        <label
          htmlFor="password"
          className="absolute left-0 top-7 text-[19px] text-gray-700 transition-all duration-200 pointer-events-none peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-gray-500"
        >
          Password
        </label>
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-0 top-7 text-gray-400 cursor-pointer"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <Icon
            icon={showPassword ? "heroicons:eye" : "heroicons:eye-slash"}
            width="24"
            height="24"
            className="text-black"
          />
        </button>
      </div>

      {/* Forgot */}
      <div className="text-right mb-6">
        <span className="text-md text-blue-600 underline cursor-pointer hover:text-blue-700">
          Forgot password?
        </span>
      </div>

      {/* Button */}
      <button
        type="button"
        onClick={handleLogin}
        disabled={!isLoginEnabled || isSubmitting}
        className={`w-full py-3 rounded-lg transition-colors ${isLoginEnabled && !isSubmitting
          ? "bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
          : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
      >
        {isSubmitting ? "Logging in..." : "Log in"}
      </button>
      {submitMessage && (
        <p className="mt-4 text-sm text-center text-gray-600">{submitMessage}</p>
      )}

    </div>
  );
}
