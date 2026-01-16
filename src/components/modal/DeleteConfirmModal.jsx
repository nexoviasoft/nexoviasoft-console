import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  count = 1,
  itemName = "user",
  loading = false,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6 py-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600">
            <AlertTriangle className="w-10 h-10" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Are you sure?
          </h3>
          <p className="text-center text-gray-700 dark:text-gray-300">
            You are about to delete{" "}
            <span className="font-semibold text-red-600">
              {count} {itemName}
              {count > 1 ? "s" : ""}
            </span>
            . This action cannot be undone.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
