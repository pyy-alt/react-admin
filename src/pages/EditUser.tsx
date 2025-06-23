// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Edit, NumberInput, SimpleForm, TextInput } from "react-admin";

export const EditUser = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="name" />
      <NumberInput source="age" />
      <TextInput source="address" />
    </SimpleForm>
  </Edit>
);
