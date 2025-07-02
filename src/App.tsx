import { Admin, Resource } from "react-admin";
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

// 连接 json-server
const dataProvider = jsonServerProvider("http://localhost:3001");

const App = () => (
  //React-Admin 根组件
  <Admin
    layout={CustomLayout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    dashboard={Dashboard}
    loginPage={LoginPage}
  >
    {({ permissions }: { permissions: string | null }) => {
      // console.log("permissions", permissions);
      const effectivePermissions =
        permissions || localStorage.getItem("role") || null;
      return (
        <Resource
          icon={Bookmarks}
          options={{ label: "图书" }}
          name="books"
          list={BookList}
          create={effectivePermissions === "admin" ? BookCreate : undefined}
          edit={effectivePermissions === "admin" ? BookEdit : undefined}
        />
      );
    }}
  </Admin>
);

export default App;
