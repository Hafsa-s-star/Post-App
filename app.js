var firstName, lastName;
const profilePhotoImg = document.getElementById("profilePhotoImg");
const profilePhotoInput = document.getElementById("profilePhotoInput");

profilePhotoImg.addEventListener("click", () => {
  profilePhotoInput.click();
});

profilePhotoInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    profilePhotoImg.src = reader.result;
  };
  reader.readAsDataURL(file);
});
signUpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  firstName = document.getElementById("inputFirstName").value;
  lastName = document.getElementById("inputLastName").value;
  console.log(firstName, lastName);

  const signUpFormContainer = document.getElementById("signUpFormContainer");
  var postApp = document.getElementById("postApp");

  signUpForm.reset();
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Account created successfully!",
    showConfirmButton: false,
    timer: 1500,
  });
  signUpFormContainer.classList.add("hidden");
  postApp.classList.remove("hidden");
});

function deletePost(button) {
  button.parentNode.parentNode.remove();
}
let editCard = null; // stores the card currently being edited

function editpost(button) {
  editCard = button.closest(".card"); // get the whole post card
  const title = editCard.querySelector("h5").textContent;
  const description = editCard.querySelector("p").textContent;

  // Fill input fields for editing
  document.getElementById("title").value = title;
  document.getElementById("description").value = description;

  // Scroll to top (optional)
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getRandomGradient() {
  const gradients = [
    "linear-gradient(135deg, #A734BD, #FF006A)",
    "linear-gradient(135deg, #0072ff, #00c6ff)",
    "linear-gradient(135deg, #ff9966, #ff5e62)",
    "linear-gradient(135deg, #7F00FF, #E100FF)",
    "linear-gradient(135deg, #11998e, #38ef7d)",
    "linear-gradient(135deg, #f7971e, #ffd200)"
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
}

function post() {
  var title = document.getElementById("title");
  var description = document.getElementById("description");
  var currentTime = new Date().toLocaleTimeString();

  if (title.value.trim() && description.value.trim()) {
    var post = document.getElementById("post");
    const gradient = getRandomGradient();

    post.innerHTML += `
      <div class="card p-3 mb-3 post-card" style="background: ${gradient}">
        <div class="card-header d-flex align-items-center mb-2">
          <img class="profile-photo me-2" src="${profilePhotoImg.src}" />
          <div class="name-time d-flex flex-column">
            <strong>${firstName} ${lastName}</strong>
            <small>${currentTime}</small>
          </div>
        </div>
        <div class="card-body text-white">
          <h5>${title.value}</h5>
          <p>${description.value}</p>
        </div>
        <div class="card-footer d-flex justify-content-end">
          <button type="button" onclick="editpost(this)" class="btn editBtn me-2">Edit</button>
          <button type="button" onclick="deletePost(this)" class="btn btn-danger deleteBtn">Delete</button>
        </div>
      </div>`;

    title.value = "";
    description.value = "";
  } else {
    Swal.fire({
      title: "Empty Post",
      text: "Can't publish post without Title or Description",
      icon: "question",
    });
  }
}
