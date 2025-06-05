import PropTypes from "prop-types";
import { FormControl, FormLabel,Grid} from "@mui/material";


function Base(props) {
  const {
    children,
    xs,
    xl,
    lg,
    md,
    sm,
    labeltext,
    labelFocused,
    handleLabelClick,
    labeltextColor,
  } = props;
  return (
    <Grid
      item
      xs={xs}
      xl={xl}
      lg={lg}
      md={md}
      sm={sm}
      sx={
        props.customPadding && {
          "&.MuiGrid-root.MuiGrid-item": {
            paddingLeft: "12px !important",
          },
        }
      }
    >
      <FormControl
        fullWidth
        size="small"
        sx={{
          fontSize: "0.80rem",
          // "& .MuiInputAdornment-root": {
          //     width: "100%"
          // },
          "& .MuiButtonBase-root": {
            marginLeft: "auto",
          },
          ".MuiInputBase-root": {
            "&.Mui-disabled": {
              background: "#e7e7e7 !important",
            },
            "&.Mui-error": {
              borderColor: "#ff1744",
            },
            "&.MuiInputBase-multiline": {
              height: "auto !important",
            },
          },
        }}
        focused={labelFocused}
      >
        {labeltext && (
          <FormLabel
            onClick={handleLabelClick}
            htmlFor={props.id}
            sx={{
              textAlign: "left",
              fontSize: "0.85rem",
              fontWeight: "600",
              color: `${labeltextColor} !important` || "",
            }}
          >
            {labeltext}
          </FormLabel>
        )}
        {children}
      </FormControl>
    </Grid>
  );
}

Base.defaultProps = {
  xs: 12,
  // xl: 6,
  // lg: 6,
  // md: 6,
  // sm: 6,
};

Base.propTypes = {
  label: PropTypes.string,
  xs: PropTypes.number,
  xl: PropTypes.number,
  lg: PropTypes.number,
  md: PropTypes.number,
  sm: PropTypes.number,
};

export default Base;
