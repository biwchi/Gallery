import { Icon } from "@iconify-icon/react";
import { Link, unstable_useViewTransitionState } from "react-router-dom";

type GalleryCardProps = {
  imagePreview: string;
  title: string;
  type: "image" | "video" | "audio";
};

export default function GalleryCard({
  imagePreview,
  title,
  type = "image",
}: GalleryCardProps) {
  const icons = {
    image: "ph:image",
    video: "ph:video-duotone",
    audio: "ph:speaker-simple-high-duotone",
  };

  const vt = unstable_useViewTransitionState(`file/${title}`);
  return (
    <div className="relative aspect-square cursor-pointer overflow-hidden rounded-md border border-gray-600">
      <Link
        className="absolute left-0 top-0 h-full w-full"
        to={`file/${title}`}
        unstable_viewTransition
      >
        <img
          className="object-cover"
          src={imagePreview}
          alt={title}
          style={{
            viewTransitionName: vt ? "image-expand" : "",
          }}
        />
      </Link>

      <Icon
        className="absolute left-2 top-2 rounded-full bg-black p-2.5 text-2xl"
        icon={icons[type]}
      />

      <div className="relative flex h-full w-full flex-col justify-end bg-gradient-to-b from-transparent to-black/70">
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
