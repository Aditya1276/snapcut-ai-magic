import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Download, Trash2, ImageIcon } from "lucide-react";
import { getHistory, removeFromHistory, type HistoryItem } from "@/services/history";
import { downloadImage } from "@/lib/download";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

const History = () => {
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setItems(getHistory());
  }, []);

  const handleDownload = async (item: HistoryItem) => {
    const src = item.processedBase64 || item.processedUrl;
    if (!src) {
      toast.error("Image not available for download");
      return;
    }
    try {
      await downloadImage(src, `snapcut-${item.id.slice(0, 8)}.png`);
      toast.success("Download started");
    } catch (err) {
      toast.error("Download failed. Try right-click on the image → Save image.");
    }
  };

  const handleDelete = (id: string) => {
    removeFromHistory(id);
    setItems(getHistory());
    toast.success("Removed from history");
  };

  const getProcessedSrc = (item: HistoryItem) =>
    item.processedBase64 || item.processedUrl || null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold font-display text-center mb-2">
            Your <span className="gradient-text">History</span>
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Browse and download all your background-removed images
          </p>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <ImageIcon className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">No images yet</p>
              <p className="text-sm text-muted-foreground max-w-md">
                Images will appear here after you remove backgrounds in the Editor
              </p>
              <Button variant="gradient" className="mt-4" asChild>
                <Link to="/editor">Go to Editor</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {items.map((item) => {
                const processedSrc = getProcessedSrc(item);
                return (
                  <div
                    key={item.id}
                    className="rounded-xl border border-border bg-card overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-1 p-2 bg-muted/30">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Original</p>
                        <img
                          src={item.originalBase64}
                          alt="Original"
                          className="w-full h-24 object-cover rounded"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Processed</p>
                        <div className="w-full h-24 rounded bg-[repeating-conic-gradient(hsl(var(--muted))_0%_25%,hsl(var(--card))_0%_50%)] bg-[length:12px_12px] flex items-center justify-center overflow-hidden">
                          {processedSrc ? (
                            <img
                              src={processedSrc}
                              alt="Processed"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-xs text-muted-foreground">N/A</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-3 flex items-center justify-between gap-2">
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                      </span>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(item)}
                          disabled={!processedSrc}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default History;
