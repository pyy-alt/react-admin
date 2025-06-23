// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { Drawer } from "@mui/material";
import { SidebarClasses, useLocale, useSidebarState } from "react-admin";

export const MySidebar = ({ children }: any) => {
  const [open, setOpen] = useSidebarState();
  useLocale(); // force redraw on locale change

  const toggleSidebar = () => setOpen(!open);

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={toggleSidebar}
      classes={SidebarClasses}
    >
      {children}
    </Drawer>
  );
};
