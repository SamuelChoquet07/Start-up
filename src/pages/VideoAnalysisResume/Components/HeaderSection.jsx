import React from "react";
import Section from "../../../Schedule/components/SectionSchedule";
import CircularIcon from "../../../../components/VideoAnalisis/CircularIcon";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: "1rem",
  },
  logoImg: {
    maxWidth: "60px",
  },
}));

const HeaderSection = ({ analysisId }) => {
  const classes = useStyles();
  const headerTags = [
    { name: analysisId?.fecha },
    { name: analysisId?.game?.description },
    { name: analysisId?.game?.ubication },
    { name: analysisId?.game?.referee },
    {
      name: `${analysisId.video_analyst?.name} ${analysisId.video_analyst?.lastname}`,
    },
  ];

  return (
    <Section
      title={
        <div
          className={classes.headerContainer}
          style={{ width: "80%", marginTop: "0.5rem" }}
        >
          <h4>{analysisId.name_analysis}</h4>
          {headerTags.map((header) => {
            return (
              <p className={classes.headerText}>
                {header.name === null || header.name === undefined
                  ? null
                  : ` | ${header.name}`}
              </p>
            );
          })}
        </div>
      }
    >
      <div className={classes.headerContainer} style={{ marginLeft: "0.5rem" }}>
        <div className={classes.headerContainer}>
          <img
            className={classes.logoImg}
            alt="imgNotFound"
            src={
              analysisId.team_local !== null
                ? analysisId.team_local?.club?.img_file
                : analysisId.local_extra?.club?.img_file
            }
          ></img>
          <div>
            <h2 style={{ marginLeft: "1rem" }}>
              {analysisId.team_local !== null
                ? analysisId.team_local?.club?.name
                : analysisId.local_extra?.club?.name}
            </h2>
            <p style={{ marginLeft: "1rem" }}>
              {analysisId.team_local !== null
                ? analysisId.team_local?.name
                : analysisId.local_extra?.name}
            </p>
          </div>
        </div>

        <div>
          <CircularIcon label={"VS"} />
        </div>

        <div
          className={classes.headerContainer}
          style={{ marginRight: "0.5rem" }}
        >
          <div>
            <h2 style={{ marginRight: "1rem" }}>
              {analysisId.visitor_extra !== null
                ? analysisId.visitor_extra?.club?.name
                : analysisId.team_visitor?.club.name}
            </h2>
            <p style={{ marginRight: "1rem" }}>
              {analysisId.visitor_extra !== null
                ? analysisId.visitor_extra?.name
                : analysisId.team_visitor?.name}
            </p>
          </div>
          <img
            className={classes.logoImg}
            alt="logoImg"
            src={
              analysisId.visitor_extra !== null
                ? analysisId.visitor_extra?.club?.img_file
                : analysisId.team_visitor?.club.img_file
            }
          ></img>
        </div>
      </div>
    </Section>
  );
};

export default HeaderSection;
