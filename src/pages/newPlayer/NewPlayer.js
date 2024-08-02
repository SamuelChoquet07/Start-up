import { useState, useContext, useEffect, useMemo } from "react";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import PlayerContext from "../../context/PlayerContext/PlayerContext";
import CategoryContext from "../../context/CategoryContext/CategoryContext";
import CustomCheckbox from "../../components/Button/CustomCheckbox/CustomCheckbox";
import PlayerCard from "../../components/Cards/PlayerCard";
import useCheckbox from "./components/useCheckbox";
import { arrayNumber } from "./components/arrayUtils";
import SearchIcon from "@mui/icons-material/Search";
import RegularCheckbox from "../../components/Button/CustomCheckbox/RegularCheckbox";
import Spinner from "../../components/Spinner/Spinner";
import styles from "../../styles/playerSection/selectPlayerPage.module.css";

const useStyles = makeStyles(() => ({
  body: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "2rem",
  },
  checkboxContainer: {
    backgroundColor: "#142127",
    width: "15%",
    height: "100%",
    borderRadius: "4px",
    margin: "0 0 0 2rem",
    paddingBottom: "1rem",
  },
  checkboxTitle: {
    color: "#fafafa",
    padding: "1rem",
    fontFamily: "Hind Siliguri",
    fontSize: "1.3rem",
  },
  checkboxDiv: {
    padding: "0 0 0 5%",
  },
  playersContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignContent: "start",
    margin: "0 0 0 0.5rem",
    width: "100%",
    height: "100%",
  },
  playerDiv: {
    padding: " 0 0.5rem 1rem 0.5rem",
  },
  nextButton: {
    border: "1px solid white",
    backgroundColor: "transparent",
    fontFamily: "Hind Siliguri",
    color: "white",
    padding: "1rem",
    borderRadius: "7%",
    cursor: "pointer",
    "&:hover": {
      color: "#00ffff",
      border: "1px solid #00ffff",
    },
  },
  search: {
    border: "1px solid black",
    backgroundColor: "#142127",
    padding: "0.5rem 1.5rem",
    borderRadius: "3%",
    color: "white",
  },
}));

const NewPlayer = () => {
  const classes = useStyles();
  const playerContext = useContext(PlayerContext);
  const {
    getPlayers,
    players,
    getPlayerList,
    playerList,
    getFullList,
    fullList,
  } = playerContext;
  const categoryContext = useContext(CategoryContext);
  const { getCategory, categories } = categoryContext;
  const [checkboxSelected, setCheckboxSelected] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(30);
  const [page, setPage] = useState(1);
  const [pageList, setPageList] = useState([]);
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const location = history.location.pathname;

  const positions = [
    { name: "Forward" },
    { name: "Midfielder" },
    { name: "Defender" },
    { name: "GoalKeeper" },
    { name: "Free" },
  ];

  const filterCategories = useCheckbox(checkboxSelected, setCheckboxSelected);

  const filterPositions = useCheckbox(checkboxSelected, setCheckboxSelected);

  const notFreePlayers = fullList.filter((data) => {
    return !data?.teams[0]?.shortname.toLowerCase().includes("sin equipo");
  });

  const searchList = notFreePlayers.filter((data) => {
    return (
      data?.user_name?.toLowerCase().includes(keyword.toLowerCase()) ||
      data?.user_lastname?.toLowerCase().includes(keyword.toLowerCase()) ||
      data?.category_name?.toLowerCase().includes(keyword.toLowerCase()) ||
      data?.teams[0]?.shortname
        ?.toLowerCase()
        .includes(keyword.toLowerCase()) ||
      data?.positionGroupingAbb
        ?.toLowerCase()
        .includes(keyword.toLowerCase()) ||
      data?.category_division?.toLowerCase().includes(keyword.toLowerCase())
    );
  });

  const fetchCategory = searchList?.filter((data) => {
    return filterCategories?.itemSelected?.some(
      (c) => data?.category_name === c
    );
  });

  const fetchCategoryPos = fetchCategory?.filter((data) =>
    filterPositions?.itemSelected?.some((c) => data?.positionGrouping === c)
  );

  const filterPlayers = searchList?.filter((p) =>
    filterCategories?.itemSelected.length > 0 &&
    filterPositions?.itemSelected.length > 0
      ? checkboxSelected.every(
          (c) =>
            p?.category_name === c ||
            p?.positionGrouping === c ||
            (p?.category_name === c && p?.positionGrouping === c)
        )
      : filterCategories?.itemSelected.length > 0 &&
        filterPositions?.itemSelected.length === 0
      ? filterCategories?.itemSelected.some((c) => p?.category_name === c)
      : filterPositions?.itemSelected.length > 0 &&
        filterCategories?.itemSelected.length === 0
      ? filterPositions?.itemSelected.some((c) => p?.positionGrouping === c)
      : p
  );

  const fetchPlayers = () => {
    if (checkboxSelected?.length > 0 && fetchCategoryPos?.length === 0) {
      return filterPlayers.slice(0, limit);
    } else if (fetchCategoryPos?.length > 0) {
      return fetchCategoryPos.slice(0, limit);
    } else return searchList.slice(0, limit);
  };

  const goToSummary = (id, userId) => {
    history.push(`/player/summary/new/player_id/${id}/user_id/${userId}`);
  };

  const handleNext = () => {
    setLimit(limit + 30);
  };

  useMemo(() => {
    setLimit(30);
  }, [checkboxSelected, keyword]);

  const handleKey = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    getFullList(`?limit=10000`);
  }, []);

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {loading === true ? (
        <Spinner />
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              padding: "0 5rem 0 0",
            }}
          >
            <input
              className={classes.search}
              onChange={(e) => handleKey(e)}
            ></input>
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
                color: "white",
                margin: "0 0 0 0.5rem",
                cursor: "pointer",
              }}
              
            >
              <SearchIcon fontSize="large" />
            </button>
          </div>

          <div className={styles.generalContainer}>

            <div className={styles.playerCardContainer}>
             
              {fetchPlayers()?.map((data) => {
                return (
                  <div className={classes.playerDiv}>
                    <PlayerCard
                      division={data?.category_name?.slice(0, 4).toUpperCase()}
                      position={
                        data?.positionGroupingAbb == "FREE"
                          ? "NP"
                          : data?.positionGroupingAbb
                      }
                      evaluation={
                        data?.kpiGloouds == "0" ? "-" : data?.kpiGloouds
                      }
                      kpiColor={data?.kpiGlooudsColor}
                      profilePic={data?.img_file}
                      name={`${data?.user_lastname.toUpperCase()} ${data?.user_name.toUpperCase()}`}                    
                      category={
                        data?.teams[0]?.shortname == "Sin equipo"
                          ? "Libre"
                          : data?.teams
                      }
                      goToSummary={() => goToSummary(data?.id, data?.user_id)}
                      clubResidence={data?.club_residence}
                    />
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                className={classes.nextButton}
                onClick={() => handleNext()}
              >
                VER MAS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default NewPlayer;
