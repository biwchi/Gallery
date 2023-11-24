import GalleryCard from "@/components/Gallery/GalleryCard";
import BaseLayout from "@/layouts/BaseLayout";

import { AppFile } from "@/services/types";
import { useAppDispatch } from "@/hooks/useStore";
import { mediaViewerActions } from "@/store/mediaViewerSlice";
import { useEffect, useState } from "react";
import GalleryService from "@/services/GalleryService";
import { audioPlayerActions } from "@/store/audioPlayerSlice";

export default function Media() {
  const dispatch = useAppDispatch();

  const [appFiles, setAppFiles] = useState<AppFile[]>([]);

  const { toggleMediaViewer, setFiles, setCurrentFileIndex } =
    mediaViewerActions;
  const { setCurrentIndex, setFiles: setAudioFiles } = audioPlayerActions;

  function handleOpenFile(idx: number) {
    const file = appFiles[idx];

    if (file.type === "audio") {
      dispatch(setCurrentIndex(idx));
      dispatch(setAudioFiles(appFiles.filter((file) => file.type === "audio")));
      return;
    }

    dispatch(toggleMediaViewer(true));
    dispatch(setCurrentFileIndex(idx));
    dispatch(setFiles(appFiles));
  }

  async function getFiles() {
    const filesResponse = await GalleryService.getAll();
    setAppFiles(filesResponse.data.result);
  }

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <BaseLayout title="All media">
      <div className="grid grid-cols-4 gap-4">
        {appFiles.map((file, idx) => {
          return (
            <GalleryCard
              key={idx}
              file={file}
              onClick={() => handleOpenFile(idx)}
            />
          );
        })}
      </div>
    </BaseLayout>
  );
}
