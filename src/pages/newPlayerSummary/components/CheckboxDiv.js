import { makeStyles } from "@material-ui/core/styles";
import CustomCheckbox from "../../../components/Button/CustomCheckbox/CustomCheckbox";

const useStyles = makeStyles(() => ({
  container: {
    width: "87vw",
    backgroundColor: "#142127",
    borderRadius: "20px",
    margin: "3rem 0 0 0",
    "@media (max-width: 1750px)": {
      width: "81.5vw",
    },
  },
  normalText: {
    color: "white",
    fontSize: "1.4rem",
    fontFamily: "Hind Siliguri",
    fontWeight: "600",
  },
  flexDiv: {
    display: "flex",
    justifyContent: "start",
  },
  paddingDiv: {
    padding: "1rem 6rem 2rem 1rem",
  },
}));

const CheckboxDiv = () => {
  const classes = useStyles();
  const analysisPeriod = [
    {
      name: "temporada actual",
    },
    {
      name: "ultimos 30 dias",
    },
    {
      name: "ultimos 90 dias",
    },
    {
      name: "total",
    },
  ];

  return (
    <div className={classes.container}>
      <div style={{ padding: "1rem" }}>
        <p className={classes.normalText}>PERÍODO DE ANÁLISIS</p>
      </div>
      <div className={classes.flexDiv}>
        {analysisPeriod.map((data, index) => {
          return (
            <div className={classes.paddingDiv} key={index}>
              <CustomCheckbox name={data.name} label={data.name} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckboxDiv;
