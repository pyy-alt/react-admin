// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React from "react";
import { Layout, LayoutProps } from "react-admin";
import { CssBaseline } from "@mui/material";
import MyAppBar from "./MyAppBar";

interface ThemeOption {
  name: string;
  light: object;
  dark: object;
}

interface CustomLayoutProps extends LayoutProps {
  themeIndex: number;
  setThemeIndex: (index: number) => void;
  isDarkMode: boolean;
  setIsDarkMode: (v: boolean) => void;
  themeOptions: ThemeOption[];
}

const AppBarWithProps = React.forwardRef<any, any>((props, ref) => (
  <MyAppBar
    {...props}
    ref={ref}
    themeIndex={props.themeIndex}
    setThemeIndex={props.setThemeIndex}
    themeOptions={props.themeOptions}
  />
));
AppBarWithProps.displayName = "AppBarWithProps";

export const CustomLayout = (props: CustomLayoutProps) => {
  // 类型保护，确保 children 存在
  if (!props.children) return null;
  // 包装 appBar 以传递自定义 props

  return (
    <>
      <CssBaseline />
      <div style={{ display: "flex", width: "100%" }}>
        <Layout
          appBar={(appBarProps) => (
            <AppBarWithProps
              {...appBarProps}
              themeIndex={props.themeIndex}
              setThemeIndex={props.setThemeIndex}
              themeOptions={props.themeOptions}
            />
          )}
        >
          <div style={{ flexGrow: 1 }}>
            <main style={{ padding: 16 }}>{props.children}</main>
          </div>
        </Layout>
      </div>
    </>
  );
};
