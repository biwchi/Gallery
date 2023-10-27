import { useBreakpoints } from "@/hooks/useBreakpoints";
import { Slide } from "./MediaViewer";
import { breakpointsWidth } from "@/common";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import {
  mediaViewerActions,
  selectMediaViewer,
} from "@/store/mediaViewerSlice";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type MediaViewerSlideProps = {
  slide: Slide;
  type?: "prev" | "active" | "next";
};

type Position = { x: number; y: number };

const initialMoveable = {
  moveable: false,
  x: false,
  y: false,
};

const initialPosition = {
  x: 0,
  y: 0,
};

export default function MediaViewerSlide({
  slide,
  type = "active",
}: MediaViewerSlideProps) {
  const mediaViewer = useAppSelector(selectMediaViewer);
  const dispatch = useAppDispatch();
  const mediaPlayerContentRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  const zoomTransitionDuration = 150;
  const isPressed = useRef(false);
  const deltaPosition = useRef<Position & { lastX: number; lastY: number }>({
    ...initialPosition,
    lastX: 0,
    lastY: 0,
  });

  const { zoom } = mediaViewer;
  const { toggleMediaViewer, setFiles } = mediaViewerActions;
  const { breakpoint, windowSize } = useBreakpoints();

  const [isMoveable, setMoveable] = useState(initialMoveable);
  const [position, setPosition] = useState<Position>(initialPosition);

  const checkMoveable = () => {
    if (!mediaPlayerContentRef.current) return initialMoveable;

    let { width, height } =
      mediaPlayerContentRef.current.getBoundingClientRect();

    const isMoveable = {
      moveable: width >= windowSize.width || height >= windowSize.height,
      x: width >= windowSize.width,
      y: height >= windowSize.height,
    };

    return isMoveable;
  };

  const imageWidth = () => {
    if (breakpoint.xs) return breakpointsWidth.xs;
    if (breakpoint.sm) return breakpointsWidth.sm;
    if (breakpoint.md) return breakpointsWidth.md;
    if (breakpoint.lg) return breakpointsWidth.lg;
    if (breakpoint.xl) return breakpointsWidth.xl;

    return breakpointsWidth.lg;
  };

  function slideStyle() {
    if (type === "active")
      return {
        transform: `translate3d(${deltaPosition.current.lastX * zoom}px, ${
          deltaPosition.current.lastY * zoom
        }px, 0) scale(${zoom})`,
      };

    if (type === "prev")
      return {
        transform: `translate3d(-${windowSize.width}px, 0, 0) scale(1)`,
      };

    if (type === "next")
      return {
        transform: `translate3d(${windowSize.width}px, 0, 0) scale(1)`,
      };
  }

  function closeViewer() {
    dispatch(toggleMediaViewer(false));
    dispatch(setFiles([]));
  }

  useEffect(() => {
    if (type !== "active") return;
    setTimeout(() => {
      const checkForMoveable = checkMoveable();
      if (checkForMoveable.moveable === isMoveable.moveable) return;
      setMoveable(checkForMoveable);
    }, zoomTransitionDuration);
  }, [zoom]);

  useEffect(() => {
    const slide = slideRef.current;
    const slideContent = mediaPlayerContentRef.current;
    if (!slideContent || !slide) return;

    function mouseDown(e: MouseEvent) {
      if (!slideContent) return;

      isPressed.current = true;

      deltaPosition.current = {
        ...deltaPosition.current,
        x: e.clientX,
        y: e.clientY,
      };
    }

    function mouseMove(e: MouseEvent) {
      if (!isPressed.current || !slideContent || !slide) return;

      let newPosition = {
        x: e.clientX - deltaPosition.current.x + deltaPosition.current.lastX,
        y: e.clientY - deltaPosition.current.y,
      };
      console.log(newPosition.x, deltaPosition.current.lastX);
      if (!isMoveable.x) newPosition.x = 0;
      if (!isMoveable.y) newPosition.y = 0;
      slide.style.transform = `translate3d(${newPosition.x}px, ${newPosition.y}px, 0) scale(${zoom})`;
      slide.style.transition = "none";
    }

    function mouseUp(e: MouseEvent) {
      if (!slide || !slideContent) return;

      isPressed.current = false;
      deltaPosition.current.lastX = e.clientX - deltaPosition.current.x;
      deltaPosition.current.lastY = e.clientY - deltaPosition.current.x;
      slide.style.transition = "";
    }

    if (isMoveable.moveable) {
      slideContent.addEventListener("mousedown", mouseDown);
      slideContent.addEventListener("mousemove", mouseMove);
      slideContent.addEventListener("mouseup", mouseUp);
      slideContent.addEventListener("pointerleave", mouseUp);
    } else {
      slideContent.removeEventListener("mousedown", mouseDown);
      slideContent.removeEventListener("mousemove", mouseMove);
      slideContent.removeEventListener("mouseup", mouseUp);
      slideContent.removeEventListener("pointerleave", mouseUp);
    }
  }, [isMoveable, zoom]);

  return (
    <div
      ref={slideRef}
      style={slideStyle()}
      className={twMerge(
        "absolute bottom-0 left-0 right-0 top-0 flex h-full transition-transform",
        `duration-[${zoomTransitionDuration}]`,
      )}
    >
      {slide && (
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full">
          <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center py-20">
            <div
              ref={mediaPlayerContentRef}
              className={twMerge(
                isMoveable.moveable ? "cursor-move" : "cursor-default",
              )}
            >
              {slide.type === "image" && (
                <img
                  draggable="false"
                  className="max-h-full"
                  style={{ maxWidth: imageWidth() }}
                  src={slide.file}
                />
              )}
              {slide.type === "video" && (
                <video
                  style={{ maxWidth: imageWidth() }}
                  className="h-full"
                  loop
                  controls
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                ></video>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
