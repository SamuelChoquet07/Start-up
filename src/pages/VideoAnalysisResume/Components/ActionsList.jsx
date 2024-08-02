import { useState } from "react";
import { Card, CardContent, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ActionButton from "../../../../components/ActionButton/ActionButton";
import Section from "../../../../components/Section/Section";
import Alert from "../../../../components/Alerts/Alert";
import evImg from "../../../../assets/img/evImg.png";
import EvaluationModal from "../../../../components/Modal/EvaluationModal";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { deleteAction } from "../../../../api/videoAnalisis.api";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import favourite from "../../../../assets/img/favorite.svg";
import nonFavourite from "../../../../assets/img/nonfavorite.png";

const useStyles = makeStyles(() => ({
  actionsListContainer: {
    width: "100%",
    height: "460px",
    overflowY: "scroll",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "#161F24",
    color: "#fff",
    width: "100%",
    p: "0.5rem",
    margin: "0.5rem",
    borderRadius: 0,
  },
  selectedCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "#161F24",
    color: "#fff",
    width: "100%",
    p: "0.5rem",
    margin: "0.5rem",
    borderRadius: 0,
    border: "1px solid white",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-bettween",
    alignItems: "center",
    padding: "2px 15px",
    gap: "1rem",
  },
  header: {
    display: "flex",
    alignItems: "end",
    gap: "0.6rem",
  },
  tag: {
    fontFamily: "Bebas-Bold",
    fontSize: "1rem",
    letterSpacing: 1,
    alignItems: "end",
    gap: "0.6rem",
  },
  player: {
    fontFamily: "Bebas-Bold",
    fontSize: "1rem",
    letterSpacing: 1,
    color: "#FFFFFF",
    opacity: 0.6,
  },
  icon: {
    backgroundColor: "rgba(65, 65, 65, 0.6)",
    borderRadius: 0,
    margin: "0.5vw",
    padding: "0.3vw",
  },
  iconContainer: {
    display: "flex",
  },
  evButton: {
    width: "30px",
    cursor: "pointer",
  },
  evDetail: {
    border: "2.6px solid white",
    borderRadius: "3px",
    width: "26px",
    height: "26px",
    margin: "0 0 0 0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.1rem 0.25rem",
  },
  starIcon: {
    width: "23px",
    height: "30px",
    margin: "0 0.5rem 0 0",
  },
}));

const ActionsList = ({
  actions,
  translate,
  userLogged,
  changeActionToShow,
  position,
  setPlaying,
  setPosition,
  handlePlayAction,
  playerActionsToShow,
  addFavouriteAction,
  setEvUpdate,
  evUpdate,
}) => {
  const classes = useStyles();

  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [actionId, setActionId] = useState("");
  const [eventId, setEventId] = useState("");

  const actionsToMap = actions ? actions : playerActionsToShow;

  const closeEvModal = (action) => {
    setOpenModal(!openModal);
    setEventId(action);
  };

  const handleOpenDelete = (id) => {
    setOpenDelete(!openDelete);
    setActionId(id);
  };

  const handleDelete = (id) => {
    deleteAction(id);
    setOpenDelete(!openDelete);
  };

  // console.log("ACTIONSTOMAP", actionsToMap);
  //console.log("ACTIONID", actionId);

  return (
    <div className={classes.actionsListContainer}>
      <Section title="Acciones">
        {actionsToMap?.map((action, index) =>
          openModal === true ? (
            <EvaluationModal
              userVotedId={action?.player?.user_id}
              userVotedName={action?.player.user_name}
              userVotedLastName={action?.player.lastname}
              playerId={action?.player?.player_id}
              buttonText="Evaluar Acción"
              eventType="ACTION"
              eventId={eventId}
              closeEvModal={closeEvModal}
              setEvUpdate={setEvUpdate}
              evUpdate={evUpdate}
            />
          ) : (
            <div>
              <Alert
                open={openDelete}
                onClose={handleOpenDelete}
                title={translate(
                  "are you sure you want to delete?",
                  userLogged.language
                )}
                onAcept={() => handleDelete(actionId)}
                onCancel={handleOpenDelete}
                acept={translate("acept", userLogged.language)}
                cancel={translate("cancel", userLogged.language)}
              />
              <Card
                className={
                  position === index ? classes.selectedCard : classes.card
                }
                key={index}
              >
                <CardContent className={classes.cardContent}>
                  <Box className={classes.header}>
                    <Typography
                      className={classes.tag}
                      component="div"
                      variant="h5"
                    >
                      {translate(action?.tag?.name, userLogged.language)}
                    </Typography>
                    <Typography
                      className={classes.player}
                      variant="subtitle2"
                      color="#8E8E8E"
                    >
                      {action?.player?.player_id === null
                        ? action?.player_extra.name
                        : `${action?.player?.user_name} ${action?.player?.lastname}`}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      className={classes.tag}
                      component="div"
                      variant="h5"
                    >
                      {`${action?.minute}`}
                    </Typography>
                  </Box>
                </CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    pl: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box className={classes.icon}>
                        <ActionButton
                          icon={
                            <PlayArrowIcon
                            //style={{ color: "blue" }}
                            />
                          }
                          tooltip={translate("play", userLogged.language)}
                          /*  onClick={() => {
                      setPlaying(true);
                      changeActionToShow(action);
                      setPosition(index);
                    }} */
                          onClick={() => {
                            handlePlayAction(action?.minute, action?.id_action);
                            setPosition(index);
                            setPlaying(true);
                            changeActionToShow(action);
                          }}
                        />
                      </Box>
                      <Typography
                        variant="subtitle3"
                        color="#fff"
                        component="div"
                      >
                        {action?.minute.replace(/-/g, ":")}
                      </Typography>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={
                          action?.favourite === true ? favourite : nonFavourite
                        }
                        alt="star"
                        className={classes.starIcon}
                        tooltip={translate("favourite", userLogged.language)}
                        //onClick={() => addFavouriteAction(action)}
                      />
                      <img
                        src={evImg}
                        alt=""
                        className={classes.evButton}
                        onClick={() => closeEvModal(action.id_action)}
                      ></img>

                      {action?.perception.color ? (
                        <div className={classes.evDetail}>
                          <p
                            style={{
                              fontWeight: "600",
                              marginLeft: "0.15rem",
                              fontSize: "1.2rem",
                              color: action.perception.color,
                            }}
                          >
                            {action?.perception?.value}
                          </p>
                          <StarBorderIcon
                            fontSize="small"
                            style={{ color: action?.perception.color }}
                          />
                        </div>
                      ) : null}
                      <ActionButton
                        icon={<DeleteOutlineIcon fontSize="large" />}
                        tooltip={translate("delete", userLogged.language)}
                        onClick={() => handleOpenDelete(action?.id_action)}
                      />
                    </div>
                  </Box>
                </Box>
              </Card>
            </div>
          )
        )}
      </Section>
    </div>
  );
};

export default ActionsList;
