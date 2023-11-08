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

const icon = {
  pause: "line-md:pause-to-play-filled-transition",
  play: "line-md:play-filled-to-pause-transition",
};

export default function AudioPlayer() {
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  const audioPlayer = useSelector(selectAudioPlayer);
  const dispatch = useAppDispatch();

  const { files, currentSound, currentIndex } = audioPlayer;
  const { incrementIndex, decrementIndex } = audioPlayerActions;

  const [isPaused, togglePaused] = useToggle(true);

  useEffect(() => {
    if (!isPaused) audioPlayerRef.current?.play();
    else audioPlayerRef.current?.pause();
  }, [isPaused]);

  return (
    <ReactPortal wrapperId="audioPlayer">
      <div
        className={twMerge(
          "fixed left-1/2 -translate-x-1/2 font-sans transition-all",
          !!files.length
            ? "invisible -bottom-20 opacity-0"
            : " visible bottom-2.5 opacity-100",
        )}
      >
        <audio
          ref={audioPlayerRef}
          controls
          src="https://dl2.mp3party.net/online/8866310.mp3"
          className="invisible absolute h-0 w-0"
        ></audio>
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

          <div className="flex min-w-[26rem] flex-col gap-2">
            <p className="whitespace-nowrap text-center">
              {currentSound.artist && (
                <span className="text-gray-light">
                  {currentSound.artist} -{" "}
                </span>
              )}
              <span className="font-medium">{currentSound.name}</span>
            </p>

            <AudioProgressBar isPaused={isPaused} player={audioPlayerRef} />

            <div className="text-gray-light flex items-center justify-between text-sm">
              <span>{audioPlayerRef.current?.currentTime}</span>
              <span>{audioPlayerRef.current?.duration}</span>
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
  isPaused: boolean;
  player: RefObject<HTMLAudioElement>;
};

function AudioProgressBar({ isPaused, player }: AudioProgressBarProps) {
  const progressLineRef = useRef<HTMLInputElement>(null);
  const currentTimeLineRef = useRef<HTMLDivElement>(null);
  const interval = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    if (!isPaused) {
      interval.current = setInterval(() => {
        if (
          !player.current ||
          !progressLineRef.current ||
          !currentTimeLineRef.current
        )
          return;
        const currentTime = player.current?.currentTime;

        progressLineRef.current.value = currentTime.toString();

        const { max, value } = progressLineRef.current;

        currentTimeLineRef.current.style.width = `${
          (Number(value) / Number(max)) * 100
        }%`;
      }, 10);

      return;
    }

    clearInterval(interval.current ? interval.current : undefined);
  }, [isPaused]);

  useEffect(() => {
    const progress = progressLineRef.current;
    const current = currentTimeLineRef.current;
    if (!progress || !current) return;

    function onChange() {
      if (!progress || !current || !player.current) return;

      const { max, value } = progress;

      player.current.currentTime = Number(value);

      current.style.width = `${(Number(value) / Number(max)) * 100}%`;
    }

    progress.addEventListener("input", onChange);
  }, []);

  return (
    <div className="flex h-1.5 items-center">
      <div className="group relative h-1 w-full cursor-pointer transition-all hover:h-1.5">
        <input
          ref={progressLineRef}
          className="progress "
          type="range"
          max={player.current?.duration}
        />

        <div
          ref={currentTimeLineRef}
          className="pointer-events-none absolute h-full select-none rounded-full bg-white"
        />
      </div>
    </div>
  );
}
