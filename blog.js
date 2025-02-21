import { blog } from "./mockData.js";

function renderBlogs() {
  const blogListContainer = document.querySelector(".blog-list");

  if (!blogListContainer) {
    console.error("Blog list container not found!");
    return;
  }

  blogListContainer.innerHTML = "";

  blog.forEach((item, index) => {
    const blogItem = document.createElement("div");
    blogItem.classList.add("blog-item");
    blogItem.innerHTML = `
      <img src="${item.pic}" alt="${item.title}" />
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
      <a href="#">Read More</a>
      <button class="delete-btn" data-id="${index}">Delete</button> <!-- Delete Button -->
    `;

    blogListContainer.appendChild(blogItem);
  });

  // Attach event listener to delete buttons
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', function () {
      const index = this.getAttribute('data-id');
      deleteBlog(index);
    });
  });
}

// Function to delete blog from the array
function deleteBlog(index) {
  blog.splice(index, 1);
  renderBlogs();  // Re-render the blogs after deletion
}

// Handle the "Write a Blog" form
document.getElementById("btn").addEventListener("click", function () {
  const write = document.getElementById("blog-post-form");
  let open = write.style.display === "none";

  if (open) {
    write.style.display = "block";
    document.getElementById("btn").textContent = "Cancel";
  } else {
    write.style.display = "none";
    document.getElementById("btn").textContent = "Write a Blog";
  }
});

// Handle form submission
document.getElementById("blog-post-form").addEventListener("submit", function (e) {
  e.preventDefault();  // Prevent page reload on form submission

  const title = document.getElementById("job-title").value;
  const description = document.getElementById("description").value;
  const pic = document.getElementById("pic").files[0];  // Get the selected file

  // Create a mock URL for the image (since we are not uploading to a server)
  const picURL = pic ? URL.createObjectURL(pic) : '';  // Create a URL for the image or leave empty if no image

  // Add the new blog to the mock data
  blog.push({
    title: title,
    desc: description,
    pic: picURL
  });

  // Clear form fields
  document.getElementById("job-title").value = '';
  document.getElementById("description").value = '';
  document.getElementById("pic").value = '';

  renderBlogs();  // Re-render the blogs
  document.getElementById("blog-post-form").style.display = "none";  // Hide form after submission
  document.getElementById("btn").textContent = "Write a Blog";  // Reset button text
});

// Initial render when the page loads
document.addEventListener("DOMContentLoaded", function () {
  renderBlogs();
});
