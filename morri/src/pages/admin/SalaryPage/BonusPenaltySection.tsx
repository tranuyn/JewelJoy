import React, { useState, useEffect } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import BtnComponent from "../../../component/BtnComponent/BtnComponent";
import TableComponent from "../../../component/TableComponent/TableComponent";
import AddBonusPenaltyModal from "./AddBonusPenaltyModal";
import { BonusPenaltyRecord, Salary } from "./types";
import DeleteComponent from "../../../component/DeleteComponent/DeleteComponent";
const formatDate = (dateString: string | number): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  return `${day}/${month}/${year}`;
};

const bonusColumns = [
  { field: "amount", headerName: "Số tiền thưởng" },
  { field: "reason", headerName: "Lý do thưởng" },
  {
    field: "date",
    headerName: "Ngày thưởng",
    renderCell: (record: any) => formatDate(record.date), // Use the formatted date
  },
];

const penaltyColumns = [
  { field: "amount", headerName: "Số tiền phạt" },
  { field: "reason", headerName: "Lý do phạt" },
  {
    field: "date",
    headerName: "Ngày phạt",
    renderCell: (record: any) => formatDate(record.date), // Use the formatted date
  },
];

interface BonusPenaltySectionProps {
  selectedUser: any;
  currentSalary: Salary | null;
  onAddRecord: (
    salaryId: string | null,
    record: BonusPenaltyRecord
  ) => Promise<void>;
  onEditRecord: (
    salaryId: string | null,
    recordId: string,
    record: BonusPenaltyRecord
  ) => Promise<void>;
  onDeleteRecord: (salaryId: string, recordId: string) => Promise<void>;
}

const BonusPenaltySection: React.FC<BonusPenaltySectionProps> = ({
  selectedUser,
  currentSalary,
  onAddRecord,
  onEditRecord,
  onDeleteRecord,
}) => {
  const [selectedTab, setSelectedTab] = useState<"BONUS" | "PENALTY">("BONUS");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<BonusPenaltyRecord | null>(null);
  //   const [isBonusPenaltyModalOpen, setBonusPenaltyModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] =
    useState<BonusPenaltyRecord | null>(null);
  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: "BONUS" | "PENALTY"
  ) => {
    setSelectedTab(newValue);
  };

  const filteredRecords =
    currentSalary?.bonusRecords?.filter(
      (record) => record.type === selectedTab
    ) || [];

  const handleEdit = (record: any) => {
    setEditRecord(record);
    // setBonusPenaltyModalOpen(true);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditRecord(null);
    setIsModalOpen(true);
  };
  const handleShowDeleteModal = (record: any) => {
    setRecordToDelete(record);
    setIsDeleteModalOpen(true);
  };
  const handleAddOrEdit = async (record: BonusPenaltyRecord) => {
    if (!currentSalary) return;

    if (editRecord) {
      await onEditRecord(currentSalary.id, editRecord.id!, record);
    } else {
      await onAddRecord(currentSalary.id, record);
    }
  };
  const handleDelete = async () => {
    if (!currentSalary || !recordToDelete?.id) return;

    await onDeleteRecord(currentSalary.id, recordToDelete.id);
    setIsDeleteModalOpen(false);
    setRecordToDelete(null);
  };

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Thưởng" value="BONUS" />
          <Tab label="Phạt" value="PENALTY" />
        </Tabs>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <BtnComponent
          btnText={`Thêm ${selectedTab === "BONUS" ? "thưởng" : "phạt"}`}
          onClick={handleAdd}
          btnColorType="primary"
        />
      </Box>

      {/* <TableComponent
        columns={selectedTab === "BONUS" ? bonusColumns : penaltyColumns}
        data={filteredRecords}
        onRowClick={() => {}}
        onEdit={handleEdit}
        onDelete={(record) => setIsDeleteModalOpen(true)}
      /> */}
      <TableComponent
        columns={selectedTab === "BONUS" ? bonusColumns : penaltyColumns}
        data={filteredRecords}
        onRowClick={() => {}}
        onEdit={handleEdit}
        onDelete={handleShowDeleteModal}
      />

      {currentSalary && (
        <AddBonusPenaltyModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleAddBonusPenalty={handleAddOrEdit}
          type={selectedTab}
          editRecord={editRecord}
          salaryId={currentSalary.id}
        />
      )}
      <DeleteComponent
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        deleteName={`${selectedTab === "BONUS" ? "Thưởng" : "Phạt"} của ${
          selectedUser?.name
        }`}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default BonusPenaltySection;
