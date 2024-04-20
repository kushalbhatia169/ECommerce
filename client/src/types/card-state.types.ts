export interface cardState {
  title: string;
  message: string;
  creator: string;
  tags: string[];
  selectedFile: string;
  likeCount: number;
  createdAt: Date;
  _id: string;
}

export interface creatingMemoryProps {
  _setIsMounted: React.Dispatch<React.SetStateAction<boolean>>
}