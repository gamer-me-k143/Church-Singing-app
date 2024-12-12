export interface Song {
  id: string;
  title: string;
  lyrics: string;
  audioUrl: string;
  accessCode: string;
  uploaderId: string;
  createdAt: number;
}

export interface TimeFormat {
  minutes: number;
  seconds: number;
}

export interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}