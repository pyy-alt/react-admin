// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { List, Datagrid, TextField, DateField } from "react-admin";

export const BookList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="author" />
      <DateField source="publishedAt" />
      <TextField source="category" />
    </Datagrid>
  </List>
);
