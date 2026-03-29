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
import { useCreateIncomeMutation } from '@/api/admin/income/incomeApi';
import { useGetOrdersQuery } from '@/api/admin/orders/orderApi';
import { toast } from 'sonner';
import { Loader2, Info } from 'lucide-react';

const AddIncomeDialog = ({ open, onOpenChange }) => {
  const [createIncome, { isLoading }] = useCreateIncomeMutation();
  const { data: orders } = useGetOrdersQuery();

  const generateReceiptId = () => {
    const timestamp = Date.now().toString().slice(-4);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `REC-${timestamp}${random}`;
  };

  const [formData, setFormData] = useState({
    orderId: '',
    clientId: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    receiptNo: generateReceiptId(),
  });

  const [selectedOrder, setSelectedOrder] = useState(null);

  // Regenerate receipt when dialog opens
  useEffect(() => {
    if (open) {
      setFormData(prev => ({
        ...prev,
        receiptNo: prev.receiptNo || generateReceiptId()
      }));
    }
  }, [open]);

  useEffect(() => {
    if (formData.orderId && formData.orderId !== 'none' && orders) {
      const order = orders.find((o) => o.id.toString() === formData.orderId);
      if (order) {
        setSelectedOrder(order);
        setFormData((prev) => ({
          ...prev,
          clientId: order.clientId.toString(),
          amount: (order.amount - (order.paidAmount || 0)).toString(),
          description: `Payment for ${order.service} (#${order.orderId})`,
        }));
      }
    } else {
      setSelectedOrder(null);
    }
  }, [formData.orderId, orders]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clientId || !formData.amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await createIncome({
        ...formData,
        orderId: formData.orderId && formData.orderId !== 'none' ? Number(formData.orderId) : undefined,
        clientId: Number(formData.clientId),
        amount: Number(formData.amount),
      }).unwrap();
      toast.success('Income record added successfully');
      onOpenChange(false);
      setFormData({
        orderId: '',
        clientId: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        receiptNo: generateReceiptId(),
      });
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to add income record');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border-white/20 text-white shadow-2xl p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Add New Income</DialogTitle>
          <p className="text-sm text-white/50 mt-1">Record a new payment or revenue entry.</p>
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

          {selectedOrder && (
            <div className="bg-[#F58220]/10 border border-[#F58220]/20 rounded-xl p-4 space-y-3 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2 text-[#F58220]">
                <Info className="h-4 w-4" />
                <span className="font-bold text-sm uppercase tracking-wider">Payment Status</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] text-white/50 uppercase font-bold">Total Order</p>
                  <p className="text-lg font-bold text-white">${Number(selectedOrder.amount).toLocaleString()}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-[10px] text-white/50 uppercase font-bold">Already Paid</p>
                  <p className="text-lg font-bold text-emerald-400">${Number(selectedOrder.paidAmount || 0).toLocaleString()}</p>
                </div>
              </div>
              <div className="pt-2 border-t border-[#F58220]/20 flex justify-between items-center">
                <p className="text-xs text-white/70 font-medium">Remaining to Pay:</p>
                {selectedOrder.paidAmount >= selectedOrder.amount ? (
                  <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
                    <span className="text-sm font-black italic tracking-tighter">FULLY PAID</span>
                  </div>
                ) : (
                  <p className="text-xl font-black text-[#F58220]">
                    ${(selectedOrder.amount - (selectedOrder.paidAmount || 0)).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          )}

          {!selectedOrder && (
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
                  {[...new Map(orders?.map(o => [o.clientId, o.client])).values()].map((client) => (
                    <SelectItem key={client?.id} value={client?.id?.toString()} className="focus:bg-[#F58220]/20 focus:text-[#F58220]">
                      {client?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

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
              readOnly
              className="bg-white/5 border-white/10 text-white/50 cursor-not-allowed italic font-mono"
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
              Save Income Record
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddIncomeDialog;
