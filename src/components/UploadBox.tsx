import { useCallback, useState, useEffect } from "react";
import { Upload, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

interface UploadBoxProps {
  onFileSelect: (file: File) => void;
  isProcessing?: boolean;
}

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 10 * 1024 * 1024;

function getImageFileFromDataTransfer(dataTransfer: DataTransfer): File | null {
  const files = dataTransfer.files;
  if (files?.length) {
    for (let i = 0; i < files.length; i++) {
      if (ACCEPTED.includes(files[i].type)) return files[i];
    }
    return files[0] ?? null;
  }
  const items = dataTransfer.items;
  if (items) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === "file" && items[i].type.startsWith("image/")) {
        return items[i].getAsFile();
      }
    }
  }
  return null;
}

function getImageFileFromClipboard(clipboardData: DataTransfer): File | null {
  const items = clipboardData.items;
  if (!items) return null;
  for (let i = 0; i < items.length; i++) {
    if (items[i].kind === "file" && items[i].type.startsWith("image/")) {
      return items[i].getAsFile();
    }
  }
  return null;
}

const UploadBox = ({ onFileSelect, isProcessing }: UploadBoxProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback((file: File) => {
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
  }, []);

  const handleFile = useCallback(
    (file: File | null) => {
      if (!file) return;
      if (validate(file)) onFileSelect(file);
    },
    [validate, onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      const file = getImageFileFromDataTransfer(e.dataTransfer);
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  useEffect(() => {
    if (isProcessing) return;
    const onPaste = (e: ClipboardEvent) => {
      const file = getImageFileFromClipboard(e.clipboardData ?? new DataTransfer());
      if (file) {
        e.preventDefault();
        handleFile(file);
      }
    };
    document.addEventListener("paste", onPaste);
    return () => document.removeEventListener("paste", onPaste);
  }, [isProcessing, handleFile]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center w-full h-64 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 gradient-border ${
          dragActive ? "border-primary bg-card/80" : "border-border bg-card/40"
        } ${isProcessing ? "pointer-events-none opacity-60" : "hover:bg-card/60"}`}
      >
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = "";
          }}
          disabled={isProcessing}
        />
        <div className="flex flex-col items-center gap-3">
          {dragActive ? (
            <ImageIcon className="w-12 h-12 text-primary" />
          ) : (
            <Upload className="w-12 h-12 text-muted-foreground" />
          )}
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Click to upload</span>, drag & drop, or paste (Ctrl+V / ⌘V)
          </p>
          <p className="text-xs text-muted-foreground">JPG, PNG, WEBP — Max 10 MB</p>
        </div>
      </label>
      {error && <p className="text-destructive text-sm mt-2 text-center">{error}</p>}
    </motion.div>
  );
};

export default UploadBox;
