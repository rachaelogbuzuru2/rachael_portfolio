const photoInput = document.getElementById('photoInput');
const profilePhoto = document.getElementById('profilePhoto');
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');
const editTrigger = document.getElementById('editTrigger');

// Edit Mode Variables
let isEditMode = false;
let editPassword = localStorage.getItem('portfolioPassword') || 'admin123';
let portfolio = JSON.parse(localStorage.getItem('portfolio')) || {};

// Default data
const defaultData = {
  eyebrow: 'Nurse · AI Creator · Healthcare Tech Innovator · Digital Storyteller',
  heroTitle: 'Building the Future of Healthcare with AI & Creativity',
  heroText: 'I blend clinical insight, digital design, and machine intelligence to transform care, craft stories, and launch human-centered health experiences.',
  aboutTitle: 'Rooted in care, inspired by intelligent design.',
  aboutPara1: 'As a nurse and healthcare innovator, I bring clinical empathy to the heart of every digital experience. My work sits at the intersection of patient-centered care, creative storytelling, and emerging AI tools that make health systems more intuitive, humane, and powerful.',
  aboutPara2: 'I develop ideas, prototypes, and narratives that help care teams connect with their communities, visualize health journeys, and build trust through technology.',
  bioTitle: 'My journey',
  bioText: 'From bedside practice to building AI-powered healthcare tools, I translate clinical intuition into digital innovation. My creative process is driven by compassion, clarity, and a belief that technology should amplify human connection.',
  chip1: 'Compassion',
  chip2: 'Innovation',
  chip3: 'Creativity',
  chip4: 'Technology',
  chip5: 'Human-Centered',
  skillsTitle: 'Capabilities that shape modern care.',
  skillsCol1Title: 'Healthcare Skills',
  skillsCol2Title: 'Technology Skills',
  skillsCol3Title: 'Creative Skills',
  skill1: 'Patient assessment & advocacy',
  skill2: 'Clinical workflow design',
  skill3: 'Care coordination',
  skill4: 'Health equity insights',
  skill5: 'AI concept framing',
  skill6: 'Health tech prototyping',
  skill7: 'Data-informed storytelling',
  skill8: 'UX for clinical systems',
  skill9: 'Visual narrative development',
  skill10: 'Brand voice crafting',
  skill11: 'Content strategy',
  skill12: 'Immersive digital storytelling',
  projectsTitle: 'Work that bridges health, AI, and story.',
  proj1_label: 'Healthcare Technology Ideas',
  proj1_title: 'Smart care pathways',
  proj1_desc: 'Designing AI-assisted tools that support clinicians, personalize patient journeys, and reduce friction across care teams.',
  proj2_label: 'AI Visual & Creative Projects',
  proj2_title: 'Immersive health narratives',
  proj2_desc: 'Creating visual stories and generative concepts that make complex healthcare ideas feel cinematic and accessible.',
  proj3_label: 'Healthcare Storytelling',
  proj3_title: 'Human-centered narratives',
  proj3_desc: 'Crafting story arcs that center patient experience, clinician insights, and the emotional impact of care innovation.',
  proj4_label: 'Web Development Projects',
  proj4_title: 'Digital health experiences',
  proj4_desc: 'Building clean, responsive web interfaces for modern healthcare brands and clinical workflows.',
  visionText: '"I envision a future where technology deepens care, AI empowers empathy, and stories connect patients to possibility."',
  contactTitle: 'Let\'s build meaningful healthcare experiences together.',
  contactNote: 'Ready to collaborate on healthcare innovation, AI storytelling, or digital care strategy.',
  footerText: 'Rachael · Nurse · AI Creator · Healthcare Tech Innovator · Digital Storyteller',
  profilePhoto: null,
};

// Load portfolio data
function loadPortfolio() {
  portfolio = { ...defaultData, ...portfolio };
  Object.keys(portfolio).forEach(key => {
    const element = document.querySelector(`[data-key="${key}"]`);
    if (element && portfolio[key]) {
      element.textContent = portfolio[key];
    }
  });
  if (portfolio.profilePhoto) {
    displayProfilePhoto(portfolio.profilePhoto);
  }
}

// Save portfolio
function savePortfolio() {
  localStorage.setItem('portfolio', JSON.stringify(portfolio));
}

// Display profile photo
function displayProfilePhoto(src) {
  profilePhoto.innerHTML = `<img src="${src}" alt="Profile photo" />`;
}

// Edit trigger
editTrigger.addEventListener('click', () => {
  const password = prompt('Enter edit password:');
  if (password === editPassword) {
    toggleEditMode();
  } else {
    alert('Incorrect password');
  }
});

// Toggle edit mode
function toggleEditMode() {
  isEditMode = !isEditMode;
  const editableElements = document.querySelectorAll('.editable');
  editableElements.forEach(el => {
    if (isEditMode) {
      el.contentEditable = true;
      el.style.border = '1px dashed rgba(0, 212, 255, 0.5)';
      el.style.padding = '0.5rem';
      el.style.borderRadius = '4px';
      el.addEventListener('blur', saveEdit);
    } else {
      el.contentEditable = false;
      el.style.border = 'none';
      el.style.padding = '0';
      el.removeEventListener('blur', saveEdit);
    }
  });
  editTrigger.style.background = isEditMode ? 'rgba(0, 255, 153, 0.9)' : 'rgba(0, 212, 255, 0.9)';
  editTrigger.title = isEditMode ? 'Exit edit mode' : 'Enter edit mode';
}

// Save edit
function saveEdit(event) {
  const key = event.target.getAttribute('data-key');
  if (key) {
    portfolio[key] = event.target.textContent;
    savePortfolio();
  }
}

// Initialize
loadPortfolio();

photoInput.addEventListener('change', event => {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function () {
    const src = reader.result;
    portfolio.profilePhoto = src;
    savePortfolio();
    displayProfilePhoto(src);
  };
  reader.readAsDataURL(file);
});

contactForm.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get('name').trim();
  const email = formData.get('email').trim();
  const message = formData.get('message').trim();

  if (!name || !email || !message) {
    formFeedback.textContent = 'Please fill in all fields before sending.';
    return;
  }

  formFeedback.textContent = 'Message ready to send. Thank you!';
  contactForm.reset();
});

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));
