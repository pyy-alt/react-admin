// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Card, CardContent, Typography } from "@mui/material";
import * as echarts from "echarts";
import { useEffect, useRef, useState } from "react";
import { useDataProvider } from "react-admin";
import TestApi from "./TestApi";

// 定义 ECharts 数据类型
interface CategoryData {
  name: string;
  value: number;
}

// 定义状态类型
interface Stats {
  total: number;
  categories: CategoryData[];
}

export const Dashboard = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null); // 存储图表实例
  const dataProvider = useDataProvider();
  const [stats, setStats] = useState<Stats>({ total: 0, categories: [] });

  // 获取图书数据
  useEffect(() => {
    dataProvider
      .getList("books", {
        pagination: { page: 1, perPage: 100 },
        sort: { field: "id", order: "ASC" },
        filter: {},
      })
      .then(({ data }: { data: { id: number; category: string }[] }) => {
        // 计算总数和类别分布
        const total = data.length;
        const categoryCounts = data.reduce(
          (acc: { [key: string]: number }, book) => {
            acc[book.category] = (acc[book.category] || 0) + 1;
            return acc;
          },
          {},
        );
        const categories = Object.entries(categoryCounts).map(
          ([name, value]) => ({
            name,
            value: value as number,
          }),
        );
        setStats({ total, categories });
      })
      .catch((error: unknown) => {
        console.error("获取图书数据失败:", error);
      });
  }, [dataProvider]);

  // 渲染 ECharts 饼图并处理自适应
  useEffect(() => {
    if (!chartRef.current || stats.categories.length === 0) return;

    // 初始化图表
    chartInstance.current = echarts.init(chartRef.current);
    chartInstance.current.setOption({
      title: { text: "图书类别分布", left: "center", top: 20 },
      tooltip: { trigger: "item" },
      series: [
        {
          name: "类别",
          type: "pie",
          radius: "50%",
          data: stats.categories,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });

    // 监听窗口 resize 事件
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };
    window.addEventListener("resize", handleResize);

    // 清理
    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
    };
  }, [stats.categories]);

  return (
    <div style={{ padding: 16 }}>
      <Card style={{ marginBottom: 16 }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            图书总数：{stats.total}
          </Typography>
          <div ref={chartRef} style={{ width: "100%", height: 300 }} />
        </CardContent>
      </Card>
      <TestApi />
    </div>
  );
};
