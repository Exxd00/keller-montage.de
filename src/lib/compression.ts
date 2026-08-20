// Image Compression Utility
// Compresses images on client-side before upload

export interface CompressionProgress {
  stage: 'compressing' | 'uploading' | 'sending';
  progress: number; // 0-100
  currentFile?: string;
  totalFiles?: number;
  currentFileIndex?: number;
}

export interface CompressionOptions {
  maxWidth: number;
  maxHeight: number;
  quality: number; // 0-1
  maxSizeMB: number;
}

const DEFAULT_OPTIONS: CompressionOptions = {
  maxWidth: 1920,
  maxHeight: 1080,
  quality: 0.7,
  maxSizeMB: 1,
};

// Check if file is an image
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

// Get file size in MB
export function getFileSizeMB(file: File): number {
  return file.size / (1024 * 1024);
}

// Compress a single image
export async function compressImage(
  file: File,
  options: Partial<CompressionOptions> = {},
  onProgress?: (progress: number) => void
): Promise<File> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  // If not an image or already small enough, return as-is
  if (!isImageFile(file) || getFileSizeMB(file) <= opts.maxSizeMB) {
    onProgress?.(100);
    return file;
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      try {
        onProgress?.(20);

        // Calculate new dimensions
        let { width, height } = img;

        if (width > opts.maxWidth) {
          height = (height * opts.maxWidth) / width;
          width = opts.maxWidth;
        }

        if (height > opts.maxHeight) {
          width = (width * opts.maxHeight) / height;
          height = opts.maxHeight;
        }

        onProgress?.(40);

        // Set canvas size and draw
        canvas.width = width;
        canvas.height = height;

        if (!ctx) {
          resolve(file);
          return;
        }

        // Use better quality settings
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        onProgress?.(60);

        // Convert to blob
        canvas.toBlob(
          (blob) => {
            onProgress?.(80);

            if (!blob) {
              resolve(file);
              return;
            }

            // Create new file with same name
            const compressedFile = new File(
              [blob],
              file.name,
              { type: 'image/jpeg', lastModified: Date.now() }
            );

            onProgress?.(100);

            // If compressed is larger, return original
            if (compressedFile.size >= file.size) {
              resolve(file);
            } else {
              console.log(
                `Compressed ${file.name}: ${getFileSizeMB(file).toFixed(2)}MB -> ${getFileSizeMB(compressedFile).toFixed(2)}MB`
              );
              resolve(compressedFile);
            }
          },
          'image/jpeg',
          opts.quality
        );
      } catch (error) {
        console.error('Compression error:', error);
        resolve(file);
      }
    };

    img.onerror = () => {
      console.error('Failed to load image for compression');
      resolve(file);
    };

    // Start loading
    onProgress?.(10);
    img.src = URL.createObjectURL(file);
  });
}

// Compress multiple files with overall progress
export async function compressFiles(
  files: File[],
  onProgress?: (progress: CompressionProgress) => void,
  options?: Partial<CompressionOptions>
): Promise<File[]> {
  const compressedFiles: File[] = [];
  const totalFiles = files.length;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    const compressedFile = await compressImage(
      file,
      options,
      (fileProgress) => {
        const overallProgress = ((i + fileProgress / 100) / totalFiles) * 100;
        onProgress?.({
          stage: 'compressing',
          progress: Math.round(overallProgress),
          currentFile: file.name,
          totalFiles,
          currentFileIndex: i + 1,
        });
      }
    );

    compressedFiles.push(compressedFile);
  }

  return compressedFiles;
}

// Format file size for display
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// Calculate total size savings
export function calculateSavings(original: File[], compressed: File[]): {
  originalSize: number;
  compressedSize: number;
  savedSize: number;
  savedPercent: number;
} {
  const originalSize = original.reduce((sum, f) => sum + f.size, 0);
  const compressedSize = compressed.reduce((sum, f) => sum + f.size, 0);
  const savedSize = originalSize - compressedSize;
  const savedPercent = originalSize > 0 ? (savedSize / originalSize) * 100 : 0;

  return { originalSize, compressedSize, savedSize, savedPercent };
}
