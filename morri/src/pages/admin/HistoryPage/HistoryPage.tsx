import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import styled from "@emotion/styled";
import { Box, CircularProgress, Modal, Alert, Snackbar } from "@mui/material";
import Header from "../../../component/Title_header/Header";
import TableComponent from "../../../component/TableComponent/TableComponent";
import TabBar from "../../../component/Tabbar/TabBar";
import DeleteComponent from "../../../component/DeleteComponent/DeleteComponent";
import TextBox from "../../../component/TextBox/TextBox";
import BtnComponent from "../../../component/BtnComponent/BtnComponent";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.div`
  padding: 16px;
`;

const TabBarWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 32px;
`;

type SnackbarSeverity = "success" | "error" | "warning" | "info";

interface Transaction {
  id: string;
  paymentMethod: string;
  createAt: string;
  staff: { name: string };
  orderDetails: Array<{ quantity: number }>;
  customer: { name: string };
  totalPrice: number;
  status: string;
}

interface FormattedTransaction {
  transactionId: string;
  paymentType: string;
  date: string;
  staffName: string;
  customerName: string;
  totalAmount: string;
  status: string;
}

interface UpdateHistoryProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  transaction: Transaction | null;
  onUpdate: (transactionId: string, status: string) => Promise<void>;
}

const UpdateHistoryPage: React.FC<UpdateHistoryProps> = ({
  isModalOpen,
  setIsModalOpen,
  transaction,
  onUpdate,
}) => {
  const [status, setStatus] = useState(transaction?.status || "");
  console.log("trancsaction", transaction);
  useEffect(() => {
    setStatus(transaction?.status || "");
  }, [transaction]);

  return (
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          width: "90%",
          maxWidth: "600px",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "2rem",
            color: "#264850",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Cập nhật Trạng thái Giao dịch
        </div>

        <TextBox
          datatype="select"
          title="Trạng thái"
          value={status}
          placeholder="Chọn trạng thái"
          defaultValue={transaction?.status}
          onChange={(value) => setStatus(value as string)}
          options={[
            { label: "Đang xử lý", value: "PROCESSING" },
            { label: "Hoàn thành", value: "COMPLETED" },
            { label: "Đã hủy", value: "CANCELLED" },
          ]}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
            gap: 2,
          }}
        >
          <BtnComponent
            btnColorType="close"
            btnText="Hủy"
            onClick={() => setIsModalOpen(false)}
          />
          <BtnComponent
            btnColorType="primary"
            btnText="Cập nhật"
            onClick={async () => {
              if (transaction?.id) {
                await onUpdate(transaction.id, status);
              }
            }}
          />
        </Box>
      </Box>
    </Modal>
  );
};

const HistoryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Today");
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<FormattedTransaction[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: "",
    severity: "info" as SnackbarSeverity,
  });

  const columns = [
    { field: "transactionId", headerName: "Mã giao dịch", width: 150 },
    { field: "paymentType", headerName: "Trả bằng", width: 120 },
    { field: "date", headerName: "Ngày tạo", width: 120 },
    {
      field: "staffName",
      headerName: "Nhân viên",
      width: 100,
      align: "center" as const,
    },
    { field: "customerName", headerName: "Tên khách hàng", width: 200 },
    {
      field: "totalAmount",
      headerName: "Tổng tiền",
      width: 150,
      align: "center" as const,
    },
    { field: "status", headerName: "Trạng thái", width: 120 },
  ];
  const handleUpdate = async (
    transactionId: string,
    status: string
  ): Promise<void> => {
    try {
      const response = await fetch(
        `http://localhost:8081/billBan/update/${transactionId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      console.log("response update: ", response);

      if (!response.ok) throw new Error();

      setSnackbar({
        visible: true,
        message: "Cập nhật trạng thái thành công!",
        severity: "success",
      });
      setIsUpdateModalOpen(false);
      await fetchTransactions(activeTab.toLowerCase());
    } catch {
      setSnackbar({
        visible: true,
        message: "Lỗi khi cập nhật trạng thái!",
        severity: "error",
      });
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (!selectedTransaction?.id) {
      setSnackbar({
        visible: true,
        message: "Vui lòng chọn giao dịch để xóa!",
        severity: "error",
      });
      return;
    }

    try {
      console.log(`http://localhost:8081/billBan/${selectedTransaction.id}`);
      const response = await fetch(
        `http://localhost:8081/billBan/${selectedTransaction.id}`,
        {
          method: "DELETE",
        }
      );
      console.log("response history: " + JSON.stringify(response));
      if (!response.ok) throw new Error();

      setSnackbar({
        visible: true,
        message: "Xóa giao dịch thành công!",
        severity: "success",
      });
      setIsDeleteModalOpen(false);
      await fetchTransactions(activeTab.toLowerCase());
    } catch {
      setSnackbar({
        visible: true,
        message: "Lỗi khi xóa giao dịch!",
        severity: "error",
      });
    }
  };

  const fetchTransactions = async (period: string): Promise<void> => {
    setLoading(true);
    try {
      const periodFormat = period.toLowerCase().split(/[\s-]/).join("");
      const response = await fetch(
        `http://localhost:8081/billBan/${periodFormat}`
      );
      if (!response.ok) throw new Error();

      const data: Transaction[] = await response.json();
      const formattedData = data.map((bill) => ({
        ...bill,
        transactionId: bill.id || "N/A",
        paymentType: bill.paymentMethod || "N/A",
        date: bill.createAt
          ? format(new Date(bill.createAt), "dd/MM/yyyy")
          : "N/A",

        staffName: bill.staff?.name || "Not Assigned",
        customerName: bill.customer?.name || "N/A",
        totalAmount: new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(bill.totalPrice || 0),
      }));

      setTransactions(formattedData);
    } catch {
      setSnackbar({
        visible: true,
        message: "Lỗi khi tải dữ liệu!",
        severity: "error",
      });
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (row: any) => {
    console.log("row: ", row);
    setSelectedTransaction(row);
  };

  useEffect(() => {
    fetchTransactions(activeTab.toLowerCase());
  }, [activeTab]);

  return (
    <Container>
      <Header title="Lịch sử giao dịch" />
      <ContentWrapper>
        <TabBarWrapper>
          <TabBar
            tabs={["Today", "This week", "This month", "This year"]}
            onTabChange={setActiveTab}
            defaultTab="Today"
            styleType="custom"
          />
        </TabBarWrapper>

        {loading ? (
          <LoadingWrapper>
            <CircularProgress />
          </LoadingWrapper>
        ) : (
          <TableComponent
            columns={columns}
            data={transactions}
            onRowClick={handleRowClick}
            onEdit={() => setIsUpdateModalOpen(true)}
            onDelete={() => setIsDeleteModalOpen(true)}
          />
        )}

        <DeleteComponent
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          deleteName={selectedTransaction?.id || ""}
          handleDelete={handleDelete}
        />

        <UpdateHistoryPage
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
          transaction={selectedTransaction}
          onUpdate={handleUpdate}
        />

        <Snackbar
          open={snackbar.visible}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, visible: false })}
        >
          <Alert
            severity={snackbar.severity}
            onClose={() => setSnackbar({ ...snackbar, visible: false })}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </ContentWrapper>
    </Container>
  );
};

export default HistoryPage;
