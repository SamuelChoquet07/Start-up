import { makeStyles } from "@material-ui/core/styles";
import { useContext, useState } from "react";

import EvaluationButton from "../../../../components/Button/EvaluationButton";
import RadiusDiv from "../../../../components/Button/RadiusDiv";
import bothFeet from "../../../../assets/img/player-icons/Ambidiestro.png";
import rightFoot from "../../../../assets/img/player-icons/Derecho.png";
import leftFoot from "../../../../assets/img/player-icons/Pie izquierdo.png";
import Translate from "../../../../lang/lang";
import MakeEvaluationFlex from "../../../MakeEvaluation/MakeEvaluationFlex";
import UserContext from "../../../../context/UserContext/UserContext";
import ColorDetail from "../../../../components/Button/ColorDetail";
import VillaOutlinedIcon from "@mui/icons-material/VillaOutlined";

const useStyles = makeStyles(() => ({
  flexDiv: {
    display: "flex",
    height: "90%",
  },

  playerDiv: {
    width: "auto",
    backgroundColor: "#142127",
    borderRadius: "20px",
    fontFamily: "Hind Siliguri",
  },

  textInfoDiv: {
    width: "100%",
    padding: "3% 0 0 0",
  },

  clubImg: {
    width: "1.5%",
  },

  avatarDiv: {
    margin: "0.7rem",
    display: "flex",
    flexDirection: "column",
    width: "90%",
    height: "auto",
    justifyContent: "space-between",
    alignItems: "center",
  },

  playerAvatar: {
    width: "7rem",
    height: "7rem",
    borderRadius: "8px",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },

  kpiDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0 5%",
  },

  kpiColorDiv: {
    width: "90%",
    height: "8px",
    backgroundColor: "yellow",
    borderRadius: "4px",
    margin: "0 5% 0 5%",
  },

  footDiv: {
    display: "flex",
    justifyContent: "center",
    margin: "5% 0",
  },

  footImg: {
    height: "2.8rem",
    width: "auto",
  },

  resaltedP: {
    color: "#00ffff",
    fontSize: "1.3rem",
    fontFamily: "Hind Siliguri",
    fontWeight: "600",
    marginRight: "0.5rem",
  },

  normalText: {
    color: "white",
    fontSize: "2rem",
    fontFamily: "Hind Siliguri",
    fontWeight: "600",
    lineHeight: "1.1",
    padding: "0 5% 0 5%",
  },

  lightText: {
    color: "white",
    fontSize: "1.2rem",
    fontFamily: "Hind Siliguri",
    fontWeight: "400",
  },
  buttonDiv: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
    padding: "1rem",
    width:"93%",
  },
  evButton: {
    border: "none",
    backgroundColor: "#00ffff",
    borderRadius: "5px",
    width: "100%",
    minWidth: "15rem",
    height: "2.3rem",
    margin: "1rem 0 0 0",
    padding: "0 5% 0 5%",
    fontSize: "1rem",
    //padding: "1% 0",
    fontFamily: "Hind Siliguri",
    textDecoration: "none",
    textTransform: "uppercase",
    color: "#121212",
    fontWeight: "600",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "lightcyan",
    },
  },
}));

