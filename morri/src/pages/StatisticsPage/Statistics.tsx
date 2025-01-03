import React, { useEffect, useState } from "react";
import Header from "../../component/Title_header/Header";
import TabBar from "../../component/Tabbar/TabBar";
import TodayTab from "./TodayTab";
import { BillBanResponse, getAllBillBans } from "../../services/BillBanService";
import './StatisticsStyle.css'

type Props = {};

function Statistics({}: Props) {
  const [activeTab, setActiveTab] = useState("Hôm nay");
  const tabs = ["Hôm nay", "Tháng này", "Năm nay"];
  const [completedBills, setCompletedBills] = useState<BillBanResponse[]>([]);
  const [onDeliveryBills, setOnDeliveryBills] = useState<BillBanResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const bills = await getAllBillBans();
        setCompletedBills(bills.filter((bill) => bill.status === "COMPLETED"));
        setOnDeliveryBills(bills.filter((bill) => bill.status === "ON_DELIVERY"));
      } catch (err) {
        alert("Không thể tải dữ liệu đơn hàng!");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Hàm lọc cho cả completedBills và onDeliveryBills
  const filterByToday = (bills: BillBanResponse[]) => {
    const today = new Date();
    console.log(bills.filter(bill => new Date(bill.date).toDateString()))
    return bills.filter(bill => new Date(bill.date).toDateString() === today.toDateString());
  };

  const filterByThisMonth = (bills: BillBanResponse[]) => {
    const today = new Date();
    return bills.filter(bill => {
      const billDate = new Date(bill.date);
      return billDate.getMonth() === today.getMonth() && billDate.getFullYear() === today.getFullYear();
    });
  };

  const filterByThisYear = (bills: BillBanResponse[]) => {
    const today = new Date();
    return bills.filter(bill => new Date(bill.date).getFullYear() === today.getFullYear());
  };

  // Lọc hóa đơn cho tab hiện tại
  const filteredCompletedBills = (() => {
    switch (activeTab) {
      case "Hôm nay":
        return filterByToday(completedBills);
      case "Tháng này":
        return filterByThisMonth(completedBills);
      case "Năm nay":
        return filterByThisYear(completedBills);
      default:
        return completedBills;
    }
  })();

  const filteredOnDeliveryBills = (() => {
    switch (activeTab) {
      case "Hôm nay":
        return filterByToday(onDeliveryBills);
      case "Tháng này":
        return filterByThisMonth(onDeliveryBills);
      case "Năm nay":
        return filterByThisYear(onDeliveryBills);
      default:
        return onDeliveryBills;
    }
  })();

  return (
    <div>
      <Header title="Thống kê" />
      <div className="customTabbarPosition">
        <TabBar
          tabs={tabs}
          onTabChange={setActiveTab}
          styleType="custom"
          defaultTab="Hôm nay"
        />
      </div>

      {loading ? (
        <div>Đang tải dữ liệu...</div>
      ) : (
        <>
          {activeTab === "Hôm nay" ? (
            <TodayTab completedBills={filteredCompletedBills} onDeliveryBills={filteredOnDeliveryBills} />
          ) : activeTab === "Tháng này" ? (
            <TodayTab completedBills={completedBills} onDeliveryBills={onDeliveryBills} />
          ) : (
            <TodayTab completedBills={completedBills} onDeliveryBills={onDeliveryBills} />
          )}
        </>
      )}
    </div>
  );
}
export default Statistics;