export const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const getTimeFormat = (timeInSeconds: number) => {
  return {
    minutes: Math.floor(timeInSeconds / 60),
    seconds: Math.floor(timeInSeconds % 60),
  };
};