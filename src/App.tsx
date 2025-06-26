import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { BookList } from "./pages/BookList";

// 连接 json-server
const dataProvider = jsonServerProvider("http://localhost:3001");

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="books" list={BookList} />
  </Admin>
);

export default App;
