import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UploadBox from "@/components/UploadBox";
import ImagePreview from "@/components/ImagePreview";
import Loader from "@/components/Loader";
import { removeBackgroundBinary } from "@/services/n8n";
import { addToHistory, fileToBase64, urlToBase64 } from "@/services/history";
import { useCredit, getCredits } from "@/services/credits";
import { toast } from "sonner";

const Editor = () => {
  const [credits, setCredits] = useState(getCredits);
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [processedBase64, setProcessedBase64] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (f: File) => {
    setFile(f);
    setOriginalUrl(URL.createObjectURL(f));
    setProcessedUrl(null);
    setProcessedBase64(null);
  };

  const handleRemoveBackground = async () => {
    if (!file) return;
    if (getCredits() <= 0) {
      toast.error("No credits left. Upgrade your plan for more.");
      return;
    }
    setIsProcessing(true);
    setProcessedBase64(null);
    try {
      const resultUrl = await removeBackgroundBinary(file);
      setProcessedUrl(resultUrl);
      let base64: string | null = null;
      try {
        base64 = await urlToBase64(resultUrl);
        setProcessedBase64(base64);
      } catch {
        setProcessedBase64(null);
      }
      const originalBase64 = await fileToBase64(file);
      addToHistory({
        originalBase64,
        processedBase64: base64,
        processedUrl: base64 ? null : resultUrl,
        timestamp: Date.now(),
      });
      useCredit();
      setCredits(getCredits());
      toast.success("Background removed");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Background removal failed";
      toast.error(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setOriginalUrl(null);
    setProcessedUrl(null);
    setProcessedBase64(null);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl font-bold font-display text-center mb-2">
            Background <span className="gradient-text">Remover</span>
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Upload an image and watch the magic happen
          </p>

          {!originalUrl && (
            <UploadBox onFileSelect={handleFileSelect} isProcessing={isProcessing} />
          )}

          {isProcessing && <Loader />}

          {originalUrl && !isProcessing && (
            <ImagePreview
              originalUrl={originalUrl}
              processedUrl={processedUrl}
              processedBase64={processedBase64}
              onReset={handleReset}
              onRemoveBackground={processedUrl == null ? handleRemoveBackground : undefined}
              removeDisabled={credits <= 0}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Editor;
