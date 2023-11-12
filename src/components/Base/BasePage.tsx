import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Modal from "../Modal/Modal";
import { BaseButton } from "./BaseButton";
import BaseInput from "./BaseInput";
import { useToggle } from "@/hooks";

type BasePageProps = {
  children: JSX.Element;
  title: string;
};

export default function BasePage({ children, title }: BasePageProps) {
  const [isFileModal, toggleFileModal] = useToggle(false);

  return (
    <div>
      <Modal
        title="Upload files"
        isModal={isFileModal}
        toggleModal={toggleFileModal}
      >
        <div>
          <input
            type="file"
            id="fileUpload"
            className="invisible absolute h-0 w-0"
          />
          <label
            htmlFor="fileUpload"
            className="flex h-32 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-primary"
          >
            <Icon className="text-3xl text-primary" icon="ph:file-dashed" />
          </label>
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
