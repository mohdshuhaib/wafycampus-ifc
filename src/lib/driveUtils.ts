/**
 * Helper to convert various Google Drive URLs into direct embeddable URLs
 * and preview / download URLs.
 */

export function extractDriveFileId(url: string): string | null {
  if (!url) return null;
  // Match /file/d/FILE_ID or id=FILE_ID or /d/FILE_ID
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

export function getDriveImageUrl(url: string): string {
  if (!url) return "";
  const fileId = extractDriveFileId(url);
  if (fileId) {
    // Official Google CDN endpoint for images
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
  }
  return url;
}

export function getDrivePdfPreviewUrl(url: string): string {
  if (!url) return "";
  const fileId = extractDriveFileId(url);
  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  return url;
}

export function getDrivePdfDownloadUrl(url: string): string {
  if (!url) return "";
  const fileId = extractDriveFileId(url);
  if (fileId) {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }
  return url;
}

export function getYoutubeThumbnail(youtubeId: string): string {
  if (!youtubeId) return "";
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

export function extractYoutubeId(url: string): string {
  if (!url) return "";
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : url.trim();
}
