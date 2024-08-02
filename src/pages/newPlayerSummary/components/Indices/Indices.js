import { makeStyles } from "@material-ui/core/styles";
import TimeLine from "./TimeLine";
import RadarChart from "./RadarChart";
import PlayerValoration from "../../../PlayerInfo/PlayerValoration";
import styles from "../../styles/NewPlayerSummary.module.css";
import translate from "../../../../lang/lang";
import { useState, useEffect } from "react";

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: "#142127",
    width: "87vw",
    borderRadius: "20px",
    margin: "3 0",
    "@media (max-width: 1750px)": {
      width: "81.5vw",
    },
  },
  text: {
    color: "white",
    fontSize: "1.4rem",
    fontFamily: "Hind Siliguri",
    fontWeight: "600",
  },
}));

const Indices = ({ playerDetails }) => {
  const [playerInformation, setPlayerInformation] = useState(playerDetails);

  useEffect(() => {
    setPlayerInformation(playerDetails?.playerData?.userId);
  }, [playerDetails]);

  const classes = useStyles();
  return (
    <div className={styles.playerEvaluations}>
      <div style={{ width: "100%", margin: "2% 5% 2% 5%" }}>
        <p className={classes.text}>{translate("evaluation history")}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ margin: "0 2rem" }}>
          <TimeLine />
        </div>
        <div style={{ margin: "0 2rem" }}>
          <RadarChart playerData={playerDetails?.playerData} />
        </div>
      </div>
      <div>
        <PlayerValoration playerData={playerInformation} />
      </div>
    </div>
  );
};

export default Indices;
