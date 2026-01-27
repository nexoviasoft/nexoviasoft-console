"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ReusableTable from "@/components/table/reusable-table";
import DeleteConfirmModal from "@/components/modal/DeleteConfirmModal";
import CategoryForm from "@/components/landing/landing-page-from/category/CategoryForm";
import { 
  useGetCategoriesQuery, 
  useDeleteCategoryMutation 
} from "@/api/landing/category/categoryApi";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";


export default function CategoryPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // API hooks
  const { data: categoriesData, isLoading, refetch } = useGetCategoriesQuery();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

  const categories = categoriesData?.data || categoriesData || [];

  // Table headers
  const headers = [
    { label: "Name", field: "name" },
    { label: "Description", field: "description" },
    { label: "Actions", field: "actions" },
  ];

  // Format data for table
  const tableData = categories.map((category) => ({
    ...category,
    actions: (
      <div className="flex items-center gap-2 justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10"
          onClick={() => handleEdit(category)}
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/20"
          onClick={() => handleDeleteClick(category)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  }));

  const handleAdd = () => {
    setEditingCategory(null);
    setShowDialog(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowDialog(true);
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;

    try {
      await deleteCategory(categoryToDelete.id || categoryToDelete._id).unwrap();
      toast.success("Category deleted successfully!");
      setShowDeleteModal(false);
      setCategoryToDelete(null);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete category");
    }
  };

  const handleFormSuccess = () => {
    setEditingCategory(null);
    refetch();
  };

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
      <Card className="glass-card border-white/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Categories</CardTitle>
          <Button
            onClick={handleAdd}
            className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </CardHeader>
        <CardContent>
          <ReusableTable
            data={tableData}
            headers={headers}
            isLoading={isLoading}
            enableSearch={true}
            searchPlaceholder="Search categories..."
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      {/* Category Form Dialog */}
      <CategoryForm
        open={showDialog}
        onOpenChange={setShowDialog}
        editingCategory={editingCategory}
        onSuccess={handleFormSuccess}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setCategoryToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        count={1}
        itemName="category"
        loading={isDeleting}
      />
    </div>
    </AppLayout>
    </PrivateRoute>
  );
}
