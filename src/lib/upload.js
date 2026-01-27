/**
 * Image Upload Utility Functions
 * Handles file uploads to backend API
 */

// Prefer a dedicated upload/CDN URL if provided, otherwise fall back to the CDN,
// and finally localhost for local development.
const API_BASE_URL =
  process.env.NEXT_PUBLIC_UPLOAD_URL ||
  process.env.NEXT_PUBLIC_CDN_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://squadlog-cdn.up.railway.app";
const UPLOAD_ENDPOINT = '/upload/image'
/**

 * Upload an image file to the backend
 * @param {File} file - The file to upload
 * @param {string} folder - Optional folder name (kept for compatibility, not used by API)
 * @returns {Promise<string>} - The URL of the uploaded file
 */
export const uploadToCDN = async (file, folder = 'documents') => {
    try {
        const formData = new FormData()
        formData.append('file', file)

        const url = `${API_BASE_URL}${UPLOAD_ENDPOINT}`

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            // Don't set Content-Type header - browser will set it automatically with boundary
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || data.error?.message || 'Upload failed')
        }

        if (!data.success) {
            throw new Error(data.message || data.error?.message || 'Upload failed')
        }

        // Return the URL from the response
        // Response format: { success: true, url: "http://localhost:8000/uploads/...", ... }
        return data.url
    } catch (error) {
        console.error('Image Upload Error:', error)
        throw new Error(error.message || 'Failed to upload file')
    }
}

/**
 * Validate file before upload
 * @param {File} file - The file to validate
 * @param {Object} options - Validation options
 * @param {string[]} options.allowedTypes - Allowed MIME types
 * @param {number} options.maxSize - Maximum file size in bytes
 * @returns {boolean} - Whether the file is valid
 */
export const validateFile = (file, options = {}) => {
    const {
        allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
        maxSize = 5 * 1024 * 1024 // 5MB default
    } = options

    // Check file type
    if (!allowedTypes.includes(file.type)) {
        throw new Error(`File type not allowed. Allowed types: ${allowedTypes.join(', ')}`)
    }

    // Check file size
    if (file.size > maxSize) {
        const maxSizeMB = Math.round(maxSize / (1024 * 1024))
        throw new Error(`File size must be less than ${maxSizeMB}MB`)
    }

    return true
}