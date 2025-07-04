import {
  Admin,
  Resource,
  useTranslate,
  bwLightTheme,
  bwDarkTheme,
  nanoLightTheme,
  nanoDarkTheme,
  radiantLightTheme,
  radiantDarkTheme,
  houseLightTheme,
  houseDarkTheme,
  defaultDarkTheme,
  defaultLightTheme,
} from "react-admin";
import { Bookmarks } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";
import jsonServerProvider from "ra-data-json-server";
import { BookList } from "./pages/BookListUse";
import { BookCreate } from "./pages/BookCreate";
import { BookEdit } from "./pages/BookEdit";
import { Dashboard } from "./pages/Dashboard";
import { authProvider } from "./authProvider";
import { LoginPage } from "./pages/LoginPage";
import { CustomLayout } from "./components/Layout";
import { i18nProvider } from "./i18n";
import { useState, useEffect } from "react";
import { ThemeOption } from "./types/myAppBar";
const themeOptions: ThemeOption[] = [
  { name: "Black", light: bwLightTheme, dark: bwDarkTheme, key: "black" },
  { name: "Nano", light: nanoLightTheme, dark: nanoDarkTheme, key: "nano" },
  {
    name: "Radiant",
    light: radiantLightTheme,
    dark: radiantDarkTheme,
    key: "radiant",
  },
  { name: "House", light: houseLightTheme, dark: houseDarkTheme, key: "house" },
  {
    name: "Default",
    light: defaultLightTheme,
    dark: defaultDarkTheme,
    key: "default",
  },
];
const themeMap = [
  { light: bwLightTheme, dark: bwDarkTheme },
  { light: nanoLightTheme, dark: nanoDarkTheme },
  { light: radiantLightTheme, dark: radiantDarkTheme },
  { light: houseLightTheme, dark: houseDarkTheme },
  { light: defaultLightTheme, dark: defaultDarkTheme },
];

const dataProvider = jsonServerProvider("http://localhost:3001");

const App = () => {
  const translate = useTranslate();
  const [themeIndex, setThemeIndex] = useState(() => {
    const savedTheme = localStorage.getItem("themeIndex");
    const index = savedTheme !== null ? parseInt(savedTheme, 10) : 0;
    return Math.min(Math.max(index, 0), themeOptions.length - 1);
  });
  const [isDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("isDarkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("themeIndex", themeIndex.toString());
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [themeIndex, isDarkMode]);

  const currentTheme = isDarkMode
    ? themeOptions[themeIndex]?.dark || themeOptions[0].dark
    : themeOptions[themeIndex]?.light || themeOptions[0].light;

  // console.log("当前主题：", currentTheme, themeIndex, isDarkMode);
  return (
    <ThemeProvider theme={currentTheme}>
      <Admin
        theme={themeMap[themeIndex].light}
        darkTheme={themeMap[themeIndex].dark}
        // 主题切换end
        dataProvider={dataProvider}
        authProvider={authProvider}
        loginPage={LoginPage}
        layout={(props) => (
          <CustomLayout
            {...props}
            themeIndex={themeIndex}
            setThemeIndex={setThemeIndex}
            themeOptions={themeOptions}
          />
        )}
        i18nProvider={i18nProvider}
      >
        {(params) => {
          if (!params) return null; // 防止首次为 null 报错
          const { permissions } = params;
          const effectivePermissions =
            permissions || localStorage.getItem("role") || null;

          return (
            <>
              {effectivePermissions === "admin" && (
                <Resource
                  name="dashboard"
                  list={Dashboard}
                  options={{ label: translate("custom.dashboard") }}
                />
              )}

              <Resource
                icon={Bookmarks}
                options={{ label: translate("custom.books") }}
                name="books"
                list={BookList}
                create={
                  effectivePermissions === "admin" ? BookCreate : undefined
                }
                edit={effectivePermissions === "admin" ? BookEdit : undefined}
              />
            </>
          );
        }}
      </Admin>
    </ThemeProvider>
  );
};

export default App;
