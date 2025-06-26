import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { BookList } from "./pages/BookList";
import { BookCreate } from "./pages/BookCreate";
import { BookEdit } from "./pages/BookEdit";
import { Dashboard } from "./pages/Dashboard";

// 连接 json-server
const dataProvider = jsonServerProvider("http://localhost:3001");

const App = () => (
  <Admin dataProvider={dataProvider} dashboard={Dashboard}>
    <Resource
      name="books"
      list={BookList}
      create={BookCreate}
      edit={BookEdit}
    />
  </Admin>
);

export default App;
