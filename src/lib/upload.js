/**
 * Image Upload Utility Functions
 * Handles file uploads to the backend API
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://squadlog-backend.up.railway.app'

/**
 * Upload an image file to the backend
 * @param {File} file - The file to upload
 * @param {string} folder - Optional folder name (kept for compatibility, not used by API)
 * @returns {Promise<string>} - The URL of the uploaded file
 */
export const uploadToCDN = async (file, folder = 'documents') => {
    try {
        const formData = new FormData()
        // ImgBB requires the field name to be 'image'
        formData.append('image', file)

        const apiKey = '4ba7f7ac04e8b97db1e85e7a46c609d7'
        const url = `https://api.imgbb.com/1/upload?key=${apiKey}`

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error?.message || 'Upload failed')
        }

        if (!data.success) {
            throw new Error(data.error?.message || 'Upload failed')
        }

        // Return the URL from the ImgBB response
        return data.data.url
    } catch (error) {
        console.error('Upload Error:', error)
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
