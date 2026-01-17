import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Pause,
  Trash2,
} from "lucide-react";

const actionConfig = {
  activate: {
    icon: CheckCircle,
    iconColor: "text-green-600",
    iconBg: "bg-green-100 dark:bg-green-900/20",
    title: "Confirm Activation",
    buttonText: "Activate",
    buttonVariant: "default",
    loadingText: "Activating...",
  },
  deactivate: {
    icon: XCircle,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100 dark:bg-orange-900/20",
    title: "Confirm Deactivation",
    buttonText: "Deactivate",
    buttonVariant: "default",
    loadingText: "Deactivating...",
  },
  suspend: {
    icon: Pause,
    iconColor: "text-yellow-600",
    iconBg: "bg-yellow-100 dark:bg-yellow-900/20",
    title: "Confirm Suspension",
    buttonText: "Suspend",
    buttonVariant: "default",
    loadingText: "Suspending...",
  },
  delete: {
    icon: Trash2,
    iconColor: "text-red-600",
    iconBg: "bg-red-100 dark:bg-red-900/20",
    title: "Confirm Delete",
    buttonText: "Delete",
    buttonVariant: "destructive",
    loadingText: "Deleting...",
  },
};

export default function ConfirmActionModal({
  isOpen,
  onClose,
  onConfirm,
  action = "delete", // activate, deactivate, suspend, delete
  title,
  description,
  itemName = "item",
  loading = false,
}) {
  const config = actionConfig[action] || actionConfig.delete;
  const Icon = config.icon;

  const defaultTitle = title || config.title;
  const defaultDescription =
    description || `Are you sure you want to ${action} this ${itemName}?`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] glass-card border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white">{defaultTitle}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6 py-4">
          <div
            className={`flex items-center justify-center w-16 h-16 rounded-full border border-white/20 bg-black/50 ${config.iconColor}`}
          >
            <Icon className="w-10 h-10" />
          </div>
          <h3 className="text-lg font-semibold text-white">Are you sure?</h3>
          <p className="text-center text-white/70">{defaultDescription}</p>
        </div>
        <DialogFooter className="border-t border-white/10 pt-4 mt-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="border-white/30 text-black hover:bg-white/10 hover:text-white glass-button"
          >
            Cancel
          </Button>
          <Button
            variant={config.buttonVariant}
            onClick={onConfirm}
            disabled={loading}
            className={
              config.buttonVariant === "destructive"
                ? "bg-red-500 hover:bg-red-600 text-white glass-button"
                : "bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button"
            }
          >
            {loading ? config.loadingText : config.buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
