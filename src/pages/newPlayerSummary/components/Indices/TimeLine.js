import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@mui/material/Checkbox";
import CustomCheckbox from "../../../../components/Button/CustomCheckbox/CustomCheckbox";

const useStyles = makeStyles(() => ({
  conatiner: {
    backgroundColor: "#121212",
    width: "30vw",
    height: "50vh",
    borderRadius: "20px",
    margin: "1rem",
    "@media (max-width: 1750px)": {
      height: "48vh",
    },
  },
  centerDiv: {
    backgroundColor: "#121212",
    borderRadius: "20px",
    border: "2px solid #00ffff",
    display: "flex",
    width: "80%",
    marginTop: "2rem",
    justifyContent: "space-between",
  },
  checkboxDiv: {
    backgroundColor: "#121212",
    display: "flex",
    justifyContent: "space-between",
    width: "50%",
    alignItems: "center",
    margin: "3rem 2.7rem",
  },
  text: {
    color: "white",
    fontSize: "1.2rem",
    fontFamily: "Hind Siliguri",
    fontWeight: "600",
    "@media (max-width: 1750px)": {
      fontSize: "1rem",
    },
  },
}));

const TimeLine = () => {
  const classes = useStyles();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <div className={classes.conatiner}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={classes.centerDiv}>
          <div style={{ padding: "1rem", marginLeft: "1rem" }}>
            <CustomCheckbox label={"cualitativos"} />
          </div>
          <div style={{ padding: "1rem", marginLeft: "1rem" }}>
            <CustomCheckbox label={"cuantitativos"} />
          </div>
        </div>
      </div>
      <div className={classes.checkboxDiv}>
        <div>
          <Checkbox {...label} />
        </div>

        <div>
          <p className={classes.text}>Mostrar intervalos</p>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
