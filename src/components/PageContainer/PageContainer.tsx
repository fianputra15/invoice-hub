import React from "react";
import { Box, Typography, Container as MuiContainer } from "@mui/material";

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
  sx?: object;
  subChildren?: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ title, children, sx, subChildren }) => {
  return (
    <Box sx={{ width: "100%", ...sx}}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "20px", sm: "26px" },
            fontWeight: "bold",
            mb: 1.25,
          }}
        >
          {title}
        </Typography>
        {/* this is for right side sub children example like filtering section */}
        {subChildren}
      </Box>
      <MuiContainer maxWidth={false} disableGutters>
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 1,
            boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
          }}
        >
          {children}
        </Box>
      </MuiContainer>
    </Box>
  );
};

export default PageContainer;