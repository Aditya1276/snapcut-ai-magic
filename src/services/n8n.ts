// n8n webhook service – send image via FormData to remove-background webhook
// In dev, Vite proxies /api/n8n/* and /api/n8n-test/* to n8n cloud to avoid CORS
// Set VITE_N8N_USE_TEST_WEBHOOK=true if workflow is in test mode (not activated)

const WEBHOOK_BASE = "https://adityajadhav107.app.n8n.cloud";
const useTestWebhook = import.meta.env.VITE_N8N_USE_TEST_WEBHOOK === "true";

function getWebhookUrl(): string {
  if (import.meta.env.DEV) {
    return useTestWebhook ? "/api/n8n-test/remove-background" : "/api/n8n/remove-background";
  }
  return useTestWebhook
    ? `${WEBHOOK_BASE}/webhook-test/remove-background`
    : `${WEBHOOK_BASE}/webhook/remove-background`;
}

/**
 * Sends the image file via FormData to the n8n remove-background webhook.
 * Uses a local proxy in dev to avoid CORS.
 */
export const removeBackgroundBinary = async (file: File): Promise<string> => {
  const url = getWebhookUrl();
  const formData = new FormData();
  formData.append("upload_image", file);
  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Background removal failed: ${res.status} ${text || res.statusText}`);
  }

  const text = await res.text();
  const contentType = res.headers.get("Content-Type") || "";

  if (text && contentType.includes("application/json")) {
    try {
      const data = JSON.parse(text);
      const resultUrl = data.url ?? data.image_url ?? data.processed_image_url ?? data.output_url;
      if (typeof resultUrl === "string" && resultUrl) return resultUrl;
    } catch {
      throw new Error("Workflow returned invalid JSON. Ensure your Respond to Webhook node returns { \"url\": \"...\" }.");
    }
  }

  if (text) {
    throw new Error("Workflow did not return a valid image URL. Check that Respond to Webhook returns JSON with a url field.");
  }

  throw new Error("Workflow returned empty response. Ensure Respond to Webhook is connected and returns { \"url\": \"...\" }.");
};
