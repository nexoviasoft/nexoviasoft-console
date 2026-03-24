"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, MoreVertical, CheckCircle, XCircle, Pause, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ReusableTable from "@/components/table/reusable-table";
import ConfirmActionModal from "@/components/modal/ConfirmActionModal";
import OurTeamForm from "@/components/admin/froms/our-team/OurTeamForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  useGetOurTeamQuery, 
  useDeleteOurTeamMutation,
  useActivateOurTeamMutation,
  useDeactivateOurTeamMutation,
  useSuspendOurTeamMutation,
} from "@/api/admin/our-team/ourTeamApi";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";

export default function OurTeamPage() {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [editingTeamMember, setEditingTeamMember] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); // 'activate', 'deactivate', 'suspend', 'delete'
  const [teamMemberForAction, setTeamMemberForAction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // API hooks
  const { data: teamData, isLoading, refetch } = useGetOurTeamQuery();
  const [deleteOurTeam, { isLoading: isDeleting }] = useDeleteOurTeamMutation();
  const [activateOurTeam, { isLoading: isActivating }] = useActivateOurTeamMutation();
  const [deactivateOurTeam, { isLoading: isDeactivating }] = useDeactivateOurTeamMutation();
  const [suspendOurTeam, { isLoading: isSuspending }] = useSuspendOurTeamMutation();

  const teamMembers = teamData?.data || teamData || [];

  // Table headers
  const headers = [
    { label: "Employee ID", field: "employeeId" },
    { label: "Name", field: "fullName" },
    { label: "Email", field: "email" },
    { label: "Position", field: "position" },
    { label: "Role", field: "role" },
    { label: "Status", field: "status" },
    { label: "Actions", field: "actions" },
  ];

  // Format data for table
  const tableData = teamMembers.map((member) => ({
    ...member,
    fullName: `${member.firstName || ""} ${member.lastName || ""}`.trim(),
    actions: (
      <div className="flex items-center gap-2 justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => router.push(`/admin/our-team/${member.id || member._id}`)}
          title="View Details"
        >
          <Eye className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleEdit(member)}
          title="Edit"
        >
          <Edit className="w-4 h-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={isActivating || isDeactivating || isSuspending}
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {member.status !== "active" && (
              <DropdownMenuItem
                onClick={() => handleActionClick(member, "activate")}
                disabled={isActivating}
              >
                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                Activate
              </DropdownMenuItem>
            )}
            {member.status !== "inactive" && (
              <DropdownMenuItem
                onClick={() => handleActionClick(member, "deactivate")}
                disabled={isDeactivating}
              >
                <XCircle className="w-4 h-4 mr-2 text-orange-600" />
                Deactivate
              </DropdownMenuItem>
            )}
            {member.status !== "on-leave" && (
              <DropdownMenuItem
                onClick={() => handleActionClick(member, "suspend")}
                disabled={isSuspending}
              >
                <Pause className="w-4 h-4 mr-2 text-yellow-600" />
                Suspend
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={() => handleActionClick(member, "delete")}
              className="text-red-600 focus:text-red-600"
              disabled={isDeleting}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  }));

  const handleAdd = () => {
    setEditingTeamMember(null);
    setShowDialog(true);
  };

  const handleEdit = (member) => {
    setEditingTeamMember(member);
    setShowDialog(true);
  };

  const handleActionClick = (member, action) => {
    setTeamMemberForAction(member);
    setConfirmAction(action);
    setShowConfirmModal(true);
  };

  const handleConfirmAction = async () => {
    if (!teamMemberForAction || !confirmAction) return;

    const member = teamMemberForAction;
    const memberId = member.id || member._id;
    const memberName = `${member.firstName || ""} ${member.lastName || ""}`.trim();
    const actionMessages = {
      activate: { loading: "Activating team member...", success: `Team member "${memberName}" activated successfully!`, error: "Failed to activate team member" },
      deactivate: { loading: "Deactivating team member...", success: `Team member "${memberName}" deactivated successfully!`, error: "Failed to deactivate team member" },
      suspend: { loading: "Suspending team member...", success: `Team member "${memberName}" suspended successfully!`, error: "Failed to suspend team member" },
      delete: { loading: "Deleting team member...", success: `Team member "${memberName}" deleted successfully!`, error: "Failed to delete team member" },
    };

    const messages = actionMessages[confirmAction];
    const toastId = toast.loading(messages.loading);

    try {
      let result;
      switch (confirmAction) {
        case "activate":
          result = await activateOurTeam(memberId).unwrap();
          break;
        case "deactivate":
          result = await deactivateOurTeam(memberId).unwrap();
          break;
        case "suspend":
          result = await suspendOurTeam(memberId).unwrap();
          break;
        case "delete":
          result = await deleteOurTeam(memberId).unwrap();
          break;
        default:
          throw new Error("Invalid action");
      }
      
      toast.success(messages.success, { id: toastId });
      setShowConfirmModal(false);
      setTeamMemberForAction(null);
      setConfirmAction(null);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || messages.error, { id: toastId });
    }
  };

  const getActionDescription = () => {
    if (!teamMemberForAction || !confirmAction) return "";
    
    const memberName = `${teamMemberForAction.firstName || ""} ${teamMemberForAction.lastName || ""}`.trim();
    const descriptions = {
      activate: `Are you sure you want to activate "${memberName}"? This will change their status to active.`,
      deactivate: `Are you sure you want to deactivate "${memberName}"? This will change their status to inactive.`,
      suspend: `Are you sure you want to suspend "${memberName}"? This will change their status to on-leave.`,
      delete: `Are you sure you want to delete "${memberName}"? This action cannot be undone.`,
    };
    return descriptions[confirmAction] || "";
  };

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="max-w-[1600px] w-full mx-auto">
      <Card className="glass-card border-white/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Our Team</CardTitle>
          <Button
            onClick={handleAdd}
            className="bg-[#F58220] hover:bg-[#d91d79] text-black glass-button"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Team Member
          </Button>
        </CardHeader>
        <CardContent>
          <ReusableTable
            data={tableData}
            headers={headers}
            isLoading={isLoading}
            enableSearch={true}
            searchPlaceholder="Search team members..."
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      {/* Our Team Form Dialog */}
      <OurTeamForm
        open={showDialog}
        onOpenChange={setShowDialog}
        editingTeamMember={editingTeamMember}
        onSuccess={() => {
          const isEdit = !!editingTeamMember;
          toast.success(isEdit ? "Team member updated successfully!" : "Team member created successfully!");
          setEditingTeamMember(null);
          refetch();
        }}
      />

      {/* Confirmation Modal */}
      <ConfirmActionModal
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          setTeamMemberForAction(null);
          setConfirmAction(null);
        }}
        onConfirm={handleConfirmAction}
        action={confirmAction || "delete"}
        description={getActionDescription()}
        itemName="team member"
        loading={isActivating || isDeactivating || isSuspending || isDeleting}
      />
    </div>
    </AppLayout>
    </PrivateRoute>
  );
}
