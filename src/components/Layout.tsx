// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { Layout, LayoutProps } from "react-admin";
import { AppBar, Toolbar, Typography, CssBaseline } from "@mui/material";
export const CustomLayout = (props: LayoutProps) => {
  // 类型保护，确保 children 存在
  if (!props.children) return null;

  return (
    <>
      <CssBaseline />
      <div style={{ display: "flex", width: "100%" }}>
        <Layout>
          <div style={{ flexGrow: 1 }}>
            <AppBar position="static" color="primary">
              <Toolbar>
                <Typography variant="h6" style={{ color: "white" }}>
                  后台管理系统
                </Typography>
              </Toolbar>
            </AppBar>
            <main style={{ padding: 16 }}>{props.children}</main>
          </div>
        </Layout>
      </div>
    </>
  );
};
