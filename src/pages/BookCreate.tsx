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
          { id: "Fiction", name: "Fiction" },
          { id: "Non-Fiction", name: "Non-Fiction" },
          { id: "Science", name: "Science" },
        ]}
        validate={required()}
      />
    </SimpleForm>
  </Create>
);
