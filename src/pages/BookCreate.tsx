// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  SelectInput,
  required,
} from "react-admin";

export const BookCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" validate={required()} />
      <TextInput source="author" validate={required()} />
      <DateInput source="publishedAt" />
      <SelectInput
        source="category"
        choices={[
          { id: "Fiction", name: "小说" },
          { id: "Non-Fiction", name: "非小说" },
          { id: "Science", name: "科学" },
        ]}
        validate={required()}
        label="类别"
      />
    </SimpleForm>
  </Create>
);
