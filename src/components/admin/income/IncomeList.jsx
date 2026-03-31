import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, Search, MoreHorizontal, Download, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  useGetIncomesQuery,
  useDeleteIncomeMutation 
} from '@/api/admin/income/incomeApi';
import AddIncomeDialog from './AddIncomeDialog';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
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
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const IncomeList = () => {
  const { userRole } = useAuth();
  const isAdmin = userRole === 'admin';
  const { data: incomes, isLoading, refetch } = useGetIncomesQuery();
  const [deleteIncome, { isLoading: isDeleting }] = useDeleteIncomeMutation();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [incomeToDelete, setIncomeToDelete] = useState(null);

  const filteredIncomes = incomes?.filter((income) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      income.client?.name?.toLowerCase().includes(searchLower) ||
      income.order?.orderId?.toLowerCase().includes(searchLower) ||
      income.receiptNo?.toLowerCase().includes(searchLower) ||
      income.description?.toLowerCase().includes(searchLower)
    );
  });

  const handleDeleteClick = (income) => {
    setIncomeToDelete(income);
  };

  const confirmDeleteIncome = async () => {
    if (!incomeToDelete) return;
    try {
      await deleteIncome(incomeToDelete.id).unwrap();
      toast.success("Income record deleted successfully");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete income record");
    } finally {
      setIncomeToDelete(null);
    }
  };

  return (
    <div className="px-4 py-4 md:px-8 md:py-6 flex flex-col min-h-screen text-white">
      <div className="max-w-[1600px] w-full mx-auto space-y-6 md:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Income Management</h1>
            <p className="text-sm text-white/60 mt-1">Track and manage all client payments and revenue.</p>
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-[#F58220] hover:bg-[#d91d79] text-black font-semibold glass-button"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Income
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-4 rounded-xl border-white/20">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              placeholder="Search client, order, or receipt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-black/40 border-white/20 text-white placeholder:text-white/40 focus:bg-black/60 focus:border-[#F58220] focus-visible:ring-0"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="gap-2 border-white/30 text-white/80 bg-black/40 hover:bg-white/10 hover:border-[#F58220]/60 hover:text-[#F58220]">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-2 border-white/30 text-white/80 bg-black/40 hover:bg-white/10 hover:border-[#F58220]/60 hover:text-[#F58220]">
              <Download className="h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        <div className="glass-card rounded-xl border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#F58220]/10">
                <TableRow className="hover:bg-transparent border-white/10">
                  <TableHead className="text-xs font-semibold text-[#F58220]">Date</TableHead>
                  <TableHead className="text-xs font-semibold text-[#F58220]">Client</TableHead>
                  <TableHead className="text-xs font-semibold text-[#F58220]">Order ID</TableHead>
                  <TableHead className="text-xs font-semibold text-[#F58220]">Receipt No</TableHead>
                  <TableHead className="text-xs font-semibold text-[#F58220]">Amount</TableHead>
                  <TableHead className="text-xs font-semibold text-[#F58220]">Description</TableHead>
                  <TableHead className="text-xs font-semibold text-[#F58220] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i} className="border-white/10">
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-8 w-8 rounded-full ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredIncomes?.length > 0 ? (
                  filteredIncomes.map((income) => (
                    <TableRow key={income.id} className="group hover:bg-[#F58220]/5 transition-colors border-white/10">
                      <TableCell className="text-white/60 text-xs font-medium">
                        {income.date ? format(new Date(income.date), 'MMM dd, yyyy') : format(new Date(income.createdAt), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-white text-sm">{income.client?.name}</div>
                        <div className="text-xs text-white/50">{income.client?.email}</div>
                      </TableCell>
                      <TableCell>
                        {income.order ? (
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-mono border-white/20 text-white/70">{income.order.orderId}</Badge>
                            {income.order.paidAmount >= income.order.amount && (
                              <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-[10px] h-5 px-1.5 font-bold">PAID</Badge>
                            )}
                          </div>
                        ) : (
                          <span className="text-white/40 text-sm">Standalone</span>
                        )}
                      </TableCell>
                      <TableCell className="text-xs font-mono text-white/60">{income.receiptNo || 'N/A'}</TableCell>
                      <TableCell className="font-bold text-emerald-400">
                        ${Number(income.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate text-sm text-white/60 italic">
                        {income.description || '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-[#F58220]/20 text-white/60">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-[#1A1A1A] border-white/10 text-white">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:text-white">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:text-white">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Record
                            </DropdownMenuItem>
                            {isAdmin && (
                              <DropdownMenuItem 
                                onClick={() => handleDeleteClick(income)}
                                className="cursor-pointer text-rose-500 focus:bg-rose-500/10 focus:text-rose-500"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center text-white/40">
                      No income records found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <AddIncomeDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
        />

        {/* Delete Confirmation Modal */}
        <AlertDialog
          open={!!incomeToDelete}
          onOpenChange={(open) => !open && setIncomeToDelete(null)}
        >
          <AlertDialogContent className="bg-[#1A1A1A] border-white/20 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete this income record?</AlertDialogTitle>
              <AlertDialogDescription className="text-white/60">
                Client: <span className="text-white font-medium">{incomeToDelete?.client?.name}</span>
                <br />
                Amount: <span className="text-emerald-400 font-medium">${Number(incomeToDelete?.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                <br />
                This action cannot be undone. This will permanently delete the income record and update related balances.
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
                onClick={confirmDeleteIncome}
                className="bg-red-600 hover:bg-red-700 text-white border-none"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default IncomeList;
