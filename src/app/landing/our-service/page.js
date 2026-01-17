"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import ReusableTable from "@/components/table/reusable-table";
import ConfirmActionModal from "@/components/modal/ConfirmActionModal";
import OurServiceForm from "@/components/landing/landing-page-from/our-service/OurServiceForm";
import { 
  useGetOurServicesQuery, 
  useDeleteOurServiceMutation,
} from "@/api/landing/our-service/ourServiceApi";

export default function OurServicePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showDialog, setShowDialog] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [serviceForAction, setServiceForAction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // API hooks
  const { data: servicesData, isLoading, refetch } = useGetOurServicesQuery();
  const [deleteService, { isLoading: isDeleting }] = useDeleteOurServiceMutation();

  const services = servicesData?.data || servicesData || [];

  // Handle edit query parameter
  useEffect(() => {
    const editId = searchParams.get("edit");
    if (editId && services.length > 0) {
      const serviceToEdit = services.find(
        (service) => (service.id || service._id) === editId
      );
      if (serviceToEdit) {
        setEditingService(serviceToEdit);
        setShowDialog(true);
        // Remove query parameter from URL
        router.replace("/landing/our-service", { scroll: false });
      }
    }
  }, [searchParams, services, router]);

  // Table headers
  const headers = [
    { label: "Title", field: "title" },
    { label: "Subtitle", field: "subtitle" },
    { label: "Category", field: "categoryName" },
    { label: "Key Features", field: "keyFeaturesCount" },
    { label: "Benefits", field: "benefitsCount" },
    { label: "Other Services", field: "otherServicesCount" },
    { label: "Actions", field: "actions" },
  ];

  // Format data for table
  const tableData = services.map((service) => ({
    ...service,
    keyFeaturesCount: Array.isArray(service.keyFeature) ? service.keyFeature.length : 0,
    benefitsCount: Array.isArray(service.benefit) ? service.benefit.length : 0,
    otherServicesCount: Array.isArray(service.otherservice) ? service.otherservice.length : 0,
    categoryName: service.categoryId ? `Category ${service.categoryId}` : "N/A",
    actions: (
      <div className="flex items-center gap-2 justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => router.push(`/landing/our-service/${service.id || service._id}`)}
          title="View Details"
        >
          <Eye className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleEdit(service)}
          title="Edit"
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={() => handleDeleteClick(service)}
          title="Delete"
          disabled={isDeleting}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  }));

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
      toast.success(`Service "${serviceTitle}" deleted successfully!`, { id: toastId });
      setShowConfirmModal(false);
      setServiceForAction(null);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete service", { id: toastId });
    }
  };

  const getDeleteDescription = () => {
    if (!serviceForAction) return "";
    const serviceTitle = serviceForAction.title || "Service";
    return `Are you sure you want to delete "${serviceTitle}"? This action cannot be undone.`;
  };

  return (
    <div className="max-w-[1600px] w-full mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Our Services</CardTitle>
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </CardHeader>
        <CardContent>
          <ReusableTable
            data={tableData}
            headers={headers}
            isLoading={isLoading}
            enableSearch={true}
            searchPlaceholder="Search services..."
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      {/* Our Service Form Dialog */}
      <OurServiceForm
        open={showDialog}
        onOpenChange={setShowDialog}
        editingService={editingService}
        onSuccess={() => {
          const isEdit = !!editingService;
          toast.success(isEdit ? "Service updated successfully!" : "Service created successfully!");
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
  );
}
