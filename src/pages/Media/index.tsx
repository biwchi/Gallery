import BaseInput from "@/components/Base/BaseInput";
import GalleryCard from "@/components/Gallery/GalleryCard";
import MediaViewer from "@/components/MediaViewer/MediaViewer";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import {
  mediaViewerActions,
  selectMediaViewer,
} from "@/store/mediaViewerSlice";

export default function Media() {
  const dispatch = useAppDispatch();

  const { toggleMediaViewer, setFiles } = mediaViewerActions;

  function openMediaViewer() {
    dispatch(toggleMediaViewer(true));
    dispatch(
      setFiles([
        {
          title: "bebra",
          type: "photo",
          file: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/ss_5710298af2318afd9aa72449ef29ac4a2ef64d8e.1920x1080.jpg?t=1693590732",
          id: "1234",
          dateUploaded: new Date(),
        },
      ]),
    );
  }
  return (
    <div>
      <h1 className="text-3xl font-medium">All media</h1>

      <div className="py-7">
        <BaseInput placeholder="Search..." />
      </div>

      <div className="grid grid-cols-4">
        <GalleryCard
          onClick={openMediaViewer}
          type="image"
          imagePreview="https://cdn.cloudflare.steamstatic.com/steam/apps/292030/ss_5710298af2318afd9aa72449ef29ac4a2ef64d8e.1920x1080.jpg?t=1693590732"
          title="Sochifsdfdfsdfdsfsdfsfdsfsdfdsfdsfdsfsdfsfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf 2007.png"
        />
      </div>
    </div>
  );
}
