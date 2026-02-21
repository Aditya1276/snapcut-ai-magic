import { Download, RotateCcw, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadImage } from "@/lib/download";
import { toast } from "sonner";

interface ImagePreviewProps {
  originalUrl: string;
  processedUrl: string | null;
  processedBase64?: string | null;
  onReset: () => void;
  onRemoveBackground?: () => void;
  removeDisabled?: boolean;
}

const ImagePreview = ({ originalUrl, processedUrl, processedBase64, onReset, onRemoveBackground, removeDisabled }: ImagePreviewProps) => {
  const handleDownload = async () => {
    const src = processedBase64 || processedUrl;
    if (!src) return;
    try {
      await downloadImage(src, "snapcut-result.png");
      toast.success("Download started");
    } catch (err) {
      toast.error("Download failed. Try right-click on the image → Save image.");
    }
  };

  const showRemoveButton = processedUrl == null && onRemoveBackground;

  return (
    <div className="space-y-6">
      <div className={`grid gap-6 ${processedUrl ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Original</h3>
          <div className="rounded-xl overflow-hidden border border-border bg-card">
            <img src={originalUrl} alt="Original" className="w-full h-auto object-contain max-h-80" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Processed</h3>
          <div className="rounded-xl overflow-hidden border border-border bg-[repeating-conic-gradient(hsl(var(--muted))_0%_25%,hsl(var(--card))_0%_50%)] bg-[length:20px_20px]">
            {(processedBase64 || processedUrl) ? (
              <img src={processedBase64 || processedUrl || undefined} alt="Processed" className="w-full h-auto object-contain max-h-80" />
            ) : (
              <div className="flex items-center justify-center h-80 text-muted-foreground text-sm">
                {showRemoveButton
                  ? removeDisabled
                    ? "No credits left. Upgrade your plan for more."
                    : "Click Remove background to process"
                  : "Processing..."}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button variant="gradient-outline" onClick={onReset}>
          <RotateCcw className="w-4 h-4 mr-2" /> Upload New
        </Button>
        {showRemoveButton && (
          <Button variant="gradient" onClick={onRemoveBackground} disabled={removeDisabled}>
            <Wand2 className="w-4 h-4 mr-2" /> Remove background
          </Button>
        )}
        {(processedBase64 || processedUrl) && (
          <Button variant="gradient" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" /> Download PNG
          </Button>
        )}
      </div>
    </div>
  );
};

export default ImagePreview;
