"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ReusableTable from "@/components/table/reusable-table";
import DeleteConfirmModal from "@/components/modal/DeleteConfirmModal";
import HeroCarouselForm from "@/components/landing/landing-page-from/hero-carousel/HeroCarouselForm";
import { 
  useGetHeroCarouselsQuery, 
  useDeleteHeroCarouselMutation 
} from "@/api/landing/hero-carousel/heroCarouselApi";

export default function CarouselPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [editingHeroCarousel, setEditingHeroCarousel] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [heroCarouselToDelete, setHeroCarouselToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // API hooks
  const { data: heroCarouselsData, isLoading, refetch } = useGetHeroCarouselsQuery();
  const [deleteHeroCarousel, { isLoading: isDeleting }] = useDeleteHeroCarouselMutation();

  const heroCarousels = heroCarouselsData?.data || heroCarouselsData || [];

  // Table headers
  const headers = [
    { label: "Logo", field: "logoUrl" },
    { label: "Actions", field: "actions" },
  ];

  // Format data for table
  const tableData = heroCarousels.map((heroCarousel) => ({
    ...heroCarousel,
    logoUrl: heroCarousel.logoUrl ? (
      <div className="flex items-center justify-center p-2">
        <div className="relative group">
          <img 
            src={heroCarousel.logoUrl} 
            alt="Logo" 
            className="w-24 h-24 object-contain rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onError={(e) => {
              e.target.style.display = "none";
              const parent = e.target.parentElement;
              if (parent) {
                parent.innerHTML = '<span class="text-gray-400 text-sm">Failed to load</span>';
              }
            }}
            onClick={() => {
              window.open(heroCarousel.logoUrl, '_blank');
            }}
            title="Click to view full size"
          />
        </div>
      </div>
    ) : (
      <div className="flex items-center justify-center">
        <span className="text-gray-400 text-sm italic">No logo</span>
      </div>
    ),
    actions: (
      <div className="flex items-center gap-2 justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleEdit(heroCarousel)}
          title="Edit"
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-600 hover:text-red-700"
          onClick={() => handleDeleteClick(heroCarousel)}
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  }));

  const handleAdd = () => {
    setEditingHeroCarousel(null);
    setShowDialog(true);
  };

  const handleEdit = (heroCarousel) => {
    setEditingHeroCarousel(heroCarousel);
    setShowDialog(true);
  };

  const handleDeleteClick = (heroCarousel) => {
    setHeroCarouselToDelete(heroCarousel);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!heroCarouselToDelete) return;

    try {
      await deleteHeroCarousel(heroCarouselToDelete.id || heroCarouselToDelete._id).unwrap();
      toast.success("Hero carousel deleted successfully!");
      setShowDeleteModal(false);
      setHeroCarouselToDelete(null);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete hero carousel");
    }
  };

  const handleFormSuccess = () => {
    setEditingHeroCarousel(null);
    refetch();
  };

  return (
    <div className="max-w-[1600px] w-full mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Hero Carousel</CardTitle>
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Add Hero Carousel
          </Button>
        </CardHeader>
        <CardContent>
          <ReusableTable
            data={tableData}
            headers={headers}
            isLoading={isLoading}
            enableSearch={true}
            searchPlaceholder="Search hero carousels..."
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      {/* Hero Carousel Form Dialog */}
      <HeroCarouselForm
        open={showDialog}
        onOpenChange={setShowDialog}
        editingHeroCarousel={editingHeroCarousel}
        onSuccess={handleFormSuccess}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setHeroCarouselToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        count={1}
        itemName="hero carousel"
        loading={isDeleting}
      />
    </div>
  );
}
