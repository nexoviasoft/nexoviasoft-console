"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ReusableTable from "@/components/table/reusable-table";
import DeleteConfirmModal from "@/components/modal/DeleteConfirmModal";
import DepartmentForm from "@/components/landing/landing-page-from/departmnat/DepartmentFrom";
import { 
  useGetDepartmentsQuery, 
  useDeleteDepartmentMutation 
} from "@/api/landing/department/departmentApi";

export default function DepartmentPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // API hooks
  const { data: departmentsData, isLoading, refetch } = useGetDepartmentsQuery();
  const [deleteDepartment, { isLoading: isDeleting }] = useDeleteDepartmentMutation();

  const departments = departmentsData?.data || departmentsData || [];

  // Table headers
  const headers = [
    { label: "Name", field: "name" },
    { label: "Description", field: "description" },
    { label: "Actions", field: "actions" },
  ];

  // Format data for table
  const tableData = departments.map((department) => ({
    ...department,
    actions: (
      <div className="flex items-center gap-2 justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10"
          onClick={() => handleEdit(department)}
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/20"
          onClick={() => handleDeleteClick(department)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  }));

  const handleAdd = () => {
    setEditingDepartment(null);
    setShowDialog(true);
  };

  const handleEdit = (department) => {
    setEditingDepartment(department);
    setShowDialog(true);
  };

  const handleDeleteClick = (department) => {
    setDepartmentToDelete(department);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!departmentToDelete) return;

    try {
      await deleteDepartment(departmentToDelete.id || departmentToDelete._id).unwrap();
      toast.success("Department deleted successfully!");
      setShowDeleteModal(false);
      setDepartmentToDelete(null);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete department");
    }
  };

  const handleFormSuccess = () => {
    setEditingDepartment(null);
    refetch();
  };

  return (
    <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
      <Card className="glass-card border-white/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Departments</CardTitle>
          <Button
            onClick={handleAdd}
            className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Department
          </Button>
        </CardHeader>
        <CardContent>
          <ReusableTable
            data={tableData}
            headers={headers}
            isLoading={isLoading}
            enableSearch={true}
            searchPlaceholder="Search departments..."
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      {/* Department Form Dialog */}
      <DepartmentForm
        open={showDialog}
        onOpenChange={setShowDialog}
        editingDepartment={editingDepartment}
        onSuccess={handleFormSuccess}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDepartmentToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        count={1}
        itemName="department"
        loading={isDeleting}
      />
    </div>
  );
}
