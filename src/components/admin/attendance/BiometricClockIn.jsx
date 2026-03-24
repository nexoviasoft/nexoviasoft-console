"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Fingerprint, ScanFace, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import {
  useCreateAttendanceMutation,
  useUpdateAttendanceMutation,
} from "@/api/admin/attendance/attendanceApi";

export default function BiometricClockIn() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAttendanceId, setCurrentAttendanceId] = useState(null);
  const [clockInTime, setClockInTime] = useState(null);

  const [createAttendance] = useCreateAttendanceMutation();
  const [updateAttendance] = useUpdateAttendanceMutation();

  // Check local storage for existing "credential" mock
  useEffect(() => {
    const hasCreds = localStorage.getItem("nexoviasoft_biometrics");
    if (hasCreds) setIsRegistered(true);
  }, []);

  // Helper to encode random challenge
  const getChallenge = () => {
    return Uint8Array.from("random_challenge_string", c => c.charCodeAt(0));
  };

  const handleRegister = async (type = "Biometrics") => {
    setIsLoading(true);
    try {
      if (!window.PublicKeyCredential) {
        throw new Error("WebAuthn is not supported on this device.");
      }

      // Mock Registration Options
      const publicKey = {
        challenge: getChallenge(),
        rp: { name: "NexoviaSoft Console" },
        user: {
          id: Uint8Array.from("user_id_123", c => c.charCodeAt(0)),
          name: "employee@nexoviasoft.com",
          displayName: "Employee Name",
        },
        pubKeyCredParams: [{ type: "public-key", alg: -7 }], // ES256
        authenticatorSelection: {
            authenticatorAttachment: "platform", // Forces TouchID/FaceID if available
            userVerification: "required"
        },
        timeout: 60000,
      };

      const credential = await navigator.credentials.create({ publicKey });
      
      console.log("Credential Created:", credential);
      localStorage.setItem("nexoviasoft_biometrics", "true");
      setIsRegistered(true);
      toast.success(`${type} saved! You can now use it to clock in.`);

    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to register biometrics.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClockIn = async () => {
    setIsLoading(true);
    try {
      if (!isRegistered) throw new Error("Please register biometrics first.");

      const publicKey = {
        challenge: getChallenge(),
        timeout: 60000,
        userVerification: "required",
      };

      const assertion = await navigator.credentials.get({ publicKey });
      
      console.log("Assertion Verified:", assertion);

      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const response = await createAttendance({
        checkIn: formattedTime,
        status: "On Time",
        workHours: "-",
      }).unwrap();

      const created = response?.data;
      setCurrentAttendanceId(created?.id || null);
      setClockInTime(now.toISOString());
      setIsClockedIn(true);
      toast.success("Identity verified & attendance recorded successfully.");

    } catch (error) {
        console.error(error);
        if (error.name === "NotAllowedError") {
             toast.error("Authentication canceled or timed out.");
        } else {
             toast.error("Biometric verification failed.");
        }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClockOut = async () => {
    if (!currentAttendanceId || !clockInTime) {
      toast.error("No active attendance session found.");
      return;
    }

    setIsLoading(true);
    try {
      const start = new Date(clockInTime);
      const end = new Date();
      const diffMs = end.getTime() - start.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
      const workHours = `${hours}h ${minutes}m`;

      const formattedCheckOut = end.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      await updateAttendance({
        id: currentAttendanceId,
        checkOut: formattedCheckOut,
        workHours,
      }).unwrap();

      setIsClockedIn(false);
      setCurrentAttendanceId(null);
      setClockInTime(null);
      toast.success("Clocked out and attendance updated.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update attendance record.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-6 glass-card">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-full border ${
                isClockedIn
                  ? "bg-emerald-500/15 border-emerald-400/50 text-emerald-300"
                  : "bg-[#F58220]/15 border-[#F58220]/60 text-[#F58220]"
              }`}
            >
              {isClockedIn ? (
                <CheckCircle2 className="w-8 h-8" />
              ) : (
                <ScanFace className="w-8 h-8" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {isClockedIn
                  ? "You are Clocked In"
                  : "FaceID & Fingerprint Attendance"}
              </h2>
              <p className="text-white/70">
                {isClockedIn
                  ? `Clocked in at ${new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`
                  : "Securely clock in using your FaceID or Fingerprint scan."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isRegistered ? (
               <div className="flex gap-2">
                <Button 
                    variant="outline" 
                    onClick={() => handleRegister('FaceID')} 
                    disabled={isLoading}
                    className="border-white/20 bg-[#F58220]/10  hover:bg-[#F58220]/10 
                    text-[#F58220] hover:text-[#F58220] hover:border-[#F58220]/50"
                >
                    <ScanFace className="w-4 h-4 mr-2" />
                    Setup FaceID
                </Button>
                <Button 
                    variant="outline" 
                    onClick={() => handleRegister('Fingerprint')} 
                    disabled={isLoading}
                    className="border-white/20 bg-[#F58220]/10 hover:bg-[#F58220]/10 
                    text-white text-[#F58220] hover:text-[#F58220] hover:border-[#F58220]/50"
                >
                    <Fingerprint className="w-4 h-4 mr-2" />
                    Setup Fingerprint
                </Button>
               </div>
            ) : (
                !isClockedIn && (
                    <Button
                      onClick={handleClockIn}
                      disabled={isLoading}
                      className="bg-[#F58220] hover:bg-[#d91d79] text-black min-w-[200px] glass-button"
                    >
                        {isLoading ? "Verifying..." : "Clock In with FaceID"}
                    </Button>
                )
            )}
            
            {isClockedIn && (
                 <Button
                  variant="outline"
                  onClick={handleClockOut}
                  disabled={isLoading}
                  className="border-red-500/70 text-red-400 hover:text-red-300 hover:bg-red-500/15"
                >
                    Clock Out
                 </Button>
            )}
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
