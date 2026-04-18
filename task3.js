document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("themeToggle");
  const htmlElement = document.documentElement;
  const body = document.body;

  
  const savedTheme = localStorage.getItem("preferredTheme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

  
  body.setAttribute("data-theme", initialTheme);
  updateThemeIcon(initialTheme);

  
  themeToggle.addEventListener("click", function () {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    
    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("preferredTheme", newTheme);

    
    updateThemeIcon(newTheme);

    
    themeToggle.classList.add("theme-transition");
    setTimeout(() => {
      themeToggle.classList.remove("theme-transition");
    }, 300);
  });

  
  function updateThemeIcon(theme) {
    if (theme === "dark") {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      themeToggle.classList.add("dark-mode");
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      themeToggle.classList.remove("dark-mode");
    }
  }
});

const texts = ["Web Developer", "Data Science Student", "Problem Solver"];
let textIndex = 0;
let charIndex = 0;
const typewriterElement = document.getElementById("typewriter");

function typeWriter() {
  if (charIndex < texts[textIndex].length) {
    typewriterElement.textContent += texts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 100);
  } else {
    setTimeout(eraseText, 1000);
  }
}

function eraseText() {
  if (charIndex > 0) {
    typewriterElement.textContent = texts[textIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(eraseText, 50);
  } else {
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(typeWriter, 500);
  }
}

typeWriter();

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", handleSubmit);
  }
});

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  const submitBtn = document.querySelector(".submit-btn");
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  try {
    await emailjs.send(
      "service_y98q3ui",
      "template_r2bubpg",
      {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
      "UqryR_YxXqeln8Rmf"
    );

    showMessage(
      "Message sent successfully! Thank you for reaching out.",
      "success"
    );

    document.querySelector(".contact-form").reset();
  } catch (error) {
    console.error("EmailJS Error:", error);
    showMessage(
      "Failed to send message. Please try again or contact directly via email.",
      "error"
    );
  } finally {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
};

function showMessage(message, type) {
  const existingMessage = document.querySelector(".form-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  const messageDiv = document.createElement("div");
  messageDiv.className = `form-message ${type}`;
  messageDiv.textContent = message;
  messageDiv.style.cssText = `
        padding:12px 16px;
        margin:10px 0;
        border-radius:4px;
        font-size:14px;
        font-weight:500;
        ${type === "success"
      ? "background-color:#f0f0f0; color:#333333; border:1px solid #dcdcdc;"
      : "background-color: #eeeeee; color: #444444; border: 1px solid #d1d1d1;"
    }
    `;

  const form = document.querySelector(".contact-form");
  form.parentNode.insertBefore(messageDiv, form);

  setTimeout(() => {
    messageDiv.remove();
  }, 3000);
}
