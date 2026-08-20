// imgbb.com image upload service
// Simple and free image hosting

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

export function isImgbbConfigured(): boolean {
  return !!IMGBB_API_KEY;
}

export async function uploadToImgbb(file: File | Blob, fileName?: string): Promise<string> {
  if (!IMGBB_API_KEY) {
    console.warn('imgbb not configured');
    return '';
  }

  try {
    // Convert file to base64
    const base64 = await fileToBase64(file);

    // Remove data URL prefix if present
    const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');

    const formData = new FormData();
    formData.append('key', IMGBB_API_KEY);
    formData.append('image', base64Data);
    if (fileName) {
      formData.append('name', fileName.replace(/\.[^.]+$/, '')); // Remove extension
    }

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`imgbb upload failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.success && data.data?.url) {
      console.log('imgbb upload success:', data.data.url);
      return data.data.url;
    }

    throw new Error('imgbb response invalid');
  } catch (error) {
    console.error('imgbb upload error:', error);
    return '';
  }
}

// Convert File/Blob to base64
function fileToBase64(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

// Check if file is an image
export function isImageFile(file: File | Blob): boolean {
  if (file instanceof File) {
    return file.type.startsWith('image/');
  }
  return true; // Assume blob is image
}
