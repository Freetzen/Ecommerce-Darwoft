import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTicketsAdmin } from '../../../redux/productSlice';
import SalesByDayChart from '../recharts/SalesByDayChart';

const AllSalesAdmin = () => {
  const dispatch = useDispatch();
  const [salesData, setSalesData] = useState([]);
  const [salesDataFormatted, setSalesDataFormatted] = useState([]);

  const getAllSales = async () => {
    try {
      const response = await dispatch(getTicketsAdmin());
      setSalesData(response.payload);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  useEffect(() => {
    getAllSales();
  }, []);

  const groupSalesByDay = (salesData) => {
    const groupedSales = {};
    salesData.forEach((sale) => {
      const date = new Date(sale.createdAt).toLocaleDateString();
      if (!groupedSales[date]) {
        groupedSales[date] = 0;
      }
      groupedSales[date] += sale.totalPrice;
    });
    return groupedSales;
  };

  const formatSalesDataForChart = (groupedSales) => {
    return Object.keys(groupedSales).map((date) => ({
      date,
      totalSales: groupedSales[date],
    }));
  };

  useEffect(() => {
    if (salesData.length > 0) {
      const groupedSales = groupSalesByDay(salesData);
      const formattedSalesData = formatSalesDataForChart(groupedSales);
      setSalesDataFormatted(formattedSalesData);
    }
  }, [salesData]);

  return (
    <div>
      <SalesByDayChart salesDataFormatted={salesDataFormatted} />
    </div>
  );
};

export default AllSalesAdmin;
