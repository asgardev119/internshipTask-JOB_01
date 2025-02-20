import { jobList } from "./mockData.js";

// Function to filter jobs based on search query and location

function filterJobs(searchTerm, locationTerm) {
  return jobList.filter((job) => {
    const roleMatch = job.role.toLowerCase().includes(searchTerm.toLowerCase());
    const locationMatch = locationTerm
      ? job.location.toLowerCase().includes(locationTerm.toLowerCase())
      : true;

    return roleMatch && locationMatch;
  });
}

function renderJobs(filteredJobs) {
  const jobListContainer = document.getElementById("job-list");

  if (!jobListContainer) {
    console.error("Job list container not found!");
    return;
  }

  jobListContainer.innerHTML = "";

  filteredJobs.forEach((job) => {
    const jobItem = document.createElement("div");
    jobItem.classList.add("job-item");

    jobItem.innerHTML = `
      <h3>${job.role}</h3>
      <p>Company: ${job.companyName}</p>
      <p>Location: ${job.location}</p>
      <p>Experience: ${job.experience}</p>
      <p>Salary: ${job.salary}</p>
      <button>Apply Now</button>
    `;

    jobListContainer.appendChild(jobItem);
  });
}

document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const searchTerm = document.getElementById("search").value;
    const locationTerm = document.getElementById("location").value;

    const filteredJobs = filterJobs(searchTerm, locationTerm);

    renderJobs(filteredJobs);
  });

document.addEventListener("DOMContentLoaded", function () {
  renderJobs(jobList);
});
