import styles from "./index.module.scss"

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
      className={styles.card}
    >
      <PreviewPlaceholder
        fileTitle={file.title}
        preview={file.fileUrl}
        type={file.type}
      />

      {showType && (
        <Icon
          className={styles.type}
          icon={icons[file.type]}
        />
      )}

      <div className={styles.content}>
        <div className={styles.body}>
          <p title={file.title} className={styles.title}>
            {file.title}
          </p>
          <span className={styles.date}>{formatDate(file.dateUploaded)}</span>
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
          className={styles.image}
          src={preview}
          alt={fileTitle}
        />
      ) : (
        <div className={styles.placeholder}>
          <Icon
            className={styles.iconType}
            icon={icons[type]}
          />
          <Icon
            className={styles.iconAction}
            icon={type !== "image" ? "ph:play" : "ph:eye"}
          />
        </div>
      )}
    </div>
  );
}
