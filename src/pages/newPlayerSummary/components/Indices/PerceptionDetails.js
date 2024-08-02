import { makeStyles } from "@material-ui/core";
import { darkGreyTransparent, promise, ilussion, success, opMapNeutral } from "../../../../styles/colors";
import ColorDetail from "../../../../components/Button/ColorDetail";
import translate from "../../../../lang/lang";

const useStyles = makeStyles(() => ({
    container: {
        position: "fixed",
        display:"flex",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        backgroundColor: darkGreyTransparent,
        alignItems: "center",
        justifyContent: "center",
        width:"100%",
        height:"100%",
        zIndex:"1000",
        fontFamily:"Hind Siliguri",
        textTransform: "none",
    },
    modalContainer:{
        display:"flex",
        alignItems: "start",
        justifyContent: "start",
        backgroundColor:"#142127",
        opacity:"1",
        borderRadius:"10px",
        width: "30vw",
        boxShadow: "0 0 15px 0 #00ffff",
        flexDirection:"column",
        padding:"1rem",
    },
    flexDiv: {
        display: "flex",
        justifyContent: "center",
        marginLeft: "0.5rem",
        flexWrap:"wrap"
        
    }
}));

  const ShowPerceptionDetails = ({onClick, playerPerceptionDetails, title}) => {
    const classes = useStyles();
    const lang = JSON.parse(localStorage.getItem("user")).language
    

    return (
        <div className={classes.container} onClick={onClick}>
            <div className={classes.modalContainer}>
                <div style={{ margin: "2% 5% 2% 2%" }}>
                    <p style={{fontSize:"2rem"}}>
                        {`${translate("details for index:", lang)} ${translate(title, lang)}`}
                    </p>
                </div>
                <div className={classes.flexDiv}>
                    {playerPerceptionDetails?.map((data, index) => {
                        return (
                            <div style={{ margin: "0.3rem" }} key={index}>
                                <ColorDetail
                                    text={translate (data.title, lang)}
                                    number={data?.value}
                                    background={data?.value === 0 
                                        ? opMapNeutral
                                        : data?.value > 0 && data?.value <= 33.3 
                                            ? promise
                                            : data?.value > 33.3 && data?.value <= 66.6
                                                ? ilussion
                                                : success
                                    }
                                />
                            </div>
                        );
                    })}
                </div>               
            </div>
        </div>
    );
  };

  export default ShowPerceptionDetails