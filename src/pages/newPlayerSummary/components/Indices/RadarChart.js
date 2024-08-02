import { makeStyles } from "@material-ui/core/styles";
import SimpleRadarChart from "./SimpleRadarChart";

const useStyles = makeStyles(() => ({
  conatiner: {
    backgroundColor: "#121212",
    width: "30vw",
    height: "50vh",
    borderRadius: "20px",
    margin: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width: 1750px)": {
      height: "48vh",
    },
  },
}));

const RadarChart = ({ playerData }) => {
  const classes = useStyles();
  //   const charData = playerData?.cualitativeData?.map((data) => ({
  //     subject: data?.label,
  //     A: data?.value,
  //     fullMark: 1,
  //   }));

  const data = [
    {
      subject: "PHYSICAL",
      A: 0.6,
      B: 0.2,
      fullMark: 1,
    },
    {
      subject: "TECHNICAL",
      A: 0.6,
      B: 0.2,
      fullMark: 1,
    },
    {
      subject: "TACTICAL",
      A: 0.5,
      B: 0.6,
      fullMark: 1,
    },
    {
      subject: "MENTAL",
      A: 0.5,
      B: 0.4,
      fullMark: 1,
    },
  ];
  return (
    <div className={classes.conatiner}>
      <SimpleRadarChart data={data} />
    </div>
  );
};

export default RadarChart;
