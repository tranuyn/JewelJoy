import React from "react";
import { PieChart, BarChart } from "@mui/x-charts";
import { BillBanResponse } from "../../services/BillBanService";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./StatisticsStyle.css";

const theme = createTheme({
  typography: {
    fontFamily: "Baloo 2, sans-serif",
  },
});

const chartColors = {
  pieChart2: [
    "#EFB25A",
    "#63993D",
    "#E71D36",
    "#3E5C63",
    "#92C5F9",
    "#87BB62",
    "#FDFFFC",
  ],
  barChart: "#F2C187",
};

interface Props {
  completedBills: BillBanResponse[];
  onDeliveryBills: BillBanResponse[];
}

interface ChartDataItem {
  label: string;
  value: number;
  color?: string;
}

const TodayTab: React.FC<Props> = ({ completedBills, onDeliveryBills }) => {
  // Tính tổng doanh thu từ đơn hoàn thành
  const totalCompletedRevenue = completedBills.reduce(
    (total, bill) =>
      total + (typeof bill.totalPrice === "number" ? bill.totalPrice : 0),
    0
  );

  // Số đơn hàng đang giao
  const onDeliveryCount = onDeliveryBills.length;
  const onCompletedCount = completedBills.length;


  // Đếm số lượng khách hàng unique từ tất cả đơn hàng
  const uniqueCustomers = new Set([
    ...completedBills.map((bill) => bill.customerId || ""),
    ...onDeliveryBills.map((bill) => bill.customerId || ""),
  ]).size;

  // Xử lý dữ liệu giờ mua hàng cao điểm
  const processOrdersByHour = () => {
    const timeSlots = [
      "7:30 - 10:30",
      "10:30 - 13:30",
      "13:30 - 16:30",
      "16:30 - 19:30",
      "19:30 - 22:30",
    ];

    const slotCounts = Array(timeSlots.length).fill(0);

    completedBills.forEach((bill) => {
      const createTime = new Date(bill.dateTime);
      const hour = createTime.getHours();
      console.log("có giờ  0 ", hour);
      const minutes = createTime.getMinutes();
      const timeInMinutes = hour * 60 + minutes;

      if (timeInMinutes >= 450 && timeInMinutes < 630) {
        // 7:30 - 10:30
        slotCounts[0]++;
      } else if (timeInMinutes >= 630 && timeInMinutes < 810) {
        // 10:30 - 13:30
        slotCounts[1]++;
      } else if (timeInMinutes >= 810 && timeInMinutes < 990) {
        // 13:30 - 16:30
        slotCounts[2]++;
      } else if (timeInMinutes >= 990 && timeInMinutes < 1170) {
        // 16:30 - 19:30
        slotCounts[3]++;
      } else if (timeInMinutes >= 1170 && timeInMinutes < 1350) {
        // 19:30 - 22:30
        slotCounts[4]++;
      }
    });

    return {
      timeSlots,
      counts: slotCounts,
    };
  };

  const processTopSellingProducts = (): ChartDataItem[] => {
    const productCount: { [key: string]: number } = {};

    completedBills.forEach((bill) => {
      bill.orderDetails?.forEach((detail) => {
        const productName = detail.product?.name || "Unknown Product";
        productCount[productName] =
          (productCount[productName] || 0) + (detail.quantity || 0);
      });
    });

    return Object.entries(productCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([label, value], index) => ({
        label: label.length > 25 ? label.substring(0, 25) + "..." : label,
        value: Number(value),
        color: chartColors.pieChart2[index],
      }));
  };

  const processTopRevenueProducts = (): ChartDataItem[] => {
    const productRevenue: { [key: string]: number } = {};

    completedBills.forEach((bill) => {
      bill.orderDetails?.forEach((detail) => {
        const productName = detail.product?.name || "Unknown Product";
        productRevenue[productName] =
          (productRevenue[productName] || 0) + (detail.subtotal || 0);
      });
    });

    return Object.entries(productRevenue)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([label, value], index) => ({
        label: label.length > 25 ? label.substring(0, 25) + "..." : label,
        value: Number(value),
        color: chartColors.pieChart2[index],
      }));
  };
  // Xử lý dữ liệu cho số lượng đơn hàng theo nhân viên
  const processStaffOrders = () => {
    const staffOrders: { [key: string]: number } = {};

    completedBills.forEach((bill) => {
      const staffName = bill.staffName;
      staffOrders[staffName] = (staffOrders[staffName] || 0) + 1;
    });

    const staffNames = Object.keys(staffOrders);
    const orderCounts = Object.values(staffOrders);

    return {
      staffNames,
      orderCounts,
    };
  };

  const { timeSlots, counts } = processOrdersByHour();
  const topSellingProducts = processTopSellingProducts();
  const topRevenueProducts = processTopRevenueProducts();
  const { staffNames, orderCounts } = processStaffOrders();

  return (
    <ThemeProvider theme={theme}>
      <div style={{ flex: 1, padding: 40 }}>
        {/* Thống kê tổng quan */}
        <div
          className="statistics-overview"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
          }}
        >
          <div className="inforCard">
            <h3 className="inforCard_title">
              Tổng doanh thu
            </h3>
            <p style={{ fontSize: "1.2em", color: "#63993D" }}>
              {(totalCompletedRevenue>=1000000) ? ((totalCompletedRevenue / 1000000).toFixed(1)+'M'):((totalCompletedRevenue / 1000)+'K')} VNĐ
            </p>
          </div>
          <div className="inforCard">
            <h3 className="inforCard_title">
              Đơn hàng đang giao
            </h3>
            <p style={{ fontSize: "1.2em", color: "#EFB25A" }}>
              {onDeliveryCount}
            </p>
          </div>
          <div className="inforCard">
            <h3 className="inforCard_title">
              Đơn hàng đã giao
            </h3>
            <p style={{ fontSize: "1.2em", color: "#EFB25A" }}>
              {onCompletedCount}
            </p>
          </div>
          <div className="inforCard">
            <h3 className="inforCard_title">
              Số khách hàng
            </h3>
            <p style={{ fontSize: "1.2em", color: "#E71D36" }}>
              {uniqueCustomers}
            </p>
          </div>
        </div>

        <div className="row">
          <div className="pieChart">
            <h3 className="text-lg font-semibold mb-1">Sản phẩm bán chạy</h3>
            <PieChart
              sx={{
                "& .MuiChartsLegend-series text": {
                  fontSize: "0.8em !important",
                },
              }}
              margin={{ top: 100, bottom: 10, left: 50, right: 50 }}
              slotProps={{
                legend: {
                  direction: "row",
                  position: { vertical: "top", horizontal: "middle" },
                  padding: 0,
                },
              }}
              series={[
                {
                  data: topSellingProducts,
                  highlightScope: { fade: "global", highlight: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                  valueFormatter: (item: { value: number }) =>
                    `${item.value} cái`,
                },
              ]}
              height={400}
            />
          </div>

          <div className="pieChart">
            <h3 className="text-lg font-semibold mb-2">
              Doanh thu theo sản phẩm
            </h3>
            <PieChart
              sx={{
                "& .MuiChartsLegend-series text": {
                  fontSize: "0.8em !important",
                },
              }}
              margin={{ top: 100, bottom: 10, left: 50, right: 50 }}
              slotProps={{
                legend: {
                  direction: "row",
                  position: { vertical: "top", horizontal: "middle" },
                  padding: 0,
                },
              }}
              series={[
                {
                  data: topRevenueProducts,
                  highlightScope: { fade: "global", highlight: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                  valueFormatter: (item: { value: number }) =>
                    `${(item.value / 1000000).toFixed(1)}M VNĐ`,
                },
              ]}
              height={400}
            />
          </div>
        </div>
        <div className="row">
          {/* Biểu đồ giờ cao điểm */}
          <div className="barChart">
            <h3 className="text-lg font-semibold mb-2">
              Giờ mua hàng cao điểm
            </h3>
            <BarChart
              sx={{
                "& .MuiChartsLegend-series text": {
                  fontSize: "0.9em !important",
                },
              }}
              xAxis={[
                {
                  scaleType: "band",
                  data: timeSlots,
                  label: "Khung giờ",
                },
              ]}
              series={[
                {
                  data: counts,
                  label: "Số đơn hàng",
                  color: chartColors.barChart,
                },
              ]}
              height={300}
            />
          </div>
          {/* Nhân viên vs số đơn hàng của nhân viên đó */}
          <div className="barChart">
            <h3 className="text-xl font-bold mb-4 text-center">
              Số đơn hàng của từng nhân viên
            </h3>
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: staffNames,
                  tickLabelStyle: {
                    fontSize: 14,
                    fontWeight: 600,
                  },
                },
              ]}
              series={[
                {
                  data: orderCounts,
                  label: "Số đơn hàng",
                },
              ]}
              height={300}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default TodayTab;
