"use client";

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  useGetExpensesQuery, 
  useUpdateExpenseMutation 
} from '@/api/admin/expense/expenseApi';
import { useAuth } from '@/contexts/AuthContext';
import ExpenseStatusBadge from './ExpenseStatusBadge';
import { Check, X, Loader2, User } from 'lucide-react';
import { toast } from 'sonner';

const ExpenseListTable = () => {
  const { userRole } = useAuth();
  const isManagement = userRole === 'admin' || userRole === 'Manager';
  const { data: expenses, isLoading, refetch } = useGetExpensesQuery();
  const [updateExpense, { isLoading: isUpdating }] = useUpdateExpenseMutation();

  const handleAction = async (id, status) => {
    try {
      await updateExpense({ id, status }).unwrap();
      toast.success(`Expense ${status} successfully!`);
    } catch (error) {
      toast.error(error?.data?.message || `Failed to ${status} expense`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-[#F58220] animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="text-white/70">Requester</TableHead>
            <TableHead className="text-white/70">Type</TableHead>
            <TableHead className="text-white/70">Amount</TableHead>
            <TableHead className="text-white/70">Date</TableHead>
            <TableHead className="text-white/70">Status</TableHead>
            <TableHead className="text-white/70 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-12 text-white/40">
                No expense requests found.
              </TableCell>
            </TableRow>
          ) : (
            expenses?.map((expense) => (
              <TableRow key={expense.id} className="border-white/5 hover:bg-white/[0.02]">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                      {expense.requester?.profileImage ? (
                        <img 
                          src={expense.requester.profileImage} 
                          alt="" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-4 h-4 text-white/40" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        {expense.requester?.firstName} {expense.requester?.lastName}
                      </div>
                      <div className="text-xs text-white/40">{expense.requester?.role}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="capitalize text-white/80">{expense.type}</TableCell>
                <TableCell className="font-medium text-white">${expense.amount}</TableCell>
                <TableCell className="text-white/60">
                  {new Date(expense.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <ExpenseStatusBadge status={expense.status} />
                </TableCell>
                <TableCell className="text-right">
                  {isManagement && expense.status === 'pending' ? (
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white h-8 px-2"
                        onClick={() => handleAction(expense.id, 'approved')}
                        disabled={isUpdating}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-8 px-2"
                        onClick={() => handleAction(expense.id, 'rejected')}
                        disabled={isUpdating}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <span className="text-xs text-white/20">None</span>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpenseListTable;
