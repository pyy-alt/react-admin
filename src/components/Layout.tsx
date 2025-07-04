// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { Layout } from "react-admin";
import { CssBaseline } from "@mui/material";
import MyAppBar from "./MyAppBar";
import { MyAppBarProps } from "./MyAppBar";
import { ThemeOption } from "../types/myAppBar";

interface CustomLayoutProps extends MyAppBarProps {
  themeIndex: number;
  setThemeIndex: (index: number) => void;
  themeOptions: ThemeOption[];
}

const AppBarWithProps = (props: MyAppBarProps) => {
  return (
    <MyAppBar
      {...props}
      themeIndex={props.themeIndex}
      setThemeIndex={props.setThemeIndex}
      themeOptions={props.themeOptions}
    />
  );
};
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
