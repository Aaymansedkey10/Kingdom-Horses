let imagesUrl = [
  "./images/slider-1.jpeg",
  "./images/slider-2.jpeg",
  "./images/slider-3.jpeg",
];
let currentIndex = 0;

window.addEventListener("load", () => {
  let butttonToShowConettionButtons = document.getElementById(
    "butttonToShowConettionButtons"
  );

  changeBackground();
  setInterval(changeBackground, 1500);

  butttonToShowConettionButtons.addEventListener(
    "click",
    showConnectionButtons
  );

  window.addEventListener("scroll", () => {
    showElements();
    navBarFixed();
  });

  // call function for show data
  getData("navBar");
  getData("aboutUs");
  getData("services");
  getData("providers");
});

// funtion for get data from json
async function getData(key) {
  let response = await fetch("./data/data.json");
  let data = await response.json();

  if (data !== null && data.status === true) {
    if (key === "navBar") {
      let navBar = document.getElementById("nav-bar-list");
      data[key].forEach((link) => {
        let itemLink = `<li class="nav-item">
                                    <a class="nav-link fw-bold" href="${link.link}">${link.title}</a>
                                </li>`;
        navBar.innerHTML += itemLink;
      });
    }
    if (key === "aboutUs") {
      let aboutUs = document.getElementById("controllers");

      data[key].forEach((link, index) => {
        let uniqueId = `section-${index}`;
        let aboutContentFromJson = link.details;
        let itemLink = "";

        // Check if details is not an array
        if (!Array.isArray(aboutContentFromJson)) {
          itemLink = `
                        <div class="active-content rounded mb-2">
                            <div class="d-flex align-items-center justify-content-between p-2 controller-container">
                                <button class="border-0 bg-transparent fw-bold w-100 text-end controller-button" data-target="${uniqueId}">
                                    ${link.title}
                                </button>
                                <span class="cont"> <i class="bi bi-caret-down"></i></span>    
                            </div>
                            <div class="d-none px-2 mb-2 mt-1 rounded-0 content-area" id="${uniqueId}">
                                <p>${aboutContentFromJson}</p>
                            </div>
                        </div>`;
          aboutUs.innerHTML += itemLink;
        } else {
          let listItems = aboutContentFromJson
            .map((element) => {
              return element.content
                ? `<li>${element.content}</li>`
                : `<li>Content not available</li>`;
            })
            .join("");

          itemLink = `
                        <div class="active-content rounded mb-2">
                            <div class="d-flex align-items-center justify-content-between p-2 controller-container">
                                <button class="border-0 bg-transparent fw-bold w-100 text-end controller-button" data-target="${uniqueId}">
                                    ${link.title}
                                </button>
                                <span class="cont"><i class="bi bi-caret-down"></i></span>    
                            </div>
                            <div class="d-none px-2 mb-2 mt-1 content-area" id="${uniqueId}">
                                <ul class="m-0 px-3">${listItems}</ul>
                            </div>
                        </div>`;
          aboutUs.innerHTML += itemLink;
        }
      });
      // add event to show content
      let buttons = document.querySelectorAll(".controller-button");
      let contents = document.querySelectorAll(".content-area");
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          const targetId = button.getAttribute("data-target");
          contents.forEach((content) => {
            const associatedButton = document.querySelector(
              `[data-target="${content.id}"]`
            );
            const associatedSpan = associatedButton.nextElementSibling;
            const parent = associatedButton.parentElement;

            if (content.id !== targetId) {
              content.classList.add("d-none");
              associatedSpan.innerHTML = '<i class="bi bi-caret-down"></i>';
              parent.classList.remove("border-bottom-controller");
              associatedButton.style.color = "";
            }
          });
          contents.forEach((content) => {
            if (content.id === targetId) {
              const span = button.nextElementSibling;
              const parent = button.parentElement;

              if (content.classList.contains("d-none")) {
                content.classList.remove("d-none");
                span.innerHTML = '<i class="bi bi-caret-up"></i>';
                parent.classList.add("border-bottom-controller");
                button.style.color = "var(--color)";
              } else {
                content.classList.add("d-none");
                span.innerHTML = '<i class="bi bi-caret-down"></i>';
                parent.classList.remove("border-bottom-controller");
              }
            }
          });
        });
      });
    }
    if (key === "services") {
      let services = document.getElementById("services");
      data[key].forEach((link) => {
        let itemLink = `<div class="col-12 col-md-6 col-lg-4 mb-4">
                                    <div class="card overflow-hidden position-relative">
                                        <div class="overflow-hidden">
                                            <img src="${link.image}" class="card-img-top" alt="${link.title}">
                                        </div>
                                        <div class="card-body">
                                            <h3 class="fw-bold text-center p-2 service-title">${link.title}</h3>
                                            <h6 class="card-text fw-semibold">${link.details}</h6>
                                        </div>
                                    </div>
                                </div>`;
        services.innerHTML += itemLink;
      });
    }
    if (key === "providers") {
      let providers = document.getElementById("providers");
      data[key].forEach((link) => {
        let itemLink = `<div class="col-12 col-md-6 col-lg-4 mb-4">
                                <div class="card border overflow-hidden">
                                    <div class="overflow-hidden">
                                        <img src="${link.image}" class="card-img-top" alt="${link.title}">
                                    </div>
                                    <div class="card-body">
                                    <h3 class="fw-bold text-center">${link.title}</h3>
                                    <p class="card-text fw-semibold">${link.details}</p>
                                    </div>
                                </div>
                                </div>`;
        providers.innerHTML += itemLink;
      });
    }
  }
}
// function for fixed navbar
function navBarFixed() {
  let navBar = document.getElementById("navBar");
  let containerButtonConnection = document.getElementById("container-button-connection");
  if (window.scrollY > 200) {
    navBar.classList.add("nav-fixed");
    navBar.style.setProperty("box-shadow", " 0 3px 3px #A886CC");
    containerButtonConnection.classList.remove("d-none");
  } else {
    navBar.classList.remove("nav-fixed");
    containerButtonConnection.classList.add("d-none");
    navBar.style.removeProperty("box-shadow", " 0 2px 2px red");
  }
}
// function for change background image
function changeBackground() {
  let container = document.getElementById("content-header");
  container.style.backgroundImage = `url(${imagesUrl[currentIndex]})`;
  // if (imagesUrl[currentIndex] === "images/slider-1.jpeg") {
  //   console.log(currentIndex);
  // } if (imagesUrl[currentIndex] === "images/slider-2.jpeg") {
  //   console.log(currentIndex);
  // } if (imagesUrl[currentIndex] === "images/slider-3.jpeg") {
  //   console.log(currentIndex);
  // }
  currentIndex = (currentIndex + 1) % imagesUrl.length;
 
}

