import { makeStyles } from "@material-ui/core/styles";
import field from "../../../../assets/img/cancha-final.svg";
import FieldButton from "../../../../components/Button/FieldButton";

const useStyles = makeStyles(() => ({
  container: {
    width: "80%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "90%",
    height: "100%",
  },
}));

const FieldGraphic = ({ pos, playerPositions }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ position: "relative" }}>
        {playerPositions?.map((data, index) => {
          return (
            <FieldButton
              key={index}
              id={data?.id}
              percentage={data?.percentage}
            />
          );
        })}
        <img className={classes.img} src={field} />
      </div>
    </div>
  );
};

export default FieldGraphic;
