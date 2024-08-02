import { makeStyles } from "@material-ui/core/styles";
import DetailButton from "../../../../components/Button/DetailButton";
import Translate from "../../../../lang/lang";

const useStyles = makeStyles(() => ({
  playerInfoDiv: {
    width: "auto",
    height: "40vh",
    backgroundColor: "#142127",
    borderRadius: "20px",
    marginLeft: "1rem",
    marginRight: "1rem",
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
    justifyContent: "center",
  },
  detailDiv: {
    margin: "0.5rem 0.5rem 0 0",
  },
}));

const handleAction = () => {
  console.log("paso por aca");
};

const PlayerDetails = ({ playerDetails }) => {
  const classes = useStyles();
  const data = playerDetails;
  const lang = JSON.parse(localStorage.getItem("user")).language;

  return (
    <div className={classes.playerInfoDiv}>
      <div style={{ margin: "2% 5% 2% 5%" }}>
        <p className={classes.normalText}>{Translate("information", lang)}</p>
      </div>
      <div className={classes.flexDiv}>
        <div className={classes.detailDiv}>
          <DetailButton
            text={Translate("age", lang)}
            number={data?.playerData?.age}
          />
        </div>
        <div className={classes.detailDiv}>
          <DetailButton
            text={Translate("weight", lang)}
            number={data?.playerData?.weight}
            unit="Kg"
          />
        </div>
        <div className={classes.detailDiv}>
          <DetailButton
            text={Translate("height", lang)}
            number={data?.playerData?.height}
            unit="cm"
          />
        </div>
      </div>
      <div className={classes.flexDiv}>
        <div className={classes.detailDiv}>
          <DetailButton
            text={Translate("not playing", lang)}
            number={
              data?.playerData?.daysWithoutPlaying < 0
                ? "-"
                : data?.playerData?.daysWithoutPlaying > 90
                ? "90+"
                : data?.playerData?.daysWithoutPlaying
            }
            unit={Translate("days", lang)}
          />
        </div>
        <div className={classes.detailDiv}>
          <DetailButton
            text={
              data?.playerData?.imcCondition
                ? `${Translate(data?.playerData?.imcCondition, lang)}`
                : "Dorsal"
            }
            number={
              data?.playerData?.imcCondition
                ? Math.round(data?.playerData?.imcValue)
                : data?.playerData?.dorsal
            }
            unit={
              data?.playerData?.imcCondition ? `${Translate("bmi", lang)}` : ""
            }
          />
        </div>
        <div className={classes.detailDiv}>
          <DetailButton
            text={Translate("FIFA Id", lang)}
            number={
              data?.playerData?.fifaId === "" ||
              data?.playerData?.fifaId === null
                ? "-"
                : data?.playerData?.fifaId
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerDetails;
