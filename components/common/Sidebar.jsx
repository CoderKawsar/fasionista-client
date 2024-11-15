import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  IoPricetagOutline,
  IoHomeOutline,
  IoSettingsOutline,
  IoBagHandleOutline,
} from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardSidebar = () => {
  const pathName = usePathname();

  // Menu items
  const items = [
    {
      title: "Home",
      url: "/admin",
      icon: <IoHomeOutline />,
      isActive: pathName === "/admin",
    },
    {
      title: "Category",
      url: "/admin/category",
      icon: <IoPricetagOutline />,
      isActive: pathName.startsWith("/admin/category"),
    },
    {
      title: "Product",
      url: "/admin/product",
      icon: <IoBagHandleOutline />,
      isActive: pathName.startsWith("/admin/product"),
    },
    {
      title: "Settings",
      url: "#",
      icon: <IoSettingsOutline />,
      isActive: pathName.startsWith("/admin/settings"),
    },
  ];
  return (
    <Sidebar
      collapsible="icon"
      variant="floating"
      className="top-[80px] bottom-[100px]"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl">Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <Link href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
