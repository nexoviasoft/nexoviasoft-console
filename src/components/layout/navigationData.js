import {
  LayoutDashboard,
  Clock,
  Calendar,
  Users,
  Folder,
  FileText,
  DollarSign,
  BarChart3,
  Radio,
  Settings,
  UserCog,
  HelpCircle,
  ScrollText,
  Mail,
  UserCheck,
  Layout,
  Image,
  FileCheck,
} from "lucide-react";

export const mainNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "Dashboard", href: "/" },
  { icon: Clock, label: "Attendance", id: "Attendance", href: "/admin/attendance" },
  { icon: Calendar, label: "Schedule", id: "Schedule", href: "/admin/schedule" },
  { icon: Folder, label: "Projects", id: "Projects", href: "/admin/projects" },
  { icon: Users, label: "Employee Directory", id: "Employee Directory", href: "/admin/employees" },
  { icon: FileText, label: "Leave Management", id: "Leave Management", href: "/admin/leave" },
  { icon: ScrollText, label: "Documents", id: "Documents", href: "/admin/documents" },
  { icon: Mail, label: "Email Alerts", id: "Email Alerts", href: "/admin/email-alerts" },
  { icon: UserCheck, label: "Recruitment", id: "Recruitment", href: "/admin/recruitment" },
  { icon: DollarSign, label: "Payroll", id: "Payroll", href: "/admin/payroll" },
  { icon: BarChart3, label: "Reports", id: "Reports", href: "/admin/reports" },
  { icon: Radio, label: "Broadcast", id: "Broadcast", href: "/admin/broadcast" },
  { icon: Settings, label: "Settings", id: "Settings", href: "/admin/settings" },
];

export const othersNavItems = [
  { 
    icon: Settings, 
    label: "Settings", 
    id: "Settings", 
    href: "/admin/platform-settings",
    children: [
      { 
        icon: Layout, 
        label: "Home", 
        id: "Home", 
        href: "/admin/platform-settings/home",
        children: [
          { icon: Image, label: "Carousel", id: "Carousel", href: "/landing/carousel" },
          { icon: FileCheck, label: "Case Studies", id: "Case Studies", href: "/landing/case-studies" },
          { icon: DollarSign, label: "Price Packages", id: "Price Packages", href: "/landing/price-package" },
        ]
      },
      { icon: Image, label: "Departments", id: "Departments", href: "/landing/departmant" },
      // { icon: FileCheck, label: "Positions", id: "Positions", href: "/platform-settings/positions" },
      // { icon: FileCheck, label: "Roles", id: "Roles", href: "/platform-settings/roles" },
      // { icon: FileCheck, label: "Permissions", id: "Permissions", href: "/platform-settings/permissions" },
      // { icon: FileCheck, label: "Users", id: "Users", href: "/platform-settings/users" },
      // { icon: FileCheck, label: "Groups", id: "Groups", href: "/platform-settings/groups" },
      // { icon: FileCheck, label: "Tags", id: "Tags", href: "/platform-settings/tags" },
      { icon: FileCheck, label: "Categories", id: "Categories", href: "/landing/category" },
      // { icon: FileCheck, label: "Tags", id: "Tags", href: "/platform-settings/tags" },
    ]
  },
  { icon: UserCog, label: "User Management", id: "User Management", href: "/admin/user-management" },
  { icon: HelpCircle, label: "Help Center", id: "Help Center", href: "/admin/help-center" },
];
