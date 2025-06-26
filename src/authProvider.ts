// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
  // 登录
  login: ({ username, password }: { username: string; password: string }) => {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("role", "admin");
      return Promise.resolve();
    } else if (username === "user" && password === "user") {
      localStorage.setItem("role", "user");
      return Promise.resolve();
    }
    return Promise.reject(new Error("用户名或密码错误"));
  },
  // 登出
  logout: () => {
    localStorage.removeItem("role");
    return Promise.resolve();
  },
  // 检查认证状态
  checkAuth: () => {
    return localStorage.getItem("role")
      ? Promise.resolve()
      : Promise.reject(new Error("未登录"));
  },
  // 检查错误（401/403）
  checkError: (error: { status: number }) => {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem("role");
      return Promise.reject(new Error("无权限"));
    }
    return Promise.resolve();
  },
  // 获取权限
  getPermissions: () => {
    const role = localStorage.getItem("role");
    console.log("Role from localStorage:", role); // 调试
    return Promise.resolve(role || null);
  },
};
