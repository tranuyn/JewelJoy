import React, { useState, useEffect } from "react";
import "./homePage.css";
import WorkSchedule from "./WorkSchedule";
import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useAuth } from "../../services/useAuth";

interface TermAndCondition {
  id: string;
  greeting: string;
  description: {
    title: string;
    content: string;
  }[];
}

const HomePage: React.FC = () => {
  const [termAndCondition, setTermAndCondition] =
    useState<TermAndCondition | null>(null);
  const [isEditingGreeting, setIsEditingGreeting] = useState(false);
  const [editedGreeting, setEditedGreeting] = useState("");
  const [isEditingTermAndCondition, setIsEditingTermAndCondition] = useState(false);
  const [editedDescription, setEditedDescription] = useState<
    { title: string; content: string }[]
  >([]);

  const { isAuthenticated, user, validateAuthStatus } = useAuth();

  useEffect(() => {
    validateAuthStatus();
  }, [validateAuthStatus]);

  const StyledIconButton = styled(IconButton)`
    margin: 4px 0px;
  `;

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8081/termAndCondition/");
        const data = await response.json();
        setTermAndCondition(data[0]); // Assuming we want the first item
        setEditedGreeting(data[0].greeting);
        setEditedDescription(data[0].description);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Update description
  const handleUpdateTermAndCondition = async () => {
    if (!termAndCondition) return;

    try {
      const response = await fetch(
        `http://localhost:8081/termAndCondition/${termAndCondition.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...termAndCondition,
            description: editedDescription,
          }),
        }
      );

      if (response.ok) {
        setTermAndCondition({
          ...termAndCondition,
          description: editedDescription,
        });
        setIsEditingTermAndCondition(false);
      }
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };

  return (
    <div className="home-page">
      <span className="title-text">Hello {user?.username}</span>
      <div className="line" />
      <div>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>Chào mừng đến với Morri Jewelry</h2>
            <StyledIconButton
              className="edit-button"
              size="small"
              onClick={() => setIsEditingGreeting(true)}
            >
              <BorderColorIcon fontSize="small" />
            </StyledIconButton>
          </div>
          <span
            dangerouslySetInnerHTML={{
              __html: termAndCondition?.greeting?.replace(/\n/g, "<br/>") || "",
            }}
          />
        </div>
        <div className="line" />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Điều khoản, điều kiện</h2>
          <StyledIconButton
            className="edit-button"
            size="small"
            onClick={() => setIsEditingTermAndCondition(true)}
          >
            <BorderColorIcon fontSize="small" />
          </StyledIconButton>
        </div>
        <div>
          {termAndCondition?.description.map((item, index) => (
            <div key={index}>
              <strong>
                {index + 1}. {item.title}:
              </strong>{" "}
              {item.content}
              <br />
            </div>
          ))}
        </div>
      </div>

      <div className="line" />
      <h2>Lịch làm việc</h2>
      <WorkSchedule />

      {/* Edit Greeting Dialog */}
      <Dialog
        open={isEditingGreeting}
        onClose={() => setIsEditingGreeting(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Chỉnh sửa lời chào</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={editedGreeting}
            onChange={(e) => setEditedGreeting(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsEditingGreeting(false)}
            sx={{
              backgroundColor: "rgba(255, 0, 0, 0.8)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.4)",
              },
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleUpdateTermAndCondition}
            variant="contained"
            sx={{
              backgroundColor: "#3E5C63",
              color: "white",
              "&:hover": {
                backgroundColor: "#6E858A",
              },
            }}
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Description Dialog */}
      <Dialog
        open={isEditingTermAndCondition}
        onClose={() => setIsEditingTermAndCondition(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Chỉnh sửa điều khoản</DialogTitle>
        <DialogContent>
          {editedDescription.map((item, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <TextField
                fullWidth
                label="Tiêu đề"
                value={item.title}
                onChange={(e) => {
                  const newDescription = [...editedDescription];
                  newDescription[index].title = e.target.value;
                  setEditedDescription(newDescription);
                }}
                margin="normal"
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Nội dung"
                value={item.content}
                onChange={(e) => {
                  const newDescription = [...editedDescription];
                  newDescription[index].content = e.target.value;
                  setEditedDescription(newDescription);
                }}
                margin="normal"
              />
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsEditingTermAndCondition(false)}
            sx={{
              backgroundColor: "rgba(255, 0, 0, 0.8)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.4)",
              },
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleUpdateTermAndCondition}
            variant="contained"
            sx={{
              backgroundColor: "#3E5C63",
              color: "white",
              "&:hover": {
                backgroundColor: "#6E858A",
              },
            }}
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HomePage;
