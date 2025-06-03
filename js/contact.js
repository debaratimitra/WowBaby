///////////contact form

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('contactForm').addEventListener('submit', function (e) {
      e.preventDefault(); 
      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
  
      if (!firstName || !lastName || !email || !message) {
        alert("Please fill in all fields.");
        return;
      }
      const response = document.getElementById('formResponse');
      response.style.display = 'block';
      response.textContent = "Thank you! Your message has been submitted.";
  
      setTimeout(() => {
        response.style.display = 'none';
      }, 8000);
  
      this.reset();
    });
  });
  