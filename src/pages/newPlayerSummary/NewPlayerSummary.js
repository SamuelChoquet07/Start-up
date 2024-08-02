import { useParams } from "react-router-dom";
import { useState, useEffect, useContext, useRef, useMemo } from "react";
//Components
import PlayerInfo from "./components/playerInfo/PlayerInfo";
import CheckboxDiv from "./components/CheckboxDiv";
import StadisticTournament from "./components/StadisticTournament/StadisticTournament";
import EvaluationSkills from "./components/EvaluationSkills/EvaluationSkills";
import Indices from "./components/Indices/Indices";
import Positions from "./components/Positions/Positions";
import Graphics from "./components/Graphics/Graphics";
import RankingContrat from "./components/RankingContrat/RankingContrat";
import PopUpSummary from "../PlayerSummary/components/PopUpSummary";
import VideoModal from "../Tournaments/Components/VideoModal";
import translate from "../../lang/lang";
import PerceptionDetails from "./components/Indices/PerceptionDetails";
import Spinner from "../../components/Spinner/Spinner";
import swal from "sweetalert";
import PlayerContext from "../../context/PlayerContext/PlayerContext";
import VideoAnalystContext from "../../context/VideoAnalisysContext/VideoAnalisysContext";
import UserContext from "../../context/UserContext/UserContext";

import styles from "./styles/NewPlayerSummary.module.css";
import usePlayerInfo from "../../hooks/usePlayerInfo";

