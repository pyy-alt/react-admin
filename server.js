// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// 调整重写规则，仅处理列表请求
const rewriter = jsonServer.rewriter({
  "/api/*": "/$1", // 保持代理兼容
  // 移除 /:resource/:id 重写，详情由中间件处理
});

server.use(middlewares);
server.use(rewriter);
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  console.log(req.method, req.url, req.path);

  // 处理 /users 列表请求，设置 X-Total-Count
  if (req.method === "GET" && req.path === "/users") {
    // router.db.get("users") 获取整个 users 集合
    const usersWrapper = router.db.get("users");
    const usersData = usersWrapper.value(); // 获取实际的数据数组
    const total = Array.isArray(usersData) ? usersData.length : 0;
    res.setHeader("X-Total-Count", total.toString());
    console.log(`Set X-Total-Count for /users: ${total}`);
    // next() 会让请求继续到 router，router 会默认返回整个 usersData 数组，
    // 这正是 ra-data-json-server getList 期望的 { data: [...] } 格式（不带外层 total，total通过X-Total-Count头获取）
    next();
    return; // 确保在处理完后立即返回
  }

  // 处理 /users/:id 请求
  else if (req.method === "GET" && req.path.match(/^\/users\/\d+$/)) {
    console.log("Entered /users/:id custom handler");
    const id = req.path.split("/")[2]; // 直接从路径获取 ID
    const usersWrapper = router.db.get("users");
    const usersData = usersWrapper.value();
    console.log("usersData (full list for find):", JSON.stringify(usersData));
    const user = usersData.find((u) => u && u.id === parseInt(id));
    console.log("User found:", JSON.stringify(user));
    if (user) {
      console.log("User match found, sending user object directly.");
      res.json(user); // <-- **关键修改：直接返回 user 对象，不带 "data" 包裹**
    } else {
      console.log("User not found for ID:", id);
      res.status(404).json({ error: "User not found" });
    }
    return; // 确保在处理完后立即返回
  }

  // 处理 /dashboard/:id 请求
  else if (req.method === "GET" && req.path.startsWith("/dashboard")) {
    console.log("Entered /dashboard/:id custom handler");
    const id = req.path.split("/")[2];
    const dashboardWrapper = router.db.get("dashboard");
    const dashboardData = dashboardWrapper.value();
    // 假设 dashboard 是一个单例对象，且 id 总是 1
    if (dashboardData && dashboardData.id === parseInt(id)) {
      console.log("Dashboard match found, sending dashboard object directly.");
      res.json(dashboardData); // <-- **关键修改：直接返回 dashboardData 对象，不带 "data" 包裹**
    } else {
      console.log("Dashboard not found for ID:", id);
      res.status(404).json({ error: "Dashboard not found" });
    }
    return; // 确保在处理完后立即返回
  }

  // 其他请求，交给 json-server 的 router 默认处理
  next();
});

// 在自定义中间件处理完后，将剩余请求交给 router 处理
server.use(router);

server.listen(3001, () => {
  console.log("JSON Server is running on http://localhost:3001");
});