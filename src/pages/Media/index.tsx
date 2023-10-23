import BaseInput from "@/components/Base/BaseInput";
import GalleryCard from "@/components/Gallery/GalleryCard";

export default function Media() {
  return (
    <div>
      <h1 className="text-3xl font-medium">All media</h1>

      <div className="py-7">
        <BaseInput placeholder="Search..." />
      </div>

      <div className='grid grid-cols-4'>
        <GalleryCard
          type='image'
          imagePreview="https://cdn.cloudflare.steamstatic.com/steam/apps/292030/ss_5710298af2318afd9aa72449ef29ac4a2ef64d8e.1920x1080.jpg?t=1693590732"
          title="Sochifsdfdfsdfdsfsdfsfdsfsdfdsfdsfdsfsdfsfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf 2007.png"
        />
      </div>
    </div>
  );
}
