// n8n webhook service
// TODO: Set up VITE_N8N_WEBHOOK_URL

export const removeBackground = async (imageUrl: string, userId?: string): Promise<string> => {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error("n8n webhook not configured");
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image_url: imageUrl, user_id: userId }),
  });

  if (!res.ok) throw new Error("Background removal failed");
  const data = await res.json();
  return data.processed_image_url as string;
};
