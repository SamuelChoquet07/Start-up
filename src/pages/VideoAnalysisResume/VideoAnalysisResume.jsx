import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import HeaderSection from "./Components/HeaderSection";
import VideoPlayerProgress from "./Components/VideoPlayerProgress";
import Field from "./Components/Field";
import Spinner from "../../../components/Spinner/Spinner";

//Material

import { makeStyles } from "@material-ui/core/styles";

//context
import videoAnalystContext from "../../../context/VideoAnalisysContext/VideoAnalisysContext";
import UserContext from "../../../context/UserContext/UserContext";
import translate from "../../../lang/lang";
import AnalysisActions from "./Components/AnalysisActions";
import PlayerContext from "../../../context/PlayerContext/PlayerContext";
import { deleteAction } from "../../../api/videoAnalisis.api";
import { useMemo } from "react";

const useStyles = makeStyles(() => ({
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 0.8fr 0.8fr",
    gridGap: "1rem",
    width: "100%",

    marginTop: "2rem",
    textAlign: "center",
  },
  columnOne: {
    gridColumn: "1/2",
    width: "100%",
    overflowY: "auto",
  },

  columnTwo: {
    gridColumn: "2/3",
    width: "100%",
    overflowY: "auto",
  },

  columnThree: {
    gridColumn: "3/3",
    width: "100%",
    overflowY: "auto",
    backgroundColor: "rgba(33, 33, 33, 0.5)",
    marginRight: "1rem",
  },
}));

const VideoAnalysisResume = () => {
  const classes = useStyles();

  const videoAnalisysContext = useContext(videoAnalystContext);
  const {
    analysisId,
    getAnalysisId,
    actionsById,
    getActionsById,
    setAnalysisId,
  } = videoAnalisysContext;

  const userContext = useContext(UserContext);
  const { userLogged } = userContext;

  const playerContext = useContext(PlayerContext);
  const { getPlayers, players, getPlayerExtra, playerExtra } = playerContext;

  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [actionId, setActionId] = useState("");
  const [sendPetition, setSendPetition] = useState(false);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [startVideo, setStartVideo] = useState(0);
  const [endVideo, setEndVideo] = useState(0);
  const [openPlayer, setOpenPlayer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playActionId, setPlayActionId] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [evUpdate, setEvUpdate] = useState(false);

  const handleOpen = (id) => {
    setOpen(!open);
    setActionId(id);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const handleDelete = (id) => {
    deleteAction(id);
    setOpen(!open);
    setSendPetition(true);
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekMouseUp = () => {
    setSeeking(false);
  };

  const handleProgress = (e) => {
    setPlayed(e.played);
  };

  const handlePlayAction = (minute, id) => {
    setOpenPlayer(true);
    setPlaying(true);
    setPlayActionId(id);
    setStartVideo(minute);
  };

  const handlePauseAction = () => {
    setPlaying(false);
  };

  const handleCloseAction = () => {
    setOpenPlayer(false);
  };

  useEffect(() => {
    getAnalysisId(id);
    setTimeout(() => {
      setSendPetition(false);
      setLoading(true);
    }, 2000);

    return () => {
      setAnalysisId(null);
    };
  }, [sendPetition, evUpdate]);

  useMemo(() => {
    getActionsById(playActionId);
  }, [playActionId]);

  if (!loading) {
    return <Spinner />;
  } else {
    return (
      <div style={{ height: "75vh" }}>
        <HeaderSection analysisId={analysisId} />

        <div>
          <div className={classes.grid}>
            <div className={classes.columnOne}>
              <VideoPlayerProgress
                analysisId={analysisId}
                url={analysisId.video?.url}
                userLogged={userLogged}
                translate={translate}
                played={played}
                onChange={(e) => handleSeekChange(e)}
                onProgress={(e) => handleProgress(e)}
                onMouseDown={(e) => handleSeekMouseDown(e)}
                onMouseUp={(e) => handleSeekMouseUp(e)}
              />
            </div>
            <div className={classes.columnTwo}>
              <Field
                getPlayers={getPlayers}
                players={players}
                getPlayerExtra={getPlayerExtra}
                playerExtra={playerExtra}
                analysisId={analysisId}
                userLogged={userLogged}
                translate={translate}
              />
            </div>
            <div className={classes.columnThree}>
              <AnalysisActions
                setPlayActionId={setPlayActionId}
                analysisId={analysisId}
                setAnalysisId={setAnalysisId}
                startVideo={startVideo}
                setEndVideo={setEndVideo}
                endVideo={endVideo}
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
                handleDelete={handleDelete}
                actionId={actionId}
                translate={translate}
                userLogged={userLogged}
                handlePlayAction={handlePlayAction}
                openPlayer={openPlayer}
                handleCloseAction={handleCloseAction}
                actionsById={actionsById}
                handlePauseAction={handlePauseAction}
                playing={playing}
                setPlaying={setPlaying}
                sendPetition={sendPetition}
                setSendPetition={setSendPetition}
                setEvUpdate={setEvUpdate}
                evUpdate={evUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default VideoAnalysisResume;
