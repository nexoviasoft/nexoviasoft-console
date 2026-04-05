import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useUpdateIncomeMutation } from '@/api/admin/income/incomeApi';
import { useGetOrdersQuery } from '@/api/admin/orders/orderApi';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const UpdateIncomeDialog = ({ open, onOpenChange, income }) => {
  const [updateIncome, { isLoading }] = useUpdateIncomeMutation();
  const { data: orders } = useGetOrdersQuery();

  const [formData, setFormData] = useState({
    orderId: '',
    clientId: '',
    amount: '',
    description: '',
    date: '',
    receiptNo: '',
  });

  useEffect(() => {
    if (open && income) {
      setFormData({
        orderId: income.orderId ? income.orderId.toString() : 'none',
        clientId: income.clientId ? income.clientId.toString() : '',
        amount: income.amount || '',
        description: income.description || '',
        date: income.date
          ? new Date(income.date).toISOString().split('T')[0]
          : (income.createdAt ? new Date(income.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]),
        receiptNo: income.receiptNo || '',
      });
    }
  }, [open, income]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clientId || !formData.amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await updateIncome({
        ...formData,
        id: income.id,
        orderId: formData.orderId && formData.orderId !== 'none' ? Number(formData.orderId) : undefined,
        clientId: Number(formData.clientId),
        amount: Number(formData.amount),
        // Exclude receiptNo if you don't want it editable, or pass it if you do
        receiptNo: formData.receiptNo,
      }).unwrap();
      toast.success('Income record updated successfully');
      onOpenChange(false);
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update income record');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border-white/20 text-white shadow-2xl p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Update Income Record</DialogTitle>
          <p className="text-sm text-white/50 mt-1">Modify details for this payment or revenue entry.</p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="orderId" className="text-sm font-semibold text-white/80">Associate with Order (Optional)</Label>
            <Select
              value={formData.orderId}
              onValueChange={(val) => setFormData({ ...formData, orderId: val })}
            >
              <SelectTrigger className="bg-black/40 border-white/20 text-white focus:ring-[#F58220]">
                <SelectValue placeholder="Select an order..." />
              </SelectTrigger>
              <SelectContent className="bg-[#0A0A0A] border-white/20 text-white">
                <SelectItem value="none" className="focus:bg-[#F58220]/20 focus:text-[#F58220]">No Order (Standalone Income)</SelectItem>
                {orders?.map((order) => (
                  <SelectItem key={order.id} value={order.id.toString()} className="focus:bg-[#F58220]/20 focus:text-[#F58220]">
                    {order.orderId} - {order.service} ({order.client?.name})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientId" className="text-sm font-semibold text-white/80">Client <span className="text-[#F58220]">*</span></Label>
            <Select
              value={formData.clientId}
              onValueChange={(val) => setFormData({ ...formData, clientId: val })}
            >
              <SelectTrigger className="bg-black/40 border-white/20 text-white focus:ring-[#F58220]">
                <SelectValue placeholder="Select a client..." />
              </SelectTrigger>
              <SelectContent className="bg-[#0A0A0A] border-white/20 text-white">
                {/* Fallback to display current client if not found in orders */}
                {income?.client && !orders?.find(o => o.clientId === income.clientId) && (
                  <SelectItem value={income.clientId.toString()} className="focus:bg-[#F58220]/20 focus:text-[#F58220]">
                    {income.client.name}
                  </SelectItem>
                )}
                {[...new Map(orders?.map(o => [o.clientId, o.client])).values()].map((client) => {
                  if (!client) return null;
                  return (
                    <SelectItem key={client.id} value={client.id.toString()} className="focus:bg-[#F58220]/20 focus:text-[#F58220]">
                      {client.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-semibold text-white/80">Amount Received ($) <span className="text-[#F58220]">*</span></Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="bg-black/40 border-white/20 text-white placeholder:text-white/40 focus:border-[#F58220] focus:ring-0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-semibold text-white/80">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="bg-black/40 border-white/20 text-white focus:border-[#F58220] focus:ring-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="receiptNo" className="text-sm font-semibold text-white/80">Receipt Number</Label>
            <Input
              id="receiptNo"
              placeholder="e.g. REC-12345"
              value={formData.receiptNo}
              onChange={(e) => setFormData({ ...formData, receiptNo: e.target.value })}
              className="bg-black/40 border-white/20 text-white focus:border-[#F58220] focus:ring-0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold text-white/80">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter payment details..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-black/40 border-white/20 text-white placeholder:text-white/40 focus:border-[#F58220] focus:ring-0 min-h-[100px]"
              rows={3}
            />
          </div>

          <DialogFooter className="pt-4 border-t border-white/10">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-white/20 text-white hover:bg-white/10"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#F58220] hover:bg-[#d91d79] text-black font-bold h-10 px-8 glass-button"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Income Record
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateIncomeDialog;
