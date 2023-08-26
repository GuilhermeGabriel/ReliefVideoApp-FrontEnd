export const getVideoId = (url: string) => {
  const regex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^\?&"'>]+)/;

  const match = url.match(regex);
  const videoId = match ? match[1] : null;
  return videoId;
}