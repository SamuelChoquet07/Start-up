import { React, useState, useEffect, useContext} from 'react'
//COMPONENTS
import Input from '../components/Input'
import Alert from "../../../components/Alerts/Alert";
import Spinner from "../../../components/Spinner/Spinner";
//IMG
import EditIcon from '../../../assets/img/Icons/EditIcon.png'
import AddPersonIcon from '../../../assets/img/Icons/AddPersonIcon.png'
import DeleteIcon from '../../../assets/img/Icons/DeleteIcon.png'
import EmailIcon from '../../../assets/img/Icons/EmailIcon.png'
//MATERIAL
import { makeStyles } from "@material-ui/core/styles";
//CONTEXT
import PlayerContext from '../../../context/PlayerContext/PlayerContext';
import UserContext from "../../../context/UserContext/UserContext";
import { putTutors, deleteTutors } from '../../../api/tutors.api';
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
    borderRadius: "15px",
    fontFamily: "Hind Siliguri",
    padding: ".5rem 1rem .5rem 1rem",
    margin: "0 0 0 3%",
    justifyContent: "flex-end",
    margin: "2% 0 3% 3%",
  },
  tutorsInfoContainer:{
    width: "90%",
    height: "40px",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#000",
    borderRadius: "15px 15px 0 0",
    fontFamily: "Hind Siliguri",
    padding: ".5rem 1rem .5rem 1rem",
    margin: "0 0 0 3%",
    justifyContent: "flex-end",
  },
  secondTutorsInfoContainer:{
    width: "90%",
    height: "40px",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#000",
    borderRadius: "15px 15px 0 0",
    fontFamily: "Hind Siliguri",
    padding: ".5rem 1rem .5rem 1rem",
    margin: "3% 0 0 3%",
    justifyContent: "flex-end",
  },
  tutorsInfoText:{
    fontSize: "21px",
    width: "100%",
    minWidth: "220px",
    margin: "0 0 2% 3%",
  },
  iconsContainer:{
    display: "flex",
    alignItems: "center",
  },
  tutorsInfoIcon:{
    display: "flex",
    flexDirection: "row",
    height: "21px",
    cursor: "pointer",
    margin: "0 1rem 0 0",
  },
  cancelAndSaveContainer:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
  inputTutorsContainer:{
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "90%",
    height: "auto",
    padding: "1rem",
    margin: "0 0 0 3%",
    fontFamily: "Hind Siliguri",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: "0 0 15px 15px"
  },
  inputTutors:{
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
  table: {
    width: "100%",
    height: "auto",
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
  },
  headersRow:{
    width: "60%",
    height: "auto",
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyHeaderCell:{
    width: "20%",
    minWidth: "5rem",
    height: "auto",
    margin: "1rem",
  },
  headerCell: {
    width: "40%",
    minWidth: "10rem",
    height: "auto",
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    margin: "1rem",
  },
  row: {
    width: "60%",
    height: "auto",
    display: 'flex',
    flexDirection: "row",
    padding: "2rem",
    borderRadius: "15px",
    backgroundColor: "#142127",
    justifyContent: 'center',
    alignItems: 'center',
    margin: "0 0 1rem 0"
  },
  checkboxCell:{
    width: "20%",
    minWidth: "5rem",
    height: "auto",
    margin: "1rem",
  },
  cell: {
    width: "40%",
    minWidth: "10rem",
    height: "auto",
    margin: "1rem",
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Tutors = () => {

  const classes = useStyles()

  const playerContext = useContext(PlayerContext);
  const { getIndexPlayer, indexPlayer } = playerContext;

  const userContext = useContext(UserContext);
  const { userLogged } = userContext;

  const { id, userId } = useParams();
  const history = useHistory();

  const roleHasPermissionCreate = userLogged?.modules.find(data => data.moduleId === '34')?.value.includes('2') || false;
  const roleHasPermissionEdit = userLogged?.modules.find(data => data.moduleId === '34')?.value.includes('3') || false;
  const roleHasPermissionDelete = userLogged?.modules.find(data => data.moduleId === '34')?.value.includes('4') || false;

  const [tutorsInformation, setTutorsInformation] = useState();
  const [clickEdit, setClickEdit] = useState(false);
  const [tutorsEdited, setTutorsEdited] = useState({});
  const [sendPetition, setSendPetition] = useState(false);
  const [openDelete, setOpenDelete] = useState(false)
  const [editingTutorId, setEditingTutorId] = useState(null)

  const labelMappings = {
    name: translate("name", userLogged.language),
    lastname: translate("lastname", userLogged.language),
    relationship: translate("relationship with the player", userLogged.language),
    phone: translate("phone", userLogged.language),
    address: translate("address", userLogged.language),
    email: translate("email", userLogged.language),
  };

  const keyMappings = {
    name: "name",
    lastname: "lastname",
    relationship: "relationship",
    phone: "phone",
    address: "address",
    email: "email",
  };

  const excludedKeys = ["id", "club", "team", "guardian", "dni", "birthdate"]

  const handleClickEdit = (tutorId) => {
    setClickEdit(!clickEdit);
    setEditingTutorId(tutorId);
  }

  const handleAddTutors = () => {
    history.push(`/admin/users/add-guardian/user_id/${userId}`)
  }


  const handleCloseDelete = () => {
    setOpenDelete(false)
  }

  const handleDeleteTutors = (tutorId) => {
    deleteTutors(tutorId);

    setTimeout(() => {
      handleCloseDelete();
      setSendPetition(!sendPetition);
    }, 1000)
  }

  const handleClickSave = () => {
    const tutorsId = tutorsEdited.id;
    delete tutorsEdited.id;

    putTutors(tutorsId, tutorsEdited);
    
    setTimeout(() => {
      setTutorsEdited({});
      setSendPetition(!sendPetition);
      setEditingTutorId(null)
    }, 1000)
  }

  const handleChangeEdit = (e, id) => {
    const tutorsId = id;
    setTutorsEdited({...tutorsEdited, [e.target.name]: e.target.value, id: tutorsId});
  }

  useEffect(() => {
    getIndexPlayer(id);
  }, [sendPetition])

  useEffect(() => {
    if (Array.isArray(indexPlayer)){
      const tutorsInfo = indexPlayer.map(data => data.playerDetailsData.playerData.guardiansInformation);
      setTutorsInformation(tutorsInfo[0]);
    }
  }, [indexPlayer, sendPetition, tutorsInformation]);
  
  if (!tutorsInformation) {
    return <Spinner />;
  } else {
  return (
    <div>
      {tutorsInformation?.length === 0 ? (
        <>
          <div className={classes.addIconContainer}>
            <p className={classes.tutorsInfoText}>{translate("Tutors's information", userLogged.language)}</p>
            {roleHasPermissionCreate ?<img src={AddPersonIcon} alt="Add icon image" className={classes.tutorsInfoIcon} style={{display: "flex", alignSelf: "center"}} onClick={() => handleAddTutors()}/> : null}
          </div>
          <div className={classes.tutorsInfoContainer}>
          </div>
          <div className={classes.inputTutorsContainer}>
            <p className={classes.tutorsInfoText} style={{textAlign: "center", alignSelf: "center", margin: "2% 0 2% 3%",}}> {translate("This player don't have tutors", userLogged.language)} </p>
          </div>
        </>
      )
      :
      ( 
        <div className={classes.addIconContainer}>
          <p className={classes.tutorsInfoText}>{translate("Tutors's information", userLogged.language)}</p>
          {roleHasPermissionCreate ? <img src={AddPersonIcon} alt="Add icon image" className={classes.tutorsInfoIcon} style={{display: "flex", alignSelf: "center"}} onClick={() => handleAddTutors()}/> : null}
        </div>
      )}

      {tutorsInformation?.map((tutorsData, index) => {
        let orderedData = {};
        return (
        <>
          <div key={`header-${index}`} className={`${classes.tutorsInfoContainer} ${index >= 1 ? classes.secondTutorsInfoContainer : ''}`}>
            {clickEdit === true && editingTutorId === tutorsData.id ?
            <div className={classes.cancelAndSaveContainer}>
              <button className={classes.cancelButton} onClick={() => {handleClickEdit(); setEditingTutorId(null)}}> {translate("Cancel", userLogged.language)} </button>
              <button className={`${Object.keys(tutorsEdited)?.length === 0 ? classes.saveButtonDisabled : classes.saveButton}`} onClick={() => {handleClickSave(); handleClickEdit()}} disabled={Object.keys(tutorsEdited)?.length === 0 ? true : false}>
                {translate("Save", userLogged.language)}
              </button>
            </div>
            :
            <div className={classes.iconsContainer}>
              {roleHasPermissionEdit ? <img src={EditIcon} alt="Edit icon image" className={classes.tutorsInfoIcon} onClick={() => handleClickEdit(tutorsData.id)}/> : null}
              {roleHasPermissionDelete ? <img src={DeleteIcon} alt="Delete icon image" className={classes.tutorsInfoIcon} onClick={() => setOpenDelete(true) }/> : null}
            </div>
            }
            <Alert
              open={openDelete}
              onCancel={handleCloseDelete}
              onAcept={() => handleDeleteTutors(tutorsData.id)}
              title={`${translate('are you sure you want to delete this file', userLogged.language)}?`}
              cancel={translate('cancel', userLogged.language)}
              acept={translate('delete', userLogged.language)}
            />
          </div>
          <div
            key={index}
            className={classes.inputTutorsContainer}
          >
            {Object.entries(tutorsData)
              .filter(([key]) => !excludedKeys.includes(key))
              .sort(([keyA], [keyB]) => {
                const order = {
                  name: 1,
                  lastname: 2,
                  relationship: 3,
                  phone: 4,
                  address: 5,
                  email: 6,
                };
                return order[keyA] - order[keyB];
              })
              .forEach(([key, value]) => {
                orderedData[key] = value;               
              })}
            {Object.entries(orderedData).map(([key, value], subIndex) => (
              <div key={subIndex} className={classes.inputTutors}>
                {clickEdit === true && key === "relationship" ?
                  <Input
                  label={"Relationship"}
                  defaultValue={value}
                  name={"relationship"}
                  sizeLabel={18}
                  readOnly={true}
                />
                :
                clickEdit === true ?

                <Input
                  label={labelMappings[key] || key}
                  placeholder={`Write the ${labelMappings[key] || key}`}
                  onChange={(e) => handleChangeEdit(e, tutorsData.id)}
                  defaultValue={value}
                  name={keyMappings[key]}
                  sizeLabel={18}
                  required
                  readOnly={false}
                />
                :
                clickEdit === false ?

                <Input
                  label={labelMappings[key] || key}
                  placeholder={`Write the ${labelMappings[key] || key}`}
                  defaultValue={value}
                  name={keyMappings[key]}
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
  )
}
}

export default Tutors