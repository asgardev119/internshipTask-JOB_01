import { feedbacks } from './mockData.js'; 

let currentIndex = 0;

const feedbackContainer = document.getElementById('feedbackContainer');
const totalCards = feedbacks.length;
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');


function generateFeedbackCards() {
  feedbacks.forEach(feedback => {
    const feedbackCard = document.createElement('div');
    feedbackCard.classList.add('feedback-card');
    feedbackCard.innerHTML = `
      <img src="${feedback.img}" alt="${feedback.name}" class="profile-img" />
      <h3>${feedback.name}</h3>
      <p>"${feedback.para}"</p>
    `;
    feedbackContainer.appendChild(feedbackCard);
  });
}

// Function to update the slider position based on the current index
function updateSlider() {
  const feedbackCards = document.querySelectorAll('.feedback-card');
  const newTransformValue = -(currentIndex * (feedbackCards[0].offsetWidth + 30)); // 30px for margin
  feedbackContainer.style.transform = `translateX(${newTransformValue}px)`;
}

// Event listener for the 'next' button
nextButton.addEventListener('click', () => {
  if (currentIndex < totalCards - 1) {
    currentIndex++;
  } else {
    currentIndex = 0; // Loop back to the first card
  }
  updateSlider();
});

// Event listener for the 'previous' button
prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = totalCards - 1; // Loop back to the last card
  }
  updateSlider();
});

// Initial setup
generateFeedbackCards();
updateSlider();
