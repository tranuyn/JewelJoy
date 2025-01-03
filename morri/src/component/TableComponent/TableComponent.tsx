import styled from "@emotion/styled";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconButton
} from "@mui/material";
import React from "react";
import "../../styles/styles.css";
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
  const StyledIconButton = styled(IconButton)`
    margin:  4px 0;
  `;

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.field}
                  className="theadContainer"
                  style={{
                    textAlign: column.align || "center",
                    width: column.width,
                  }}
                >
                  {column.headerName}
                </th>
              ))}
              <th className="theadContainer" style={{ width: 100 }}>
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                onClick={(event) => handleRowClick(event, row)}
                className="table-row"
              >
                {columns.map((column) => (
                  <td
                    key={column.field}
                    style={{ textAlign: column.align || "center" }}
                    className="table-cell"
                  >
                    {row[column.field]}
                  </td>
                ))}
                <td className="table-cell options-cell">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
