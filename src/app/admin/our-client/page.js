"use client";

import React, { useState, useEffect } from "react";
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

export default function OurClientPage() {
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
          className="h-8 w-8"
          onClick={() => router.push(`/admin/our-client/${client.id || client._id}`)}
          title="View Details"
        >
          <Eye className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleEdit(client)}
          title="Edit"
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
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
    <div className="max-w-[1600px] w-full mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Our Clients</CardTitle>
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Add Client
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

      {/* Our Client Form Dialog */}
      <OurClientForm
        open={showDialog}
        onOpenChange={setShowDialog}
        editingClient={editingClient}
        onSuccess={() => {
          const isEdit = !!editingClient;
          toast.success(isEdit ? "Client updated successfully!" : "Client created successfully!");
          setEditingClient(null);
          refetch();
        }}
      />

      {/* Confirmation Modal */}
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
  );
}
