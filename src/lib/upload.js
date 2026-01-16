/**
 * ImgBB Upload Utility Functions
 * Handles file uploads to ImgBB image hosting service
 */

const IMGBB_API_KEY = "7f7b2615e37d49f2db2eec28c9007bc4"
const IMGBB_API_URL = "https://api.imgbb.com/1/upload"
/**

 * @param {File} file - The file to upload
 * @param {string} folder - Optional folder name (not used by ImgBB, kept for compatibility)
 * @returns {Promise<string>} - The ImgBB URL of the uploaded file
 */
export const uploadToCDN = async (file, folder = 'documents') => {
    try {
        const formData = new FormData()
        formData.append('image', file)

        // Add API key as query parameter (recommended by ImgBB)
        const url = `${IMGBB_API_URL}?key=${encodeURIComponent(IMGBB_API_KEY)}`

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            // Don't set Content-Type header - browser will set it automatically with boundary
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error?.message || data.status_txt || 'Upload failed')
        }

        if (!data.success) {
            throw new Error(data.error?.message || data.status_txt || 'Upload failed')
        }

        return data.data.url // Return the ImgBB URL
    } catch (error) {
        console.error('ImgBB Upload Error:', error)
        throw new Error(error.message || 'Failed to upload file to ImgBB')
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