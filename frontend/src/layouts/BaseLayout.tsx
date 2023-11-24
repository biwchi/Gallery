import Modal from "../components/Modal/Modal";
import { BaseButton } from "../components/Base/BaseButton";
import BaseInput from "../components/Base/BaseInput";
import { useLoading, useToggle } from "@/hooks";
import { ChangeEvent, useRef, useState } from "react";
import GalleryService from "@/services/GalleryService";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import BaseIconButton from "@/components/Base/BaseIconButton";

type BaseLayoutProps = {
  children: JSX.Element;
  title: string;
};

export default function BaseLayout({ children, title }: BaseLayoutProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isFileModal, toggleFileModal] = useToggle(false);
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
  }

  return (
    <div>
      <Modal
        title="Upload files"
        isModal={isFileModal}
        toggleModal={toggleFileModal}
      >
        <div>
          <input
            ref={inputRef}
            multiple
            type="file"
            className="invisible absolute h-0 w-0"
            onChange={onFileChange}
          />
            <BaseButton onClick={(() => inputRef.current?.click())} display="block" text="Select files" />

          <div className="my-3 flex flex-col gap-1">
            {files.map((file, idx) => {
              return (
                <div
                  key={idx}
                  className="flex w-full items-center justify-between rounded-md p-1 transition hover:bg-secondary"
                >
                  <div className="flex items-center gap-1">
                    <Icon className="text-xl" icon="ph:file-duotone" />

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
        </div>
      </Modal>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-medium">{title}</h1>
        <BaseButton
          onClick={() => toggleFileModal()}
          text="Upload new files"
          leftIcon="ph:upload"
        />
      </div>

      <div className="py-7">
        <BaseInput placeholder="Search..." />
      </div>

      {children}
    </div>
  );
}
