import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UploadBox from "@/components/UploadBox";
import ImagePreview from "@/components/ImagePreview";
import Loader from "@/components/Loader";

const Editor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = async (f: File) => {
    setFile(f);
    const url = URL.createObjectURL(f);
    setOriginalUrl(url);
    setProcessedUrl(null);
    setIsProcessing(true);

    // TODO: Wire up Cloudinary upload → n8n webhook → processed URL
    // Simulating processing delay for now
    setTimeout(() => {
      setProcessedUrl(url); // placeholder: same image
      setIsProcessing(false);
    }, 3000);
  };

  const handleReset = () => {
    setFile(null);
    setOriginalUrl(null);
    setProcessedUrl(null);
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
              onReset={handleReset}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Editor;
