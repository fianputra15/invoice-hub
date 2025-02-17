
import React from "react";
import { Box, TextField, Typography, InputAdornment } from "@mui/material";

interface InputTextProps {
  name: string;
  label: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  startAdornment?: React.ReactNode;
  select?: boolean;
  children?: React.ReactNode;
  InputProps?: object;
  sx?: object;
}

const InputText: React.FC<InputTextProps> = ({
  name,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
  startAdornment,
  select = false,
  children,
  InputProps,
  sx,
  ...rest
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="caption"
        sx={{ display: "block", mb: 1, fontWeight: "600" }}
      >
        {label}{" "}
        {required && (
          <Box component="span" sx={{ color: "error.main" }}>
            *
          </Box>
        )}
      </Typography>
      <TextField
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        variant="outlined"
        fullWidth
        required={required}
        placeholder={placeholder}
        select={select}
        InputProps={{
          startAdornment: startAdornment ? (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ) : undefined,
          ...InputProps,
        }}
        sx={{
          "& .MuiOutlinedInput-root": { height: "50px" },
          ...sx,
        }}
        {...rest}
      >
        {children}
      </TextField>
    </Box>
  );
};

export default InputText;
