import AudioPlayer from "@/components/AudioPlayer";
import MediaViewer from "@/components/MediaViewer/MediaViewer";

import { useAppSelector } from "./hooks";
import { AppRouter } from "./router";
import { selectTheme } from "./store/themeSlice";
import { useEffect } from "react";

export default function App() {
  const theme = useAppSelector(selectTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <AudioPlayer />
      <MediaViewer />

      <AppRouter />
    </>
  );
}
