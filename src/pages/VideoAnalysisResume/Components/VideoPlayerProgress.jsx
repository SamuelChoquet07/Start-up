import React from "react";
import VideoPlayer from "../../VideoAnalisysBuild/components/VideoPlayer";
import Progress from "../../VideoAnalisysBuild/components/Progress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  videoPlayer: {
    position: "relative",
  },
}));

const VideoPlayerProgress = ({
  analysisId,
  url,
  userLogged,
  translate,
  played,
  onChange,
  onProgress,
  onMouseUp,
  onMouseDown,
  onDuration,
  duration,
}) => {
  const classes = useStyles();
  
  console.log("analysisId", analysisId);

  return (
    <div>
      <VideoPlayer
        className={classes.videoPlayer}
        url={url}
        onChange={onChange}
        onProgress={onProgress}
        onDuration={onDuration}
      />
      <Progress
        userLogged={userLogged}
        translate={translate}
        played={played}
        onChange={onChange}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        analysisId={analysisId}
        onDuration={onDuration}
        duration={duration}
      />
    </div>
  );
};

export default VideoPlayerProgress;
