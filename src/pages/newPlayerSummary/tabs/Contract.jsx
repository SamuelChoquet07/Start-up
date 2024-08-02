import { React, useState, useEffect, useContext} from 'react'
//COMPONENTS
import Input from '../components/Input'
import Spinner from "../../../components/Spinner/Spinner";
//IMG
import EditIcon from '../../../assets/img/Icons/EditIcon.png'
import AddPersonIcon from '../../../assets/img/Icons/AddPersonIcon.png'
//MATERIAL
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
//CONTEXT
import PlayerContext from '../../../context/PlayerContext/PlayerContext';
import UserContext from "../../../context/UserContext/UserContext";
import { putContract } from '../../../api/contract.api';
//REACT ROUTER DOM
import { useParams, useHistory } from "react-router-dom";
//TRANSLATE
import translate from "../../../lang/lang";

const useStyles = makeStyles(() => ({
  addIconContainer:{
    width: "90%",
    height: "30px",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, .5)",
    // backgroundColor: "#000",
    borderRadius: "15px",
    fontFamily: "Hind Siliguri",
    padding: ".5rem 1rem .5rem 1rem",
    margin: "0 0 0 3%",
    justifyContent: "flex-end",
    margin: "2% 0 3% 3%",
  },
  managerInfoContainer:{
    width: "90%",
    height: "40px",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#000",
    borderRadius: "15px 15px 0 0",
    fontFamily: "Hind Siliguri",
    padding: ".5rem 1rem .5rem 1rem",
    margin: "0 0 0 3%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  managerInfoText:{
    fontSize: "21px",
    width: "100%",
    minWidth: "220px",
    margin: "0 0 2% 3%",

    // "@media (max-width: 1300px)": {
    //   margin: "1.5% 0 0 0",
    // },
  },
  iconsContainer:{
    display: "flex",
    flexDirection:"row",
    alignItems: "center",
  },
  managerInfoIcon:{
    display: "flex",
    flexDirection: "row",
    height: "21px",
    cursor: "pointer",
    margin: "0 1rem 0 0",
    // margin: "1% 0 0 70%",

    // "@media (max-width: 1300px)": {
    //   margin: "1.5% 0 0 70%",
    // },
  },
  cancelAndSaveContainer:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // margin: ".7% 0 0 70%",
    
    // "@media (max-width: 1500px)": {
    //   margin: ".8% 30% 0 55%",
    // },
  },
  cancelButton:{
    width: "auto",
    height: "41px",
    cursor: "pointer",
    backgroundColor: "#0FF",
    color: "#000",
    borderRadius: "10px",
    padding: ".5rem 2rem",
    marginRight: "1rem",
  },
  saveButton:{
    width: "auto",
    height: "41px",
    cursor: "pointer",
    backgroundColor: "#0FF",
    color: "#000",
    borderRadius: "10px",
    padding: ".5rem 2rem",
    // margin: ".7% 0 0 70%",

    // "@media (max-width: 1300px)": {
    //   margin: ".8% 30% 0 60%",
    // },
  },
  saveButtonDisabled:{
    width: "auto",
    height: "41px",
    backgroundColor: "#0FF",
    color: "#000",
    borderRadius: "10px",
    padding: ".5rem 2rem",
    opacity: "0.5",
    pointerEvents: "none",
  },
  inputContractContainer:{
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "90%",
    height: "auto",
    padding: "1rem",
    margin: "0 0 0 3%",
    fontFamily: "Hind Siliguri",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: "0 0 15px 15px",
  },
  inputContract:{
    width: "30%",
    height: "auto",
    margin: "0 1rem",
    

    "@media (max-width: 1600px)": {
      margin: ".5rem 1rem",
    },

    "@media (max-width: 1160px)": {
      margin: ".5rem .8rem",
    },
  },

  secondInputContractContainer:{
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    height: "auto",
    padding: "1rem",
    margin: "5rem 0 0 0",
    border:"solid white",
  },



  inputsPicker: {
    height: "55px",
    fontSize: "20px",
    fontFamily: "Hind Siliguri",
    "& .MuiInputBase-input": {
      color: "#fff", // Text color
    },
  },
  datePicker: {
    "& .MuiInputBase-root": {
      padding: 8,
      backgroundColor: "#121212",
      // background:
        // "linear-gradient(180deg, rgba(30,30,30,0.6) 0%, rgba(18,18,18,0.6) 100%);",
      borderRadius: 0,
      "& .MuiButtonBase-root": {
        padding: 0,
        paddingLeft: 10,
      },
      "& .MuiInputBase-input": {
        padding: 15,
        paddingLeft: 0,
      },
    },
  },
  datepickerContainer:{
    "& .MuiFormControl-root": {
      width: "100%",
    },
  },
  datepickerLabel:{
    color: "#fff",
    margin: "0.3rem 0",
    letterSpacing: 1,
    fontSize: 18,
    fontFamily: "Hind Siliguri",
    textTransform: "none",
  }
}));

