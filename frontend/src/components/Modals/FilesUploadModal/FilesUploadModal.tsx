import styles from "./FilesUploadModal.module.scss";

import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { BaseButton } from "../../Base/BaseButton";
import BaseIconButton from "../../Base/BaseIconButton";
import { useRef, ChangeEvent, useState } from "react";
import { useLoading } from "@/hooks";
import GalleryService from "@/services/GalleryService";

export function FilesUploadModal({
  toggleFileModal,
  triggerUpdate,
}: {
  toggleFileModal: (val: boolean) => void;
  triggerUpdate: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [createFiles, isLoading] = useLoading(
    GalleryService.createFiles.bind(GalleryService),
  );

  function removeFile(idx: number) {
    setFiles(files.filter((_, idxArray) => idx !== idxArray));
  }

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  }

  async function uploadFiles() {
    if (!files.length) return;

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    await createFiles(formData);
    triggerUpdate();
    toggleFileModal(false);
  }

  return (
    <>
      <input
        ref={inputRef}
        multiple
        type="file"
        className={styles.input}
        onChange={onFileChange}
      />
      <BaseButton
        onClick={() => inputRef.current?.click()}
        display="block"
        text="Select files"
      />

      <div className={styles.files}>
        {files.map((file, idx) => {
          return (
            <div key={idx} className={styles.file}>
              <div className={styles.name}>
                <Icon className={styles.icon} icon="ph:file-duotone" />

                <span>{file.name}</span>
              </div>

              <BaseIconButton
                onClick={() => removeFile(idx)}
                size={"small"}
                icon="ph:x"
              />
            </div>
          );
        })}
      </div>

      <BaseButton
        display="block"
        disabled={!files.length}
        loading={isLoading}
        onClick={uploadFiles}
        text="Upload files"
      />
    </>
  );
}
