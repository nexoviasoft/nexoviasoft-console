/**
 * Email Template Utilities
 * 
 * Provides functions for managing and processing email templates
 * for meeting notifications.
 */

/**
 * Default email template for meeting invitations
 */
export const DEFAULT_MEETING_TEMPLATE = {
  subject: "Meeting Invitation: {{meetingTopic}}",
  body: `Hi {{attendeeName}},

You've been invited to a meeting:

📅 Topic: {{meetingTopic}}
📝 Description: {{description}}
🕐 Date & Time: {{dateTime}}
⏱️ Duration: {{duration}} minutes

🔗 Join the meeting: {{meetingLink}}

Organized by: {{organizerName}}

See you there!

Best regards,
SquadLog Team`
};

/**
 * Available template variables with descriptions
 */
export const TEMPLATE_VARIABLES = [
  { 
    variable: "{{meetingTopic}}", 
    description: "Meeting title/topic",
    example: "Sprint Planning - Q1 2026"
  },
  { 
    variable: "{{description}}", 
    description: "Meeting description",
    example: "Discuss goals and deliverables for Q1"
  },
  { 
    variable: "{{dateTime}}", 
    description: "Formatted date and time",
    example: "January 28, 2026 at 2:00 PM"
  },
  { 
    variable: "{{duration}}", 
    description: "Meeting duration in minutes",
    example: "60"
  },
  { 
    variable: "{{meetingLink}}", 
    description: "Meeting URL",
    example: "https://squadlog.com/meetings/m-2026-01-28-001"
  },
  { 
    variable: "{{organizerName}}", 
    description: "Person who created the meeting",
    example: "John Doe"
  },
  { 
    variable: "{{attendeeName}}", 
    description: "Recipient's name",
    example: "Jane Smith"
  }
];

/**
 * Get the default meeting email template
 * 
 * @returns {Object} Default template with subject and body
 */
export function getDefaultMeetingTemplate() {
  return { ...DEFAULT_MEETING_TEMPLATE };
}

/**
 * Replace template variables with actual data
 * 
 * @param {string} template - Template string with variables
 * @param {Object} data - Data object with values for variables
 * @param {string} data.meetingTopic - Meeting title
 * @param {string} data.description - Meeting description
 * @param {string} data.dateTime - Formatted date and time
 * @param {number} data.duration - Duration in minutes
 * @param {string} data.meetingLink - Meeting URL
 * @param {string} data.organizerName - Organizer's name
 * @param {string} data.attendeeName - Attendee's name
 * @returns {string} Template with variables replaced
 */
export function replaceTemplateVariables(template, data) {
  let result = template;
  
  // Replace each variable with its corresponding value
  const replacements = {
    '{{meetingTopic}}': data.meetingTopic || '[Meeting Topic]',
    '{{description}}': data.description || '[No description provided]',
    '{{dateTime}}': data.dateTime || '[Date & Time]',
    '{{duration}}': data.duration?.toString() || '[Duration]',
    '{{meetingLink}}': data.meetingLink || '[Meeting Link]',
    '{{organizerName}}': data.organizerName || '[Organizer]',
    '{{attendeeName}}': data.attendeeName || '[Attendee Name]'
  };
  
  Object.entries(replacements).forEach(([variable, value]) => {
    result = result.replace(new RegExp(variable, 'g'), value);
  });
  
  return result;
}

/**
 * Validate that template contains required variables
 * 
 * @param {Object} template - Template object with subject and body
 * @returns {Object} Validation result with isValid and missing variables
 */
export function validateTemplate(template) {
  const requiredVariables = ['{{meetingTopic}}', '{{meetingLink}}'];
  const missing = [];
  
  const fullTemplate = `${template.subject} ${template.body}`;
  
  requiredVariables.forEach(variable => {
    if (!fullTemplate.includes(variable)) {
      missing.push(variable);
    }
  });
  
  return {
    isValid: missing.length === 0,
    missing,
    message: missing.length > 0 
      ? `Missing required variables: ${missing.join(', ')}`
      : 'Template is valid'
  };
}

/**
 * Get template from localStorage or return default
 * 
 * @returns {Object} Saved template or default template
 */
export function getSavedTemplate() {
  try {
    const saved = localStorage.getItem('meetingEmailTemplate');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading saved template:', error);
  }
  return getDefaultMeetingTemplate();
}

/**
 * Save template to localStorage
 * 
 * @param {Object} template - Template to save
 */
export function saveTemplate(template) {
  try {
    localStorage.setItem('meetingEmailTemplate', JSON.stringify(template));
    return true;
  } catch (error) {
    console.error('Error saving template:', error);
    return false;
  }
}
