"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Fingerprint, ScanFace, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function BiometricClockIn() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check local storage for existing "credential" mock
  useEffect(() => {
    const hasCreds = localStorage.getItem("squadlog_biometrics");
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
        rp: { name: "SquadLog Console" },
        user: {
          id: Uint8Array.from("user_id_123", c => c.charCodeAt(0)),
          name: "employee@squadlog.com",
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
      localStorage.setItem("squadlog_biometrics", "true");
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
      setIsClockedIn(true);
      toast.success("Identity Verified! clocked in successfully.");

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

  return (
    <Card className="mb-6 bg-gradient-to-r from-purple-50 to-white border-purple-100">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${isClockedIn ? "bg-green-100 text-green-600" : "bg-purple-100 text-purple-600"}`}>
                {isClockedIn ? <CheckCircle2 className="w-8 h-8" /> : <ScanFace className="w-8 h-8" />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {isClockedIn ? "You are Clocked In" : "FaceID & Fingerprint Attendance"}
              </h2>
              <p className="text-gray-500">
                {isClockedIn 
                    ? `Clocked in at ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}` 
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
                    className="border-purple-200 hover:bg-purple-50 text-purple-700"
                >
                    <ScanFace className="w-4 h-4 mr-2" />
                    Setup FaceID
                </Button>
                <Button 
                    variant="outline" 
                    onClick={() => handleRegister('Fingerprint')} 
                    disabled={isLoading}
                    className="border-purple-200 hover:bg-purple-50 text-purple-700"
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
                        className="bg-purple-600 hover:bg-purple-700 text-white min-w-[200px]"
                    >
                        {isLoading ? "Verifying..." : "Clock In with FaceID"}
                    </Button>
                )
            )}
            
            {isClockedIn && (
                 <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    Clock Out
                 </Button>
            )}
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
