import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useContext } from "react";
import PlayButton from "../../../../components/Button/PlayButton";
import PlayerContext from "../../../../context/PlayerContext/PlayerContext";
import translate from "../../../../lang/lang";

const useStyles = makeStyles(() => ({
  statsContainer: {
    fontFamily: "Hind Siliguri",
    width: "39vw",
    height: "42vh",
    backgroundColor: "#142127",
    borderRadius: "20px",
    margin: "3rem 0 0 3rem",
  },
  flexDiv: {
    display: "flex",
    justifyContent: "start",
    marginLeft: "0.5rem",
    flexWrap: "wrap",
    overflowY: "hidden",
    overflowX: "hidden",
    height: "34vh",
  },
  normalText: {
    color: "white",
    fontSize: "1.4rem",
    fontWeight: "600",
  },
}));

const Actions = ({ playerId, handleOpenModal }) => {
  const classes = useStyles();
  const playerContext = useContext(PlayerContext);
  const { actionsPlayer, getActionsPlayer } = playerContext;

  useEffect(() => {
    setTimeout(() => {
      getActionsPlayer(playerId);
    }, 3000);
  }, []);

  return (
    <div className={classes.statsContainer}>
      <div style={{ margin: "2% 5% 2% 2%" }}>
        <p className={classes.normalText}>VIDEOS</p>
      </div>
      {actionsPlayer === "" || actionsPlayer === undefined ? (
        <div
          className={classes.flexDiv}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            height: "70%",
          }}
        >
          No hay videos para mostrar
        </div>
      ) : (
        <div className={classes.flexDiv}>
          {actionsPlayer?.map((data, index) => {
            return (
              <div style={{ margin: "0.3rem" }} key={index}>
                <PlayButton
                  text={translate(data?.name)}
                  number={data?.total}
                  handleOpenModal={handleOpenModal}
                  id={data?.id}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Actions;
