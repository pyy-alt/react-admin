import { List, Datagrid, TextField, DateField } from "react-admin";
import { Button, Box } from "@mui/material";
import { usePermissions } from "react-admin";
import { useNavigate } from "react-router";

export const BookList = () => {
  const { permissions } = usePermissions();
  console.log("BookList Permissions:", permissions);
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/books/create");
    console.log("Navigate to create page");
  };

  const columns = [
    ...(permissions === "admin" ? [<TextField source="id" key="id" />] : []),
    <TextField source="title" key="title" />,
    <TextField source="author" key="author" />,
    <DateField source="publishedAt" key="publishedAt" />,
    <TextField source="category" key="category" />,
  ];

  return (
    <List
      sx={{
        "& .RaList-content": {
          paddingTop: "20px", // 确保顶部内边距
          paddingBottom: "20px", // 底部内边距
        },
      }}
    >
      {permissions === "admin" ? <Box /> : ""}
      <Datagrid rowClick={permissions === "admin" ? "edit" : undefined}>
        {columns}
      </Datagrid>
    </List>
  );
};