const NewPlayerSummary = () => {
  const playerContext = useContext(PlayerContext);
  const {
    getIndexPlayer,
    indexPlayer,
    setIndexPlayer,
    positions,
    getPositions,
    actionsPlayer,
    getActionsPlayer,
    getPlayerActionsToShow,
    playerActionsToShow,
    getPlayerIdInfo,
  } = playerContext;
  const videoAnalysisContext = useContext(VideoAnalystContext);
  const { getActionsById, actionsById, getAnalysisId, analysisId } =
    videoAnalysisContext;
  const userContext = useContext(UserContext);
  const userLogged = userContext.userLogged;

  const { id, userId } = useParams();
  const { handlePlayerId } = usePlayerInfo();

  useEffect(() => {
    getPlayerIdInfo(userId);
  }, [userId]);

  const playerId = Number(id);
  const [reproductor, setReproductor] = useState("");
  const [stopReproductor, setStopReproductor] = useState("");
  const [resumeReproductor, setResumeReproductor] = useState("");
  const [open, setOpen] = useState(false);
  const [player, setPlayer] = useState(id);
  const [playing, setPlaying] = useState(false);
  const [url, setUrl] = useState("");
  const [startVideo, setStartVideo] = useState(0);
  const [playActionId, setPlayActionId] = useState(0);
  const [firstPlay, setFirstPlay] = useState(false);
  const [position, setPosition] = useState(0);
  const [tag, setTag] = useState("");
  const [secondsParams, setSecondsParams] = useState(0);
  const [seconds, setSeconds] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fav, setFav] = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [urlModal, setUrlModal] = useState("");

  let playerDetails = [];
  let playerStats = [];
  let playerData = [];
  let playerScores = [];
  let playerPositions = [];
  let playerValue = 0;
  const [showPerceptionDetails, setShowPerceptionDetails] = useState(false);
  let playerPerceptionDetails = [];

  if (indexPlayer?.length !== 0 && indexPlayer !== undefined) {
    playerDetails = indexPlayer[0]?.playerDetailsData;
    playerValue =
      indexPlayer[0]?.playerDetailsAnalitycData?.playerStats[3]?.value;
    playerStats = indexPlayer[0]?.playerDetailsAnalitycData?.playerStats;
    playerData = playerDetails?.playerData;
    playerScores = indexPlayer[0]?.playerScores.data;
    playerPositions = indexPlayer[0]?.playerDetailsAnalitycData?.demarcation;
    playerPerceptionDetails =
      indexPlayer[0]?.playerDetailsAnalitycData?.playerStats[0]?.indexDetail;
  }

  const [indexDetails, setIndexDetails] = useState([]);
  const [modalTitle, setModalTitle] = useState();

  const pos = positions.map((data) => ({
    id: data?.id,
    name: data?.name,
  }));

  const handleOpenModal = (tagId) => {
    setTag(tagId);
    setOpen(true);
    setPlaying(true);
    setPosition(0);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setPlaying(false);
    setFirstPlay(false);
    setPosition(0);
    setSeconds("");
    setUrl("");
    setSecondsParams(0);
  };

  const startReproductorVideo = (begin) => {
    setReproductor(begin);
  };

  const stopReproductorVideo = () => {
    setStopReproductor(secondsParams);
    setPlaying(false);
  };

  const resumeReproductorVideo = () => {
    setResumeReproductor(stopReproductor);
    setPlaying(true);
    setSecondsParams(secondsParams);
  };

  const playAction = (url, minute, index, id, source) => {
    setFirstPlay(true);
    setSecondsParams(0);
    setPlaying(false);
    setPosition(index);
    setPlayActionId(id);
    setTimeout(() => {
      setPlaying(true);
    }, 200);

    setSeconds(
      minute?.slice(0, 2) * 3600 +
        minute?.slice(3, 5) * 60 +
        Number(minute?.slice(6)) -
        5
    );
    if (source === "DRIVE") {
      setUrl(`https://drive.google.com/uc?export=download&id=${url}`);
    } else {
      setUrl(`https://youtu.be/${url}?t=${seconds}`);
    }
  };

  const handlePauseAction = () => {
    setPlaying(false);
  };

  const handleShowPerceptionDetails = () => {
    setShowPerceptionDetails(!showPerceptionDetails);
  };

  const handleFavAction = () => {
    setFav(!fav);
    setTimeout(() => {
      if (playerActionsToShow?.length !== 0) {
        setOpen(true);
        setPlaying(true);
        setPosition(0);
      } else {
        swal({
          title: translate("Info"),
          text: translate("Este jugador aún no tiene juagadas destacadas"),
          icon: "info",
        });
      }
    }, 1000);
  };

  useEffect(() => {
    setIndexPlayer(undefined);
  }, []);

  useEffect(() => {
    getIndexPlayer(playerId);
    getPositions(`?&limit=1000`);
  }, [playerId]);

  useEffect(() => {
    getActionsPlayer(id);
  }, []);

  useEffect(() => {
    getPlayerActionsToShow(`?tag=${tag}&active=1&player=${player}`);

  }, [tag, player]);

  useEffect(() => {
    getActionsById(playActionId);
  }, [playActionId]);

  useEffect(() => {
    getPlayerActionsToShow(`?player=${id}&favourite=only&active=1`);
  }, [fav]);

  return (
    <div styles={{ background: "yellow" }}>
      {indexPlayer?.length === 0 || indexPlayer === undefined ? (
        <Spinner />
      ) : null}
      {open === true ? (
        <PopUpSummary
          startReproductorVideo={startReproductorVideo}
          stopReproductorVideo={stopReproductorVideo}
          resumeReproductorVideo={resumeReproductorVideo}
          open={open}
          handleCloseModal={handleCloseModal}
          translate={translate}
          userLogged={userLogged}
          playerActionsToShow={playerActionsToShow}
          playing={playing}
          setPlaying={setPlaying}
          url={url}
          setUrl={setUrl}
          startVideo={startVideo}
          playAction={playAction}
          position={position}
          actionsById={actionsById}
          setPosition={setPosition}
          setStartVideo={setStartVideo}
          firstPlay={firstPlay}
          setPlayActionId={setPlayActionId}
          handlePauseAction={handlePauseAction}
          setFirstPlay={setFirstPlay}
          setSecondsParams={setSecondsParams}
          secondsParams={secondsParams}
          seconds={seconds}
          setSeconds={setSeconds}
        />
      ) : null}
      {openVideoModal === true ? (
        <VideoModal
          videoUrl={urlModal}
          activeModal={true}
          setOpenVideoModal={setOpenVideoModal}
        />
      ) : null}
      <div
        className={styles.generalSectionContainer}
      >
        {showPerceptionDetails ? (
          <PerceptionDetails
            playerPerceptionDetails={indexDetails}
            onClick={handleShowPerceptionDetails}
            showPerceptionDetails={showPerceptionDetails}
            title={modalTitle}
          />
        ) : null}
        <div className={styles.playerGeneralInfoContainer}>
          <PlayerInfo
            playerDetails={playerDetails}
            playerId={playerId}
            handleFavAction={handleFavAction}
            setOpen={setOpen}
            setOpenVideoModal={setOpenVideoModal}
            setUrlModal={setUrlModal}
            playerValue={playerValue}
          />
        </div>
        <div className={styles.playerInfoAndVideosContainer}>
          <StadisticTournament
            playerStats={playerStats}
            playerId={playerId}
            handleOpenModal={handleOpenModal}
            onClick={handleShowPerceptionDetails}
            setIndexDetails={setIndexDetails}
            setModalTitle={setModalTitle}
          />
        </div>
        {/* <CheckboxDiv /> */}
        <div className={styles.playerSkillsInfoContainer}>
          <EvaluationSkills playerData={playerData} />
        </div>
        <div className={styles.playerEvaluationsContainer}>
          <Indices playerDetails={playerDetails} />
        </div>
        <div className={styles.playerPositionAndRankingContainer}>
          <Positions
            playerData={playerData}
            pos={pos}
            playerPositions={playerPositions}
          />
        </div>
        <Graphics playerScores={playerScores} />
        <RankingContrat playerData={playerData} />
      </div>
    </div>
  );
};

export default NewPlayerSummary;
