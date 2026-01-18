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
      <DialogContent className="sm:max-w-[500px] glass-card border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white">Confirm Delete</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6 py-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full border border-white/20 bg-black/50 text-red-500">
            <AlertTriangle className="w-10 h-10" />
          </div>
          <h3 className="text-lg font-semibold text-white">
            Are you sure?
          </h3>
          <p className="text-center text-white/70">
            You are about to delete{" "}
            <span className="font-semibold text-red-500">
              {count} {itemName}
              {count > 1 ? "s" : ""}
            </span>
            . This action cannot be undone.
          </p>
        </div>
        <DialogFooter className="border-t border-white/10 pt-4 mt-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white glass-button"
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
