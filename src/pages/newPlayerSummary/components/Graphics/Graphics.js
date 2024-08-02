import { makeStyles } from "@material-ui/core/styles";
import GoalsPerMinutes from "./GoalsPerMinute";
import RankingLastMonths from "./RankingLastMonths";

const useStyles = makeStyles(() => ({
  container: {
    width: "87vw",
    height: "60vh",
    display: "flex",
    margin: "3rem 5.5rem",
    justifyContent: "space-between",
    "@media (max-width: 1750px)": {
      width: "83vw",
    },
  },
}));

const Graphics = ({ playerScores }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <GoalsPerMinutes playerScores={playerScores} />
      <RankingLastMonths />
    </div>
  );
};

export default Graphics;
