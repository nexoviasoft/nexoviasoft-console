"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye, Search, Layers, CheckCircle2, List, FileText } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import ConfirmActionModal from "@/components/modal/ConfirmActionModal";
import OurServiceForm from "@/components/landing/landing-page-from/our-service/OurServiceForm";
import ModernPagination from "@/components/table/modern-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  useGetOurServicesQuery,
  useDeleteOurServiceMutation,
} from "@/api/landing/our-service/ourServiceApi";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";

function OurServiceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showDialog, setShowDialog] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [serviceForAction, setServiceForAction] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // API hooks
  const { data: servicesData, isLoading, refetch } = useGetOurServicesQuery();
  const [deleteService, { isLoading: isDeleting }] = useDeleteOurServiceMutation();

  const services = servicesData?.data || servicesData || [];

  // Filter services based on search term
  const filteredServices = services.filter((service) => {
    const term = searchTerm.toLowerCase();
    const title = service.title?.toLowerCase() || "";
    const subtitle = service.subtitle?.toLowerCase() || "";
    const categoryId = service.categoryId?.toString() || "";
    
    return (
      title.includes(term) ||
      subtitle.includes(term) ||
      categoryId.includes(term)
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredServices.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedServices = filteredServices.slice(startIndex, startIndex + pageSize);

  // Reset page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Handle edit query parameter
  useEffect(() => {
    const editId = searchParams.get("edit");
    if (editId && services.length > 0) {
      const serviceToEdit = services.find(
        (service) => (service.id || service._id) === editId,
      );
      if (serviceToEdit) {
        setEditingService(serviceToEdit);
        setShowDialog(true);
        // Remove query parameter from URL
        router.replace("/admin/our-service", { scroll: false });
      }
    }
  }, [searchParams, services, router]);

  const handleAdd = () => {
    setEditingService(null);
    setShowDialog(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setShowDialog(true);
  };

  const handleDeleteClick = (service) => {
    setServiceForAction(service);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!serviceForAction) return;

    const service = serviceForAction;
    const serviceId = service.id || service._id;
    const serviceTitle = service.title || "Service";
    const toastId = toast.loading("Deleting service...");

    try {
      await deleteService(serviceId).unwrap();
      toast.success(`Service "${serviceTitle}" deleted successfully!`, {
        id: toastId,
      });
      setShowConfirmModal(false);
      setServiceForAction(null);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete service", {
        id: toastId,
      });
    }
  };

  const getDeleteDescription = () => {
    if (!serviceForAction) return "";
    const serviceTitle = serviceForAction.title || "Service";
    return `Are you sure you want to delete "${serviceTitle}"? This action cannot be undone.`;
  };

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="px-4 sm:px-8 py-8 min-h-screen text-white">
      <div className="max-w-[1600px] w-full mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Our Services</h1>
            <p className="text-sm text-white/70 mt-1">
              Manage your services and offerings.
            </p>
          </div>
          <Button
            onClick={handleAdd}
            className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black gap-2 glass-button"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </Button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 w-full sm:max-w-sm bg-white/5 border-none rounded-lg px-3 py-1 shadow-sm focus-within:ring-1 focus-within:ring-[#EFFC76] transition-all">
          <Search className="w-4 h-4 text-white/40" />
          <Input 
            type="text" 
            placeholder="Search services..." 
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
                    <FileText className="w-4 h-4 text-[#EFFC76]" />
                    Title
                  </div>
                </TableHead>
                <TableHead className="text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#EFFC76]" />
                    Category
                  </div>
                </TableHead>
                <TableHead className="text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#EFFC76]" />
                    Key Features
                  </div>
                </TableHead>
                <TableHead className="text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#EFFC76]" />
                    Benefits
                  </div>
                </TableHead>
                <TableHead className="text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                  <div className="flex items-center gap-2">
                    <List className="w-4 h-4 text-[#EFFC76]" />
                    Other Services
                  </div>
                </TableHead>
                <TableHead className="text-right text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-white/60">
                    Loading services...
                  </TableCell>
                </TableRow>
              ) : paginatedServices.length > 0 ? (
                paginatedServices.map((service) => (
                  <TableRow
                    key={service.id || service._id}
                    className="hover:bg-white/5 cursor-pointer transition-colors border-white/5 group"
                  >
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span className="font-semibold text-white text-xs sm:text-sm whitespace-nowrap group-hover:text-[#EFFC76] transition-colors">
                          {service.title}
                        </span>
                        <span className="text-[10px] text-white/40 truncate max-w-[200px] group-hover:text-[#EFFC76]/70 transition-colors">{service.subtitle}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-white/80 text-xs sm:text-sm whitespace-nowrap group-hover:text-[#EFFC76] transition-colors">
                      <div className="flex items-center gap-2">
                        <Layers className="w-3 h-3 text-[#EFFC76]" />
                        {service.categoryId ? `Category ${service.categoryId}` : "N/A"}
                      </div>
                    </TableCell>
                    <TableCell className="text-white/80 text-xs sm:text-sm whitespace-nowrap group-hover:text-[#EFFC76] transition-colors">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-[#EFFC76]" />
                        {Array.isArray(service.keyFeature) ? service.keyFeature.length : 0}
                      </div>
                    </TableCell>
                    <TableCell className="text-white/80 text-xs sm:text-sm whitespace-nowrap group-hover:text-[#EFFC76] transition-colors">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-[#EFFC76]" />
                        {Array.isArray(service.benefit) ? service.benefit.length : 0}
                      </div>
                    </TableCell>
                    <TableCell className="text-white/80 text-xs sm:text-sm whitespace-nowrap group-hover:text-[#EFFC76] transition-colors">
                      <div className="flex items-center gap-2">
                        <List className="w-3 h-3 text-[#EFFC76]" />
                        {Array.isArray(service.otherservice) ? service.otherservice.length : 0}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-white/70 hover:text-[#EFFC76] hover:bg-white/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/admin/our-service/${service.id || service._id}`);
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
                            handleEdit(service);
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
                            handleDeleteClick(service);
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
                    No services found matching "{searchTerm}"
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {!isLoading && filteredServices.length > 0 && (
          <ModernPagination
            totalItems={filteredServices.length}
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

        {/* Our Service Form Dialog */}
        <OurServiceForm
          open={showDialog}
          onOpenChange={setShowDialog}
          editingService={editingService}
          onSuccess={() => {
            const isEdit = !!editingService;
            toast.success(
              isEdit
                ? "Service updated successfully!"
                : "Service created successfully!",
            );
            setEditingService(null);
            refetch();
          }}
        />

        {/* Confirmation Modal */}
        <ConfirmActionModal
          isOpen={showConfirmModal}
          onClose={() => {
            setShowConfirmModal(false);
            setServiceForAction(null);
          }}
          onConfirm={handleConfirmDelete}
          action="delete"
          description={getDeleteDescription()}
          itemName="service"
          loading={isDeleting}
        />
      </div>
    </div>
    </AppLayout>
    </PrivateRoute>
  );
}

export default function OurServicePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OurServiceContent />
    </Suspense>
  );
}
