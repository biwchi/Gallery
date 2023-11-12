export type FileType = "image" | "video" | "audio";

export type AppFile = {
  id: string;
  title: string;
  file: string;
  type: FileType;
  dateUploaded: Date;
};
