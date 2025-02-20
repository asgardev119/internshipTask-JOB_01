import { blog } from "./mockData.js";

function renderBlogs() {
  const blogListContainer = document.querySelector(".blog-list");

  if (!blogListContainer) {
    console.error("Blog list container not found!");
    return;
  }

  blogListContainer.innerHTML = "";

  blog.forEach((item) => {
    const blogItem = document.createElement("div");
    blogItem.classList.add("blog-item");
    blogItem.innerHTML = `
      <img src="${item.pic}" alt="${item.title}" />
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
      <a href="#">Read More</a>
    `;

    blogListContainer.appendChild(blogItem);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  renderBlogs();
});
document.getElementById("btn").addEventListener("click", function () {
  const write = document.getElementById("blog-post-form");
  let open = write.style.display === "none";

  if (open) {
    write.style.display = "block";
    document.getElementById("btn").textContent = "cancel"
  } else {
    write.style.display = "none";
     document.getElementById("btn").textContent = "write a blog"
  }
});
