document
  .getElementById("postJobForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Job posted successfully!");
  });

function showSignupForm() {
  alert("Redirecting to signup...");
}

function showLoginForm() {
  alert("Redirecting to login...");
}


const menuIcon = document.getElementById("menu-icon");
const navLinks = document.querySelector(".nav-links");

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuIcon.classList.toggle("active");
});