// show elements when scroll
function showElements() {
  const elements = document.querySelectorAll(".content");
  elements.forEach((element) => {
    const windowHeight = window.innerHeight;
    const revealTop = element.getBoundingClientRect().top;
    const revealPoint = 100;

    if (revealTop < windowHeight - revealPoint) {
      element.classList.add("visible");
    } else {
      element.classList.remove("visible");
    }
  });
}

// function for show connection buttons and hidde it
function showConnectionButtons() {
  if (!conettionButtons.classList.contains("d-none")) {
    conettionButtons.classList.add("d-none");
    conettionButtons.classList.remove("d-flex");
    let buttonContent = conettionButtons.classList.contains("d-none")
      ? `<i class="fa-solid fa-comment"></i>`
      : '<i class="fa-solid fa-xmark"></i>';
    butttonToShowConettionButtons.innerHTML = buttonContent;
  } else {
    conettionButtons.classList.add("d-flex");
    conettionButtons.classList.remove("d-none");
    let buttonContent = conettionButtons.classList.contains("d-none")
      ? `<i class="fa-solid fa-comment"></i>`
      : '<i class="fa-solid fa-xmark"></i>';
    butttonToShowConettionButtons.innerHTML = buttonContent;
  }
}

// Disable right-click
document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

// Disable key combinations (like F12, Ctrl+Shift+I, etc.)
document.addEventListener("keydown", (event) => {
  // Disable F12
  if (event.key === "F12") {
    event.preventDefault();
  }

  // Disable Ctrl+Shift+I (Windows/Linux) or Cmd+Option+I (Mac)
  if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === "I") {
    event.preventDefault();
  }

  // Disable Ctrl+U (View Source)
  if ((event.ctrlKey || event.metaKey) && event.key === "u") {
    event.preventDefault();
  }

  // Disable Ctrl+Shift+J (Console)
  if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === "J") {
    event.preventDefault();
  }
});


// const buttons = document.querySelectorAll(".button-connection");

// // Add pulse effect periodically
// buttons.forEach(button => {
//   setInterval(() => {
//     button.classList.add("pulse");
//     setTimeout(() => {
//       button.classList.remove("pulse");
//     }, 1500);
//   }, 1000); // Pulse every 5 seconds
// });