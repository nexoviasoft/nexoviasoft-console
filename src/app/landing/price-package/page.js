"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import ReusableTable from "@/components/table/reusable-table";
import DeleteConfirmModal from "@/components/modal/DeleteConfirmModal";
import PricePackageForm from "@/components/landing/landing-page-from/price-package/PricePackageForm";
import { 
  useGetPricePackagesQuery, 
  useDeletePricePackageMutation 
} from "@/api/landing/price-package/pricePackageApi";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";

export default function PricePackagePage() {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [editingPricePackage, setEditingPricePackage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pricePackageToDelete, setPricePackageToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // API hooks
  const { data: pricePackagesData, isLoading, refetch } = useGetPricePackagesQuery();
  const [deletePricePackage, { isLoading: isDeleting }] = useDeletePricePackageMutation();

  const pricePackages = pricePackagesData?.data || pricePackagesData || [];

  // Table headers
  const headers = [
    { label: "Title", field: "title" },
    { label: "Price", field: "price" },
    { label: "Type", field: "type" },
    { label: "Project Limit", field: "projectLimit" },
    { label: "Revision Limit", field: "revisionLimit" },
    { label: "Badge", field: "badge" },
    { label: "Actions", field: "actions" },
  ];

  // Format data for table
  const tableData = pricePackages.map((pricePackage) => ({
    ...pricePackage,
    type: pricePackage.type ? (
      <span className="capitalize px-2 py-1 rounded-md bg-[#EFFC76]/10 text-[#EFFC76] border border-[#EFFC76]/40 text-sm">
        {pricePackage.type}
      </span>
    ) : (
      <span className="text-white/40 text-sm italic">-</span>
    ),
    badge: pricePackage.badge ? (
      <span className="px-2 py-1 rounded-md bg-[#EFFC76]/10 text-[#EFFC76] border border-[#EFFC76]/40 text-sm">
        {pricePackage.badge}
      </span>
    ) : (
      <span className="text-white/40 text-sm italic">-</span>
    ),
    actions: (
      <div className="flex items-center gap-2 justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          onClick={() => handleView(pricePackage)}
          title="View Details"
        >
          <Eye className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          onClick={() => handleEdit(pricePackage)}
          title="Edit"
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/20"
          onClick={() => handleDeleteClick(pricePackage)}
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  }));

  const handleAdd = () => {
    setEditingPricePackage(null);
    setShowDialog(true);
  };

  const handleView = (pricePackage) => {
    const id = pricePackage.id || pricePackage._id;
    router.push(`/landing/price-package/${id}`);
  };

  const handleEdit = (pricePackage) => {
    setEditingPricePackage(pricePackage);
    setShowDialog(true);
  };

  const handleDeleteClick = (pricePackage) => {
    setPricePackageToDelete(pricePackage);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!pricePackageToDelete) return;

    try {
      await deletePricePackage(pricePackageToDelete.id || pricePackageToDelete._id).unwrap();
      toast.success("Price package deleted successfully!");
      setShowDeleteModal(false);
      setPricePackageToDelete(null);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete price package");
    }
  };

  const handleFormSuccess = () => {
    setEditingPricePackage(null);
    refetch();
  };

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="max-w-[1600px] w-full mx-auto">
      <Card className="glass-card border-white/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Price Packages</CardTitle>
          <Button
            onClick={handleAdd}
            className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Price Package
          </Button>
        </CardHeader>
        <CardContent>
          <ReusableTable
            data={tableData}
            headers={headers}
            isLoading={isLoading}
            enableSearch={true}
            searchPlaceholder="Search price packages..."
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      {/* Price Package Form Dialog */}
      <PricePackageForm
        open={showDialog}
        onOpenChange={setShowDialog}
        editingPricePackage={editingPricePackage}
        onSuccess={handleFormSuccess}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setPricePackageToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        count={1}
        itemName="price package"
        loading={isDeleting}
      />
    </div>
    </AppLayout>
    </PrivateRoute>
  );
}
