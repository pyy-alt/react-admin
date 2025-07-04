// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { fetchUtils } from "react-admin";
import DataProvider from "ra-data-json-server";

const httpClient = (url: string, options: RequestInit = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  return fetchUtils.fetchJson(url, options);
};

export const dataProvider = DataProvider("http://localhost:3001", httpClient);
