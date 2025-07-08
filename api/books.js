import fs from "fs";
import path from "path";

export default function handler(req, res) {
  console.log("API /books 被调用");
  console.log("请求方法:", req.method);
  console.log("查询参数:", req.query);
  
  try {
    const dbPath = path.join(process.cwd(), "db.json");
    console.log("数据库文件路径:", dbPath);
    console.log("当前工作目录:", process.cwd());

    if (!fs.existsSync(dbPath)) {
      console.error("db.json 文件不存在");
      return res.status(500).json({ error: "db.json not found", path: dbPath });
    }

    console.log("db.json 文件存在，开始读取");
    const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    let books = db.books || [];
    console.log("读取到", books.length, "本书");

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

    console.log("返回", books.length, "本书");
    res.status(200).json(books);
  } catch (error) {
    console.error("Error reading db.json:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
} 