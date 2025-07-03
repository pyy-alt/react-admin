import {
  List,
  Datagrid,
  TextField,
  DateField,
  useTranslate,
} from "react-admin";
import { Box } from "@mui/material";
import { usePermissions } from "react-admin";
import { TextInput } from "react-admin";

export const BookList = () => {
  const { permissions } = usePermissions();
  const translate = useTranslate();

  const columns = [
    ...(permissions === "admin"
      ? [<TextField source="id" key="id" label="ID" />]
      : []),
    <TextField source="title" key="title" label={translate("custom.title")} />,
    <TextField
      source="author"
      key="author"
      label={translate("custom.author")}
    />,
    <DateField
      source="publishedAt"
      key="publishedAt"
      label={translate("custom.publishedAt")}
    />,
  ];

  return (
    <List
      filters={[
        <TextInput
          label={translate("custom.books")}
          source="q"
          alwaysOn
          key="search-filter"
        />,
        <TextInput
          label={translate("custom.books")}
          source="title"
          defaultValue=""
          key="title-filter"
          placeholder={translate("custom.books")}
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
