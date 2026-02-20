import { useCallback, useState } from "react";
import { Upload, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

interface UploadBoxProps {
  onFileSelect: (file: File) => void;
  isProcessing?: boolean;
}

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 10 * 1024 * 1024;

const UploadBox = ({ onFileSelect, isProcessing }: UploadBoxProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = (file: File) => {
    if (!ACCEPTED.includes(file.type)) {
      setError("Only JPG, PNG, WEBP allowed");
      return false;
    }
    if (file.size > MAX_SIZE) {
      setError("Max size is 10 MB");
      return false;
    }
    setError(null);
    return true;
  };

  const handleFile = (file: File) => {
    if (validate(file)) onFileSelect(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <label
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center w-full h-64 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 gradient-border ${
          dragActive ? "border-primary bg-card/80" : "border-border bg-card/40"
        } ${isProcessing ? "pointer-events-none opacity-60" : "hover:bg-card/60"}`}
      >
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          disabled={isProcessing}
        />
        <div className="flex flex-col items-center gap-3">
          {dragActive ? (
            <ImageIcon className="w-12 h-12 text-primary" />
          ) : (
            <Upload className="w-12 h-12 text-muted-foreground" />
          )}
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Click to upload</span> or drag & drop
          </p>
          <p className="text-xs text-muted-foreground">JPG, PNG, WEBP — Max 10 MB</p>
        </div>
      </label>
      {error && <p className="text-destructive text-sm mt-2 text-center">{error}</p>}
    </motion.div>
  );
};

export default UploadBox;
