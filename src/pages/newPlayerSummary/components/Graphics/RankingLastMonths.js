import { makeStyles } from "@material-ui/core/styles";
import SimpleLineChart from "../../../GoalkeeperExercise/components/Charts/SimpleLineChart";
const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: "#142127",
    width: "40vw",
    height: "54vh",
    borderRadius: "20px",
    margin: "0 2% 0 0",
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

const RankingLastMonths = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div style={{ margin: "1rem" }}>
        <p className={classes.text}>EVOLUCION DEL RANKING ULTIMOS 12 MESES</p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={classes.graphicContainer}>
          <SimpleLineChart />
        </div>
      </div>
    </div>
  );
};

export default RankingLastMonths;
