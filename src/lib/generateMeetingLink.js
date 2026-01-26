/**
 * Generate a unique meeting link
 * @returns {Object} Object containing meetingId and full meeting link
 */
export function generateMeetingLink() {
  // Generate a unique ID using timestamp and random string
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 9);
  const meetingId = `${timestamp}-${randomStr}`;
  
  // Construct the full meeting URL
  const meetingLink = `${typeof window !== 'undefined' ? window.location.origin : 'https://squadlog.com'}/meetings/${meetingId}`;
  
  return {
    meetingId,
    meetingLink
  };
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      textArea.remove();
      return success;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}
