import { makeStyles } from "@material-ui/core/styles";
import VerticalGameCard from "../../../../components/Cards/VerticalGameCard";
import Translate from "../../../../lang/lang";

const useStyles = makeStyles(() => ({
  lastMatches: {
    width: "25vw",
    height: "40vh",
    backgroundColor: "#142127",
    borderRadius: "20px",
    overflowY: "hidden",
    overflowX: "scroll",
    padding: "1rem",
  },
  normalText: {
    color: "white",
    fontSize: "1.4rem",
    fontFamily: " Hind Siliguri",
    fontWeight: "600",
  },
  flexDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const PlayerLastMatches = ({
  playerDetails,
  setOpen,
  setOpenVideoModal,
  setUrlModal,
  playerLastName,
}) => {
  const classes = useStyles();
  const lastMatches = playerDetails?.latestGames;
  const lang = JSON.parse(localStorage.getItem("user")).language;

  return (
    <div className={classes.lastMatches}>
      <div style={{ margin: "2% 5% 2% 5%" }}>
        <p className={classes.normalText}>{Translate("last games", lang)}</p>
      </div>
      <div className={classes.flexDiv} style={{ margin: " 5% 1rem 0 0" }}>
        {lastMatches?.map((game, index) => {
          return (
            <div style={{ margin: "0 0 0 4%" }} key={index}>
              <VerticalGameCard
                game={game}
                setOpen={setOpen}
                setOpenVideoModal={setOpenVideoModal}
                setUrlModal={setUrlModal}
                playerLastName={playerLastName}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerLastMatches;
