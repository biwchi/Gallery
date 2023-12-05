import styles from "./AudioPlayer.module.scss";

import { Icon } from "@iconify-icon/react/dist/iconify.js";
import ReactPortal from "../ReactPortal";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useToggle } from "@/hooks";
import { useSelector } from "react-redux";
import {
  audioPlayerActions,
  selectAudioPlayer,
} from "@/store/audioPlayerSlice";
import { getTimeFromSeconds } from "@/utils";
import { useCurrentSound } from "@/hooks/useCurrentSound";
import clsx from "clsx";
import { IconButton } from '../UI/IconButton';
import { Range } from '../UI/Range';

const icon = {
  pause: "line-md:pause-to-play-filled-transition",
  play: "line-md:play-filled-to-pause-transition",
};

const initialPlayerState = {
  duration: 0,
  currentTime: 0,
  currentTimeFormatted: "",
  durationFormatted: "",
  bufferedTime: 0,
};

export function AudioPlayer() {
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const interval = useRef<NodeJS.Timeout | undefined>();

  const currentSound = useCurrentSound();
  const audioPlayer = useSelector(selectAudioPlayer);
  const dispatch = useAppDispatch();

  const { files } = audioPlayer;
  const { incrementIndex, decrementIndex, setFiles } = audioPlayerActions;

  const [isPaused, togglePaused] = useToggle(true);
  const [isLoading, toggleLoading] = useToggle(true);
  const [isHidden, toggleHidden] = useToggle(false);
  const [playerState, setPlayerState] = useState(initialPlayerState);

  useEffect(() => {
    const player = audioPlayerRef.current;

    if (!player) return;

    if (!isPaused) {
      player.play();

      interval.current = setInterval(() => {
        if (!player || isNaN(player.duration)) return;

        const currentTime = player.currentTime;
        const duration = playerState.duration || player.duration;
        const bufferedLength = player.buffered.length;
        const bufferedTime = player.buffered.end(bufferedLength - 1);

        const durationFormatted = getTimeFromSeconds(duration);
        const currentTimeFormatted = getTimeFromSeconds(currentTime);

        if (currentTime >= bufferedTime) toggleLoading(true);
        else toggleLoading(false);

        setPlayerState({
          duration,
          bufferedTime,
          currentTime,
          durationFormatted,
          currentTimeFormatted,
        });
      }, 400);

      return;
    }

    player.pause();
    clearInterval(interval.current ? interval.current : undefined);
  }, [isPaused]);

  useEffect(() => {
    if (!audioPlayerRef.current) return;
    setPlayerState(initialPlayerState);
    audioPlayerRef.current.play();
  }, [currentSound]);

  return (
    <ReactPortal wrapperId="audioPlayer">
      <div
        className={clsx(
          styles.player,
          !files.length && styles.off,
          isHidden && styles.hidden,
        )}
      >
        {currentSound.fileName && (
          <audio
            ref={audioPlayerRef}
            src={currentSound.fileUrl}
            onError={() => dispatch(setFiles([]))}
            onLoadStart={() => toggleLoading(true)}
            onLoadedData={() => toggleLoading(false)}
            onEnded={() => dispatch(incrementIndex())}
            onPlay={() => togglePaused(false)}
            onPause={() => togglePaused(true)}
          ></audio>
        )}

        <button onClick={() => toggleHidden()} className={styles.playerHide}>
          <div>
            <span>{isHidden ? "Show" : "Hide"}</span>
            <Icon icon={isHidden ? "ph:caret-up-bold" : "ph:caret-down-bold"} />
          </div>
        </button>

        <div className={styles.playerBody}>
          <div className={styles.buttons}>
            <IconButton
              size={"bigIcon"}
              icon="material-symbols:skip-previous-rounded"
              onClick={() => dispatch(decrementIndex())}
            />
            <IconButton
              size={"bigIcon"}
              onClick={() => togglePaused()}
              icon={isPaused ? icon.pause : icon.play}
            />
            <IconButton
              size={"bigIcon"}
              icon="material-symbols:skip-next-rounded"
              onClick={() => dispatch(incrementIndex())}
            />
          </div>

          <div
            className={clsx(
              styles.information,
              (!files.length || isHidden) && styles.hidden,
            )}
          >
            <p className={styles.songName}>
              {currentSound.artist && (
                <span className={styles.artist}>{currentSound.artist} -</span>
              )}
              <span className={styles.name}>
                {currentSound.songName || currentSound.title.split(".")[0]}
              </span>
            </p>

            <AudioProgressBar
              isLoading={isLoading}
              duration={playerState.duration}
              currentTime={playerState.currentTime}
              onPressed={(pressed) => {
                if (pressed && isPaused) return;

                if (pressed) audioPlayerRef.current?.pause();
                else audioPlayerRef.current?.play();
              }}
              onRewind={(newTime) => {
                if (!audioPlayerRef.current) return;
                audioPlayerRef.current.currentTime = newTime;
              }}
            />

            <div className={styles.timing}>
              <span>{playerState.currentTimeFormatted || "0:00"}</span>
              <span>{playerState.durationFormatted || "0:00"}</span>
            </div>
          </div>

          <div className={styles.volume}>
            <div className={styles.placeholder} />
            <AudioVolume
              playerVolume={audioPlayerRef.current?.volume || 100}
              onChangeVolume={(volume) => {
                if (!audioPlayerRef.current) return;
                audioPlayerRef.current.volume = volume / 100;
              }}
            />
            <Icon icon="material-symbols:volume-down-rounded" />
          </div>
        </div>
      </div>
    </ReactPortal>
  );
}

type AudioProgressBarProps = {
  duration: number;
  currentTime: number;
  isLoading: boolean;
  onRewind: (newTime: number) => void;
  onPressed: (isPressed: boolean) => void;
};

function AudioProgressBar({
  duration,
  isLoading,
  currentTime,
  onRewind,
  onPressed,
}: AudioProgressBarProps) {
  const [time, setTime] = useState(currentTime);

  function onChange(value: string | number) {
    setTime(Number(value));
    onRewind(Number(value));
  }

  useEffect(() => {
    setTime(currentTime);
  }, [currentTime]);

  return (
    <Range
      isLoading={isLoading}
      value={time}
      maxValue={duration}
      onChange={(newVal) => onChange(newVal)}
      onPress={(val) => onPressed(val)}
    />
  );
}

function AudioVolume({
  playerVolume,
  onChangeVolume,
}: {
  playerVolume: number;
  onChangeVolume: (newVolume: number) => void;
}) {
  const [volume, setVolume] = useState(playerVolume);

  function onChange(value: string | number) {
    setVolume(Number(value));
    onChangeVolume(Number(value));
  }

  return (
    <div className={styles.slider}>
      <Range
        value={volume}
        maxValue={100}
        onChange={(newValue) => onChange(newValue)}
      />
    </div>
  );
}
