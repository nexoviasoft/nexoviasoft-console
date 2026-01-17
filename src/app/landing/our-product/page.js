"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import ReusableTable from "@/components/table/reusable-table";
import ConfirmActionModal from "@/components/modal/ConfirmActionModal";
import OurProductForm from "@/components/landing/landing-page-from/our-product/OurProductForm";
import { 
  useGetOurProductsQuery, 
  useDeleteOurProductMutation,
} from "@/api/landing/our-product/ourProductApi";

export default function OurProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showDialog, setShowDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productForAction, setProductForAction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // API hooks
  const { data: productsData, isLoading, refetch } = useGetOurProductsQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteOurProductMutation();

  const products = productsData?.data || productsData || [];

  // Handle edit query parameter
  useEffect(() => {
    const editId = searchParams.get("edit");
    if (editId && products.length > 0) {
      const productToEdit = products.find(
        (product) => (product.id || product._id) === editId
      );
      if (productToEdit) {
        setEditingProduct(productToEdit);
        setShowDialog(true);
        // Remove query parameter from URL
        router.replace("/landing/our-product", { scroll: false });
      }
    }
  }, [searchParams, products, router]);

  // Table headers
  const headers = [
    { label: "Name", field: "name" },
    { label: "Category", field: "categoryName" },
    { label: "Features", field: "featuresCount" },
    { label: "Total Users", field: "totalUser" },
    { label: "URL", field: "url" },
    { label: "Actions", field: "actions" },
  ];

  // Format data for table
  const tableData = products.map((product) => ({
    ...product,
    featuresCount: Array.isArray(product.feature) ? product.feature.length : 0,
    categoryName: product.categoryId ? `Category ${product.categoryId}` : "N/A",
    url: product.url ? (
      <a 
        href={product.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[#EFFC76] hover:text-white underline truncate max-w-xs block"
      >
        {product.url}
      </a>
    ) : "N/A",
    actions: (
      <div className="flex items-center gap-2 justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          onClick={() => router.push(`/landing/our-product/${product.id || product._id}`)}
          title="View Details"
        >
          <Eye className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          onClick={() => handleEdit(product)}
          title="Edit"
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/20"
          onClick={() => handleDeleteClick(product)}
          title="Delete"
          disabled={isDeleting}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  }));

  const handleAdd = () => {
    setEditingProduct(null);
    setShowDialog(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowDialog(true);
  };

  const handleDeleteClick = (product) => {
    setProductForAction(product);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!productForAction) return;

    const product = productForAction;
    const productId = product.id || product._id;
    const productName = product.name || "Product";
    const toastId = toast.loading("Deleting product...");

    try {
      await deleteProduct(productId).unwrap();
      toast.success(`Product "${productName}" deleted successfully!`, { id: toastId });
      setShowConfirmModal(false);
      setProductForAction(null);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete product", { id: toastId });
    }
  };

  const getDeleteDescription = () => {
    if (!productForAction) return "";
    const productName = productForAction.name || "Product";
    return `Are you sure you want to delete "${productName}"? This action cannot be undone.`;
  };

  return (
    <div className="max-w-[1600px] w-full mx-auto">
      <Card className="glass-card border-white/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Our Products</CardTitle>
          <Button
            onClick={handleAdd}
            className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </CardHeader>
        <CardContent>
          <ReusableTable
            data={tableData}
            headers={headers}
            isLoading={isLoading}
            enableSearch={true}
            searchPlaceholder="Search products..."
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      {/* Our Product Form Dialog */}
      <OurProductForm
        open={showDialog}
        onOpenChange={setShowDialog}
        editingProduct={editingProduct}
        onSuccess={() => {
          const isEdit = !!editingProduct;
          toast.success(isEdit ? "Product updated successfully!" : "Product created successfully!");
          setEditingProduct(null);
          refetch();
        }}
      />

      {/* Confirmation Modal */}
      <ConfirmActionModal
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          setProductForAction(null);
        }}
        onConfirm={handleConfirmDelete}
        action="delete"
        description={getDeleteDescription()}
        itemName="product"
        loading={isDeleting}
      />
    </div>
  );
}
