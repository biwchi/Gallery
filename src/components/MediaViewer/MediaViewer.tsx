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
import { AppFile } from "@/global";

export type Slide = AppFile | undefined;

type Slides = {
  prev: Slide;
  active: Slide;
  next: Slide;
};

export default function MediaViewer() {
  const mediaViewer = useAppSelector(selectMediaViewer);
  const dispatch = useAppDispatch();

  const [slides, setSlides] = useState<Slides | null>(null);
  const [state, toggle] = useTransition({
    timeout: 300,
    preEnter: true,
    unmountOnExit: true,
  });

  const { isOpened, currentFileIndex, files } = mediaViewer;
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
    return setSlides({
      prev: files[currentFileIndex - 1],
      active: files[currentFileIndex],
      next: files[currentFileIndex + 1],
    });
  }

  function keyboardEvents(e: KeyboardEvent) {
    if (e.key === "Escape") return handleClose();
    else if (e.key === "ArrowLeft") return slidePrev();
    else if (e.key === "ArrowRight") return slideNext();
  }

  function wheelEvent(e: WheelEvent) {
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
      {state.isMounted && slides && (
        <ReactPortal wrapperId="mediaViewer">
          <div
            className={twMerge(
              "fixed left-0 top-0 h-screen w-screen bg-black/20 backdrop-blur-[2px]",
              `media-viewer ${state.status}`,
            )}
          >
            <div className="relative z-50 flex items-center justify-between bg-gradient-to-b to-black/05 from-black p-5">
              <h1>{slides.active?.title}</h1>

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

            <ButtonNavigation disabled={!hasPrev()} onClick={slidePrev} />
            <ButtonNavigation
              disabled={!hasNext()}
              onClick={slideNext}
              isRight
            />

            <MediaViewerSlide type="prev" slide={slides.prev} />
            <MediaViewerSlide slide={slides.active} />
            <MediaViewerSlide type="next" slide={slides.next} />
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