const PlayerInfoCard = ({ playerDetails, playerId, handleFavAction }) => {
  const [estado, setEstado] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const userContext = useContext(UserContext);
  const userLogged = userContext.userLogged;
  const classes = useStyles();
  const data = playerDetails;
  const userImg = data?.playerData?.userImg;
  const glooudsColor = data?.playerData?.glooudsColor;
  const contextura =
    data?.playerData?.context == undefined ||
    data?.playerData?.context == null ||
    data?.playerData?.context == ""
      ? "(No especificada)"
      : data?.playerData?.context;

    let playerValue = playerDetails?.playerData?.cuantitativeData[3]?.value;
    console.log("playerDetails", playerDetails);

  const playerData = playerDetails ? playerDetails.playerData : null;

  const { userId, userName, userLastName, playerPosition, rankingData } =
    playerData || {};

  const { groupingAbb } = playerPosition || {};

  const subType = "spontaneous";
  const userVotedId = userId;
  const userVotedName = userName;
  const userVotedLastName = userLastName;
  const userVotedPosition = groupingAbb;
  const userVotedSubType = subType;

  const handleModal = () => {
    setEstado(!estado);
  };

  const lang = JSON.parse(localStorage.getItem("user")).language;
  let showPlayerValuePermission = false;
  JSON.parse(localStorage.getItem("user")).modules.map((data) => {
    if (data.moduleId === "34" && data.value.includes("1"))
      showPlayerValuePermission = true
  });

  console.log("showPlayerValuePermission", JSON.parse(localStorage.getItem("user")).modules);
  console.log("showPlayerValuePermission", showPlayerValuePermission);

  return (
    <div className={classes.playerDiv}>
      {playerDetails?.length == 0 ? null : (
        <>
          <div style={{ height: "15.44rem", display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "11rem",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "0.81rem",
              }}
            >
              <div
                className={classes.playerAvatar}
                style={{ backgroundImage: `url(${userImg})` }}
              ></div>
              <ColorDetail
                text="GLOOUDS"
                number={data?.playerData?.glooudsIndex}
                background={data?.playerData?.glooudsColor}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "0.81rem",
                width: "21rem",
              }}
            >
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  lineHeight: "1",
                }}
              >
                {`${data?.playerData?.userName} ${data?.playerData?.userLastName}`.toUpperCase()}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <p className={classes.lightText}>
                  {data?.playerClub?.shortName}
                </p>
                <img
                  className={classes.clubImg}
                  src={data?.playerClub?.imgFile}
                  style={{ width: "1.2rem", marginLeft: "1rem" }}
                  alt="club"
                ></img>
              </div>
              <div
                className={classes.flexDiv}
                style={{ marginTop: "0.5rem", alignItems: "center" }}
              >
                <p
                  className={classes.lightText}
                  style={{ fontWeight: "600", marginRight: "1rem" }}
                >
                  {data?.playerData?.divisionName}
                </p>
                <RadiusDiv
                  text={data?.playerData?.playerPosition?.groupingAbb}
                />
                {data?.playerData?.flagUrl === null ? null : (
                  <img
                    src={data?.playerData?.flagUrl}
                    style={{
                      width: "2rem",
                      height: "1.5rem",
                      marginLeft: "1rem",
                    }}
                    alt="flag"
                  ></img>
                )}
                {data?.playerData?.flagUrlTwo === null ? null : (
                  <img
                    src={data?.playerData?.flagUrlTwo}
                    style={{
                      width: "2rem",
                      height: "1.5rem",
                      marginLeft: "1rem",
                    }}
                    alt="flag"
                  ></img>
                )}
              </div>
              <p className={classes.lightText} style={{}}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "horizontal",
                  }}
                >
                  {data?.teams?.map((teams, index) => {
                    return (
                      <div style={{ paddingRight: "15px", fontSize: "0.8rem" }}>
                        {teams.shortname}
                      </div>
                    );
                  })}
                </div>
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height: "3rem",
                  alignItems: "center",
                }}
              >
                <div>
                  {`${Translate("contexture", lang)}: 
                  ${Translate(data?.playerData?.imcCondition, lang)}`}
                </div>
                <div className={classes.footDiv}>
                  {data?.playerData?.skillfulFoot === "left" ? (
                    <img
                      src={leftFoot}
                      className={classes.footImg}
                      alt="left"
                    />
                  ) : data?.playerData?.skillfulFoot === "ambidextrous" ? (
                    <img src={bothFeet} className={classes.footImg} alt="amb" />
                  ) : (
                    <img
                      src={rightFoot}
                      className={classes.footImg}
                      alt="right"
                    />
                  )}
                </div>
              </div>
              <div>{Translate("enabled", lang)}</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ fontWeight: "600", fontSize: "0.8rem" }}>
                  {data?.playerData?.professional === "1"
                    ? Translate("professional", lang)
                    : Translate("non professional", lang)}
                </div>

                {data?.playerData?.clubResidence === "1" ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <VillaOutlinedIcon />
                    <p
                      style={{
                        textTransform: "capitalize",
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        marginLeft: "0.5rem",
                      }}
                    >
                      {Translate("on residence", lang)}
                    </p>
                  </div>
                ) : null}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {showPlayerValuePermission === true ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        textTransform: "capitalize",
                        fontSize: "0.8rem",
                        fontWeight: "600",                     
                      }}
                    >
                      {`${Translate("potential market value",lang)}: `}
                      {`${(playerValue*1.42).toFixed(2)} M€`}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className={classes.buttonDiv}>
            <MakeEvaluationFlex
              userVotedId={userVotedId}
              userVotedName={userVotedName}
              userVotedLastName={userVotedLastName}
              userVotedPosition={userVotedPosition}
              userVotedSubType={"spontaneous"}
              estado={estado}
              setEstado={setEstado}
              refresh={refresh}
              setRefresh={setRefresh}
            />{" "}
            <button className={classes.evButton} onClick={handleModal}>
              {`${Translate("evaluate player", lang).toUpperCase()}`}
            </button>
            <button
              className={classes.evButton}
              onClick={() => {
                handleFavAction();
              }}
            >
              {Translate("see highlights", lang).toUpperCase()}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerInfoCard;
