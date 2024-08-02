import { makeStyles } from "@material-ui/core/styles";
import EvaluationCard from "./EvaluationCard";
import translate from "../../../../lang/lang";
import styles from "../../styles/NewPlayerSummary.module.css";

const EvaluationSkills = ({ playerData }) => {
  const highlightedSkills = playerData?.topSkillsHighlighted;
  const improveSkills = playerData?.topSkillsImprove;
  const lang = JSON.parse(localStorage.getItem("user")).language;

  return (
    <div className={styles.playerSkillsInfo}>
      <EvaluationCard
        arrayToMap={highlightedSkills}
        title={translate("top skills outsanding", lang)}
      />
      <EvaluationCard
        arrayToMap={improveSkills}
        title={translate("top skills to improve", lang)}
      />
    </div>
  );
};

export default EvaluationSkills;
