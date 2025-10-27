document.addEventListener("DOMContentLoaded", () => {
  const fullName = "NEAL";
  const nameElement = document.getElementById("personName");
  if (nameElement) {
    nameElement.textContent = fullName;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleBlocks = document.querySelectorAll(".contact");

  toggleBlocks.forEach((block) => {
    const arrow = block.querySelector(".contact-arrow");
    const content = block.querySelector(".contact-content");

    arrow.addEventListener("click", () => {
      content.classList.toggle("hidden");

      arrow.classList.toggle("rotated");
    });
  });
});

const hobbies = [
  "WRITING",
  "READING BOOKS",
  "PLAYING FOOTBALL",
  "PHOTOGRAPHY",
  "TRAVELING",
];

function renderHobbies(containerId, hobbiesArray) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  hobbiesArray.forEach((hobby) => {
    const h3 = document.createElement("h3");
    h3.className = "lato-bold hobbies-title-secondary underlined";
    h3.textContent = hobby;
    container.appendChild(h3);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderHobbies("hobbiesContainer", hobbies);
});
