"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  FileText,
  AlertTriangle,
  Star,
  UserPlus,
  PartyPopper,
  Rocket,
  Search,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";
import { 
  useGetEmailAlertsQuery, 
  useDeleteEmailAlertMutation,
  useCreateEmailAlertMutation 
} from "@/api/admin/email-alert/emailAlertApi";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Icon mapping
const iconMap = {
  Calendar,
  FileText,
  AlertTriangle,
  Star,
  UserPlus,
  PartyPopper,
  Rocket,
};

const ITEMS_PER_PAGE = 3;

const defaultTemplates = [
  {
    title: "Meeting Reminder",
    icon: "Calendar",
    category: "Scheduling",
    subject: "Reminder: Team Sync at [Time]",
    body: `Hi Team,

This is a friendly reminder about our upcoming meeting:

📅 Date: [Date]
⏰ Time: [Time]
📍 Location: [Meeting Room/Link]

Agenda:
- [Topic 1]
- [Topic 2]
- [Topic 3]

Please come prepared with your updates.

Best regards,
[Your Name]`,
  },
  {
    title: "Project Update",
    icon: "FileText",
    category: "Updates",
    subject: "Weekly Status Report - [Project Name]",
    body: `Hello Team,

Here's the weekly status update for [Project Name]:

✅ Completed This Week:
- [Task 1]
- [Task 2]

🚧 In Progress:
- [Task 3]
- [Task 4]

⚠️ Blockers:
- [Issue if any]

📊 Overall Progress: [X]%

Next week's focus: [Goals]

Thanks,
[Your Name]`,
  },
];

