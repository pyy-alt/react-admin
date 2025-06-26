import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { BookList } from "./pages/BookListUse";
import { BookCreate } from "./pages/BookCreate";
import { BookEdit } from "./pages/BookEdit";
import { Dashboard } from "./pages/Dashboard";
import { authProvider } from "./authProvider";
import { LoginPage } from "./pages/LoginPage";

// 连接 json-server
const dataProvider = jsonServerProvider("http://localhost:3001");

const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    dashboard={Dashboard}
    loginPage={LoginPage}
  >
    {({ permissions }: { permissions: string | null }) => {
      console.log("permissions", permissions);
      const effectivePermissions =
        permissions || localStorage.getItem("role") || null;
      return (
        <Resource
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
