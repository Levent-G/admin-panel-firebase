import React from "react";
import { Alert, Box, Typography } from "@mui/material";
import CustomBreadcrumbs from "../breadCrumbs/CustomBreadcrumbs";

const Page = ({ title, info,breadcrumbLinks ,children }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.default",
        p: 3,
        borderRadius:8,
        
      }}
      component="main"
    >
      <CustomBreadcrumbs links={breadcrumbLinks} />

      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: "#1e1e2f",
          mt: 1,
          textTransform: "uppercase",
        }}
      >
        {title}
      </Typography>

      {info && (
        <Alert
          severity="info"
          sx={{
            backgroundColor: "#e3f2fd",
            color: "#1e1e2f",
            mt: 2,
            mb: 2,
            borderRadius: 2,
          }}
        >
          {info}
        </Alert>
      )}

      <Box>{children}</Box>
    </Box>
  );
};

export default Page;
