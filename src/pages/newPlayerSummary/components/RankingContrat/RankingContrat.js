import { makeStyles } from "@material-ui/core/styles";
import RankingCard from "./RankingCard";
import styles from "../../styles/NewPlayerSummary.module.css";
import translate from "../../../../lang/lang";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    backgroundColor: "#142127",
    borderRadius: "20px",
    width: "42vw",
    height: "40vh",
    margin: "3rem 0",
  },
}));

const RankingContrat = ({ playerData }) => {
  const rankingData = playerData?.rankingData;

  const contractInfo = playerData?.contractInformation;
  const classes = useStyles;

  return (
    <div className={classes.container}>
      <RankingCard arrayToMap={rankingData} title={translate("ranking")} />
    </div>
  );
};

export default RankingContrat;
