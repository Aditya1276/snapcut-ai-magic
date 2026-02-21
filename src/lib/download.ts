// Download image as file – works for blob URLs, data URLs, and remote URLs (with CORS)

export async function downloadImage(src: string, filename = "snapcut-result.png"): Promise<void> {
  if (src.startsWith("data:")) {
    const a = document.createElement("a");
    a.href = src;
    a.download = filename;
    a.click();
    return;
  }

  try {
    const res = await fetch(src, { mode: "cors" });
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    throw err;
  }
}
