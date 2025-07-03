// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Button, Card, CardContent, Typography } from "@mui/material";
import { dataProvider } from "../dataProvider";
import { useState } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  publishedAt: string;
  category: string;
}
const TestApi = () => {
  const [data, setData] = useState<Book | Book[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetOne = async () => {
    setLoading(true);
    try {
      const result = await dataProvider.getOne("books", { id: 1 });
      console.log("单条数据:", result.data);
      setData(result.data);
    } catch (error) {
      console.error("获取数据失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetMany = async () => {
    setLoading(true);
    try {
      const result = await dataProvider.getMany("books", {
        ids: [1, 2, 3],
      });
      console.log("多条数据:", result.data);
      setData(result.data);
    } catch (error) {
      console.error("获取数据失败:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          API 测试页面
        </Typography>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <Button variant="contained" onClick={handleGetOne} disabled={loading}>
            {loading ? "加载中..." : "获取单条"}
          </Button>
          <Button
            variant="contained"
            onClick={handleGetMany}
            disabled={loading}
          >
            {loading ? "加载中..." : "获取多条"}
          </Button>
        </div>
        {data && (
          <div>
            <Typography variant="body1" gutterBottom>
              数据结果:
            </Typography>
            <pre
              style={{
                background: "#f5f5f5",
                padding: "10px",
                borderRadius: "4px",
              }}
            >
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestApi;
