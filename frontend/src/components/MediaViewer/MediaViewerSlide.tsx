import { useBreakpoints } from "@/hooks/useBreakpoints";
import { Slide } from "./MediaViewer";
import { breakpointsWidth } from "@/common";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import {
  mediaViewerActions,
  selectMediaViewer,
} from "@/store/mediaViewerSlice";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

type MediaViewerSlideProps = {
  slide: Slide;
};

type Position = { x: number; y: number; lastX: number; lastY: number };

const initialMoveable = {
  moveable: false,
  x: false,
  y: false,
};

const initialPosition = {
  x: 0,
  y: 0,
  lastX: 0,
  lastY: 0,
};

export default function MediaViewerSlide({ slide }: MediaViewerSlideProps) {
  const mediaViewer = useAppSelector(selectMediaViewer);
  const dispatch = useAppDispatch();

  const mediaPlayerContentRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const isPressed = useRef(false);
  const deltaPosition = useRef<Position>(initialPosition);

  const zoomTransitionDuration = 150;

  const { zoom, isMoveable } = mediaViewer;
  const { toggleMoveable } = mediaViewerActions;
  const { breakpoint, windowSize } = useBreakpoints();

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
    if (zoom === 1 || !isMoveable.moveable) {
      deltaPosition.current.lastX = 0;
      deltaPosition.current.lastY = 0;
    }
    if (zoom > 1) {
      deltaPosition.current.lastX /= zoom;
      deltaPosition.current.lastY /= zoom;
    }

    return {
      transform: `translate3d(${deltaPosition.current.lastX}px, ${deltaPosition.current.lastY}px, 0) scale(${zoom})`,
    };
  }

  useEffect(() => {
    setTimeout(() => {
      const checkForMoveable = checkMoveable();
      const toString = JSON.stringify;

      if (toString(checkForMoveable) === toString(isMoveable)) return;

      dispatch(toggleMoveable(checkForMoveable));
    }, zoomTransitionDuration);
  }, [zoom, breakpoint]);

  useEffect(() => {
    const slide = slideRef.current;
    const slideContent = mediaPlayerContentRef.current;
    if (!slideContent || !slide) return;

    function mouseDown(e: MouseEvent) {
      if (!slideContent || isPressed.current) return;

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
        y: e.clientY - deltaPosition.current.y + deltaPosition.current.lastY,
      };

      if (!isMoveable.x) newPosition.x = 0;
      if (!isMoveable.y) newPosition.y = 0;

      slide.style.transform = `translate3d(${newPosition.x}px, ${newPosition.y}px, 0) scale(${zoom})`;
      slide.style.transition = "none";
    }

    function mouseUp(e: MouseEvent) {
      if (!slide || !slideContent || !isPressed.current) return;

      const { lastX, lastY } = deltaPosition.current;

      isPressed.current = false;
      deltaPosition.current.lastX = e.clientX - deltaPosition.current.x + lastX;
      deltaPosition.current.lastY = e.clientY - deltaPosition.current.y + lastY;
      slide.style.transition = "";
    }

    if (isMoveable.moveable) {
      slideContent.addEventListener("pointerdown", mouseDown);
      slideContent.addEventListener("pointermove", mouseMove);
      slideContent.addEventListener("pointerup", mouseUp);
      slideContent.addEventListener("pointerleave", mouseUp);
    }

    return () => {
      slideContent.removeEventListener("pointerdown", mouseDown);
      slideContent.removeEventListener("pointermove", mouseMove);
      slideContent.removeEventListener("pointerup", mouseUp);
      slideContent.removeEventListener("pointerleave", mouseUp);
    };
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
                "max-h-full",
              )}
            >
              {slide.type === "image" && (
                <img
                  draggable="false"
                  className="max-h-full"
                  style={{
                    maxWidth: imageWidth(),
                    maxHeight: `${windowSize.height - 160}px`,
                  }}
                  src={slide.fileUrl}
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
