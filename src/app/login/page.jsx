"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useLoginMutation } from "@/api/auth/authApi";
import { useAuth } from "@/contexts/AuthContext";
import TextField from "@/components/input/TextField";
import PasswordField from "@/components/input/PasswordField";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { login: setAuthUser, isAuthenticated } = useAuth();
  const [loginMutation, { isLoading }] = useLoginMutation();
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data) => {
    setLoginError("");
    try {
      const result = await loginMutation({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (result?.data?.access_token && result?.data?.user) {
        setAuthUser(result.data);
        toast.success("Login successful!");
        
        // Get return URL from query params or default to dashboard
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get("returnUrl") || "/";
        router.push(returnUrl);
      } else {
        setLoginError("Invalid response from server");
      }
    } catch (error) {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Invalid email or password";
      setLoginError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F58220]/5 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,130,32,0.1),transparent_50%)]"></div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-[#121212]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 md:p-10">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img
                src="/customIcon.png"
                alt="NexoviaSoft"
                className="w-16 h-16"
              />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              NexoviaSoft Console
            </h1>
            <p className="text-white/60 text-sm">
              Sign in to access your dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <TextField
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              icon={<Mail className="w-4 h-4 text-white/40" />}
              register={register}
              required
              validation={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              error={errors.email?.message}
            />

            {/* Password Field */}
            <PasswordField
              label="Password"
              name="password"
              placeholder="Enter your password"
              icon={<Lock className="w-4 h-4 text-white/40" />}
              register={register}
              required
              validation={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              error={errors.password?.message}
            />

            {/* Error Message */}
            {loginError && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-400 text-sm">{loginError}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#F58220] hover:bg-[#d91d79] text-black font-semibold py-6 text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-white/40 text-xs">
              © 2024 NexoviaSoft. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
