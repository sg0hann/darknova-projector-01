
import React, { useState, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Image } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";

interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
  defaultImage?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageChange,
  defaultImage,
  className = "",
}) => {
  const { t } = useLanguage();
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageChange(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        id="image-upload"
      />
      
      <AnimatePresence>
        {!preview ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`
              border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 transition-colors cursor-pointer
              ${isDragging ? "border-primary bg-primary/10" : "border-border bg-secondary/30"}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className={`mb-2 ${isDragging ? "text-primary" : "text-muted-foreground"}`} size={24} />
            <p className="text-center text-sm font-medium">
              {t("uploadThumbnail")}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {isDragging ? "Drop your image here" : "Click or drag & drop"}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative rounded-lg overflow-hidden aspect-video bg-secondary/30"
          >
            <img
              src={preview}
              alt="Preview"
              className="object-cover w-full h-full"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 backdrop-blur-sm text-white hover:bg-destructive transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}
            >
              <X size={16} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUpload;
