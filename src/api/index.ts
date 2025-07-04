// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createServer } from "vercel-json-server";
// 不能用 fs 读取，直接 require json
import db from "../../db.json";
import type { IncomingMessage, ServerResponse } from "http";

const server = createServer(db);

export default function handler(req: IncomingMessage, res: ServerResponse) {
  return server(req, res);
}
