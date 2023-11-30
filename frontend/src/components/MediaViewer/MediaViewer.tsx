import "./MediaViewer.css";

import BaseIconButton from "../Base/BaseIconButton";
import ReactPortal from "../ReactPortal";
import useTransition from "react-transition-state";
import MediaViewerSlide from "./MediaViewerSlide";

import {
  mediaViewerActions,
  selectMediaViewer,
} from "@/store/mediaViewerSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { twMerge } from "tailwind-merge";
import { AppFile } from "@/services/types";

export type Slide = AppFile | undefined;

export default function MediaViewer() {
  const mediaViewer = useAppSelector(selectMediaViewer);
  const dispatch = useAppDispatch();

  const [slide, setSlide] = useState<Slide | null>(null);
  const [state, toggle] = useTransition({
    timeout: 300,
    preEnter: true,
    unmountOnExit: true,
  });

  const { isOpened, isMoveable, currentFileIndex, files } = mediaViewer;
  const {
    setFiles,
    toggleMediaViewer,
    incrementZoom,
    decrementZoom,
    currentFileIndexIncrement,
    currentFileIndexDecrement,
  } = mediaViewerActions;

  const handleClose = () => {
    dispatch(setFiles([]));
    dispatch(toggleMediaViewer(false));
  };

  const hasNext = () => !!files[currentFileIndex + 1];
  const hasPrev = () => !!files[currentFileIndex - 1];
  const slideNext = () => dispatch(currentFileIndexIncrement());
  const slidePrev = () => dispatch(currentFileIndexDecrement());

  function slidesUpdate() {
    return setSlide(files[currentFileIndex]);
  }

  function keyboardEvents(e: KeyboardEvent) {
    if (e.key === "Escape") return handleClose();
    else if (e.key === "ArrowLeft") return slidePrev();
    else if (e.key === "ArrowRight") return slideNext();
  }

  function wheelEvent(e: WheelEvent) {
    if (e.ctrlKey) return;
    if (e.deltaY > 0) slideNext();
    else slidePrev();
  }

  useEffect(() => {
    if (isOpened) {
      toggle(true);
      document.addEventListener("keydown", keyboardEvents);
      document.addEventListener("wheel", wheelEvent);
    }

    if (!isOpened) toggle(false);

    return () => {
      document.removeEventListener("keydown", keyboardEvents);
      document.removeEventListener("wheel", wheelEvent);
    };
  }, [isOpened]);

  useEffect(() => {
    slidesUpdate();
  }, [currentFileIndex]);

  return (
    <>
      {state.isMounted && slide && (
        <ReactPortal wrapperId="mediaViewer">
          <div
            className={twMerge(
              "fixed left-0 top-0 h-screen w-screen bg-black/20 backdrop-blur-[2px]",
              `media-viewer ${state.status}`,
            )}
          >
            <div className="to-black/05 relative z-50 flex items-center justify-between bg-gradient-to-b from-black p-5">
              <h1>{slide.title}</h1>

              <span className='flex-1 text-center text-gray-500'>{`${currentFileIndex + 1}/${files.length}`}</span>

              <div className="flex gap-2">
                <BaseIconButton icon="ph:download-simple" />
                <BaseIconButton
                  onClick={() => dispatch(decrementZoom())}
                  icon="ph:magnifying-glass-minus"
                />
                <BaseIconButton
                  onClick={() => dispatch(incrementZoom())}
                  icon="ph:magnifying-glass-plus"
                />
                <BaseIconButton onClick={handleClose} icon="ph:x" />
              </div>
            </div>

            {!isMoveable.moveable && (
              <>
                <ButtonNavigation disabled={!hasPrev()} onClick={slidePrev} />
                <ButtonNavigation
                  disabled={!hasNext()}
                  onClick={slideNext}
                  isRight
                />
              </>
            )}

            <MediaViewerSlide slide={slide} />
          </div>
        </ReactPortal>
      )}
    </>
  );
}

function ButtonNavigation({
  isRight,
  disabled,
  onClick,
}: {
  disabled: boolean;
  isRight?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "absolute top-0 z-40 flex h-full cursor-pointer items-center px-16 text-4xl opacity-0 transition hover:opacity-100 active:bg-black/10",
        disabled && "invisible opacity-0",
        isRight ? "right-0" : "left-0",
      )}
    >
      <Icon icon={isRight ? "ph:arrow-right" : "ph:arrow-left"} />
    </button>
  );
}
