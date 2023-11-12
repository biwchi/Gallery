import { FileType } from "@/global";
import { useToggle } from "@/hooks";
import { Icon } from "@iconify-icon/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

type GalleryCardProps = {
  imagePreview: string;
  title: string;
  type: FileType;
  onClick?: () => void;
};

export default function GalleryCard({
  imagePreview,
  title,
  onClick,
  type = "image",
}: GalleryCardProps) {
  const icons = {
    image: "ph:image",
    video: "ph:video-duotone",
    audio: "ph:speaker-simple-high-duotone",
  };

  return (
    <div
      onClick={onClick}
      className="relative aspect-square cursor-pointer overflow-hidden rounded-md border border-gray-600"
    >
      <PreviewPlaceholder
        fileTitle={title}
        preview={imagePreview}
        type={type}
      />

      <Icon
        className="absolute left-2 top-2 rounded-full bg-black p-2.5 text-2xl"
        icon={icons[type]}
      />

      <div className="relative flex h-full pointer-events-none w-full flex-col justify-end bg-gradient-to-b from-transparent to-black/70">
        <div className="px-5 py-3">
          <p title={title} className="line-clamp-2 break-all text-lg">
            {title}
          </p>
          <span className="text-gray-300">20 jun 2022</span>
        </div>
      </div>
    </div>
  );
}

type PreviewPlaceholderProps = {
  type: FileType;
  preview: string | null;
  fileTitle: string;
};

function PreviewPlaceholder({
  type,
  preview,
  fileTitle,
}: PreviewPlaceholderProps) {
  const [validImage, toggleValidImage] = useToggle(true);

  const icons = {
    audio: "ph:speaker-high",
    video: "ph:video",
    image: "ph:image",
  };
  
  return (
    <div>
      {preview !== null && validImage ? (
        <img
          onError={() => toggleValidImage(false)}
          className="absolute left-0 top-0 h-full w-full object-cover"
          src={preview}
          alt={fileTitle}
        />
      ) : (
        <div className="group absolute left-0 top-0 flex h-full w-full items-center justify-center bg-gray-800 text-8xl">
          <Icon
            className="transition group-hover:opacity-0 group-hover:absolute"
            icon={icons[type]}
          />
          <Icon
            className="absolute opacity-0 transition group-hover:relative group-hover:opacity-100"
            icon={type !== "image" ? "ph:play" : "ph:eye"}
          />
        </div>
      )}
    </div>
  );
}
