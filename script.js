// header js code

const menuIcon = document.getElementById("menu-icon");
const navLinks = document.querySelector(".nav-links");

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuIcon.classList.toggle("active");
});

// user signUp js code

document.addEventListener("DOMContentLoaded", function () {
  const signUpForm = document.querySelector(".signup form");

  signUpForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get input values
    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Basic validation
    if (!firstname || !email || !password || !lastname) {
      alert("Please fill in all fields.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate password length (e.g., at least 6 characters)
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    // Check if the user already exists in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      alert("User with this email already exists. Please sign in instead.");
      return;
    }

    // Create a new user object

    const newUser = {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
    };

    users.push(newUser);

    // Save the updated users array back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Notify the user of successful sign-up
    alert("Sign up successful! Redirecting to the sign-in page...");

    // Redirect to the sign-in page
    window.location.href = "signin.html";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const signInForm = document.querySelector(".signup form");

  signInForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      alert("Sign in successful! Redirecting to the home page...");

      window.location.href = "index.html";
    } else {
      alert("Invalid email or password. Please try again.");
    }
  });

  updateHeader();
});

// Function to update the header based on login status

function updateHeader() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const navLinks = document.querySelector(".nav-links");

  if (loggedInUser) {
    // Remove the Sign Up link
    const signUpLink = document.querySelector('a[href="signup.html"]');
    if (signUpLink) {
      signUpLink.parentElement.remove();
    }

    // Add the User Profile link
    const profileLink = document.createElement("li");
    profileLink.innerHTML = `<a href="profile.html">${loggedInUser.firstname}</a>`;
    navLinks.appendChild(profileLink);
  }
}
