// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Create, NumberInput, SimpleForm, TextInput } from "react-admin";

export const CreateUser = () => (
  <Create>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="name" />
      <NumberInput source="age" />
      <TextInput source="address" />
    </SimpleForm>
  </Create>
);
