import { currentJobList } from "../mockData.js";

// Mock Admin Credentials
const adminUsername = "admin";
const adminPassword = "password123";

// Elements
const loginSection = document.getElementById("login-section");
const adminDashboard = document.getElementById("admin-dashboard");
const jobPostForm = document.getElementById("job-post-form");
const jobList = document.getElementById("job-list");
const totalJobs = document.getElementById("total-jobs");
const logoutBtn = document.getElementById("logout-btn");
const jobPostSection = document.getElementById("job-post-section");
const postedJobsList = document.getElementById("posted-jobs-list");
const postJobBtn = document.getElementById("post-job-btn");
const viewJobsBtn = document.getElementById("view-jobs-btn");

// Initialize jobPosts with currentJobList
let jobPosts = [...currentJobList];
let jobCount = jobPosts.length;

// Update the total jobs count on page load
totalJobs.innerText = jobCount;

// Event listener for login form
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === adminUsername && password === adminPassword) {
    loginSection.style.display = "none";
    adminDashboard.style.display = "block";
  } else {
    alert("Invalid credentials, please try again.");
  }
});

// Event listener for post job button
postJobBtn.addEventListener("click", function () {
  jobPostSection.style.display = "block";
  postedJobsList.style.display = "none";
});

// Event listener for view jobs button
viewJobsBtn.addEventListener("click", function () {
  jobPostSection.style.display = "none";
  postedJobsList.style.display = "block";
  renderJobList();
});

// Event listener for job post form
jobPostForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const jobTitle = document.getElementById("job-title").value;
  const companyName = document.getElementById("company-name").value;
  const location = document.getElementById("location").value;
  const salary = document.getElementById("salary").value;
  const experience = document.getElementById("experience").value;
  const jobUrl = document.getElementById("job-url").value;

  const newJob = {
    role: jobTitle,
    companyName: companyName,
    location: location,
    salary: salary,
    experience: experience,
    url: jobUrl,
  };

  jobPosts.push(newJob);
  jobCount++;
  totalJobs.innerText = jobCount;

  // Reset the form
  jobPostForm.reset();

  // Hide the job post form and show job list
  jobPostSection.style.display = "none";
  postedJobsList.style.display = "block";
  renderJobList();
});

// Render the list of posted jobs
function renderJobList() {
  jobList.innerHTML = "";

  jobPosts.forEach((job, index) => {
    const jobItem = document.createElement("li");
    jobItem.innerHTML = `
      <h4>${job.role} at ${job.companyName}</h4>
      <p>Location: ${job.location}</p>
      <p>Salary: ₹${job.salary}</p>
      <p>Experience: ${job.experience} years</p>
      <a href="${job.url}" target="_blank">Job Details</a>
      <button class="edit-btn" data-index="${index}">Edit</button>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    jobList.appendChild(jobItem);
  });

  // Add event listeners for edit and delete buttons
  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      editJob(index);
    });
  });

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      deleteJob(index);
    });
  });
}

// Edit a job
function editJob(index) {
  const job = jobPosts[index];
  document.getElementById("job-title").value = job.role;
  document.getElementById("company-name").value = job.companyName;
  document.getElementById("location").value = job.location;
  document.getElementById("salary").value = job.salary;
  document.getElementById("experience").value = job.experience;
  document.getElementById("job-url").value = job.url;

  // Remove the job from the list
  jobPosts.splice(index, 1);
  jobCount--;
  totalJobs.innerText = jobCount;

  // Re-render the job list
  renderJobList();

  // Show the job post form for editing
  jobPostSection.style.display = "block";
  postedJobsList.style.display = "none";
}

// Delete a job
function deleteJob(index) {
  jobPosts.splice(index, 1);
  jobCount--;
  totalJobs.innerText = jobCount;
  renderJobList(); // Re-render the job list
}

// Event listener for logout button
logoutBtn.addEventListener("click", function () {
  adminDashboard.style.display = "none";
  loginSection.style.display = "block";
});