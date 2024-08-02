import { makeStyles } from "@material-ui/core/styles";
import RadiusDiv from "../../../components/Button/RadiusDiv";
import avatar from "../../../assets/img/Icons/playerAvatar.png";

const useStyles = makeStyles(() => ({
  customCard: {
    width: "225px",
    height: "255px",
    borderRadius: "12px",
    backgroundColor: "#142127",
    "&:hover": {
      cursor: "pointer",
    },
  },
  customCardMedia: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imgDiv: {
    margin: "17px 16px 17px 16px",
  },
  customImg: {
    width: "122px",
    height: "111px",
    borderRadius: "6px",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  cardSubtitle: {
    textAlign: "end",
    justifyContent: "start",
    display: "flex",
    flexDirection: "column",
    padding: "0 0.5rem 0 0.5rem",
  },
  bottomContent: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
  cardTitle: {
    fontFamily: "Hind Siliguri",
    color: "#00ffff",
    fontSize: "25px",
    margin: "0 16px 0 16px",
    lineHeight: "25.5px",
    height: "51px",
    width: "193px",
    overflow:"hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
  },
  cardDivision: {
    fontFamily: "Hind Siliguri",
    fontSize: "19.8px",
    color: "white",
    margin: "8px 16px 0 16px",
    lineHeight: "22px",
    height: "44px",
    width: "193px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "wrap",
    textTransform: "capitalize",
  },
  marginDiv: {
    margin: "0 0 0 0",
  },
}));

const PlayerCard = ({
  division,
  evaluation,
  position,
  profilePic,
  name,
  category,
  kpiColor,
  goToSummary,
}) => {
  const classes = useStyles();
  const posColors = {
    GK: "#FD5F85",
    DEF: "#46C3FF",
    MID: "#BCEB57",
    DEL: "#FF964A",
    FREE: "#9677EE",
  };

  console.log("category", category);

  return (
    <div className={classes.customCard} onClick={goToSummary} data-toggle="tooltip" data-placement="top" title={name}>
      <div className={classes.customCardMedia}>
        <div className={classes.imgDiv}>
          <div
            className={classes.customImg}
            style={{
              backgroundImage: profilePic
                ? `url(${profilePic}`
                : `url(${avatar}`,
            }}
          ></div>
        </div>
        <div className={classes.cardSubtitle}>
          <RadiusDiv text={division} color={"#CACACA"} />
          <RadiusDiv text={position} color={posColors[position]} />
          <RadiusDiv text={evaluation} color={kpiColor} />
        </div>
      </div>
      <div className={classes.bottomContent}>
        <div className={classes.marginDiv}>
          <h5 className={classes.cardTitle}>
            {name}
          </h5>
          <p className={classes.cardDivision}>
          <div style={{display:"flex", flexDirection:"row",  overflow:"hidden", whiteSpace:"nowrap", textOverflow: "ellipsis", display: "-webkit-box",  WebkitLineClamp: "2", WebkitBoxOrient: "horizontal",}}>

            {category?.map((teams, index) => {
                return (
                  <div style={{paddingRight:"15px"}}>{teams.shortname}</div>
                );
                })}

            
</div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
