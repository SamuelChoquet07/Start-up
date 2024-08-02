import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ColorDetail from "../../../../components/Button/ColorDetail";
import NormalDetail from "../../../../components/Button/NormalDetail";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import DetailButton from "../../../../components/Button/DetailButton";
import translate from "../../../../lang/lang";

const useStyles = makeStyles(() => ({
  statsContainer: {
    width: "50%",
    height: "100%",
    backgroundColor: "#142127",
    borderRadius: "20px",
    margin: "3rem 0",
    padding: "0 0 2rem 0",
  },
  flexDiv: {
    display: "flex",
    justifyContent: "start",
    marginLeft: "0.5rem",
    width: "90%",
  },
  normalText: {
    color: "white",
    fontSize: "1.4rem",
    fontFamily: "Hind Siliguri",
    fontWeight: "600",
    marginRight: "1rem",
  },
}));

const Stadistics = ({
  playerStats,
  onClick,
  showPerceptionDetails,
  setIndexDetails,
  setModalTitle,
}) => {
  const classes = useStyles();

  const lang = JSON.parse(localStorage.getItem("user")).language;

  const upperPlayerStats = playerStats?.slice(0, 6);

  const lowerPlayerStats = playerStats?.slice(6, 12);

  const IconTooltip = withStyles({
    tooltip: {
      color: "white",
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      fontSize: "0.4rem",
      fontFamily: "Hind Siliguri",
      textTransform: "none",
      fontWeight: "300",
      borderRadius: "6px",
      letterSpacing: 1,
      maxWidth: 500,
    },
  })(Tooltip);

  return (
    <div className={classes.statsContainer}>
      <div
        style={{ margin: "2% 2% 2% 2%", display: "flex", alignItems: "center" }}
      >
        <p className={classes.normalText}>{translate("indexes_title", lang)}</p>
        <div>
          <IconTooltip
            placement="right"
            title={
              <React.Fragment>
                <p style={{ fontSize: "0.7rem" }}>
                  <b>{translate("gloouds_index_title", lang)}</b>
                </p>
                <p>{translate("gloouds_index_detail", lang)}</p>
                <br />
                <p style={{ fontSize: "0.7rem" }}>
                  <b>{translate("perception_index_title", lang)}</b>
                </p>
                <p>{translate("perception_index_detail", lang)}</p>
                <br />
                <p style={{ fontSize: "0.7rem" }}>
                  <b>{translate("fairplay_index_title", lang)}</b>
                </p>
                <p>{translate("fairplay_index_detail", lang)}</p>
                <br />
                <p style={{ fontSize: "0.7rem" }}>
                  <b>{translate("value_index_title", lang)}</b>
                </p>
                <p>{translate("value_index_detail", lang)}</p>
                <br />
                <p style={{ fontSize: "0.7rem" }}>
                  <b>{translate("federation_index_title", lang)}</b>
                </p>
                <p>{translate("federation_index_detail", lang)}</p>
                <br />
                <p style={{ fontSize: "0.7rem" }}>
                  <b>{translate("action_index_title", lang)}</b>
                </p>
                <p>{translate("action_index_detail", lang)}</p>
                <br />
                <p style={{ fontSize: "0.7rem" }}>
                  <b>{translate("gps_index_title", lang)}</b>
                </p>
                <p>{translate("gps_index_detail", lang)}</p>
                <br />
                <p>{translate("indexes_footer", lang)}</p>
              </React.Fragment>
            }
          >
            <i>
              <InfoOutlinedIcon />
            </i>
          </IconTooltip>
        </div>
      </div>
      <div className={classes.flexDiv}>
        {upperPlayerStats?.map((data, index) => {
          return (
            <div style={{ margin: "0.3rem", width: "25%" }} key={index}>
              <ColorDetail
                text={data.title}
                number={data.value}
                background={data.color}
                icon={
                  data.indexDetail && data.indexDetail.length > 0 ? "see" : null
                }
                onClick={
                  data.indexDetail && data.indexDetail.length > 0
                    ? onClick
                    : undefined
                }
                showPerceptionDetails={showPerceptionDetails}
                width="100%"
                height="90%"
                indexDetail={data.indexDetail}
                setIndexDetails={setIndexDetails}
                setModalTitle={setModalTitle}
              />
            </div>
          );
        })}
      </div>
      <div className={classes.flexDiv}>
        {lowerPlayerStats?.map((data, index) => {
          return (
            <div style={{ margin: " 0.3rem", width: "25%" }} key={index}>
              <DetailButton
                text={data.title}
                number={data.value}
                unit={data.title === "Pct. Starter" ? "%" : ""}
                width="100%"
                height="110%"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stadistics;
