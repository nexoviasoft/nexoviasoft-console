"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import ReusableTable from "@/components/table/reusable-table";
import DeleteConfirmModal from "@/components/modal/DeleteConfirmModal";
import CaseStudyForm from "@/components/landing/landing-page-from/case-studies/CaseStudyForm";
import { 
  useGetCaseStudiesQuery, 
  useDeleteCaseStudyMutation 
} from "@/api/landing/case-studies/caseStudiesApi";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";

export default function CaseStudiesPage() {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [caseStudyToDelete, setCaseStudyToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // API hooks
  const { data: caseStudiesData, isLoading, refetch } = useGetCaseStudiesQuery();
  const [deleteCaseStudy, { isLoading: isDeleting }] = useDeleteCaseStudyMutation();

  const caseStudies = caseStudiesData?.data || caseStudiesData || [];

  // Table headers
  const headers = [
    { label: "Title", field: "title" },
    { label: "Description", field: "description" },
    { label: "Industry", field: "industry" },
    { label: "Status", field: "status" },
    { label: "Duration", field: "duration" },
    { label: "Actions", field: "actions" },
  ];

  // Format data for table
  const tableData = caseStudies.map((caseStudy) => ({
    ...caseStudy,
    actions: (
      <div className="flex items-center gap-2 justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleView(caseStudy)}
          title="View Details"
        >
          <Eye className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleEdit(caseStudy)}
          title="Edit"
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-600 hover:text-red-700"
          onClick={() => handleDeleteClick(caseStudy)}
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  }));

  const handleAdd = () => {
    setEditingCaseStudy(null);
    setShowDialog(true);
  };

  const handleView = (caseStudy) => {
    const id = caseStudy.id || caseStudy._id;
    router.push(`/landing/case-studies/${id}`);
  };

  const handleEdit = (caseStudy) => {
    setEditingCaseStudy(caseStudy);
    setShowDialog(true);
  };

  const handleDeleteClick = (caseStudy) => {
    setCaseStudyToDelete(caseStudy);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!caseStudyToDelete) return;

    try {
      await deleteCaseStudy(caseStudyToDelete.id || caseStudyToDelete._id).unwrap();
      toast.success("Case study deleted successfully!");
      setShowDeleteModal(false);
      setCaseStudyToDelete(null);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete case study");
    }
  };

  const handleFormSuccess = () => {
    setEditingCaseStudy(null);
    refetch();
  };

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="max-w-[1600px] w-full mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Case Studies</CardTitle>
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Add Case Study
          </Button>
        </CardHeader>
        <CardContent>
          <ReusableTable
            data={tableData}
            headers={headers}
            isLoading={isLoading}
            enableSearch={true}
            searchPlaceholder="Search case studies..."
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      {/* Case Study Form Dialog */}
      <CaseStudyForm
        open={showDialog}
        onOpenChange={setShowDialog}
        editingCaseStudy={editingCaseStudy}
        onSuccess={handleFormSuccess}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setCaseStudyToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        count={1}
        itemName="case study"
        loading={isDeleting}
      />
    </div>
    </AppLayout>
    </PrivateRoute>
  );
}
