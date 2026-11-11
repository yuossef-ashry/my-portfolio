/** Build a URL for a file in Vite's public directory, including the deploy base. */
export const publicAsset = (path: string): string => {
  const normalizedPath = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${normalizedPath}`;
};
