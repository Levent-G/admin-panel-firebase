"use client";
import { Alert, Box, Breadcrumbs, Typography } from "@gib-ui/core";
import React from "react";

const withCustomLayout = (WrappedComponent, layoutProps) => {
  const PageLayout = (props) => {
    const { title, titleColor, breadcrumbs, alertText, severity } = layoutProps;

    return (
      <Box
        sx={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100% !important",
        }}
        ml={5}
        mt={5}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Breadcrumbs
              homePage={breadcrumbs?.homePage}
              links={breadcrumbs?.links.map((link) => ({
                label: link.label,
              }))}
            />
            <Typography
              variant="h4"
              fontWeight={600}
              sx={{ color: titleColor, marginTop: "1rem" }}
              mb={3}
            >
              {title}
            </Typography>
            <Alert
              alertText={alertText}
              id="alertWithTitle"
              severity={severity ? severity : "info"}
             
            
            />
          </Box>
        </Box>

        <WrappedComponent {...props} />
      </Box>
    );
  };

  return PageLayout;
};

export default withCustomLayout;
