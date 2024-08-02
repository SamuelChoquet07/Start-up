import { makeStyles } from "@material-ui/core/styles";
import RadiusDiv from "../../../../components/Button/RadiusDiv";
import translate from "../../../../lang/lang";

const useStyles = makeStyles(() => ({
  container: {
    margin: "1rem",
    width: "40%",
    height: "80%",
  },
  text: {
    color: "white",
    fontSize: "1.4rem",
    fontFamily: "Hind Siliguri",
    fontWeight: "600",
    "@media (max-width: 1750px)": {
      fontSize: "1.1rem",
    },
  },
  innerText: {
    color: "white",
    fontSize: "1.2rem",
    fontFamily: "Hind Siliguri",
    fontWeight: "600",
    "@media (max-width: 1750px)": {
      fontSize: "1rem",
    },
  },
  flexDiv: {
    width: "50%",
    display: "flex",
    justifyContent: "space-between",
    margin: "2rem",
    alignItems: "center",
  },
  marginDiv: {
    marginRight: "2rem",
  },
  radiusdivContainer: {
    padding: "1rem 2rem",
    "@media (max-width: 1750px)": {
      marginTop: "0.5rem",
    },
  },
}));

const FieldPositions = ({ playerData }) => {
  const classes = useStyles();

  const colors = {
    POR: "#FD5F85",
    DEF: "#46C3FF",
    MID: "#BCEB57",
    DEL: "#FF964A",
    FREE: "#9677EE",
  };
  return (
    <div className={classes.container}>
      <div style={{ padding: "1rem 2rem" }}>
        <p className={classes.text}>
          {translate("field position").toUpperCase()}
        </p>
        <div className={classes.flexDiv}>
          <div className={classes.marginDiv}>
            <RadiusDiv
              text={playerData?.playerPosition?.groupingAbb}
              background={colors}
            />
          </div>
          <div className={classes.marginDiv}>
            <p className={classes.innerText}>
              {playerData?.playerPosition?.groupingPosition}
            </p>
          </div>
        </div>
      </div>
      <div className={classes.radiusdivContainer}>
        <p className={classes.text}>{translate("demarcation").toUpperCase()}</p>
        <div className={classes.flexDiv}>
          <div className={classes.marginDiv}>
            <RadiusDiv
              text={playerData?.playerPosition?.groupingAbb}
              background={colors}
            />
          </div>
          <div className={classes.marginDiv}>
            <p className={classes.innerText}>
              {playerData?.playerPosition?.groupingPosition}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldPositions;
