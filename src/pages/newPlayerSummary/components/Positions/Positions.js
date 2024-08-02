import FieldPositions from "./FieldPositions";
import FieldGraphic from "./FieldGraphic";
import RankingContrat from "../RankingContrat/RankingContrat";
import styles from "../../styles/NewPlayerSummary.module.css";

const Positions = ({ playerData, playerPositions }) => {
  return (
    <div className={styles.playerPositionAndRanking}>
      <FieldPositions playerData={playerData} />
      <FieldGraphic playerPositions={playerPositions} />
      <RankingContrat playerData={playerData} />
    </div>
  );
};

export default Positions;
