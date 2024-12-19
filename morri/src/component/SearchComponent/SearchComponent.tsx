import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import { InputBase, IconButton } from "@mui/material";

interface SearchProps {
  placeholder: string;
  onSearch: (keyword: string) => void;
  keyword: string;
}

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #e5e3e3;
  margin-left: "200px";
  border-radius: 15px;
  padding: 4px 12px;
  width: 70%;
  max-width: 250px;
`;

const StyledInputBase = styled(InputBase)`
  flex: 1;
  .MuiInputBase-input {
    padding: 8px;
    font-size: 16px;
    color: rgb(143, 141, 141);
    &::placeholder {
      color: #888;
      opacity: 1;
    }
  }
`;

const StyledIconButton = styled(IconButton)`
  padding: 8px;
  color: #757575;
  &:hover {
    background-color: transparent;
  }
`;

const SearchComponent: React.FC<SearchProps> = ({
  placeholder,
  onSearch,
  keyword,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(keyword);
    }
  };

  return (
    <SearchContainer>
      <StyledInputBase
        placeholder={placeholder}
        value={keyword}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        fullWidth
        autoFocus
      />
      <StyledIconButton>
        <SearchIcon />
      </StyledIconButton>
    </SearchContainer>
  );
};

export default SearchComponent;
