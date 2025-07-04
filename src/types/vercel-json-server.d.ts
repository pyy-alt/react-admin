declare module "vercel-json-server" {
  import { NextApiRequest, NextApiResponse } from "next";
  const createServer: (
    db: unknown,
  ) => (req: NextApiRequest, res: NextApiResponse) => unknown;
  export { createServer };
}
