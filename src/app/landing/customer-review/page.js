"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ReusableTable from "@/components/table/reusable-table";
import DeleteConfirmModal from "@/components/modal/DeleteConfirmModal";
import CustomerReviewForm from "@/components/landing/landing-page-from/customer-review/CustomerReviewForm";
import { 
  useGetCustomerReviewsQuery, 
  useDeleteCustomerReviewMutation 
} from "@/api/landing/customer-review/customerReviewApi";

export default function CustomerReviewPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // API hooks
  const { data: reviewsData, isLoading, refetch } = useGetCustomerReviewsQuery();
  const [deleteCustomerReview, { isLoading: isDeleting }] = useDeleteCustomerReviewMutation();

  const reviews = reviewsData?.data || reviewsData || [];

  // Table headers
  const headers = [
    { label: "Client ID", field: "client_id" },
    { label: "Review Title", field: "review_title" },
    { label: "Rating", field: "rating" },
    { label: "Review Type", field: "review_type" },
    { label: "Status", field: "status" },
    { label: "Featured", field: "is_featured" },
    { label: "Actions", field: "actions" },
  ];

  // Format data for table
  const tableData = reviews.map((review) => ({
    ...review,
    rating: (
      <div className="flex items-center gap-1">
        <span className="font-semibold">{review.rating}</span>
        <span className="text-yellow-500">★</span>
      </div>
    ),
    review_type: review.review_type ? (
      <span className="capitalize px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm">
        {review.review_type}
      </span>
    ) : (
      <span className="text-gray-400 text-sm italic">-</span>
    ),
    status: review.status ? (
      <span className={`capitalize px-2 py-1 rounded-md text-sm ${
        review.status === "approved" 
          ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
          : review.status === "rejected"
          ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
          : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
      }`}>
        {review.status}
      </span>
    ) : (
      <span className="text-gray-400 text-sm italic">-</span>
    ),
    is_featured: review.is_featured ? (
      <span className="px-2 py-1 rounded-md bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm">
        Featured
      </span>
    ) : (
      <span className="text-gray-400 text-sm italic">-</span>
    ),
    actions: (
      <div className="flex items-center gap-2 justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleEdit(review)}
          title="Edit"
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-600 hover:text-red-700"
          onClick={() => handleDeleteClick(review)}
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  }));

  const handleAdd = () => {
    setEditingReview(null);
    setShowDialog(true);
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setShowDialog(true);
  };

  const handleDeleteClick = (review) => {
    setReviewToDelete(review);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!reviewToDelete) return;

    try {
      await deleteCustomerReview(reviewToDelete.id || reviewToDelete._id).unwrap();
      toast.success("Customer review deleted successfully!");
      setShowDeleteModal(false);
      setReviewToDelete(null);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete customer review");
    }
  };

  const handleFormSuccess = () => {
    setEditingReview(null);
    refetch();
  };

  return (
    <div className="max-w-[1600px] w-full mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Customer Reviews</CardTitle>
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Add Customer Review
          </Button>
        </CardHeader>
        <CardContent>
          <ReusableTable
            data={tableData}
            headers={headers}
            isLoading={isLoading}
            enableSearch={true}
            searchPlaceholder="Search customer reviews..."
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      {/* Customer Review Form Dialog */}
      <CustomerReviewForm
        open={showDialog}
        onOpenChange={setShowDialog}
        editingReview={editingReview}
        onSuccess={handleFormSuccess}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setReviewToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        count={1}
        itemName="customer review"
        loading={isDeleting}
      />
    </div>
  );
}
