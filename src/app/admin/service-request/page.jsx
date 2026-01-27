"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, Search, Package, User, Building2, Layers, DollarSign, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ConfirmActionModal from "@/components/modal/ConfirmActionModal";
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
  useGetServiceRequestsQuery,
  useDeleteServiceRequestMutation,
} from "@/api/admin/service-request/serviceRequestApi";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";
export default function ServiceRequestPage() {
  const router = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [serviceRequestForAction, setServiceRequestForAction] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
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

  // Filter service requests based on search term
  const filteredServiceRequests = serviceRequests.filter((request) => {
    const term = searchTerm.toLowerCase();
    const clientName = request.client?.name?.toLowerCase() || "";
    const clientEmail = request.client?.email?.toLowerCase() || "";
    const companyName = request.client?.companyName?.toLowerCase() || "";
    const serviceType = request.serviceType?.toLowerCase() || "";
    
    return (
      clientName.includes(term) ||
      clientEmail.includes(term) ||
      companyName.includes(term) ||
      serviceType.includes(term)
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredServiceRequests.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedServiceRequests = filteredServiceRequests.slice(startIndex, startIndex + pageSize);

  // Reset page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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
    <PrivateRoute>
      <AppLayout>
        <div className="px-4 sm:px-8 py-8 min-h-screen text-white">
      <div className="max-w-[1600px] w-full mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Service Requests</h1>
            <p className="text-sm text-white/70 mt-1">
              Manage your incoming service requests.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 w-full sm:max-w-sm bg-white/5 border-none rounded-lg px-3 py-1 shadow-sm focus-within:ring-1 focus-within:ring-[#EFFC76] transition-all">
          <Search className="w-4 h-4 text-white/40" />
          <Input 
            type="text" 
            placeholder="Search service requests..." 
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
                    <Building2 className="w-4 h-4 text-[#EFFC76]" />
                    Company
                  </div>
                </TableHead>
                <TableHead className="text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#EFFC76]" />
                    Service Type
                  </div>
                </TableHead>
                <TableHead className="text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-[#EFFC76]" />
                    Price Package
                  </div>
                </TableHead>
                <TableHead className="text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#EFFC76]" />
                    Created At
                  </div>
                </TableHead>
                <TableHead className="text-right text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-white/60">
                    Loading service requests...
                  </TableCell>
                </TableRow>
              ) : paginatedServiceRequests.length > 0 ? (
                paginatedServiceRequests.map((request) => (
                  <TableRow
                    key={request.id || request._id}
                    className="hover:bg-white/5 cursor-pointer transition-colors border-white/5 group"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8 sm:w-9 sm:h-9">
                          <AvatarImage src={request.client?.avatar} />
                          <AvatarFallback className="bg-[#EFFC76]/20 text-[#EFFC76] text-xs sm:text-sm">
                            {request.client?.name?.charAt(0) || "C"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-semibold text-white text-xs sm:text-sm whitespace-nowrap group-hover:text-[#EFFC76] transition-colors">
                            {request.client?.name || "N/A"}
                          </span>
                          <span className="text-[10px] text-white/40 group-hover:text-[#EFFC76]/70 transition-colors">{request.client?.email || "N/A"}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-white/80 text-xs sm:text-sm whitespace-nowrap group-hover:text-[#EFFC76] transition-colors">
                      {request.client?.companyName || "-"}
                    </TableCell>
                    <TableCell className="text-white/80 text-xs sm:text-sm whitespace-nowrap group-hover:text-[#EFFC76] transition-colors">
                      <div className="flex items-center gap-2">
                        <Package className="w-3 h-3 text-[#EFFC76]" />
                        {request.serviceType || "-"}
                      </div>
                    </TableCell>
                    <TableCell className="text-white/80 text-xs sm:text-sm whitespace-nowrap group-hover:text-[#EFFC76] transition-colors">
                      {request.pricePackage?.title || "-"}
                    </TableCell>
                    <TableCell className="text-white/60 text-xs sm:text-sm whitespace-nowrap group-hover:text-[#EFFC76] transition-colors">
                      {formatDate(request.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-white/70 hover:text-[#EFFC76] hover:bg-white/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/admin/service-request/${request.id || request._id}`);
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
                            handleEdit(request);
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
                            handleDeleteClick(request);
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
                    No service requests found matching "{searchTerm}"
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {!isLoading && filteredServiceRequests.length > 0 && (
          <ModernPagination
            totalItems={filteredServiceRequests.length}
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
    </div>
    </AppLayout>
    </PrivateRoute>
  );
}
