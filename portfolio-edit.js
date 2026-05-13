// Edit Mode State
let isEditMode = false;
let editPassword = localStorage.getItem('portfolioPassword') || 'admin123';
let portfolio = JSON.parse(localStorage.getItem('portfolio')) || {};

// Initialize with default data
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
  proj1_image: null,
  proj2_image: null,
  proj3_image: null,
  proj4_image: null,
};

// Load or initialize portfolio data
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
  for (let i = 1; i <= 4; i++) {
    if (portfolio[`proj${i}_image`]) {
      displayProjectImage(`proj${i}`, portfolio[`proj${i}_image`]);
    }
  }
}

// Save portfolio to localStorage
function savePortfolio() {
  localStorage.setItem('portfolio', JSON.stringify(portfolio));
}

// UI Elements
const editTrigger = document.getElementById('editTrigger');
const editPanel = document.getElementById('editPanel');
const editIndicator = document.getElementById('editIndicator');
const closeEditBtn = document.getElementById('closeEdit');
const loginModal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const loginPassword = document.getElementById('loginPassword');
const loginFeedback = document.getElementById('loginFeedback');
const passwordModal = document.getElementById('passwordModal');
const changePasswordBtn = document.getElementById('changePasswordBtn');
const confirmPasswordBtn = document.getElementById('confirmPasswordBtn');
const cancelPasswordBtn = document.getElementById('cancelPasswordBtn');
const addProjectModal = document.getElementById('addProjectModal');
const addProjectBtn = document.getElementById('addProjectBtn');
const confirmAddProjectBtn = document.getElementById('confirmAddProjectBtn');
const cancelAddProjectBtn = document.getElementById('cancelAddProjectBtn');
const saveEditBtn = document.getElementById('saveEditBtn');
const resetEditBtn = document.getElementById('resetEditBtn');
const photoInput = document.getElementById('photoInput');
const contactForm = document.getElementById('contactForm');

// Edit Trigger
editTrigger.addEventListener('click', () => {
  if (isEditMode) {
    exitEditMode();
  } else {
    loginModal.classList.remove('hidden');
  }
});

// Login
loginBtn.addEventListener('click', () => {
  if (loginPassword.value === editPassword) {
    loginModal.classList.add('hidden');
    enterEditMode();
  } else {
    loginFeedback.textContent = 'Invalid password.';
    loginFeedback.style.color = '#ff4757';
  }
});

loginPassword.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') loginBtn.click();
});

// Enter Edit Mode
function enterEditMode() {
  isEditMode = true;
  editPanel.classList.remove('hidden');
  editIndicator.classList.add('active');
  addProjectBtn.style.display = 'block';
  
  // Show edit controls on all editables
  document.querySelectorAll('.editable').forEach(el => {
    el.classList.add('editable-active');
  });
  
  // Show project actions
  document.querySelectorAll('.project-actions').forEach(el => {
    el.classList.remove('hidden');
  });
}

// Exit Edit Mode
function exitEditMode() {
  isEditMode = false;
  editPanel.classList.add('hidden');
  editIndicator.classList.remove('active');
  addProjectBtn.style.display = 'none';
  
  document.querySelectorAll('.editable-active').forEach(el => {
    el.classList.remove('editable-active');
  });
  
  document.querySelectorAll('.project-actions').forEach(el => {
    el.classList.add('hidden');
  });
}

// Close Edit Button
closeEditBtn.addEventListener('click', exitEditMode);

// Click to Edit
document.addEventListener('click', (e) => {
  if (!isEditMode) return;
  
  const editable = e.target.closest('.editable');
  if (!editable || editable.classList.contains('editing')) return;
  
  const key = editable.getAttribute('data-key');
  const currentText = portfolio[key] || editable.textContent;
  
  editable.classList.add('editing');
  const input = document.createElement(editable.tagName === 'LI' ? 'input' : 'textarea');
  input.className = 'edit-input';
  input.value = currentText;
  
  const parent = editable.parentNode;
  parent.replaceChild(input, editable);
  input.focus();
  input.select();
  
  function finishEditing() {
    const newText = input.value.trim();
    portfolio[key] = newText;
    
    const newElement = document.createElement(editable.tagName);
    newElement.className = editable.className;
    newElement.setAttribute('data-key', key);
    newElement.textContent = newText;
    
    parent.replaceChild(newElement, input);
  }
  
  input.addEventListener('blur', finishEditing);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && editable.tagName !== 'TEXTAREA') finishEditing();
    if (e.key === 'Escape') {
      const newElement = editable.cloneNode(true);
      parent.replaceChild(newElement, input);
    }
  });
});

// Photo Upload
photoInput.addEventListener('change', (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (event) => {
    const dataUrl = event.target.result;
    portfolio.profilePhoto = dataUrl;
    displayProfilePhoto(dataUrl);
  };
  reader.readAsDataURL(file);
});

function displayProfilePhoto(dataUrl) {
  const profilePhoto = document.getElementById('profilePhoto');
  profilePhoto.innerHTML = `<img src="${dataUrl}" alt="Profile photo" />`;
}

// Project Image Upload
document.addEventListener('change', (e) => {
  if (e.target.classList.contains('project-image-input')) {
    const projectId = e.target.getAttribute('data-project-id');
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      portfolio[`${projectId}_image`] = dataUrl;
      displayProjectImage(projectId, dataUrl);
    };
    reader.readAsDataURL(file);
  }
});