export default function TemplateList({ onSelectTemplate }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    body: "",
    category: "",
    icon: "FileText",
  });

  // API hooks
  const { data: alertsData, isLoading, refetch } = useGetEmailAlertsQuery();
  const [deleteEmailAlert, { isLoading: isDeleting }] = useDeleteEmailAlertMutation();
  const [createEmailAlert, { isLoading: isCreating }] = useCreateEmailAlertMutation();

  const templates = alertsData?.data || [];

  // Filter templates based on search
  const filteredTemplates = templates.filter(
    (template) =>
      template.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.subject?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTemplates = filteredTemplates.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleCreateTemplate = async () => {
    if (!formData.title || !formData.subject || !formData.body || !formData.category) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await createEmailAlert(formData).unwrap();
      toast.success("Template created successfully!");
      setShowCreateDialog(false);
      setFormData({ title: "", subject: "", body: "", category: "", icon: "FileText" });
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create template");
    }
  };

  const handleDeleteTemplate = async (id, e) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this template?")) {
      return;
    }

    try {
      await deleteEmailAlert(id).unwrap();
      toast.success("Template deleted successfully!");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete template");
    }
  };

  const getIconComponent = (iconName) => {
    return iconMap[iconName] || FileText;
  };

  return (
    <div className="space-y-4">
      {/* Header with Search */}
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-white">Email Templates</h3>
        <Button
          onClick={() => {
            setEditingTemplate(null);
            setFormData({ title: "", subject: "", body: "", category: "", icon: "FileText" });
            setShowCreateDialog(true);
          }}
          size="sm"
          className="bg-[#EFFC76] hover:bg-[#EFFC76]/80 text-black gap-2"
        >
          <Plus className="w-4 h-4" />
          New
        </Button>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <Input
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 glass-card border-white/20 text-white placeholder:text-white/40"
        />
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 gap-3">
        {isLoading ? (
          <div className="text-center py-12 glass-card rounded-xl">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#EFFC76] mb-2" />
            <p className="text-white/70">Loading templates...</p>
          </div>
        ) : paginatedTemplates.length > 0 ? (
          paginatedTemplates.map((template) => {
            const IconComponent = getIconComponent(template.icon);
            return (
              <Card
                key={template.id}
                className="glass-card cursor-pointer hover:shadow-lg hover:scale-[1.01] transition-all duration-200 border-l-4 border-l-[#EFFC76] group relative"
                onClick={() => onSelectTemplate(template)}
              >
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4">
                    <div className="flex w-full sm:w-auto justify-between items-start">
                      <div className="p-1.5 sm:p-3 bg-[#EFFC76]/15 rounded-lg sm:rounded-xl group-hover:bg-[#EFFC76]/25 transition-colors">
                        <IconComponent className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#EFFC76]" />
                      </div>
                      {/* Badge moved here for mobile to save vertical space */}
                      <Badge
                        variant="secondary"
                        className="sm:hidden text-[10px] bg-[#EFFC76]/10 text-[#EFFC76] border-[#EFFC76]/40 px-1.5 py-0 h-5"
                      >
                        {template.category}
                      </Badge>
                    </div>
                    
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                        <h4 className="font-semibold text-white group-hover:text-[#EFFC76] transition-colors text-xs sm:text-base truncate">
                          {template.title}
                        </h4>
                        {/* Badge shown normally on desktop */}
                        <Badge
                          variant="secondary"
                          className="hidden sm:inline-flex text-xs bg-[#EFFC76]/10 text-[#EFFC76] border-[#EFFC76]/40 w-fit"
                        >
                          {template.category}
                        </Badge>
                      </div>
                      <p className="text-[10px] sm:text-sm text-white/70 line-clamp-2 sm:line-clamp-1 leading-tight">
                        {template.subject}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleDeleteTemplate(template.id, e)}
                    disabled={isDeleting}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-500 hover:bg-red-500/10 p-1 h-6 w-6"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="text-center py-12 glass-card rounded-xl">
            <p className="text-white/70">
              {searchQuery ? `No templates found matching "${searchQuery}"` : "No templates found. Create your first template!"}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-white/70">
            Showing {startIndex + 1}-
            {Math.min(startIndex + ITEMS_PER_PAGE, filteredTemplates.length)} of{" "}
            {filteredTemplates.length}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="bg-[#EFFC76] hover:bg-[#EFFC76]/80 text-black border-none disabled:bg-[#EFFC76]/50 disabled:text-black/50"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium text-white px-3">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="bg-[#EFFC76] hover:bg-[#EFFC76]/80 text-black border-none disabled:bg-[#EFFC76]/50 disabled:text-black/50"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Create/Edit Template Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px] glass-panel border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingTemplate ? "Edit Template" : "Create New Template"}
            </DialogTitle>
            <DialogDescription className="text-white/70">
              {editingTemplate ? "Update your email template" : "Create a new email template for quick access"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-white/80">Title</Label>
              <Input 
                placeholder="Meeting Reminder"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/80">Category</Label>
                <Input 
                  placeholder="Scheduling"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white/80">Icon</Label>
                <Select value={formData.icon} onValueChange={(value) => setFormData({...formData, icon: value})}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Calendar">Calendar</SelectItem>
                    <SelectItem value="FileText">FileText</SelectItem>
                    <SelectItem value="AlertTriangle">AlertTriangle</SelectItem>
                    <SelectItem value="Star">Star</SelectItem>
                    <SelectItem value="UserPlus">UserPlus</SelectItem>
                    <SelectItem value="PartyPopper">PartyPopper</SelectItem>
                    <SelectItem value="Rocket">Rocket</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white/80">Subject</Label>
              <Input 
                placeholder="Reminder: Team Sync at [Time]"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/80">Body</Label>
              <Textarea 
                placeholder="Email body..."
                value={formData.body}
                onChange={(e) => setFormData({...formData, body: e.target.value})}
                rows={10}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 font-mono text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateDialog(false);
                setFormData({ title: "", subject: "", body: "", category: "", icon: "FileText" });
              }}
              className="border-white/10 text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateTemplate}
              disabled={isCreating}
              className="bg-[#EFFC76] hover:bg-[#EFFC76]/80 text-black"
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                "Create Template"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
