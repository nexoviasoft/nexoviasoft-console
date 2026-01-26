 "use client";

import React, { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye, Search, User, Briefcase, Mail, Building2, MapPin } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import ConfirmActionModal from "@/components/modal/ConfirmActionModal";
import OurClientForm from "@/components/admin/froms/our-client/OurClientForm";
import ModernPagination from "@/components/table/modern-pagination";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  useGetClientsQuery, 
  useDeleteClientMutation,
} from "@/api/landing/client/clientApi";
import ReusableTable from "@/components/table/reusable-table";

function OurClientContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showDialog, setShowDialog] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [clientForAction, setClientForAction] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // API hooks
  const { data: clientsData, isLoading, refetch } = useGetClientsQuery();
  const [deleteClient, { isLoading: isDeleting }] = useDeleteClientMutation();

  const clients = clientsData?.data || clientsData || [];

  // Filter clients based on search term
  const filteredClients = clients.filter((client) => {
    const term = searchTerm.toLowerCase();
    return (
      client.name?.toLowerCase().includes(term) ||
      client.email?.toLowerCase().includes(term) ||
      client.companyName?.toLowerCase().includes(term) ||
      client.designation?.toLowerCase().includes(term)
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredClients.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedClients = filteredClients.slice(startIndex, startIndex + pageSize);

  // Reset page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Handle edit query parameter
  useEffect(() => {
    const editId = searchParams.get("edit");
    if (editId && clients.length > 0) {
      const clientToEdit = clients.find(
        (client) => (client.id || client._id) === editId
      );
      if (clientToEdit) {
        setEditingClient(clientToEdit);
        setShowDialog(true);
        // Remove query parameter from URL
        router.replace("/admin/our-client", { scroll: false });
      }
    }
  }, [searchParams, clients, router]);

  const handleAdd = () => {
    setEditingClient(null);
    setShowDialog(true);
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setShowDialog(true);
  };

  const handleDeleteClick = (client) => {
    setClientForAction(client);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!clientForAction) return;

    const client = clientForAction;
    const clientId = client.id || client._id;
    const clientName = client.name || "Client";
    const toastId = toast.loading("Deleting client...");

    try {
      await deleteClient(clientId).unwrap();
      toast.success(`Client "${clientName}" deleted successfully!`, { id: toastId });
      setShowConfirmModal(false);
      setClientForAction(null);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete client", { id: toastId });
    }
  };

  const getDeleteDescription = () => {
    if (!clientForAction) return "";
    const clientName = clientForAction.name || "Client";
    return `Are you sure you want to delete "${clientName}"? This action cannot be undone.`;
  };

  return (
    <div className="px-8 py-8 min-h-screen text-white">
      <div className="max-w-[1600px] w-full mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Our Clients</h1>
            <p className="text-sm text-white/70 mt-1">
              Manage your client relationships and details.
            </p>
          </div>
          <Button
            onClick={handleAdd}
            className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black gap-2 glass-button"
          >
            <Plus className="w-4 h-4" />
            <span>Add Client</span>
          </Button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 w-full sm:max-w-sm bg-white/5 border-none rounded-lg px-3 py-1 shadow-sm focus-within:ring-1 focus-within:ring-[#EFFC76] transition-all">
          <Search className="w-4 h-4 text-white/40" />
          <Input 
            type="text" 
            placeholder="Search clients..." 
            className="border-0 bg-transparent shadow-none focus-visible:ring-0 px-0 h-8 text-sm text-white placeholder:text-white/40 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table Section */}
        <div className="bg-[#1A1A1A] rounded-xl sm:rounded-2xl overflow-hidden overflow-x-auto border border-white/5">
          <Table>
            <TableHeader className="bg-[#1A1A1A]">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#EFFC76]" />
                    Client Name
                  </div>
                </TableHead>
                <TableHead className="text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#EFFC76]" />
                    Designation
                  </div>
                </TableHead>
                <TableHead className="text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#EFFC76]" />
                    Email
                  </div>
                </TableHead>
                <TableHead className="text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#EFFC76]" />
                    Company
                  </div>
                </TableHead>
                <TableHead className="text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#EFFC76]" />
                    Location
                  </div>
                </TableHead>
                <TableHead className="text-right text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-white/60">
                    Loading clients...
                  </TableCell>
                </TableRow>
              ) : paginatedClients.length > 0 ? (
                paginatedClients.map((client) => (
                  <TableRow
                    key={client.id || client._id}
                    className="hover:bg-white/5 cursor-pointer transition-colors border-white/5 group"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8 sm:w-9 sm:h-9">
                          <AvatarImage src={client.avatar} />
                          <AvatarFallback className="bg-[#EFFC76]/20 text-[#EFFC76] text-xs sm:text-sm">
                            {client.name?.charAt(0) || "C"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="font-semibold text-white text-xs sm:text-sm whitespace-nowrap group-hover:text-[#EFFC76] transition-colors">
                          {client.name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-white/80 text-xs sm:text-sm whitespace-nowrap group-hover:text-[#EFFC76] transition-colors">
                      {client.designation || "-"}
                    </TableCell>
                    <TableCell className="text-white/60 text-xs sm:text-sm whitespace-nowrap group-hover:text-[#EFFC76] transition-colors">
                      {client.email || "-"}
                    </TableCell>
                    <TableCell className="text-white/80 text-xs sm:text-sm whitespace-nowrap group-hover:text-[#EFFC76] transition-colors">
                      <div className="flex flex-col">
                        <span>{client.companyName || "-"}</span>
                        <span className="text-[10px] text-white/40 group-hover:text-[#EFFC76]/70 transition-colors">{client.companyType}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-white/60 text-xs sm:text-sm whitespace-nowrap group-hover:text-[#EFFC76] transition-colors">
                      {client.location || "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-white/70 hover:text-[#EFFC76] hover:bg-white/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/admin/our-client/${client.id || client._id}`);
                          }}
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-white/70 hover:text-[#EFFC76] hover:bg-white/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(client);
                          }}
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/15"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(client);
                          }}
                          title="Delete"
                          disabled={isDeleting}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-white/60 text-sm">
                    No clients found matching "{searchTerm}"
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {!isLoading && filteredClients.length > 0 && (
          <ModernPagination
            totalItems={filteredClients.length}
            itemsPerPage={pageSize}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(newPageSize) => {
              setPageSize(newPageSize);
              setCurrentPage(1);
            }}
          />
        )}

        <OurClientForm
          open={showDialog}
          onOpenChange={setShowDialog}
          editingClient={editingClient}
          onSuccess={() => {
            const isEdit = !!editingClient;
            toast.success(
              isEdit
                ? "Client updated successfully!"
                : "Client created successfully!"
            );
            setEditingClient(null);
            refetch();
          }}
        />

        <ConfirmActionModal
          isOpen={showConfirmModal}
          onClose={() => {
            setShowConfirmModal(false);
            setClientForAction(null);
          }}
          onConfirm={handleConfirmDelete}
          action="delete"
          description={getDeleteDescription()}
          itemName="client"
          loading={isDeleting}
        />
      </div>
    </div>
  );
}

export default function OurClientPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OurClientContent />
    </Suspense>
  );
}
