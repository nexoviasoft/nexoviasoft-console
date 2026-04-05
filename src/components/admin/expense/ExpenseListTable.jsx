"use client";

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  useGetExpensesQuery, 
  useUpdateExpenseMutation,
  useDeleteExpenseMutation
} from '@/api/admin/expense/expenseApi';
import { useAuth } from '@/contexts/AuthContext';
import ExpenseStatusBadge from './ExpenseStatusBadge';
import { Check, X, Loader2, User, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const ExpenseListTable = () => {
  const { userRole } = useAuth();
  const isAdmin = userRole === 'admin';
  const isManagement = userRole === 'admin' || userRole?.toLowerCase() === 'manager';
  const { data: expenses, isLoading, refetch } = useGetExpensesQuery();
  const [updateExpense, { isLoading: isUpdating }] = useUpdateExpenseMutation();
  const [deleteExpense, { isLoading: isDeleting }] = useDeleteExpenseMutation();
  
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [actionType, setActionType] = useState(null); // 'approved' or 'rejected'
  const [rejectionReason, setRejectionReason] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessLoading, setIsProcessLoading] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const handleActionClick = (expense, type) => {
    setSelectedExpense(expense);
    setActionType(type);
    setRejectionReason("");
    setIsModalOpen(true);
  };

  const handleDeleteClick = (expense) => {
    setExpenseToDelete(expense);
  };

  const confirmDeleteExpense = async () => {
    if (!expenseToDelete) return;
    try {
      await deleteExpense(expenseToDelete.id).unwrap();
      toast.success("Expense request deleted successfully");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete expense request");
    } finally {
      setExpenseToDelete(null);
    }
  };

  const handleConfirmAction = async () => {
    if (actionType === 'rejected' && !rejectionReason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }

    setIsProcessLoading(true);
    try {
      await updateExpense({ 
        id: selectedExpense.id, 
        status: actionType,
        rejectionReason: actionType === 'rejected' ? rejectionReason : undefined
      }).unwrap();
      
      toast.success(`Expense ${actionType} successfully!`);
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || `Failed to ${actionType} expense`);
    } finally {
      setIsProcessLoading(false);
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
                  <div className="flex items-center justify-end gap-2">
                    {isManagement && expense.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          className="bg-emerald-500 hover:bg-emerald-600 text-white h-8 px-2"
                          onClick={() => handleActionClick(expense, 'approved')}
                          disabled={isUpdating}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-8 px-2"
                          onClick={() => handleActionClick(expense, 'rejected')}
                          disabled={isUpdating}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    {isAdmin && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2 text-white/40 hover:text-red-500 hover:bg-red-500/10"
                        onClick={() => handleDeleteClick(expense)}
                        disabled={isDeleting}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                    {(!isAdmin && (!isManagement || expense.status !== 'pending')) && (
                      <span className="text-xs text-white/20">None</span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-[#1a1a1a] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="capitalize">
              {actionType === 'approved' ? 'Approve Expense' : 'Reject Expense'}
            </DialogTitle>
            <DialogDescription className="text-white/60">
              {actionType === 'approved' 
                ? "Are you sure you want to approve this expense request? This will deduct the amount from company profit."
                : "Please provide a reason for rejecting this expense request. The requester will be notified."
              }
            </DialogDescription>
          </DialogHeader>
          
          {actionType === 'rejected' && (
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reason" className="text-white/80">Rejection Reason</Label>
                <Textarea
                  id="reason"
                  placeholder="Enter reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="bg-white/5 border-white/10 text-white focus:border-[#F58220]/50 min-h-[100px]"
                />
              </div>
            </div>
          )}

          <DialogFooter className="mt-6 flex gap-3">
            <Button
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
              className="text-white/70 hover:bg-white/10"
              disabled={isProcessLoading}
            >
              Cancel
            </Button>
            <Button
              className={actionType === 'approved' 
                ? "bg-emerald-500 hover:bg-emerald-600 text-white px-6 font-bold"
                : "bg-red-500 hover:bg-red-600 text-white px-6 font-bold"
              }
              onClick={handleConfirmAction}
              disabled={isProcessLoading}
            >
              {isProcessLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                actionType === 'approved' ? 'Confirm Approval' : 'Confirm Rejection'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <AlertDialog
        open={!!expenseToDelete}
        onOpenChange={(open) => !open && setExpenseToDelete(null)}
      >
        <AlertDialogContent className="bg-[#1A1A1A] border-white/20 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this expense request?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/60">
              Requester: <span className="text-white font-medium">{expenseToDelete?.requester?.firstName} {expenseToDelete?.requester?.lastName}</span>
              <br />
              Amount: <span className="text-white font-medium">${expenseToDelete?.amount}</span>
              <br />
              This action cannot be undone. This will permanently delete the expense request.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
              disabled={isDeleting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteExpense}
              className="bg-red-600 hover:bg-red-700 text-white border-none"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ExpenseListTable;
