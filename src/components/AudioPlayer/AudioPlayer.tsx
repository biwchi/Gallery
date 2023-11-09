import "./AudioPlayer.css";

import { Icon } from "@iconify-icon/react/dist/iconify.js";
import BaseIconButton from "../Base/BaseIconButton";
import ReactPortal from "../ReactPortal";
import { Ref, RefObject, useEffect, useRef, useState } from "react";
import { useAppDispatch, useToggle } from "@/hooks";
import { useSelector } from "react-redux";
import {
  audioPlayerActions,
  selectAudioPlayer,
} from "@/store/audioPlayerSlice";
import { twMerge } from "tailwind-merge";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { getTimeFromSeconds } from "@/utils";

const icon = {
  pause: "line-md:pause-to-play-filled-transition",
  play: "line-md:play-filled-to-pause-transition",
};

const initialPlayerState = {
  duration: 0,
  currentTime: 0,
  currentTimeFormatted: "",
  durationFormatted: "",
};

export default function AudioPlayer() {
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const interval = useRef<NodeJS.Timeout | undefined>();
  const isPressed = useRef(false);

  const audioPlayer = useSelector(selectAudioPlayer);
  const dispatch = useAppDispatch();

  const { files, currentSound, hasNext, hasPrev } = audioPlayer;
  const { incrementIndex, decrementIndex } = audioPlayerActions;

  const [isPaused, togglePaused] = useToggle(true);
  const [playerState, setPlayerState] = useState(initialPlayerState);

  useEffect(() => {
    const player = audioPlayerRef.current;
    console.log(isPaused);
    if (!player) return;

    if (!isPaused) {
      audioPlayerRef.current?.play();

      interval.current = setInterval(() => {
        if (!player || isNaN(player.duration) || isPressed.current) return;

        const currentTime = player.currentTime;
        const duration = playerState.duration || player.duration;

        const durationFormatted = getTimeFromSeconds(duration);
        const currentTimeFormatted = getTimeFromSeconds(currentTime);

        if (!isPressed.current) {
          setPlayerState({
            duration,
            currentTime,
            durationFormatted,
            currentTimeFormatted,
          });
        }
      }, 100);

      return;
    }

    audioPlayerRef.current?.pause();
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
          "fixed left-1/2 -translate-x-1/2 font-sans transition-all duration-300",
          !files.length
            ? "invisible -bottom-20 opacity-0"
            : " visible bottom-2.5 opacity-100",
        )}
      >
        <audio
          ref={audioPlayerRef}
          controls
          src={currentSound.file}
          className="invisible absolute h-0 w-0"
          onPlay={() => togglePaused(false)}
          onPause={() => togglePaused(true)}
        ></audio>
        <div className="flex items-center gap-4 rounded-full bg-black px-5 py-2.5 shadow-xl">
          <div className="flex text-2xl">
            <BaseIconButton
              // disabled={!hasPrev}
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
              // disabled={!hasNext}
              variant={"white"}
              size={"bigIcon"}
              icon="material-symbols:skip-next-rounded"
              onClick={() => dispatch(incrementIndex())}
            />
          </div>

          <div
            className={twMerge(
              "flex flex-col gap-2 transition-all duration-500",
              !files.length ? "min-w-[15rem]" : "min-w-[26rem]",
            )}
          >
            <p className="whitespace-nowrap text-center">
              {currentSound.artist && (
                <span className="text-gray-light">{currentSound.artist} -</span>
              )}
              <span className="font-medium"> {currentSound.name}</span>
            </p>

            <AudioProgressBar
              duration={playerState.duration}
              currentTime={playerState.currentTime}
              onRewind={(newPressed, newTime) => {
                if (!audioPlayerRef.current) return;
                isPressed.current = newPressed;
                audioPlayerRef.current.currentTime = newTime;
              }}
            />

            <div className="flex items-center justify-between text-sm text-gray-light">
              <span>{playerState.currentTimeFormatted}</span>
              <span>{playerState.durationFormatted}</span>
            </div>
          </div>

          <div>
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
  onRewind: (isPressed: boolean, newTime: number) => void;
};

function AudioProgressBar({
  duration,
  currentTime,
  onRewind,
}: AudioProgressBarProps) {
  const progressLineRef = useRef<HTMLInputElement>(null);
  const currentTimeLineRef = useRef<HTMLDivElement>(null);

  const handleChange = useDebouncedCallback(() => {
    if (!progressLineRef.current) return;

    const newTime = progressLineRef.current.value;

    onRewind(false, Number(newTime));
  }, 300);

  function onChange() {
    if (!currentTimeLineRef.current || !progressLineRef.current) return;

    const { value } = progressLineRef.current;

    const newProgress = `${(Number(value) / duration) * 100}%`;
    currentTimeLineRef.current.style.width = newProgress;

    onRewind(true, currentTime);
    handleChange();
  }

  useEffect(() => {
    if (!progressLineRef.current) return;

    progressLineRef.current.value = currentTime.toString();
  }, [currentTime]);

  return (
    <div className="flex h-1.5 items-center">
      <div className="group relative h-1 w-full cursor-pointer transition-all hover:h-1.5">
        <input
          ref={progressLineRef}
          className="progress "
          type="range"
          max={duration}
          onChange={onChange}
        />

        <div
          style={{ width: `${(currentTime / duration) * 100}%` }}
          ref={currentTimeLineRef}
          className="pointer-events-none absolute h-full select-none rounded-full bg-white"
        />
      </div>
    </div>
  );
}
