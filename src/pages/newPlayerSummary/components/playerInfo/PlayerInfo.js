import PlayerInfoCard from "./PlayerInfoCard";
import PlayerDetails from "./PlayerDetails";
import PlayerLastMatches from "./PlayerLastMatches";
import styles from "../../styles/NewPlayerSummary.module.css";

const PlayerInfo = ({
  playerDetails,
  playerId,
  handleFavAction,
  setOpen,
  setOpenVideoModal,
  setUrlModal,
  playerValue,
}) => {
  return (
    <div className={styles.playerGeneralInfo}>
      <PlayerInfoCard
        playerDetails={playerDetails}
        playerId={playerId}
        handleFavAction={handleFavAction}
        userId={playerDetails?.playerData?.userId}
        playerValue={playerValue}
      />
      <PlayerDetails playerDetails={playerDetails} />
      <PlayerLastMatches
        playerDetails={playerDetails}
        setOpen={setOpen}
        setOpenVideoModal={setOpenVideoModal}
        setUrlModal={setUrlModal}
        playerLastName={playerDetails?.playerData?.userLastName}
      />
    </div>
  );
};

export default PlayerInfo;
