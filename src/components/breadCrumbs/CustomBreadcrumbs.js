import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import { Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";

const CustomBreadcrumbs = ({ links }) => {
  return (
    <MuiBreadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{
        fontWeight: 600,
        fontSize: "1rem",
        color: "#1e1e2f",
      }}
    >
      <Link
        key={"-1"}
        href={"/ana-sayfa"}
        component="a"
        color={"#707070"}
        sx={{
          "&:hover, &:focus": {
            color: "#707070",
          },
        }}
      >
        <HomeIcon sx={{ color: "#1976d2",mt:0.5 }} />
      </Link>
      {links.map((link, index) =>
        link.href ? (
          <Link
            key={index}
            href={link.href}
            component="a"
            color={link.color || "inherit"}
            sx={{
              "&:hover, &:focus": {
                color: link.color || "inherit",
              },
              textDecoration: "none !important",
            }}
          >
            {link.label}
          </Link>
        ) : (
          <Typography
            key={index}
            sx={{
              "&:hover, &:focus": {
                color: link.color || "inherit",
              },
              fontWeight: 600,
              fontSize: "1rem",
              color: link.color || "#1976d2",
            }}
          >
            {link.label}
          </Typography>
        )
      )}
    </MuiBreadcrumbs>
  );
};

export default CustomBreadcrumbs;
