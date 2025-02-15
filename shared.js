
function updateHeader() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const navLinks = document.querySelector('.nav-links');
  
    if (loggedInUser) {
      // Remove the Sign Up link if it exists
      const signUpLink = document.querySelector('a[href="signup.html"]');
      if (signUpLink) {
        signUpLink.parentElement.remove();
      }
  
      // Add the User Profile link if it doesn't already exist
      const profileLinkExists = document.querySelector('a[href="profile.html"]');
      if (!profileLinkExists) {
        const profileLink = document.createElement('li');
        profileLink.innerHTML = `<a href="profile.html">${loggedInUser.username}</a>`;
        navLinks.appendChild(profileLink);
      }
    } else {
      // If no user is logged in, ensure the Sign Up link is present
      const signUpLinkExists = document.querySelector('a[href="signup.html"]');
      if (!signUpLinkExists) {
        const signUpLink = document.createElement('li');
        signUpLink.innerHTML = `<a href="signup.html">Sign Up</a>`;
        navLinks.appendChild(signUpLink);
      }
  
      // Remove the Profile link if it exists
      const profileLink = document.querySelector('a[href="profile.html"]');
      if (profileLink) {
        profileLink.parentElement.remove();
      }
    }
  }
  
  // Call updateHeader when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function () {
    updateHeader();
  });