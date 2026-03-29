"use client";

import React, { useEffect } from "react";
import IncomeList from "@/components/admin/income/IncomeList";
import AppLayout from "@/components/layout/AppLayout";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { useAuth } from "@/contexts/AuthContext";
import { canAccessRoute } from "@/lib/utils/roleAccess";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function IncomePage() {
  const { userRole, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && userRole) {
      if (!canAccessRoute(userRole, "/admin/income")) {
        toast.error("Access Denied: You do not have permission to view this page.");
        router.push("/");
      }
    }
  }, [userRole, isLoading, router]);

  if (isLoading) return null;

  return (
    <PrivateRoute>
      <div className="container mx-auto">
        <AppLayout>
          <IncomeList />
        </AppLayout>
      </div>
    </PrivateRoute>
  );
}
