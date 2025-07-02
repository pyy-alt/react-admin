import { List, Datagrid, TextField, DateField } from "react-admin";
import { Box } from "@mui/material";
import { usePermissions } from "react-admin";
import { TextInput } from "react-admin";

export const BookList = () => {
  const { permissions } = usePermissions();
  // console.log("BookList Permissions:", permissions);

  const columns = [
    ...(permissions === "admin" ? [<TextField source="id" key="id" />] : []),
    <TextField source="title" key="title" />,
    <TextField source="author" key="author" />,
    <DateField source="publishedAt" key="publishedAt" />,
    <TextField source="category" key="category" />,
  ];

  return (
    <List
      filters={[
        <TextInput label="Search" source="q" alwaysOn key="search-filter" />,
        <TextInput
          label="Title"
          source="title"
          defaultValue=""
          key="title-filter"
          placeholder="请输入标题"
        />,
      ]}
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
