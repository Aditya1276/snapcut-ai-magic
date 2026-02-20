import { Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImagePreviewProps {
  originalUrl: string;
  processedUrl: string | null;
  onReset: () => void;
}

const ImagePreview = ({ originalUrl, processedUrl, onReset }: ImagePreviewProps) => {
  const handleDownload = async () => {
    if (!processedUrl) return;
    const res = await fetch(processedUrl);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "snapcut-result.png";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Original</h3>
          <div className="rounded-xl overflow-hidden border border-border bg-card">
            <img src={originalUrl} alt="Original" className="w-full h-auto object-contain max-h-80" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Processed</h3>
          <div className="rounded-xl overflow-hidden border border-border bg-[repeating-conic-gradient(hsl(var(--muted))_0%_25%,hsl(var(--card))_0%_50%)] bg-[length:20px_20px]">
            {processedUrl ? (
              <img src={processedUrl} alt="Processed" className="w-full h-auto object-contain max-h-80" />
            ) : (
              <div className="flex items-center justify-center h-80 text-muted-foreground text-sm">
                Processing...
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-3 justify-center">
        <Button variant="gradient-outline" onClick={onReset}>
          <RotateCcw className="w-4 h-4 mr-2" /> Upload New
        </Button>
        {processedUrl && (
          <Button variant="gradient" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" /> Download PNG
          </Button>
        )}
      </div>
    </div>
  );
};

export default ImagePreview;
