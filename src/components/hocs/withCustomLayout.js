"use client";
import { Box, Breadcrumbs, Typography } from "@gib-ui/core";
import React from "react";

const withCustomLayout = (WrappedComponent, layoutProps) => {
  const PageLayout = (props) => {
    const { title, titleColor, breadcrumbs } = layoutProps;

    return (
      <Box
        sx={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
        ml={5} mt={5}
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
            >
              {title}
            </Typography>
          </Box>
        </Box>

        <WrappedComponent {...props} />
      </Box>
    );
  };

  return PageLayout;
};

export default withCustomLayout;
