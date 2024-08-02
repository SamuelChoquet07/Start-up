import { makeStyles } from "@material-ui/core/styles";
import RadiusDiv from "../../../../components/Button/RadiusDiv";
import translate from "../../../../lang/lang";

const useStyles = makeStyles(() => ({
  title: {
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "600",
  },
  text: {
    color: "white",
    fontSize: "1.2rem",
  },
  container: {
    borderRadius: "20px",
    width: "30vw",
    height: "25vh",
    margin: "2rem 1rem",
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
  img: {
    width: "2rem",
    margin: "0 0.5rem",
    height: "1.5rem",
  },
  pad: {
    width: "100%",
    padding: "0 1rem",
    display: "flex",
    justifyContent: "space-between",
  },
}));

const RankingCard = ({ arrayToMap, title }) => {
  const classes = useStyles();
  const colors = {
    Goalkeeper: "#FD5F85",
    Defender: "#46C3FF",
    Midfielder: "#BCEB57",
    Forward: "#FF964A",
    FREE: "#9677EE",
  };


  return (
    <div>
      <div style={{ padding: "2rem" }}>
        <p className={classes.title}>{title}</p>
      </div>
      <div className={classes.container}>
        {arrayToMap?.map((data, index) => {
          return index % 2 === 0 ? (
            <div className={classes.backLine} key={index}>
              <div className={classes.pad}>
                <p className={classes.text}>
                  {translate(data.name.toLowerCase())}
                </p>
                <div style={{ display: "flex" }}>
                  {data?.value === "Goalkeeper" ? (
                    <RadiusDiv
                      color={colors}
                      text={
                        data?.value === "Goalkeeper"
                          ? "GK"
                          : data?.value.slice(0, 3)
                      }
                    />
                  ) : (
                    <p className={classes.text}>{data?.value}</p>
                  )}
                  <p className={classes.text} style={{ padding: "0 0 0 1rem" }}>
                    {data.ranking}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className={classes.normalLine} key={index}>
              <div className={classes.pad}>
                <p className={classes.text}>
                  {translate(data.name.toLowerCase())}
                </p>
                <div style={{ display: "flex" }}>
                  {data?.name === "Position" ? (
                    <RadiusDiv
                      color={colors}
                      text={
                        data?.value === "Goalkeeper" ? "GK" : data?.value                    
                      }
                    />
                  ) : (
                    <p className={classes.text}>{data?.value} </p>
                  )}
                  <p className={classes.text} style={{ padding: "0 0 0 1rem" }}>
                    {data.ranking}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RankingCard;
