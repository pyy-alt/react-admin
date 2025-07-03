import { Admin, Resource, useTranslate } from "react-admin";
import { Bookmarks } from "@mui/icons-material";
// 连接 json-server 的 API，自动处理 CRUD 请求。
import jsonServerProvider from "ra-data-json-server";
import { BookList } from "./pages/BookListUse";
import { BookCreate } from "./pages/BookCreate";
import { BookEdit } from "./pages/BookEdit";
import { Dashboard } from "./pages/Dashboard";
import { authProvider } from "./authProvider";
import { LoginPage } from "./pages/LoginPage";
import { CustomLayout } from "./components/Layout";
import { i18nProvider } from "./i18n";
// 连接 json-server
const dataProvider = jsonServerProvider("http://localhost:3001");

const App = () => {
  const translate = useTranslate();

  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={LoginPage}
      layout={CustomLayout}
      i18nProvider={i18nProvider}
    >
      {({ permissions }: { permissions: string | null }) => {
        const effectivePermissions =
          permissions || localStorage.getItem("role") || null;

        return (
          <>
            {/* 只有 admin 用户才显示仪表盘 Resource */}
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
              create={effectivePermissions === "admin" ? BookCreate : undefined}
              edit={effectivePermissions === "admin" ? BookEdit : undefined}
            />
          </>
        );
      }}
    </Admin>
  );
};

export default App;
