import Image from "next/image";
import { SidebarHeader, SidebarMenu } from "../ui/sidebar";

export const Sidebar = () => {
  return (
    <SidebarMenu>
      <SidebarHeader>
        <Image
          src="/assets/images/logo.png"
          width={200}
          height={200}
          alt="logo"
        />
      </SidebarHeader>
    </SidebarMenu>
  );
};
