import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@emotion/styled";
import "./TableComponent.css";

interface Column {
  field: string;
  headerName: string;
  width?: number;
  align?: "left" | "center" | "right";
}

interface TableData {
  [key: string]: any;
}

interface TableComponentProps {
  columns: Column[];
  data: TableData[];
  onRowClick?: (row: TableData) => void;
  onEdit?: (row: TableData) => void;
  onDelete?: (row: TableData) => void;
}

const StyledPaper = styled(Paper)`
  margin: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const StyledTable = styled(Table)`
  min-width: 650px;
`;

const StyledTableHead = styled(TableHead)`
  background-color: #cbd5e1;
`;

const StyledHeaderCell = styled(TableCell)`
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #e0e0e0;
  border-right: 0.5px solid #e0e0e0;
`;

const StyledTableRow = styled(TableRow)`
  &:hover {
    background-color: #f8f9fa;
    cursor: pointer;
  }
`;

const StyledTableCell = styled(TableCell)`
  border-bottom: 1px solid #e0e0e0;
  border-right: 0.5px solid #e0e0e0;
`;

const StyledIconButton = styled(IconButton)`
  padding: 6px;
  margin: 0 4px;
`;

const TableComponent: React.FC<TableComponentProps> = ({
  columns,
  data,
  onRowClick,
  onEdit,
  onDelete,
}) => {
  const handleRowClick = (event: React.MouseEvent, row: TableData) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  const handleEdit = (event: React.MouseEvent, row: TableData) => {
    event.stopPropagation();
    if (onEdit) {
      onEdit(row);
    }
  };

  const handleDelete = (event: React.MouseEvent, row: TableData) => {
    event.stopPropagation();
    if (onDelete) {
      onDelete(row);
    }
  };

  return (
    <StyledPaper>
      <TableContainer>
        <StyledTable>
          <StyledTableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledHeaderCell
                  key={column.field}
                  align={column.align || "center"}
                  style={column.width ? { width: column.width } : {}}
                >
                  {column.headerName}
                </StyledHeaderCell>
              ))}
              <StyledHeaderCell align="center" style={{ width: 100 }}>
                Options
              </StyledHeaderCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {data.map((row, index) => (
              <StyledTableRow
                key={index}
                onClick={(event) => handleRowClick(event, row)}
                className="table-row"
              >
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.field}
                    align={column.align || "center"}
                  >
                    {row[column.field]}
                  </StyledTableCell>
                ))}
                <StyledTableCell
                  align="center"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100px",
                  }}
                >
                  <StyledIconButton
                    className="edit-button"
                    size="small"
                    onClick={(event) => handleEdit(event, row)}
                  >
                    <BorderColorIcon fontSize="small" />
                  </StyledIconButton>
                  <StyledIconButton
                    className="delete-button"
                    size="small"
                    onClick={(event) => handleDelete(event, row)}
                  >
                    <DeleteIcon fontSize="small" />
                  </StyledIconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </StyledPaper>
  );
};

export default TableComponent;
