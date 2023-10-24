import "./MediaViewer.css";

import { useBreakpoints } from "@/hooks/useBreakpoints";
import { breakpointsWidth } from "@/common";
import BaseIconButton from "../Base/BaseIconButton";
import ReactPortal from "../ReactPortal";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import {
  mediaViewerActions,
  selectMediaViewer,
} from "@/store/mediaViewerSlice";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { twMerge } from "tailwind-merge";
import useTransition from "react-transition-state";

export default function MediaViewer() {
  const mediaViewer = useAppSelector(selectMediaViewer);
  const dispatch = useAppDispatch();

  const [state, toggle] = useTransition({ timeout: 5000 });

  const { setFiles, toggleMediaViewer } = mediaViewerActions;
  const { breakpoint } = useBreakpoints();

  const imageWidth = () => {
    if (breakpoint.xs) return breakpointsWidth.xs;
    if (breakpoint.sm) return breakpointsWidth.sm;
    if (breakpoint.md) return breakpointsWidth.md;
    if (breakpoint.lg) return breakpointsWidth.lg;
    if (breakpoint.xl) return breakpointsWidth.xl;
  };

  const handleClose = () => {
    dispatch(setFiles([]));
    dispatch(toggleMediaViewer(false));
  };

  useEffect(() => {
    toggle(true);
    const closeEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? handleClose() : null;

    document.addEventListener("keydown", closeEscapeKey);

    return () => {
      document.removeEventListener("keydown", closeEscapeKey);
    };
  });

  useEffect(() => console.log(state), [state]);

  if (!mediaViewer.isOpened && !mediaViewer.files.length) return null;

  return (
    <ReactPortal wrapperId="mediaViewer">
      <div
        className={twMerge(
          "fixed left-0 top-0 h-screen w-screen bg-black/20 backdrop-blur-[2px]",
          `example ${state.status}`,
        )}
      >
        <div>
          <div className="relative z-50 flex items-center justify-between p-5">
            <h1>Photo.png</h1>

            <div className="flex gap-2">
              <BaseIconButton icon="ph:download-simple" />
              <BaseIconButton icon="ph:magnifying-glass-minus" />
              <BaseIconButton icon="ph:magnifying-glass-plus" />
              <BaseIconButton onClick={handleClose} icon="ph:x" />
            </div>
          </div>

          <ButtonNavigation />
          <ButtonNavigation isRight />

          <div className="absolute bottom-0 left-0 right-0 top-0 flex h-full items-center justify-center px-20 py-20">
            <img
              className=""
              style={{ width: imageWidth() }}
              src={
                "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/ss_5710298af2318afd9aa72449ef29ac4a2ef64d8e.1920x1080.jpg?t=1693590732"
              }
            />
          </div>
        </div>
      </div>
    </ReactPortal>
  );
}

function ButtonNavigation({ isRight }: { isRight?: boolean }) {
  return (
    <div
      className={twMerge(
        "absolute top-0 z-40 flex h-full cursor-pointer items-center px-4 text-4xl opacity-0 transition hover:bg-black/30 hover:opacity-100",
        isRight ? "right-0" : "left-0",
      )}
    >
      <Icon icon={isRight ? "ph:arrow-right" : "ph:arrow-left"} />
    </div>
  );
}
