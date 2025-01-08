import React, { useState, useEffect } from "react";
import "./homePage.css";
import styled from "@emotion/styled";
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
import ViewOnlyWorkSchedule from "./ViewOnlyWorkSchedule";

interface TermAndCondition {
  id: string;
  greeting: string;
  description: {
    title: string;
    content: string;
  }[];
}

const EmployeeHomePage: React.FC = () => {
  const [termAndCondition, setTermAndCondition] =
    useState<TermAndCondition | null>(null);
  const [isEditingGreeting, setIsEditingGreeting] = useState(false);
  const [editedGreeting, setEditedGreeting] = useState("");
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState<
    { title: string; content: string }[]
  >([]);

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

  return (
    <div className="home-page">
      <span className="title-text">Hello Uyn</span>
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
      <ViewOnlyWorkSchedule />
    </div>
  );
};

export default EmployeeHomePage;
