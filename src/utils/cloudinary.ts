const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

/**
 * Returns an optimized Cloudinary URL for the given publicId, 
 * or falls back to a local URL if the Cloud Name is missing/placeholder.
 * 
 * @param publicId - The Cloudinary public ID (e.g. 'gopi-yarns/orange')
 * @param fallbackUrl - The local path to use if Cloudinary is not configured
 * @param width - The desired width in pixels for responsive scaling
 */
export function cloudinaryImage(publicId: string, fallbackUrl: string, width?: number): string {
  // Fallback to local image if Cloudinary is not configured or uses the placeholder
  if (!cloudName || cloudName === 'YOUR_CLOUDINARY_CLOUD_NAME') {
    return fallbackUrl;
  }

  // Build Cloudinary transformations
  const transformations = ['f_auto', 'q_auto'];
  if (width) {
    transformations.push(`w_${width}`);
  }

  // Construct URL
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;
  const transformString = transformations.join(',');
  
  // Ensure publicId is cleanly appended
  const cleanPublicId = publicId.startsWith('/') ? publicId.slice(1) : publicId;

  return `${baseUrl}/${transformString}/${cleanPublicId}`;
}
