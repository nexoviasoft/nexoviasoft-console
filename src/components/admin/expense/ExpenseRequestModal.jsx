"use client";

import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Loader2 } from 'lucide-react';
import { useCreateExpenseMutation } from '@/api/admin/expense/expenseApi';
import { toast } from 'sonner';

const ExpenseRequestModal = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'other',
    amount: '',
    description: '',
  });

  const [createExpense, { isLoading }] = useCreateExpenseMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || Number(formData.amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      await createExpense({
        ...formData,
        amount: Number(formData.amount),
      }).unwrap();
      toast.success("Expense request submitted successfully!");
      setOpen(false);
      setFormData({ type: 'other', amount: '', description: '' });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to submit request");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#F58220] hover:bg-[#F58220]/90 text-white gap-2">
          <PlusCircle className="w-4 h-4" />
          Request Expense
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#0A0A0A] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Request New Expense</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="type">Expense Type</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger className="bg-white/5 border-white/10">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-[#0A0A0A] border-white/10 text-white">
                <SelectItem value="advance salary">Advance Salary</SelectItem>
                <SelectItem value="company items">Company Items</SelectItem>
                <SelectItem value="loan">Loan</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              className="bg-white/5 border-white/10"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Provide reason or details..."
              className="bg-white/5 border-white/10 min-h-[100px]"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              className="border-white/10 hover:bg-white/5"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-[#F58220] hover:bg-[#F58220]/90 text-white"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Submit Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseRequestModal;
