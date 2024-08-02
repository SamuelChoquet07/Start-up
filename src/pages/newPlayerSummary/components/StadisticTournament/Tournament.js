import { makeStyles } from "@material-ui/core/styles";
import TournamentCard from "../../../../components/Button/TournamentCard";

const useStyles = makeStyles(() => ({
  conatiner: {
    width: "37vw",
    height: "42vh",
    backgroundColor: "#142127",
    borderRadius: "20px",
    margin: "3rem 0 0 3rem",
  },
  flexDiv: {
    disaplay: "flex",
  },
  normalText: {
    color: "white",
    fontSize: "1.5rem",
  },
}));

const Tournament = ({ playerAnalitycData }) => {
  const classes = useStyles();

  return (
    <div className={classes.conatiner}>
      <div style={{ margin: "1rem" }}>
        <p className={classes.normalText}>TORNEOS</p>
      </div>
      <div className={classes.flexDiv}>
        <TournamentCard />
      </div>
    </div>
  );
};

export default Tournament;
