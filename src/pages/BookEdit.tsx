// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  SelectInput,
  required,
} from "react-admin";

export const BookEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" validate={required()} />
      <TextInput source="author" validate={required()} />
      <DateInput source="publishedAt" />
      <SelectInput
        source="category"
        choices={[
          { id: "Fiction", name: "Fiction" },
          { id: "Non-Fiction", name: "Non-Fiction" },
          { id: "Science", name: "Science" },
          { id: "ceshi", name: "测试" },

        ]}
        validate={required()}
      />
    </SimpleForm>
  </Edit>
);