function displayProjectImage(projectId, dataUrl) {
  const zone = document.getElementById(`imgZone_${projectId}`);
  zone.innerHTML = `<img src="${dataUrl}" alt="Project image" />`;
}

// Delete Project
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-project')) {
    const projectId = e.target.getAttribute('data-project-id');
    const projectCard = document.querySelector(`[data-project-id="${projectId}"]`);
    projectCard.remove();
    
    // Clean up data
    delete portfolio[`${projectId}_label`];
    delete portfolio[`${projectId}_title`];
    delete portfolio[`${projectId}_desc`];
    delete portfolio[`${projectId}_image`];
  }
});

// Add Project Modal
addProjectBtn.addEventListener('click', () => {
  addProjectModal.classList.remove('hidden');
});

cancelAddProjectBtn.addEventListener('click', () => {
  addProjectModal.classList.add('hidden');
});

confirmAddProjectBtn.addEventListener('click', () => {
  const title = document.getElementById('newProjectTitle').value.trim();
  const label = document.getElementById('newProjectLabel').value.trim();
  const desc = document.getElementById('newProjectDesc').value.trim();
  
  if (!title || !label || !desc) {
    alert('Please fill in all fields.');
    return;
  }
  
  const projId = 'custom_' + Date.now();
  const projectCard = document.createElement('article');
  projectCard.className = 'project-card';
  projectCard.setAttribute('data-project-id', projId);
  projectCard.innerHTML = `
    <div class="project-image-zone" id="imgZone_${projId}">
      <svg viewBox="0 0 200 150" aria-hidden="true">
        <rect width="200" height="150" fill="rgba(0,212,255,0.06)" />
        <path d="M80 50 L120 90 L100 120 M40 100 Q60 60 90 80" stroke="rgba(0,212,255,0.3)" stroke-width="2" fill="none" />
      </svg>
    </div>
    <p class="project-label editable" data-key="${projId}_label">${label}</p>
    <h3 class="editable" data-key="${projId}_title">${title}</h3>
    <p class="editable" data-key="${projId}_desc">${desc}</p>
    <div class="project-actions" id="actions_${projId}">
      <label class="btn btn-sm btn-secondary">Upload Image<input type="file" class="project-image-input" accept="image/*" hidden data-project-id="${projId}" /></label>
      <button class="btn btn-sm btn-danger delete-project" data-project-id="${projId}">Delete</button>
    </div>
  `;
  
  document.getElementById('projectsGrid').appendChild(projectCard);
  portfolio[`${projId}_label`] = label;
  portfolio[`${projId}_title`] = title;
  portfolio[`${projId}_desc`] = desc;
  
  // Clear form
  document.getElementById('newProjectTitle').value = '';
  document.getElementById('newProjectLabel').value = '';
  document.getElementById('newProjectDesc').value = '';
  addProjectModal.classList.add('hidden');
});

// Change Password
changePasswordBtn.addEventListener('click', () => {
  passwordModal.classList.remove('hidden');
});

cancelPasswordBtn.addEventListener('click', () => {
  passwordModal.classList.add('hidden');
  document.getElementById('currentPassword').value = '';
  document.getElementById('newPassword').value = '';
  document.getElementById('confirmPassword').value = '';
});

confirmPasswordBtn.addEventListener('click', () => {
  const current = document.getElementById('currentPassword').value;
  const newPass = document.getElementById('newPassword').value;
  const confirm = document.getElementById('confirmPassword').value;
  const feedback = document.getElementById('passwordFeedback');
  
  if (current !== editPassword) {
    feedback.textContent = 'Current password is incorrect.';
    feedback.style.color = '#ff4757';
    return;
  }
  
  if (!newPass || newPass.length < 4) {
    feedback.textContent = 'New password must be at least 4 characters.';
    feedback.style.color = '#ff4757';
    return;
  }
  
  if (newPass !== confirm) {
    feedback.textContent = 'Passwords do not match.';
    feedback.style.color = '#ff4757';
    return;
  }
  
  editPassword = newPass;
  localStorage.setItem('portfolioPassword', editPassword);
  feedback.textContent = 'Password updated successfully!';
  feedback.style.color = '#00ff99';
  
  setTimeout(() => {
    passwordModal.classList.add('hidden');
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    feedback.textContent = '';
  }, 1500);
});

// Save & Publish
saveEditBtn.addEventListener('click', () => {
  savePortfolio();
  alert('Portfolio saved! Your changes are now persistent.');
});

// Reset to Defaults
resetEditBtn.addEventListener('click', () => {
  if (confirm('Are you sure? This will reset all content to defaults.')) {
    localStorage.removeItem('portfolio');
    location.reload();
  }
});

// Contact Form
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const feedback = document.getElementById('formFeedback');
  feedback.textContent = 'Thanks for reaching out! I\'ll get back to you soon.';
  feedback.style.color = '#00ff99';
  contactForm.reset();
  
  setTimeout(() => {
    feedback.textContent = '';
  }, 3000);
});

// Scroll Reveal
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

// Close modals on escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    loginModal.classList.add('hidden');
    passwordModal.classList.add('hidden');
    addProjectModal.classList.add('hidden');
  }
});

// Initialize
loadPortfolio();
