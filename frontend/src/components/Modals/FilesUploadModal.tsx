import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { BaseButton } from "../Base/BaseButton";
import BaseIconButton from "../Base/BaseIconButton";
import { useRef, ChangeEvent, useState } from 'react';
import { useLoading } from '@/hooks';
import GalleryService from '@/services/GalleryService';

export default function FilesUploadModal({
  toggleFileModal,
}: {
  toggleFileModal: (val: boolean) => void;
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
    toggleFileModal(false);
  }

  return (
    <div>
      <input
        ref={inputRef}
        multiple
        type="file"
        className="invisible absolute h-0 w-0"
        onChange={onFileChange}
      />
      <BaseButton
        onClick={() => inputRef.current?.click()}
        display="block"
        text="Select files"
      />

      <div className="my-2 flex max-w-md flex-col gap-1">
        {files.map((file, idx) => {
          return (
            <div
              key={idx}
              className="flex w-full items-center justify-between rounded-md p-1 transition hover:bg-secondary"
            >
              <div className="flex items-center gap-1 overflow-hidden">
                <Icon className="text-xl" icon="ph:file-duotone" />

                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {file.name}
                </span>
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
    </div>
  );
}
