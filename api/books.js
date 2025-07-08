import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const dbPath = path.join(process.cwd(), "db.json");

    if (!fs.existsSync(dbPath)) {
      return res.status(500).json({ error: "db.json not found" });
    }

    const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    let books = db.books || [];

    // 支持 react-admin 的查询参数
    const { _start, _end, _sort, _order } = req.query;

    // 处理排序
    if (_sort && _order) {
      books = books.sort((a, b) => {
        const aValue = a[_sort];
        const bValue = b[_sort];

        if (_order === "ASC") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    // 处理分页
    if (_start !== undefined && _end !== undefined) {
      const start = parseInt(_start);
      const end = parseInt(_end);
      books = books.slice(start, end);
    }

    // 设置响应头，支持 react-admin 的分页信息
    const totalCount = db.books ? db.books.length : 0;
    res.setHeader("X-Total-Count", totalCount);
    res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");

    res.status(200).json(books);
  } catch (error) {
    console.error("Error reading db.json:", error);
    res.status(500).json({ error: "Internal server error" });
  }
} 