// Cloudinary upload service
// TODO: Set up VITE_CLOUDINARY_UPLOAD_URL and VITE_CLOUDINARY_CLOUD_NAME

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const url = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  if (!url || !cloudName) {
    throw new Error("Cloudinary not configured");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "snapcut_unsigned");

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.secure_url as string;
};
