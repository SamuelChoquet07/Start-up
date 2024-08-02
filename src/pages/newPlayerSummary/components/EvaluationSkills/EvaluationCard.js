import { makeStyles } from "@material-ui/core/styles";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import Translate from "../../../../lang/lang";
import styles from "../../styles/NewPlayerSummary.module.css";

const useStyles = makeStyles(() => ({
  title: {
    color: "white",
    fontSize: "1.4rem",
    fontFamily: "Hind Siliguri",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  evConatiner: {
    borderRadius: "20px",
    width: "41vw",
    height: "25vh",
    margin: "1rem",
    "@media (max-width: 1750px)": {
      width: "38.5vw",
    },
  },
  backLine: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#121212",
    height: "5vh",
    width: "100%",
    alignItems: "center",
  },
  normalLine: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#142127",
    height: "5vh",
    width: "100%",
    alignItems: "center",
  },
  star: {
    color: "#00ffff",
  },
  emptyStar: {
    color: "white",
  },
}));

const EvaluationCard = ({ arrayToMap, title }) => {
  const classes = useStyles();
  const lang = JSON.parse(localStorage.getItem("user")).language;

  return (
    <div>
      <div style={{ margin: "2% 5%" }}>
        <p className={classes.title}>{title}</p>
      </div>
      <div className={classes.evConatiner}>
        {arrayToMap?.map((data, index) => {
          return index % 2 === 0 ? (
            <div className={classes.backLine} key={index}>
              <div style={{ width: "30%" }}>
                <p
                  className={classes.title}
                  style={{ marginLeft: "1rem", fontSize: "1rem" }}
                >
                  {Translate(data.abilityName, lang)}
                </p>
              </div>
              <p
                className={classes.title}
                style={{ margin: "1rem", width: "20%", fontSize: "1rem" }}
              >
                {Math.round(data.value * 10) / 10}
              </p>
              <Stack spacing={1} style={{ margin: "0 1% 0 0" }}>
                <Rating
                  name="half-rating-read"
                  defaultValue={Number(data.value)}
                  precision={0.5}
                  emptyIcon={
                    <StarBorderOutlinedIcon className={classes.emptyStar} />
                  }
                  icon={<StarIcon className={classes.star} />}
                  readOnly
                />
              </Stack>
            </div>
          ) : (
            <div className={classes.normalLine} key={index}>
              <div style={{ width: "30%" }}>
                <p
                  className={classes.title}
                  style={{ marginLeft: "1rem", fontSize: "1rem" }}
                >
                  {Translate(data.abilityName, lang)}
                </p>
              </div>
              <p
                className={classes.title}
                style={{ margin: "1rem", width: "20%", fontSize: "1rem" }}
              >
                {Math.round(data.value * 10) / 10}
              </p>
              <Stack spacing={1} style={{ margin: "0 1% 0 0" }}>
                <Rating
                  name="half-rating-read"
                  defaultValue={Number(data.value)}
                  precision={0.5}
                  emptyIcon={
                    <StarBorderOutlinedIcon className={classes.emptyStar} />
                  }
                  icon={<StarIcon className={classes.star} />}
                  readOnly
                />
              </Stack>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EvaluationCard;
