 // ----------------- PROFILE PICTURE (Original Code) -----------------

var firstName, lastName;
var profilePhotoImg = document.getElementById("profilePhotoImg");
var profilePhotoInput = document.getElementById("profilePhotoInput");

profilePhotoImg.addEventListener("click", () => {
  profilePhotoInput.click();
});

profilePhotoInput.addEventListener("change", (e) => {
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.onload = () => {
    profilePhotoImg.src = reader.result;

    // ---- SAVE PROFILE PICTURE ----
    localStorage.setItem("profilePhoto", reader.result);
  };
  reader.readAsDataURL(file);
});

// ----------------- SIGNUP FORM -----------------

signUpForm.onsubmit = function (e) {
  e.preventDefault();

  firstName = document.getElementById("inputFirstName").value;
  lastName = document.getElementById("inputLastName").value;

  // ---- SAVE USER DATA ----
  localStorage.setItem("firstName", firstName);
  localStorage.setItem("lastName", lastName);

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
};

// ----------------- DELETE POST -----------------

function deletePost(button) {
  button.parentNode.parentNode.remove();
  savePosts(); // UPDATE STORAGE
}

var editCard = null;

// ----------------- EDIT POST -----------------

function editpost(button) {
  editCard = button.closest(".card");
  var title = editCard.getElementsByTagName("h5")[0].innerText;
  var description = editCard.getElementsByTagName("p")[0].innerText;

  document.getElementById("title").value = title;
  document.getElementById("description").value = description;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getRandomGradient() {
  var gradients = [
    "linear-gradient(135deg, #A734BD, #FF006A)",
    "linear-gradient(135deg, #0072ff, #00c6ff)",
    "linear-gradient(135deg, #ff9966, #ff5e62)",
    "linear-gradient(135deg, #7F00FF, #E100FF)",
    "linear-gradient(135deg, #11998e, #38ef7d)",
    "linear-gradient(135deg, #f7971e, #ffd200)",
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
}

// ----------------- CREATE POST -----------------

function post() {
  var title = document.getElementById("title");
  var description = document.getElementById("description");
  var currentTime = new Date().toLocaleTimeString();

  if (title.value.trim() && description.value.trim()) {
    var post = document.getElementById("post");
    var gradient = getRandomGradient();

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

    // ---- SAVE POSTS ----
    savePosts();
  } else {
    Swal.fire({
      title: "Empty Post",
      text: "Can't publish post without Title or Description",
      icon: "question",
    });
  }
}

// ----------------- SAVE POSTS TO STORAGE -----------------

function savePosts() {
  localStorage.setItem("posts", document.getElementById("post").innerHTML);
}

// ----------------- LOAD POSTS FROM STORAGE -----------------

function loadPosts() {
  if (localStorage.getItem("posts")) {
    document.getElementById("post").innerHTML = localStorage.getItem("posts");
  }
}

// ----------------- LOAD USER DATA -----------------

function loadUserData() {
  if (localStorage.getItem("firstName")) {
    firstName = localStorage.getItem("firstName");
    lastName = localStorage.getItem("lastName");

    signUpFormContainer.classList.add("hidden");
    postApp.classList.remove("hidden");
  }

  if (localStorage.getItem("profilePhoto")) {
    profilePhotoImg.src = localStorage.getItem("profilePhoto");
  }
}

// ----------------- WHEN PAGE LOADS -----------------

window.onload = function () {
  loadUserData();
  loadPosts();
};
