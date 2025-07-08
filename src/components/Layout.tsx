// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { Layout, AppBarProps } from "react-admin";
import { CssBaseline } from "@mui/material";
import MyAppBar from "./MyAppBar";
import { ThemeOption } from "../types/myAppBar";
import { useMemo } from "react";

interface CustomLayoutProps {
  themeIndex: number;
  setThemeIndex: (index: number) => void;
  themeOptions: ThemeOption[];
  children: React.ReactNode;
}

export const CustomLayout = (props: CustomLayoutProps) => {
  // 使用 useMemo 缓存 MyAppBar 组件，避免每次重新渲染时重新创建
  const MyAppBarComponent = useMemo(() => {
    const AppBarComponent = (appBarProps: AppBarProps) => (
      <MyAppBar
        {...appBarProps}
        themeIndex={props.themeIndex}
        setThemeIndex={props.setThemeIndex}
        themeOptions={props.themeOptions}
      />
    );
    AppBarComponent.displayName = "MyAppBarComponent";
    return AppBarComponent;
  }, [props.themeIndex, props.setThemeIndex, props.themeOptions]);

  // 类型保护，确保 children 存在
  if (!props.children) return null;

  return (
    <>
      <CssBaseline />
      <div style={{ display: "flex", width: "100%" }}>
        <Layout appBar={MyAppBarComponent}>
          <div style={{ flexGrow: 1 }}>
            <main style={{ padding: 16 }}>{props.children}</main>
          </div>
        </Layout>
      </div>
    </>
  );
};
