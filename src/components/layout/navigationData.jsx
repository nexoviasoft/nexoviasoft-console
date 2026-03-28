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
  User,
  ShoppingCart,
  Briefcase,
  Tag,
  Package,
  LayoutGrid,
  Sparkles,
  Star,
  Wrench,
  Wallet,
} from "lucide-react";

export const mainNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "Dashboard", href: "/" },
  { icon: Clock, label: "Attendance", id: "Attendance", href: "/admin/attendance" },
  { icon: Calendar, label: "Schedule", id: "Schedule", href: "/admin/schedule" },
  { icon: Folder, label: "Projects", id: "Projects", href: "/admin/projects" },
  { icon: ShoppingCart, label: "Orders", id: "Orders", href: "/admin/orders" },
  { icon: Users, label: "Employee Directory", id: "Employee Directory", href: "/admin/employees" },
  { icon: FileText, label: "Leave Management", id: "Leave Management", href: "/admin/leave" },
  { icon: ScrollText, label: "Documents", id: "Documents", href: "/admin/documents" },
  { icon: Mail, label: "Email Alerts", id: "Email Alerts", href: "/admin/email-alerts" },
  { icon: UserCheck, label: "Recruitment", id: "Recruitment", href: "/admin/recruitment" },
  { icon: DollarSign, label: "Payroll", id: "Payroll", href: "/admin/payroll" },
  { icon: BarChart3, label: "Reports", id: "Reports", href: "/admin/reports" },
  { icon: Radio, label: "Broadcast", id: "Broadcast", href: "/admin/broadcast" },
  { icon: Briefcase, label: "Our Clients", id: "Our Clients", href: "/admin/our-client" },
  { icon: Wrench, label: "Service Requests", id: "Service Requests", href: "/admin/service-request" },
  { icon: Wallet, label: "Expense Management", id: "Expense Management", href: "/admin/expense" },
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
          { icon: FileText, label: "Case Studies", id: "Case Studies", href: "/landing/case-studies" },
          { icon: DollarSign, label: "Price Packages", id: "Price Packages", href: "/landing/price-package" },
          { icon: Star, label: "Customer Reviews", id: "Customer Reviews", href: "/landing/customer-review" },
        ]
      },
      { icon: LayoutGrid, label: "Departments", id: "Departments", href: "/landing/departmant" },
      { icon: Tag, label: "Categories", id: "Categories", href: "/landing/category" },
      { icon: Sparkles, label: "Our Services", id: "Our Services", href: "/landing/our-service" },
      { icon: Package, label: "Products", id: "Products", href: "/landing/our-product" },

      { 
        icon: Package, 
        label: "Our Products", 
        id: "Our Products", 
        href: "/admin/platform-settings/our-product",
        children: [
          { icon: Package, label: "NexoviaSoft", id: "NexoviaSoft", href: "/admin/platform-settings/our-product/nexoviasoft" },
        ]
      },
      { icon: Layout, label: "Footer", id: "Footer", href: "/landing/footer" },
   
    ]
  },
  { icon: UserCog, label: "Our Team", id: "Our Team", href: "/admin/our-team" },
  { icon: HelpCircle, label: "Help Center", id: "Help Center", href: "/admin/help-center" },
];