const Contract = () => {

  const classes = useStyles()

  const playerContext = useContext(PlayerContext);
  const { getIndexPlayer, indexPlayer } = playerContext;

  const userContext = useContext(UserContext);
  const { userLogged } = userContext;

  const { id } = useParams();
  const history = useHistory();

  const roleHasPermissionCreate = userLogged?.modules.find(data => data.moduleId === '34')?.value.includes('2') || false;
  const roleHasPermissionEdit = userLogged?.modules.find(data => data.moduleId === '34')?.value.includes('3') || false;
  // const roleHasPermissionDelete = userLogged?.modules.find(data => data.moduleId === '34')?.value.includes('4') || false;

  const [contractInformation, setContractInformation] = useState();
  const [clickEdit, setClickEdit] = useState(false);
  const [contractEdited, setContractEdited] = useState({});
  const [selectedDateStartContract, setSelectedDateStartContract] = useState(new Date(""));
  const [selectedDateEndContract, setSelectedDateEndContract] = useState(new Date(""));
  const [sendPetition, setSendPetition] = useState(false);

  const labelMappings = {
    name: translate("manager name", userLogged.language),
    lastname: translate("manager lastname", userLogged.language),
    license: translate("manager licence", userLogged.language),
    relationship: translate("relationship with the player", userLogged.language),
    dni: translate("manager DNI", userLogged.language),
    email: translate("namager email", userLogged.language),
    phone: translate("manager phone", userLogged.language),
    startContract: translate("start of contract", userLogged.language),
    endContract: translate("end of contract", userLogged.language),
    federativeRights: translate("federative rights", userLogged.language),
    imageRights: translate("image rights", userLogged.language),
    economicRights: translate("economic rights", userLogged.language),
    contractValue: translate("contract value", userLogged.language),
    playerValue: translate("player value", userLogged.language),
    // club: "Club",
    // id: "ID",
  };

  const keyMappings = {
    name: "name",
    lastname: "lastname",
    license: "license",
    relationship: "relationship",
    dni: "dni",
    email: "email",
    phone: "phone",
    startContract: "start_contract",
    endContract: "end_contract",
    federativeRights: "federative_rights",
    imageRights: "image_rights",
    economicRights: "economic_rights",
    contractValue: "contract_value",
    playerValue: "player_value",
    // club: "Club",
    // id: "ID",
  };

  const excludedKeys = ["id", "club"]

  const handleClickEdit = () => {
    setClickEdit(!clickEdit);
  }

  const handleClickSave = () => {
    const contractId = contractEdited.id;
    delete contractEdited.id;

    putContract(contractId, contractEdited);
    
    setTimeout(() => {
      setContractEdited({});
      setSendPetition(!sendPetition);
    }, 1000)
  }

  const handleChangeEdit = (e, id) => {
    const contractId = id;
    setContractEdited({...contractEdited, [e.target.name]: e.target.value, id: contractId});
  }

  function handleDateFormatContractStart(e, id) {
    const contractId = id;

    let calendary = {
      days: e.getDate(),
      months: e.getMonth(),
      years: e.getFullYear(),
    };
    let date = `${calendary.days < 10 ? "0" : ""}${calendary.days}/${
      calendary.months + 1 < 10 ? "0" : ""
    }${calendary.months + 1}/${calendary.years}`;
    setContractEdited({ ...contractEdited, start_contract: date, id: contractId });
  }

  function handleDateFormatContractEnd(e, id) {
    const contractId = id;

    let calendary = {
      days: e.getDate(),
      months: e.getMonth(),
      years: e.getFullYear(),
    };
    let date = `${calendary.days < 10 ? "0" : ""}${calendary.days}/${
      calendary.months + 1 < 10 ? "0" : ""
    }${calendary.months + 1}/${calendary.years}`;
    setContractEdited({ ...contractEdited, end_contract: date, id: contractId });
  } 

  const handleDateChangeStartContract = (date, contractId) => {
    setSelectedDateStartContract(date);
    handleDateFormatContractStart(date, contractId);
  };

  const handleDateChangeEndContract = (date, contractId) => {
    setSelectedDateEndContract(date);
    handleDateFormatContractEnd(date, contractId);
  };
  
  const handleAddManager = () => {
    history.push(`/admin/users/add-contract/player_id/${id}`)
  };

  useEffect(() => {
    getIndexPlayer(id);
  }, [sendPetition])

  useEffect(() => {
    if (Array.isArray(indexPlayer)){
      const contractInfo = indexPlayer.map(data => data.playerDetailsData.playerData.contractInformation);
      setContractInformation(contractInfo[0]);
    }
  }, [indexPlayer, sendPetition, contractInformation]);

  // console.log("indexPlayer", indexPlayer)
  // console.log("contractInformation", contractInformation)
  // console.log("contractEdited", contractEdited)
  
  if (!contractInformation) {
    return <Spinner />;
  } else {
  return (
    <div>

        {contractInformation?.length === 0 ? (
            <>
            <div className={classes.addIconContainer}>
              <p className={classes.managerInfoText}>{translate("Contract information", userLogged.language)}</p>
              {roleHasPermissionCreate ? <img src={AddPersonIcon} alt="Add icon image" className={classes.managerInfoIcon} style={{display: "flex", alignSelf: "center"}} onClick={() => handleAddManager()}/> : null}
            </div>
            <div className={classes.managerInfoContainer}>
            </div>
            <div className={classes.inputContractContainer}>
                <p className={classes.managerInfoText} style={{textAlign: "center", alignSelf: "center", margin: "2% 0 2% 3%",}}> {translate("This player doesn't have a contract", userLogged.language)} </p>
            </div>
            </>
        )
        :
        (
          <div className={classes.addIconContainer}>
              <p className={classes.managerInfoText}>{translate("Contract information", userLogged.language)}</p>
          </div>
        )}
      
        {contractInformation?.map((contractData, index) => {
            let orderedData = {};
            return (
            <>
            <div className={classes.managerInfoContainer}>
                {clickEdit === true ?
                <div className={classes.cancelAndSaveContainer}>
                    <button className={classes.cancelButton} onClick={() => {handleClickEdit()}}> {translate("Cancel", userLogged.language)} </button>
                    <button className={`${Object.keys(contractEdited)?.length === 0 ? classes.saveButtonDisabled : classes.saveButton}`} onClick={() => {handleClickSave(); handleClickEdit()}} disabled={Object.keys(contractEdited)?.length === 0 ? true : false}> 
                        {translate("Save button", userLogged.language)} 
                    </button>
                </div>
                :
                <div className={classes.iconsContainer}>
                    {contractInformation?.length === 0 
                        ? null 
                        : 
                        roleHasPermissionEdit ? <img src={EditIcon} alt="Edit icon image" className={classes.managerInfoIcon} onClick={() => handleClickEdit()}/> : null
                    }
                </div>
                }
            </div>
            <div
            key={index}
            className={`${classes.inputContractContainer} ${index >= 1 ? classes.secondInputContractContainer : ''}`}
            >
            {Object.entries(contractData)
              .filter(([key]) => !excludedKeys.includes(key))
              .sort(([keyA], [keyB]) => {
                const order = {
                  name: 1,
                  lastname: 2,
                  license: 3,
                  relationship: 4,
                  dni: 5,
                  email: 6,
                  phone: 7,
                  startContract: 8,
                  endContract: 9,
                  federativeRights: 10,
                  imageRights: 11,
                  economicRights: 12,
                  contractValue: 13,
                  playerValue: 14,
                };
                return order[keyA] - order[keyB];
              })
              .forEach(([key, value]) => {
                orderedData[key] = value;
                //console.log("orderedData", orderedData)
              })}
            {Object.entries(orderedData).map(([key, value], subIndex) => (
              <div key={subIndex} className={classes.inputContract}>

                {clickEdit === true && key == 'startContract' ?

                <div className={classes.datepickerContainer}>
                  <p className={classes.datepickerLabel}>{translate("Contract's Start", userLogged.language)}</p>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      id="date-picker-dialog"
                      label=""
                      name="start_contract"
                      placeholder="dd/mm/yyyy"
                      value={selectedDateStartContract}
                      defaultValue={value}
                      onChange={(date) => handleDateChangeStartContract(date, contractData.id)}
                      allowSameDateSelection={true}
                      format="dd/MM/yyyy"
                      helperText=""
                      required
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      InputProps={{
                        classes: {
                          root: classes.inputsPicker,
                        },
                        disableUnderline: true,
                        // readOnly: true,
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.inputsPicker,
                        },
                      }}
                      classes={{
                        underline: "white",
                      }}
                      keyboardIcon={
                        <CalendarTodayIcon style={{ color: "white" }} />
                      }
                      className={classes.datePicker}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                :
                clickEdit === true && key == 'endContract' ?

                <div className={classes.datepickerContainer}>
                  <p className={classes.datepickerLabel}>{translate("Contract's End", userLogged.language)}</p>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      id="date-picker-dialog"
                      label=""
                      name="end_contract"
                      placeholder="dd/mm/yyyy"
                      value={selectedDateEndContract}
                      defaultValue={value}
                      onChange={(date) => handleDateChangeEndContract(date, contractData.id)}
                      allowSameDateSelection={true}
                      format="dd/MM/yyyy"
                      helperText=""
                      required
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      InputProps={{
                        classes: {
                          root: classes.inputsPicker,
                        },
                        disableUnderline: true,
                        // readOnly: true,
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.inputsPicker,
                        },
                      }}
                      classes={{
                        underline: "white",
                      }}
                      keyboardIcon={
                        <CalendarTodayIcon style={{ color: "white" }} />
                      }
                      className={classes.datePicker}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                :
                clickEdit === true ?

                <Input
                  //value={value}
                  label={labelMappings[key] || key}
                  placeholder={`Write the ${labelMappings[key] || key}`}
                  onChange={(e) => handleChangeEdit(e, contractData.id)}
                  defaultValue={value}
                  // name={key}
                  name={keyMappings[key]}
                  sizeLabel={18}
                  required
                  readOnly={false}
                />
                :
                clickEdit === false ?

                <Input
                  //value={value}
                  label={labelMappings[key] || key}
                  placeholder={`Write the ${labelMappings[key] || key}`}
                  //onChange={onChange}
                  defaultValue={value}
                  name={keyMappings[key]}
                  //name={key}
                  sizeLabel={18}
                  required
                  readOnly={true}
                />
                :
                null
                }
              </div>
            ))}
          </div>
          </>
        );
        })}
    </div>
  );
}
}

export default Contract