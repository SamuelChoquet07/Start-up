import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ActionButton from "../../../../components/ActionButton/ActionButton";
import makeEvaluationIcon from "../../../../components/IconsSvg/newEvaluationMatchIconSVG.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Alert from "../../../../components/Alerts/Alert";
import PopUpPlayer from "../../../../components/Modal/PopUpPlayer";
import { FaRegPlayCircle } from "react-icons/fa";
import { BsSliders } from "react-icons/bs";
import favorite from ".//favorite.svg";
import nonfavorite from ".//nonfavorite.png";
import { updateAction } from "../../../../api/videoAnalisis.api";
import Swal from "sweetalert2";
import MakeEvaluationFlex from "../../../MakeEvaluation/MakeEvaluationFlex";


const useStyles = makeStyles(() => ({
  overflow: {
    overflowX: "hidden",
    height: "60vh",
    backgroundColor: "#142127",
    borderRadius: "5px",
  },
  actionsTextContainer: {
    backgroundColor: "#142127",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "auto",
    width: "100%",
    borderRadius: "10px",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    paddingLeft: "0.2rem",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center", 
    backgroundColor: "#142C39",
    color: "#fff",
    borderRadius: "10px",
    motionRotation: "0.5s",
    marginBottom: "1.5rem",
    justifyContent: "space-between",
  },

  cardContent: {
    display: "flex",
    alignItems: "center",
    padding: "2px 0px",
    height: "100%",
    flex: 1, 
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
  },
  tag: {
    fontFamily: "Hind Siliguri",
    fontSize: "1.3rem",
    letterSpacing: 1,
    display: "flex",
    justifyContent: "flex-start",
    gap: "0.6rem",
    paddingLeft: "1rem",
    textTransform: "capitalize",
  },
  player: {
    fontFamily: "Hind Siliguri",
    fontSize: "1.3rem",
    letterSpacing: 1,
    display: "flex",
    justifyContent: "flex-start",
    gap: "0.6rem",
    paddingLeft: "1rem",
    color: "#CACACA",
    textTransform: "capitalize",
  },
  icon: {
    backgroundColor: "rgba(65, 65, 65, 0.6)",
    borderRadius: 0,
    margin: "0.5vw",
    padding: "0.3vw",
  },
  iconContainer: {
    width: "100%",
    flexDirection: "row",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  noActions: {
    fontSize: "1.3rem",
    background: "#142127",
    borderRadius: "10px",
    marginTop: "1rem",
    padding: "1rem",
  },
  sliderIcon: {
    width: "2rem",
    height: "2rem",
    marginRight: "1.5rem",
    "&:hover": {
      color: "#00FFFF",
      cursor: "pointer",
    },
  },
  actionType: {
    display: "flex",
    left: "0",
    margin: "0",
    padding: "0",
    width: "auto",
    height: "100%",
  },
  videoMinuteInfo: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "20%",
  },
  fullHeight: {
    height: "100%",
  },
  videoInfo: {
    paddingLeft: "1rem",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    fontSize: "1.7vh",
    display: "grid",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gridTemplateColumns: "30% 30%",
  },
  playIcon: {
    alignItems: "center",
    width: "3vh",
    height: "3vh",
    "&:hover": {
      color: "#00FFFF",
      cursor: "pointer",
    },
  },
  actionName: {
    display: "flex",
    justifyContent: "flex-start",
    fontSize: "1.7vh",
  },
  evButton: {
    width: "30px",
    height: "30%",
    cursor: "pointer",
    margin: "0 0 0 0.5rem",
  },
  evDetail: {
    border: "2.5px solid white",
    borderRadius: "3px",
    width: "26px",
    height: "26px",
    margin: "0 0 0 0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const AnalysisActions = ({
  analysisId,
  open,
  handleClose,
  handleOpen,
  handleDelete,
  actionId,
  translate,
  userLogged,
  handlePlayAction,
  openPlayer,
  handleCloseAction,
  startVideo,
  actionsById,
  playing,
  setPlaying,
  endVideo,
  handlePauseAction,
  setSendPetition,
  sendPetition,
  setEvUpdate,
  evUpdate,
}) => {
  const classes = useStyles();
  const actionsId = analysisId?.actions;

  const [selectedAction, setSelectedAction] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [favourite, setFavourite] = useState("");

  const [actionToShow, setActionToShow] = useState(actionsById);
  const [position, setPosition] = useState(0);

  const seconds =
    actionToShow &&
    actionToShow?.minute?.slice(0, 2) * 3600 +
      actionToShow?.minute?.slice(3, 5) * 60 +
      Number(actionToShow?.minute?.slice(6)) -
      4;

  const urlVideo = `${analysisId?.video?.url}?t=${seconds}`;

  const changeActionToShow = (action) => {
    setActionToShow(action);
  };

  const [reproductor, setReproductor] = useState("");
  const [stopReproductor, setStopReproductor] = useState("");
  const [resumeReproductor, setResumeReproductor] = useState("");
  const [openModal, setOpenModal] = useState(false);

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
  };

  const closeEvModal = () => {
    setOpenModal(!openModal);
  };

  const handleSliders = () => {
    console.log("handleSliders pendiente lógica");
  };

  const addFavouriteAction = async (data) => {
    const title = data.favourite
      ? "¿Quieres eliminar esta acción de favoritos?"
      : "¿Quieres añadir esta acción a favoritos?";
    Swal.fire({
      background: "#121212",
      title: title,
      showDenyButton: true,
      confirmButtonText: data.favourite ? "Eliminar" : "Añadir",
      confirmButtonColor: "#00FFFF",
      denyButtonText: "Cancelar",
      didRender: () => {
        const title = document.querySelector(".swal2-title");
        if (title) {
          title.style.color = "#FFFFFF";
        }
        const confirmButton = document.querySelector(".swal2-confirm");
        const denyButton = document.querySelector(".swal2-deny");
        if (confirmButton) {
          confirmButton.style.color = "#121212";
          denyButton.style.borderRadius = "5px";
        }

        if (denyButton) {
          denyButton.style.color = "#FFFFFF";
          denyButton.style.border = "1px solid #00FFFF";
          denyButton.style.borderRadius = "5px";
          denyButton.style.backgroundColor = "#121212";
        }
        const modal = document.querySelector(".swal2-popup");
        if (modal) {
          modal.style.boxShadow = "0px 0px 20px 0px #00FFFF70";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        updateAction(data);
        setTimeout(() => {
          setSendPetition(!sendPetition);
        }, 2000);
      }
      if (result.isDenied) {
      }
    });
  };
  useEffect(() => {
    setSecondsParams(0);
  }, [reproductor]);

  useEffect(() => {
    if (actionsId && actionsId !== null && actionsId.length > 0) {
      setActionToShow(actionsId[position]);
    }
  }, [actionsId, position]);

  const [secondsParams, setSecondsParams] = useState(0);

  useEffect(() => {
    if (playing) {
      const intervalId = setInterval(() => {
        setSecondsParams((secondsParams) => secondsParams + 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [secondsParams, playing]);

  if (secondsParams === 11) {
    const longArray = actionsId?.length - 1;
    setSecondsParams(0);
    if (position === longArray) {
      setPosition(undefined);
      handlePauseAction();
    } else {
      setPosition(position + 1);
      setActionToShow(actionsId[position + 1]);
    }
  }

  const handleEvaluateActions = (action) => {
    setSelectedAction(action);
    setIsPopupOpen(true);
  };

  return (
    <div className={classes.overflow}>
      <MakeEvaluationFlex
        userVotedName={selectedAction?.player?.user_name}
        userVotedId={selectedAction?.player?.user_id}
        userVotedSubType={"spontaneous"}
        eventType={"ACTION"}
        userVotedPosition={
          selectedAction?.player?.role_ashort
            ? selectedAction?.player?.role_ashort
            : "FREE"
        }
        eventId={selectedAction.id_action}
        estado={isPopupOpen}
        setEstado={setIsPopupOpen}
      />
      <PopUpPlayer
        open={openPlayer}
        title="action"
        cancel="X"
        onClose={() => handleCloseAction()}
        url={urlVideo}
        startVideo={startVideo}
        actionsById={actionToShow}
        userLogged={userLogged}
        actions={actionsId}
        changeActionToShow={changeActionToShow}
        position={position}
        setPosition={setPosition}
        playing={playing}
        setPlaying={setPlaying}
        endVideo={endVideo}
        handlePlayAction={handlePlayAction}
        startReproductorVideo={startReproductorVideo}
        stopReproductorVideo={stopReproductorVideo}
        resumeReproductorVideo={resumeReproductorVideo}
        seconds={seconds}
        addFavouriteAction={addFavouriteAction}
        setEvUpdate={setEvUpdate}
        evUpdate={evUpdate}
      />
      <div className={classes.actionsTextContainer}>
        <h2
          style={{
            marginLeft: "1rem",
            textTransform: "capitalize",
            fontFamily: "Hind Siliguri",
            fontSize: "2vh",
          }}
        >
          {translate("actions", userLogged.language)}
        </h2>
        <BsSliders
          className={classes.sliderIcon}
          style={{ display: "none" }}
          onClick={handleSliders}
        />
      </div>
      {actionsId === null || actionsId === undefined ? (
        <p className={classes.noActions}>
          {translate("there are no actions created", userLogged.language)}
        </p>
      ) : (
        <div>
          {actionsId?.map((action, index) => {
            return (
              <div key={index}>
                <Alert
                  open={open}
                  onClose={handleClose}
                  title={translate(
                    "are you sure you want to delete?",
                    userLogged.language
                  )}
                  onAcept={() => handleDelete(actionId)}
                  onCancel={handleClose}
                  acept={translate("acept", userLogged.language)}
                  cancel={translate("cancel", userLogged.language)}
                />
                <Card className={classes.card} key={index}>
                  <table style={{ width: "100%", height: "100%" }}>
                    <tbody>
                      <tr>
                        <td
                          style={{
                            background: action.tag.colour
                              ? action.tag.colour
                              : "#FD5F85",
                            width: "2vh",
                            height: "9vh",
                            borderRadius: "10px",
                            margin: "0",
                          }}
                        ></td>
                        <td
                          className={classes.videoInfo}
                          onClick={() => {
                            handleEvaluateActions(action.minute);
                          }}
                        >
                          <FaRegPlayCircle
                            className={classes.playIcon}
                            onClick={() => {
                              handlePlayAction(
                                action?.minute,
                                action?.id_action
                              );
                              setPosition(index);
                            }}
                            tooltip={translate("play", userLogged.language)}
                          />
                          <Typography
                            className={classes.actionName}
                            component="div"
                          >
                            {action?.minute !== null
                              ? action?.minute?.replace(/-/g, ":")
                              : null}
                          </Typography>
                        </td>
                        <td style={{ width: "25%", textAlign: "start" }}>
                          <Typography
                            className={classes.tag}
                            variant="h5"
                            component="div"
                            style={{
                              fontSize: "0.95rem",
                              textTransform: "capitalize",
                            }}
                          >
                            {translate(action?.tag?.name, userLogged.language)}
                          </Typography>
                        </td>
                        <td style={{ width: "25%", textAlign: "start" }}>
                          <Typography
                            className={classes.player}
                            style={{
                              fontSize: "1.7vh",
                              textTransform: "capitalize",
                            }}
                          >
                            {action?.player?.player_id === null
                              ? action?.player_extra.name
                              : `${action?.player?.user_name} ${action?.player?.lastname}`}
                          </Typography>
                        </td>
                        <td style={{ width: "10%" }}>
                          <div className={classes.iconContainer}>
                            <img
                              src={makeEvaluationIcon}
                              style={{
                                cursor: "pointer",
                                marginRight: "0.5rem",
                              }}
                              alt="create-evaluation"
                              tooltip={translate(
                                "evaluate action",
                                userLogged.language
                              )}
                              onClick={() => {
                                handleEvaluateActions(action);
                              }}
                            />

                            {action.favourite === true ? (
                              <img
                                src={favorite}
                                alt="star"
                                width="23px"
                                height="30px"
                                className={classes.starIcon}
                                tooltip={translate(
                                  "favourite",
                                  userLogged.language
                                )}
                                onClick={() => addFavouriteAction(action)}
                              />
                            ) : (
                              <img
                                src={nonfavorite}
                                alt="star"
                                width="23px"
                                height="30px"
                                className={classes.starIcon}
                                tooltip={translate(
                                  "favourite",
                                  userLogged.language
                                )}
                                onClick={() => addFavouriteAction(action)}
                              />
                            )}                     
                            <ActionButton
                              icon={<DeleteIcon fontSize="large" />}
                              tooltip={translate("delete", userLogged.language)}
                              onClick={() => handleOpen(action.id_action)}
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AnalysisActions;
