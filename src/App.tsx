import { Admin, Resource } from "react-admin";
import { dataProvider } from "../dataProvider";
import { Dashboard } from "./pages/Dashboard";
import { UserList } from "./pages/UserList";
import { CustomLayout } from "./components/Layout";
import { UserShow } from "./pages/UserShow";
import { EditUser } from "./pages/EditUser";
import { CreateUser } from "./pages/CreateUser";

const App = () => (
  <Admin dataProvider={dataProvider} layout={CustomLayout}>
    <Resource
      name="users"
      list={UserList}
      show={UserShow}
      edit={EditUser}
      create={CreateUser}
    />
    <Resource name="dashboard" list={Dashboard} />
  </Admin>
);

export default App;
