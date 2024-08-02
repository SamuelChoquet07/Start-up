import Stadistics from "./Stadistics";
import Actions from "./Actions";
import styles from "../../styles/NewPlayerSummary.module.css";

const StadisticTournament = ({
  playerStats,
  playerId,
  onClick,
  showPerceptionDetails,
  handleOpenModal,
  setIndexDetails,
  setModalTitle,
}) => {
  return (
    <div className={styles.playerInfoAndVideos}>
      <Stadistics
        playerStats={playerStats}
        onClick={onClick}
        showPerceptionDetails={showPerceptionDetails}
        setIndexDetails={setIndexDetails}
        setModalTitle={setModalTitle}
      />
      <Actions playerId={playerId} handleOpenModal={handleOpenModal} />
    </div>
  );
};

export default StadisticTournament;
