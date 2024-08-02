import { makeStyles } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { white, blackTransparent, whiteTransparent, lightRed } from "../../../styles/colors"

const Input = ({
  value,
  label,
  placeholder,
  onChange,
  defaultValue,
  name,
  error,
  icon,
  required,
  sizeLabel,
  readOnly,
  backgroundColor,
  disabled,
  type
}) => {

  const useStyles = makeStyles(() => ({
    formControl: {
    },
    label: {
      color: white,
      margin: "0.5rem 0",
      letterSpacing: 1,
      fontSize: sizeLabel ? sizeLabel : 18,
      fontFamily: "Hind Siliguri",
      textTransform: "none", 
    },
    input: {
      color: whiteTransparent,
      backgroundColor: backgroundColor ?? "#121212",
      borderRadius: 0,
      fontFamily: "Hind Siliguri",
      textTransform: "none", 
      letterSpacing: 1,
      margin: "0.3rem 0",
      fontSize: "15px",
    },
    inputError: {
      color: whiteTransparent,
      backgroundColor: backgroundColor ?? "#121212",
      borderRadius: 0,
      boxShadow: `inset 0 0 0 2px ${lightRed}`,
      fontFamily: "Hind Siliguri",
      textTransform: "none",
      letterSpacing: 1,
      margin: "0.3rem 0",
      fontSize: "15px",
    },
  }));

  const classes = useStyles();

  return (
    <>
      <div className={classes.formControl}>
        <InputLabel className={classes.label}>{label}</InputLabel>
        <TextField
          variant="outlined"
          name={name}
          placeholder={placeholder}
          fullWidth
          defaultValue={defaultValue}
          value={value}
          required={required}
          onChange={onChange}
          disabled={disabled}
          InputProps={{
            classes: error
              ? { root: classes.inputError }
              : { root: classes.input },
              readOnly: readOnly,
              type: type,
            startAdornment: icon && (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
          }}
        />
      </div>
    </>
  );
};

export default Input;
