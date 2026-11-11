const ALLOWED_SERVICES = [
  'Academic Research Assistance',
  'Thesis and Dissertation Assistance',
  'Research Proposal Writing',
  'Literature Review and Data Analysis',
  'Business Research Proposals',
  'Content Humanization and Plagiarism Checking',
  'Other',
];

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed.',
    });
  }

  const body = req.body || {};
  const fullName = typeof body.full_name === 'string' ? body.full_name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const phone = typeof body.phone === 'string' && body.phone.trim() !== '' ? body.phone.trim() : null;
  const service = typeof body.service === 'string' ? body.service.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const websiteUrl = typeof body.website_url === 'string' ? body.website_url : '';

  const errors = {};

  if (websiteUrl.length > 0) {
    errors.website_url = ['Spam submission detected.'];
  }

  if (!fullName) {
    errors.full_name = ['Please enter your full name.'];
  } else if (fullName.length < 2) {
    errors.full_name = ['Your full name must be at least 2 characters.'];
  } else if (fullName.length > 150) {
    errors.full_name = ['Your full name may not exceed 150 characters.'];
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.email = ['Please enter your email address.'];
  } else if (!emailRegex.test(email)) {
    errors.email = ['Please enter a valid email address.'];
  } else if (email.length > 150) {
    errors.email = ['Your email address may not exceed 150 characters.'];
  }

  if (phone) {
    const phoneRegex = /^[0-9+\-\s()]{6,30}$/;
    if (phone.length > 30) {
      errors.phone = ['Your phone number may not exceed 30 characters.'];
    } else if (!phoneRegex.test(phone)) {
      errors.phone = ['Please enter a valid phone number format.'];
    }
  }

  if (!service) {
    errors.service = ['Please select a service of interest.'];
  } else if (!ALLOWED_SERVICES.includes(service)) {
    errors.service = ['Please select a valid service from the available options.'];
  }

  if (!message) {
    errors.message = ['Please enter details regarding your research enquiry.'];
  } else if (message.length < 15) {
    errors.message = ['Please provide at least 15 characters describing your research needs.'];
  } else if (message.length > 5000) {
    errors.message = ['Your message may not exceed 5000 characters.'];
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      success: false,
      message: 'Please review the submitted information.',
      errors,
    });
  }

  return res.status(201).json({
    success: true,
    message: 'Your enquiry has been submitted successfully.',
  });
}

