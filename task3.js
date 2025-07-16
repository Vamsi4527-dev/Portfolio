// Typewriter effect
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

  // Get submit button
  const submitBtn = document.querySelector(".submit-btn");
  const originalText = submitBtn.innerHTML;

  // Show loading state
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
    // Show error message
    showMessage(
      "Failed to send message. Please try again or contact directly via email.",
      "error"
    );
  } finally {
    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
};

// Function to show success/error messages
function showMessage(message, type) {
  // Remove existing message if any
  const existingMessage = document.querySelector(".form-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create message element
  const messageDiv = document.createElement("div");
  messageDiv.className = `form-message ${type}`;
  messageDiv.textContent = message;

  // Add styles
  messageDiv.style.cssText = `
        padding: 12px 16px;
        margin: 10px 0;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        ${
          type === "success"
            ? "background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;"
            : "background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;"
        }
    `;

  //Insert message before the form
  const form = document.querySelector(".contact-form");
  form.parentNode.insertBefore(messageDiv, form);

  //Remove message after 3 seconds
  setTimeout(() => {
    messageDiv.remove();
  }, 3000);
}
