// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { useDataProvider } from "react-admin";
import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";

export const Dashboard = () => {
  const dataProvider = useDataProvider();
  const [data, setData] = useState({
    userCount: 0,
    orderCount: 0,
    salesData: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching dashboard data");
    let mounted = true;
    setIsLoading(true); // 开始加载
    const fetchData = async () => {
      try {
        const { data: responseData } = await dataProvider.getOne("dashboard", {
          id: "1",
        });
        if (mounted) setData(responseData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    fetchData();
    return () => {
      mounted = false;
    }; // 清理
  }, []); // 空依赖数组

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5">仪表盘</Typography>
          <Typography>用户数量: {data.userCount}</Typography>
          <Typography>订单数量: {data.orderCount}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};
