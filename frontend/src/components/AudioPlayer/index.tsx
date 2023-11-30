import styles from "./index.module.css";

import { Icon } from "@iconify-icon/react/dist/iconify.js";
import BaseIconButton from "../Base/BaseIconButton";
import ReactPortal from "../ReactPortal";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useToggle } from "@/hooks";
import { useSelector } from "react-redux";
import {
  audioPlayerActions,
  selectAudioPlayer,
} from "@/store/audioPlayerSlice";
import { twMerge } from "tailwind-merge";
import { getTimeFromSeconds } from "@/utils";
import { BaseRange } from "../Base/BaseRange";
import { useCurrentSound } from "@/hooks/useCurrentSound";

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

export default function AudioPlayer() {
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
        className={twMerge(
          "fixed left-1/2 -translate-x-1/2 transition-all duration-300",
          !files.length
          ? "invisible -bottom-20 opacity-0"
          : " visible bottom-2.5 opacity-100",
          isHidden ? '-bottom-20' : 'bottom-2.5',
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
            <Icon
              icon={isHidden ? "ph:caret-up-bold" : "ph:caret-down-bold"}
            />
          </div>
        </button>
        <div className="flex items-center gap-4 rounded-full bg-black px-5 py-2.5 shadow-xl">
          <div className="flex text-2xl">
            <BaseIconButton
              variant={"white"}
              size={"bigIcon"}
              icon="material-symbols:skip-previous-rounded"
              onClick={() => dispatch(decrementIndex())}
            />
            <BaseIconButton
              variant={"white"}
              size={"bigIcon"}
              onClick={() => togglePaused()}
              icon={isPaused ? icon.pause : icon.play}
            />
            <BaseIconButton
              variant={"white"}
              size={"bigIcon"}
              icon="material-symbols:skip-next-rounded"
              onClick={() => dispatch(incrementIndex())}
            />
          </div>

          <div
            className={twMerge(
              "flex flex-col gap-2 transition-all duration-500",
              !files.length || isHidden
                ? "min-w-[15rem] max-w-[15rem]"
                : "min-w-[26rem] max-w-[30rem]",
            )}
          >
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-center">
              {currentSound.artist && (
                <span className="text-gray-light">{currentSound.artist} -</span>
              )}
              <span className="font-medium">
                {" "}
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

            <div className="flex items-center justify-between text-sm text-gray-light">
              <span>{playerState.currentTimeFormatted || "0:00"}</span>
              <span>{playerState.durationFormatted || "0:00"}</span>
            </div>
          </div>

          <div className="group relative flex">
            <div className="invisible absolute bottom-full h-10 w-full group-hover:visible" />
            <AudioVolume
              playerVolume={audioPlayerRef.current?.volume || 100}
              onChangeVolume={(volume) => {
                if (!audioPlayerRef.current) return;
                audioPlayerRef.current.volume = volume / 100;
              }}
            />
            <Icon
              className="cursor-pointer p-3 text-2xl"
              icon="material-symbols:volume-down-rounded"
            />
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
    <BaseRange
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
    <div className="invisible absolute bottom-full left-1/2 -mb-6 flex h-1.5 w-32 -translate-x-1/2 -translate-y-full rotate-[270deg] items-center justify-center  rounded-full bg-black p-4 opacity-0 transition-all group-hover:visible group-hover:mb-10 group-hover:opacity-100 ">
      <BaseRange
        value={volume}
        maxValue={100}
        onChange={(newValue) => onChange(newValue)}
      />
    </div>
  );
}
