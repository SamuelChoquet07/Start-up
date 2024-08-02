import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import Section from "../../../../components/Section/Section";

const useStyles = makeStyles(() => ({
  playerDiv: {
    // margin: "1rem 0",
    overflowX: "hidden",
    height: "90%",
  },

  titleContainer: {
    marginTop: "-1rem",
    marginBottom: "1rem",
    textAlign: "left",
  },

  playerBtn: {
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
  },

  btnDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
  },

  playerBtnName: {
    display: "flex",
    alignItems: "center",
  },
  playerButtonLocal: {
    borderRadius: "50%",
    fontFamily: "Bebas-Bold",
    letterSpacing: 1,
    margin: "0.2rem",
    border: 0,
    fontSize: "1.5rem",
    cursor: "pointer",
    backgroundColor: "#5EE8FF",
    height: "2vw",
    width: "2vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  playerButtonVisitor: {
    borderRadius: "50%",
    fontFamily: "Bebas-Bold",
    letterSpacing: 1,
    margin: "0.2rem",
    border: 0,
    fontSize: "1.5rem",
    cursor: "pointer",
    backgroundColor: "#EB5757",
    height: "2vw",
    width: "2vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
const IconTooltip = withStyles({
  tooltip: {
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    fontFamily: "Bebas-Bold",
    borderRadius: 0,
    letterSpacing: 1,
  },
})(Tooltip);

const Field = ({
  getPlayers,
  players,
  getPlayerExtra,
  playerExtra,
  analysisId,
  userLogged,
  translate,
}) => {
  const classes = useStyles();

  const localAlignment = analysisId?.game?.local_alignment?.split(",");

  const visitorAlignment = analysisId?.game?.visitor_alignment?.split(",");

  const playersInFieldLocal = players.filter((player) =>
    localAlignment?.find((align) => {
      return align === player.id;
    })
  );

  const playersInFieldVisitor = players.filter((player) =>
    visitorAlignment?.find((align) => {
      return align === player.id;
    })
  );

  const playersExtraInFieldVisitor = playerExtra.filter((player) =>
    visitorAlignment?.find((align) => {
      return align === player.id;
    })
  );
  const playersExtraInFieldLocal = playerExtra.filter((player) =>
    localAlignment?.find((align) => {
      return align === player.id;
    })
  );

  useEffect(() => {
    getPlayers("?limit=2000");
    getPlayerExtra();

    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.playerDiv}>
      <Section
        title={translate("squadra", userLogged.language)}
        background={"rgba(33, 33, 33, 0.5)"}
      >
        <div className={classes.btnDiv}>
          <div className={classes.playerBtn}>
            <h2 className={classes.titleContainer}>
              {analysisId.team_local !== null
                ? analysisId.team_local?.club?.name
                : analysisId.local_extra?.club?.name}
            </h2>

            {playersInFieldLocal.length > 0
              ? playersInFieldLocal?.map((player, index) => (
                  <div className={classes.playerBtnName}>
                    <IconTooltip
                      title={`${player?.user?.name}  ${player?.user?.lastname}`}
                    >
                      <button className={classes.playerButtonLocal} key={index}>
                        {player?.dorsal
                          ? player?.dorsal
                          : player?.user?.name.substr(0, 1)}
                      </button>
                    </IconTooltip>
                    <h4
                      style={{ marginLeft: "0.5rem" }}
                    >{`${player?.user?.name} ${player?.user?.lastname}`}</h4>
                  </div>
                ))
              : playersExtraInFieldLocal?.map((player, index) => (
                  <div className={classes.playerBtnName}>
                    <IconTooltip title={`${player.name} `}>
                      <button className={classes.playerButtonLocal} key={index}>
                        {player?.dorsal
                          ? player?.dorsal
                          : player?.name.substr(0, 1)}
                      </button>
                    </IconTooltip>
                    <h4
                      style={{ marginLeft: "0.5rem" }}
                    >{`${player.name} `}</h4>
                  </div>
                ))}
          </div>

          <div className={classes.playerBtn}>
            <h2 className={classes.titleContainer}>
              {analysisId.visitor_extra !== null
                ? analysisId.visitor_extra?.club?.name
                : analysisId.team_visitor?.club?.name}
            </h2>
            {playersInFieldVisitor.length > 0
              ? playersInFieldVisitor?.map((player, index) => (
                  <div className={classes.playerBtnName}>
                    <IconTooltip
                      title={`${player?.user?.name}  ${player?.user?.lastname}`}
                    >
                      <button
                        className={classes.playerButtonVisitor}
                        key={index}
                      >
                        {player?.dorsal
                          ? player?.dorsal
                          : player?.user?.name.substr(0, 1)}
                      </button>
                    </IconTooltip>
                    <h4
                      style={{ marginLeft: "0.5rem" }}
                    >{`${player?.user?.name} ${player?.user?.lastname}`}</h4>
                  </div>
                ))
              : playersExtraInFieldVisitor?.map((player, index) => (
                  <div className={classes.playerBtnName}>
                    <IconTooltip title={`${player?.name}`}>
                      <button
                        className={classes.playerButtonVisitor}
                        key={index}
                      >
                        {player?.dorsal
                          ? player?.dorsal
                          : player?.name.substr(0, 1)}
                      </button>
                    </IconTooltip>
                    <h4
                      style={{ marginLeft: "0.5rem" }}
                    >{`${player?.name}`}</h4>
                  </div>
                ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Field;
