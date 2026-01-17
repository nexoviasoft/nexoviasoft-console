"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ReusableTable from "@/components/table/reusable-table";
import ConfirmActionModal from "@/components/modal/ConfirmActionModal";
import { 
  useGetServiceRequestsQuery, 
  useDeleteServiceRequestMutation,
} from "@/api/admin/service-request/serviceRequestApi";

export default function ServiceRequestPage() {
  const router = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [serviceRequestForAction, setServiceRequestForAction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // API hooks
  const { data: serviceRequestsData, isLoading, refetch } = useGetServiceRequestsQuery();
  const [deleteServiceRequest, { isLoading: isDeleting }] = useDeleteServiceRequestMutation();

  const serviceRequests = serviceRequestsData?.data || serviceRequestsData || [];

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Truncate message
  const truncateMessage = (message, maxLength = 50) => {
    if (!message) return "N/A";
    return message.length > maxLength ? `${message.substring(0, maxLength)}...` : message;
  };

  // Table headers
  const headers = [
    { label: "ID", field: "id" },
    { label: "Client Name", field: "clientName" },
    { label: "Client Email", field: "clientEmail" },
    { label: "Company Name", field: "companyName" },
    { label: "Service Type", field: "serviceType" },
    { label: "Price Package", field: "pricePackage" },
    { label: "Message", field: "message" },
    { label: "Created At", field: "createdAt" },
    { label: "Actions", field: "actions" },
  ];

  // Format data for table
  const tableData = serviceRequests.map((request) => ({
    ...request,
    clientName: request.client?.name || "N/A",
    clientEmail: request.client?.email || "N/A",
    companyName: request.client?.companyName || "N/A",
    pricePackage: request.pricePackage?.title || "N/A",
    message: truncateMessage(request.message),
    createdAt: formatDate(request.createdAt),
    actions: (
      <div className="flex items-center gap-2 justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => router.push(`/admin/service-request/${request.id || request._id}`)}
          title="View Details"
        >
          <Eye className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleEdit(request)}
          title="Edit"
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={() => handleDeleteClick(request)}
          title="Delete"
          disabled={isDeleting}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  }));

  const handleEdit = (request) => {
    // TODO: Implement edit functionality
    toast.info("Edit functionality coming soon");
  };

  const handleDeleteClick = (request) => {
    setServiceRequestForAction(request);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!serviceRequestForAction) return;

    const request = serviceRequestForAction;
    const requestId = request.id || request._id;
    const requestInfo = `Service Request #${requestId}`;
    const toastId = toast.loading("Deleting service request...");

    try {
      await deleteServiceRequest(requestId).unwrap();
      toast.success(`Service request "${requestInfo}" deleted successfully!`, { id: toastId });
      setShowConfirmModal(false);
      setServiceRequestForAction(null);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete service request", { id: toastId });
    }
  };

  const getDeleteDescription = () => {
    if (!serviceRequestForAction) return "";
    const requestId = serviceRequestForAction.id || serviceRequestForAction._id;
    return `Are you sure you want to delete Service Request #${requestId}? This action cannot be undone.`;
  };

  return (
    <div className="max-w-[1600px] w-full mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Service Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <ReusableTable
            data={tableData}
            headers={headers}
            isLoading={isLoading}
            enableSearch={true}
            searchPlaceholder="Search service requests..."
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      <ConfirmActionModal
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          setServiceRequestForAction(null);
        }}
        onConfirm={handleConfirmDelete}
        action="delete"
        description={getDeleteDescription()}
        itemName="service request"
        loading={isDeleting}
      />
    </div>
  );
}
