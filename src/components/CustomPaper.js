/**
 * A custom Paper component with different variants.
 * @module components/dijitalVdCustomComponents/CustomPaper
 */

import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { CircularProgress } from "@mui/material";
import { Box,Typography } from '@mui/material'


/**
 * Title component within the CustomPaper.
 * @param {Object} props - The props for the Paper Title.
 * @param {string} props.title - The title text.
 * @param {string} props.error - The error text.
 * @returns {JSX.Element} JSX element representing the Paper Title.
 */

const PaperTitle = ({ title, error }) => {
  return (
    <Box display="flex" alignItems="center">
      <Typography
        component="span"
        variant="h5"
        color="#138291"
        fontWeight="bold"
        marginBottom="20px"
      >
        {title}
        {error && (
          <Typography
            component="span"
            fontSize="0.75rem"
            color="#EF0E10"
            ml={1}
          >
            {error}
          </Typography>
        )}
      </Typography>
    </Box>
  );
};

/**
 * Custom Paper component.
 * @param {Object} props - The props for the Custom Paper.
 * @param {React.ReactNode} props.children - The content of the Paper.
 * @param {Object} props.sx - Additional styles for the Paper.
 * @param {string} [props.variant="default"] - The variant of the Paper.
 * @param {string | React.ReactNode} props.title - The title of the Paper (string or React node).
 * @param {string} props.error - The error message for the Paper.
 * @param {string} [props.direction="column"] - The direction of the Stack.
 * @param {boolean} props.loading - Flag indicating if loading is in progress.
 * @returns {JSX.Element} JSX element representing the Custom Paper.
 */

const CustomPaper = ({
  children,
  sx,
  variant,
  title,
  error,
  direction,
  loading,
}) => {
  let variantStyles =
    variant === "footer" ? footerPaperStyles : defaultPaperStyles;
  return (
    <Paper
      elevation={3}
      sx={{
        ...variantStyles,
        ...sx,
      }}
    >
      {title && <PaperTitle title={title} error={error} />}
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <CircularProgress sx={{ color: "#138291" }} />
        </div>
      ) : (
        <>
          {variant === "stack" ? (
            <Stack direction={direction} spacing={2}>
              {children}
            </Stack>
          ) : (
            children
          )}
        </>
      )}
    </Paper>
  );
};
const defaultPaperStyles = {
  borderRadius: "15px",
  padding: "20px",



};
const footerPaperStyles = {
  position: "fixed",
  py: 1,
  mt: 1,
  bottom: 0,
  left: 0,
  right: 0,
  height: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: 8,
};
CustomPaper.defaultProps = {
  variant: "default",
  direction: "column",
};

CustomPaper.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
  variant: PropTypes.oneOf(["default", "stack", "footer"]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  direction: PropTypes.oneOf([
    "column",
    "row",
    "column-reverse",
    "row-reverse",
  ]),
  loading: PropTypes.bool,
};

export default CustomPaper;
