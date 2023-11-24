export type FileType = "image" | "video" | "audio";

export type AppFile = {
  id: number;
  title: string;
  fileName: string;
  type: FileType;
  size: number
  fileUrl: string
  dateUploaded: string;
  artist: string | null
  songName: strig | null
};
