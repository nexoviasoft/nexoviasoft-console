"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import ReusableTable from "@/components/table/reusable-table";
import ConfirmActionModal from "@/components/modal/ConfirmActionModal";
import OurClientForm from "@/components/admin/froms/our-client/OurClientForm";
import { 
  useGetClientsQuery, 
  useDeleteClientMutation,
} from "@/api/landing/client/clientApi";

function OurClientContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showDialog, setShowDialog] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [clientForAction, setClientForAction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // API hooks
  const { data: clientsData, isLoading, refetch } = useGetClientsQuery();
  const [deleteClient, { isLoading: isDeleting }] = useDeleteClientMutation();

  const clients = clientsData?.data || clientsData || [];

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

  // Table headers
  const headers = [
    { label: "Name", field: "name" },
    { label: "Designation", field: "designation" },
    { label: "Email", field: "email" },
    { label: "Phone", field: "phone" },
    { label: "Company Name", field: "companyName" },
    { label: "Company Type", field: "companyType" },
    { label: "Location", field: "location" },
    { label: "Country", field: "country" },
    { label: "Actions", field: "actions" },
  ];

  // Format data for table
  const tableData = clients.map((client) => ({
    ...client,
    actions: (
      <div className="flex items-center gap-2 justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white/70 hover:text-[#EFFC76] hover:bg-white/10"
          onClick={() => router.push(`/admin/our-client/${client.id || client._id}`)}
          title="View Details"
        >
          <Eye className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white/70 hover:text-[#EFFC76] hover:bg:white/10"
          onClick={() => handleEdit(client)}
          title="Edit"
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/15"
          onClick={() => handleDeleteClick(client)}
          title="Delete"
          disabled={isDeleting}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  }));

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
      <div className="max-w-[1600px] w-full mx-auto">
        <Card className="glass-card border-white/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Our Clients</CardTitle>
            <Button
              onClick={handleAdd}
              className="bg-white hover:bg-white/90 text-black gap-2 glass-button"
            >
              <Plus className="w-4 h-4" />
              <span>Add Client</span>
            </Button>
          </CardHeader>
          <CardContent>
            <ReusableTable
              data={tableData}
              headers={headers}
              isLoading={isLoading}
              enableSearch={true}
              searchPlaceholder="Search clients..."
              pageSize={pageSize}
              setPageSize={setPageSize}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </CardContent>
        </Card>

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
