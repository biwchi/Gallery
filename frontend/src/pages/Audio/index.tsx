import { BaseButton } from "@/components/Base/BaseButton";
import BaseInput from "@/components/Base/BaseInput";
import BasePage from "@/components/Base/BasePage";
import GalleryCard from "@/components/Gallery/GalleryCard";
import { useAppDispatch } from "@/hooks";
import { SoundFile, audioPlayerActions } from "@/store/audioPlayerSlice";
import { useState } from "react";

const initial: SoundFile[] = [
  {
    name: "Back in Black",
    file: "./public/sounds/Back in Black - Back in Black.mp3",
    poster: "",
    id: 1,
    artist: "Back in Black",
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
    name: "За деньги да",
    file: "https://dl2.mp3party.net/online/10663071.mp3",
    poster: "",
    id: 4,
    artist: "InstaSamka",
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
    <BasePage title="Audios">
      <div className="grid grid-cols-4 gap-4">
        {sounds.map((file, idx) => {
          return (
            <GalleryCard
              key={idx}
              type={"audio"}
              title={file.name}
              imagePreview={"file.poster"}
              onClick={() => playSound(idx)}
            />
          );
        })}
      </div>
    </BasePage>
  );
}
