import BaseInput from "@/components/Base/BaseInput";
import GalleryCard from "@/components/Gallery/GalleryCard";
import { AppFile } from "@/global";
import { useAppDispatch } from "@/hooks/useStore";
import { mediaViewerActions } from "@/store/mediaViewerSlice";
import { useState } from "react";

const initialFiles: AppFile[] = [
  {
    title: "bebra",
    type: "image",
    file: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/ss_5710298af2318afd9aa72449ef29ac4a2ef64d8e.1920x1080.jpg?t=1693590732",
    id: "1234",
    dateUploaded: new Date(),
  },
  {
    title: "simple video",
    type: "video",
    file: "",
    id: "3211",
    dateUploaded: new Date(),
  },
  {
    title: "это я на море",
    type: "image",
    file: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698105600&semt=sph",
    id: "331",
    dateUploaded: new Date(),
  },
  {
    title: "epic win csgo player simple",
    type: "image",
    file: "https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg",
    id: "531",
    dateUploaded: new Date(),
  },
];

export default function Media() {
  const dispatch = useAppDispatch();

  const [appFiles, _setAppFiles] = useState<AppFile[]>(initialFiles);

  const { toggleMediaViewer, setFiles, setCurrentFileIndex } =
    mediaViewerActions;

  function openMediaViewer(idx: number) {
    dispatch(toggleMediaViewer(true));
    dispatch(setCurrentFileIndex(idx));
    dispatch(setFiles(appFiles));
  }
  return (
    <div>
      <h1 className="text-3xl font-medium">All media</h1>

      <div className="py-7">
        <BaseInput placeholder="Search..." />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {appFiles.map((file, idx) => {
          return (
            <GalleryCard
              key={idx}
              type={file.type}
              imagePreview={file.file}
              title={file.title}
              onClick={() => openMediaViewer(idx)}
            />
          );
        })}
      </div>
    </div>
  );
}
