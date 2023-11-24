import BaseLayout from "@/layouts/BaseLayout";
import GalleryCard from "@/components/Gallery/GalleryCard";

import { useAppDispatch } from "@/hooks";
import { SoundFile, audioPlayerActions } from "@/store/audioPlayerSlice";
import { useState } from "react";

export default function Audios() {
  const dispatch = useAppDispatch();

  const [sounds, _] = useState<SoundFile[]>([]);

  const { setCurrentIndex, setFiles } = audioPlayerActions;

  function playSound(idx: number) {
    dispatch(setFiles(sounds));
    dispatch(setCurrentIndex(idx));
  }

  return (
    <BaseLayout title="Audios">
      <div className="grid grid-cols-4 gap-4">
        {sounds.map((file, idx) => {
          return (
            <GalleryCard
              key={idx}
              type={"audio"}
              title={file.name}
              dateUploaded={file.dateUploaded}
              imagePreview={"file.poster"}
              onClick={() => playSound(idx)}
            />
          );
        })}
      </div>
    </BaseLayout>
  );
}
