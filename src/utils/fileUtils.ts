export const validateAudioFile = (file: File): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check file size (100MB limit)
    const maxSize = 100 * 1024 * 1024; // 100MB in bytes
    if (file.size > maxSize) {
      reject(new Error('File size must be less than 100MB'));
      return;
    }

    // Check if it's an audio file
    if (!file.type.startsWith('audio/')) {
      reject(new Error('Please upload a valid audio file'));
      return;
    }

    // Create an audio element to check if the file is playable
    const audio = new Audio();
    const objectUrl = URL.createObjectURL(file);

    audio.addEventListener('loadedmetadata', () => {
      URL.revokeObjectURL(objectUrl);
      resolve();
    });

    audio.addEventListener('error', () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Invalid audio file format'));
    });

    audio.src = objectUrl;
  });
};