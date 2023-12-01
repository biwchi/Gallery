import Modal from "../components/Modals";
import { BaseButton } from "../components/Base/BaseButton";
import BaseInput from "../components/Base/BaseInput";
import { useRouteQuery, useToggle } from "@/hooks";
import BaseSelect from "@/components/Base/BaseSelect";
import FilesUploadModal from "@/components/Modals/FilesUploadModal";

type BaseLayoutProps = {
  children: JSX.Element;
  title: string;
  triggerUpdate?: () => void;
};

const sortOptions = [
  { label: "By date", value: "dateUploaded" },
  { label: "By file size", value: "size" },
];

const filterOptions = [
  { label: "Audio", value: "audio" },
  { label: "Video", value: "video" },
  { label: "Image", value: "image" },
];

export default function BaseLayout({
  children,
  title,
  triggerUpdate,
}: BaseLayoutProps) {
  const [isFileModal, toggleFileModal] = useToggle(false);

  const [sorting, setSorting] = useRouteQuery("sorting");
  const [filter, setFilter] = useRouteQuery("filterBy");
  const [search, setSearch] = useRouteQuery("search");

  return (
    <div>
      <Modal
        title="Upload files"
        isModal={isFileModal}
        toggleModal={toggleFileModal}
      >
        <FilesUploadModal
          triggerUpdate={triggerUpdate ? triggerUpdate : () => {}}
          toggleFileModal={toggleFileModal}
        />
      </Modal>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-gray-500">{title}</h1>
        <BaseButton
          onClick={() => toggleFileModal()}
          text="Upload new files"
          leftIcon="ph:upload"
        />
      </div>

      <div className="flex items-center space-x-8 py-7">
        <BaseInput
          value={search || ""}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />

        <BaseSelect
          placeholder="Select sort method"
          value={sorting || null}
          options={sortOptions}
          optionLabel="label"
          optionValue="value"
          clearable
          onChange={(value) => {
            setSorting(value);
          }}
        />

        <BaseSelect
          placeholder="Filter by type"
          value={filter || null}
          options={filterOptions}
          optionLabel="label"
          optionValue="value"
          clearable
          onChange={(value) => {
            setFilter(value);
          }}
        />
      </div>

      {children}
    </div>
  );
}
