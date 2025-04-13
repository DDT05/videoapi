import type React from 'react';
import { useState, useRef, type ChangeEvent, type DragEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion';

const FileUpload: React.FC = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingProgress, setProcessingProgress] = useState<number>(0);
  const [isProcessed, setIsProcessed] = useState<boolean>(false);
  const [videoURL, setVideoURL] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      processFile(droppedFile);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      processFile(selectedFile);
    }
  };

  const processFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      alert('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit. Please choose a smaller file.');
      return;
    }

    setFile(file);

    // Create a preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        setPreview(e.target.result as string);

        // Start mock processing
        startMockProcessing();
      }
    };
    reader.readAsDataURL(file);
  };

  const startMockProcessing = () => {
    setIsProcessing(true);
    setProcessingProgress(0);

    // Mock progress updates
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessed(true);
            setIsProcessing(false);
            // Mock generated video URL - this would be returned by your backend
            setVideoURL('https://example.com/generated-video.mp4');
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  const resetUpload = () => {
    setFile(null);
    setPreview(null);
    setIsProcessing(false);
    setProcessingProgress(0);
    setIsProcessed(false);
    setVideoURL(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            key="upload-area"
            className={`border-2 border-dashed ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} rounded-lg p-12 bg-white transition-colors duration-200 cursor-pointer`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClickUpload}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            whileHover={{
              boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
              borderColor: "rgb(59, 130, 246)"
            }}
          >
            <div className="flex flex-col items-center">
              <motion.div
                className="text-blue-500 mb-4"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop"
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </motion.div>
              <motion.h3
                className="text-lg font-medium mb-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Drop your product image here
              </motion.h3>
              <motion.p
                className="text-gray-500 text-sm mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                or click to upload
              </motion.p>
              <motion.p
                className="text-xs text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Supports: JPG, PNG, WebP (Max 5MB)
              </motion.p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInput}
                className="hidden"
                accept="image/*"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="file-processing"
            className="border-2 border-gray-200 rounded-lg bg-white p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {/* File preview */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative overflow-hidden rounded-lg aspect-video bg-gray-100">
                <motion.img
                  src={preview || ''}
                  alt="Product preview"
                  className="object-contain w-full h-full"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                />
              </div>
            </motion.div>

            {/* Processing status */}
            <AnimatePresence>
              {isProcessing && (
                <motion.div
                  className="mb-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.p
                    className="text-sm font-medium text-gray-700 mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    Transforming your image into a video...
                  </motion.p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <motion.div
                      className="bg-blue-500 h-2.5 rounded-full"
                      style={{ width: `${processingProgress}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${processingProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <motion.p
                    className="text-xs text-gray-500 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {processingProgress < 50 ? 'Analyzing image...' : 'Generating video...'}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Processed result */}
            <AnimatePresence>
              {isProcessed && (
                <motion.div
                  className="mb-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <motion.div
                    className="flex items-center mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <motion.svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                    >
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </motion.svg>
                    <p className="text-sm font-medium text-gray-700">Video successfully generated!</p>
                  </motion.div>
                  <motion.div
                    className="bg-gray-100 p-4 rounded border border-gray-200 flex items-center justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <div className="flex items-center">
                      <motion.svg
                        className="w-8 h-8 text-blue-500 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        animate={{
                          rotate: [0, 15, -15, 0],
                          scale: [1, 1.2, 1.2, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                          repeatDelay: 3
                        }}
                      >
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </motion.svg>
                      <div>
                        <p className="text-sm font-medium">{file.name.replace(/\.[^/.]+$/, "")}.mp4</p>
                        <p className="text-xs text-gray-500">Click to preview</p>
                      </div>
                    </div>
                    <motion.a
                      href={videoURL || '#'}
                      className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Download
                    </motion.a>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons */}
            <div className="flex justify-between">
              <motion.button
                onClick={resetUpload}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Upload different image
              </motion.button>
              {isProcessed && (
                <motion.button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 5px 15px rgba(59, 130, 246, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Share video
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUpload;
