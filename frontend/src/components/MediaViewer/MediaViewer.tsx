import './MediaViewer.scss'
import styles from "./MediaViewer.module.scss";

import ReactPortal from "../ReactPortal";
import useTransition from "react-transition-state";

import {
  mediaViewerActions,
  selectMediaViewer,
} from "@/store/mediaViewerSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { AppFile } from "@/services/types";
import clsx from "clsx";
import { MediaViewerSlide } from "./MediaViewerSlide";
import { IconButton } from '../UI/IconButton';

export type Slide = AppFile | undefined;

export function MediaViewer() {
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

  function download() {
    window.open(slide?.downloadUrl)
  }

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
            className={clsx(styles.mediaViewer, `media-viwer-animation ${state.status}`)}
          >
            <div className={styles.header}>
              <h1>{slide.title}</h1>

              <span className={styles.index}>{`${currentFileIndex + 1}/${
                files.length
              }`}</span>

              <div className={styles.actions}>
                <IconButton onClick={download} icon="ph:download-simple" />
                <IconButton
                  onClick={() => dispatch(decrementZoom())}
                  icon="ph:magnifying-glass-minus"
                />
                <IconButton
                  onClick={() => dispatch(incrementZoom())}
                  icon="ph:magnifying-glass-plus"
                />
                <IconButton onClick={handleClose} icon="ph:x" />
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
      className={clsx(
        styles.navigationButton,
        disabled && styles.disabled,
        isRight && styles.right,
      )}
    >
      <Icon icon={isRight ? "ph:arrow-right" : "ph:arrow-left"} />
    </button>
  );
}
