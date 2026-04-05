import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { FileText, User, Receipt, CreditCard, Calendar, Hash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const IncomeDetailsDialog = ({ open, onOpenChange, income }) => {
  if (!income) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] w-[95vw] sm:w-full bg-[#0A0A0A] border-white/20 text-white shadow-2xl p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-black via-black to-[#F58220]/20 p-6 sm:p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black tracking-tight text-white flex items-center gap-3">
              <Receipt className="h-6 w-6 text-[#F58220]" />
              Income Details
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Main Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/40 border border-white/10 rounded-xl p-4 hover:border-[#F58220]/50 transition-colors">
              <div className="flex items-center gap-2 text-white/50 mb-1">
                <CreditCard className="h-4 w-4" />
                <span className="text-xs uppercase font-bold tracking-wider">Amount</span>
              </div>
              <div className="text-2xl font-black text-emerald-400">
                ৳{Number(income.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div className="bg-black/40 border border-white/10 rounded-xl p-4 hover:border-[#F58220]/50 transition-colors">
              <div className="flex items-center gap-2 text-white/50 mb-1">
                <Calendar className="h-4 w-4" />
                <span className="text-xs uppercase font-bold tracking-wider">Date Received</span>
              </div>
              <div className="text-xl font-bold text-white">
                {income.date 
                  ? format(new Date(income.date), 'MMM dd, yyyy') 
                  : (income.createdAt ? format(new Date(income.createdAt), 'MMM dd, yyyy') : 'N/A')}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm uppercase font-bold tracking-widest text-[#F58220]">General Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-white/50 text-xs font-medium">
                    <User className="h-3.5 w-3.5" /> Client
                  </div>
                  <div className="text-sm font-semibold">{income.client?.name || 'Unknown Client'}</div>
                  <div className="text-xs text-white/50">{income.client?.email || 'No email provided'}</div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-white/50 text-xs font-medium">
                    <Hash className="h-3.5 w-3.5" /> Reference
                  </div>
                  {income.order ? (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-white/40">Order:</span>
                      <Badge variant="outline" className="font-mono border-white/20 text-white/70">
                        {income.order.orderId}
                      </Badge>
                    </div>
                  ) : (
                    <div className="text-sm italic text-white/40 mt-1">Standalone payment</div>
                  )}
                  {income.receiptNo && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-white/40">Receipt:</span>
                      <Badge variant="outline" className="font-mono bg-white/5 border-white/10 text-white/60">
                        {income.receiptNo}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm uppercase font-bold tracking-widest text-[#F58220]">Description</h3>
              <div className="bg-black/60 border border-white/10 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-white/40 shrink-0 mt-0.5" />
                  <p className="text-sm text-white/80 leading-relaxed whitespace-pre-wrap">
                    {income.description || 'No description provided.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IncomeDetailsDialog;
