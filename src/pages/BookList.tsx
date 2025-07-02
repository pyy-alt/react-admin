// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { useMediaQuery, Theme } from "@mui/material";
import { List, Datagrid, TextField, DateField, SimpleList } from "react-admin";

export const BookList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  console.log(isSmall);
  return (
    <List>
      {isSmall ? (
        <SimpleList
          tertiaryText={(record) => record.category}
          primaryText={(record) => record.title}
          secondaryText={(record) => record.author}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="title" />
          <TextField source="author" />
          <DateField source="publishedAt" />
          <TextField source="category" />
        </Datagrid>
      )}
    </List>
  );
};
