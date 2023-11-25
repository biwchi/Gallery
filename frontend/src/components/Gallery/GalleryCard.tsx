import { AppFile, FileType } from "@/services/types";
import { useToggle } from "@/hooks";
import { Icon } from "@iconify-icon/react";
import { formatDate } from "@/utils";

type GalleryCardProps = {
  file: AppFile;
  showType?: boolean;
  onClick?: () => void;
};

export default function GalleryCard({
  file,
  onClick,
  showType = true,
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
        fileTitle={file.title}
        preview={file.fileUrl}
        type={file.type}
      />

      {showType && (
        <Icon
          className="absolute left-2 top-2 rounded-full bg-black p-2.5 text-2xl"
          icon={icons[file.type]}
        />
      )}

      <div className="pointer-events-none relative flex h-full w-full flex-col justify-end bg-gradient-to-b from-transparent to-black/70">
        <div className="px-5 py-3">
          <p title={file.title} className="line-clamp-2 break-all text-lg">
            {file.title}
          </p>
          <span className="text-gray-300">{formatDate(file.dateUploaded)}</span>
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
            className="transition group-hover:absolute group-hover:opacity-0"
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
