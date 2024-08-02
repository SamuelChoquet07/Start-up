import { makeStyles } from "@material-ui/core/styles";
import SimpleBarChart from "../../../GoalkeeperExercise/components/Charts/SimpleBarChart";

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: "#142127",
    width: "40vw",
    height: "54vh",
    borderRadius: "20px",
    "@media (max-width: 1750px)": {
      height: "56vh",
    },
  },
  graphicContainer: {
    backgroundColor: "#121212",
    width: "35vw",
    height: "45vh",
    borderRadius: "20px",
  },
  text: {
    color: "white",
    fontSize: "1.4rem",
    fontFamily: "Hind Siliguri",
    fontWeight: "600",
  },
}));

const GoalsPerMinutes = ({ playerScores }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div style={{ margin: "1rem" }}>
        <p className={classes.text}>GOLES EN INTERVALOS DE MINUTOS</p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={classes.graphicContainer}>
          <SimpleBarChart playerScores={playerScores} />
        </div>
      </div>
    </div>
  );
};

export default GoalsPerMinutes;
