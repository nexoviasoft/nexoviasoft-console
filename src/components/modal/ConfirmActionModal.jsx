import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, XCircle, Pause, Trash2 } from "lucide-react";

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
  const defaultDescription = description || `Are you sure you want to ${action} this ${itemName}?`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{defaultTitle}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6 py-4">
          <div className={`flex items-center justify-center w-16 h-16 rounded-full ${config.iconBg} ${config.iconColor}`}>
            <Icon className="w-10 h-10" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Are you sure?
          </h3>
          <p className="text-center text-gray-700 dark:text-gray-300">
            {defaultDescription}
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant={config.buttonVariant}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? config.loadingText : config.buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
