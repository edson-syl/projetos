import React, { useEffect, useState, useCallback } from "react";
import { getSales } from "../services/api";
import { groupSalesByMonth } from "../../utils/salesbyMonth";

import SalesQuantityChart from "../charts/SalesQuantityChart";
import SalesProfitChart from "../charts/SalesProfitChart";

export default function Dashboard() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSales = useCallback(async () => {
    try {
      const res = await getSales();
      const grouped = groupSalesByMonth(res.data);
      setChartData(grouped);
    } catch (err) {
      console.error("Erro ao carregar dashboard", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSales();

    const interval = setInterval(() => {
      fetchSales();
    }, 2000);

    return () => clearInterval(interval);
  }, [fetchSales]);

  if (loading) {
    return (
      <p className="text-center text-gray-500">
        Loading dashboard...
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
        <SalesQuantityChart data={chartData} />
        <SalesProfitChart data={chartData} />
      </div>
    </div>
  );
}
