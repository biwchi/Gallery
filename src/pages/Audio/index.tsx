import { BaseButton } from "@/components/Base/BaseButton";
import BaseInput from "@/components/Base/BaseInput";
import GalleryCard from "@/components/Gallery/GalleryCard";
import { useAppDispatch } from "@/hooks";
import { SoundFile, audioPlayerActions } from "@/store/audioPlayerSlice";
import { useState } from "react";

const initial: SoundFile[] = [
  {
    name: "Feel Good Inc",
    file: "https://dl2.mp3party.net/online/9283462.mp3",
    poster: "",
    id: 1,
    artist: "Gorillaz",
    dateUploaded: new Date(),
  },
  {
    name: "In The House - In A Heartbeat",
    file: "https://dl2.mp3party.net/online/8866310.mp3",
    poster: "",
    id: 2,
    artist: "John Murphy",
    dateUploaded: new Date(),
  },
  {
    name: "Город под подошвой",
    file: "https://dl2.mp3party.net/online/3836882.mp3",
    poster: "",
    id: 3,
    artist: "Oxxymiron",
    dateUploaded: new Date(),
  },
];

export default function Audios() {
  const dispatch = useAppDispatch();

  const [sounds, setSounds] = useState<SoundFile[]>(initial);

  const { setCurrentIndex, setFiles } = audioPlayerActions;

  function playSound(idx: number) {
    dispatch(setFiles(sounds));
    dispatch(setCurrentIndex(idx));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-medium">All media</h1>
      </div>

      <div className="py-7">
        <BaseInput placeholder="Search..." />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {sounds.map((file, idx) => {
          return (
            <GalleryCard
              key={idx}
              type={"audio"}
              imagePreview={"file.poster"}
              title={file.name}
              onClick={() => playSound(idx)}
            />
          );
        })}
      </div>
    </div>
  );
}
