let imagesUrl = [
  "https://raw.githubusercontent.com/Aaymansedkey10/Kingdom-Horses/main/images/s-1.jpeg",
  "https://raw.githubusercontent.com/Aaymansedkey10/Kingdom-Horses/main/../images/s-2.jpeg",
  "https://raw.githubusercontent.com/Aaymansedkey10/Kingdom-Horses/main/images/s-3.jpeg",
  "https://raw.githubusercontent.com/Aaymansedkey10/Kingdom-Horses/main/images/s-4.jpeg",
];
let currentIndex = 0;

// call function for show data
getData("navBar");
getData("aboutUs");
getData("services");
getData("providers");

window.addEventListener("DOMContentLoaded", () => {
  let butttonToShowConettionButtons = document.getElementById("butttonToShowConettionButtons");
  // change the color of the buttons connections by data-color
  changeColorConnectionsButton();
  // change the background of header
  changeBackground();
  setInterval(changeBackground, 1500);
  // change the dispaly of the buttons connections when click
  butttonToShowConettionButtons.addEventListener("click", showConnectionButtons);

  // call scroll to down when change the Url
  scrollToDown();
});

window.addEventListener("scroll", () => {
  showElements();
  navBarFixed();
});
// funtion for get data from json
async function getData(key) {
  // let response = await fetch("../data/data.json");
  let response = await fetch("https://raw.githubusercontent.com/Aaymansedkey10/Kingdom-Horses/main/data/data.json");
  let data = await response.json();

  if (data !== null && data.status === true) {
    if (key === "navBar") {
      let navBar = document.getElementById("nav-bar-list");
      if (navBar) {

        data[key].forEach((link) => {
          let itemLink = `<li class="nav-item">
                                            <a class="nav-link fw-bold text-white" href="${link.link}">${link.title}</a>
                                        </li>`;
          navBar.innerHTML += itemLink;
        });
      }
    }
    if (key === "aboutUs") {
      let aboutUs = document.getElementById("controllers");
      if (aboutUs) {
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
      }
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
      if (services) {
        data[key].forEach((service) => {
          let itemService = `<div class="col-12 col-md-6 col-lg-4 mb-4">
                                    <div class="card overflow-hidden position-relative">
                                        <div class="overflow-hidden">
                                            <img src="${service.image}" class="card-img-top" alt="${service.title}">
                                        </div>
                                        <div class="card-body">
                                            <h3 class="fw-bold text-center p-2 service-title">${service.title}</h3>
                                            <h6 class="card-text fw-semibold">${service.details}</h6>
                                        </div>
                                    </div>
                                </div>`;
          services.innerHTML += itemService;
        });
      }
    }
    if (key === "providers") {
      let providers = document.getElementById("providers");
      if (providers) {
        data[key].forEach((Provider) => {
          let itemProvider = `<div class="col-12 col-md-6 col-lg-4 mb-4">
                                <div class="card border overflow-hidden">
                                    <div class="overflow-hidden">
                                        <img src="${Provider.image}" class="card-img-top" alt="${Provider.title}">
                                    </div>
                                    <div class="card-body">
                                    <h3 class="fw-bold text-center">${Provider.title}</h3>
                                    <p class="card-text fw-semibold">${Provider.details}</p>
                                    </div>
                                </div>
                                </div>`;
          providers.innerHTML += itemProvider;
        });
      }
    }
  } else {
    console.log("data not found");
  }
}
// function for fixed navbar
function navBarFixed() {
  let navBar = document.getElementById("navBar");
  let links = document.querySelectorAll(".nav-link");
  if (window.scrollY > 100) {
    navBar.classList.add("nav-fixed");
    links.forEach((link) => {
      link.classList.remove('text-white');
      link.classList.add('active');
    });
  } else {
    navBar.classList.remove("nav-fixed");
    links.forEach((link) => {
      link.classList.remove('active');
      link.classList.add('text-white');
    });
  }
}
// function for change background image of header
function changeBackground() {
  let container = document.getElementById("content-header");
  container.style.backgroundImage = `url(${imagesUrl[currentIndex]})`;
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
  let conettionButtonsContainer = document.getElementById("conettion-buttons-container");
  let button = document.getElementById("butttonToShowConettionButtons");
  if (!conettionButtonsContainer.classList.contains("d-none")) {
    conettionButtonsContainer.classList.add("d-none");
    conettionButtonsContainer.classList.remove("d-flex");
    button.innerHTML = `<i class="fa-solid fa-comment"></i>`;
  } else {
    conettionButtonsContainer.classList.add("d-flex");
    conettionButtonsContainer.classList.remove("d-none");
    button.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  }
}
// change the color of the buttons connections by data-color
function changeColorConnectionsButton() {
  let conettionButtons = document.querySelectorAll("#button-connection");
  conettionButtons.forEach((button) => {
    let color = button.getAttribute("data-color");
    button.style.backgroundColor = color;
  })
}

// function to scroll when the Url is changed 
function scrollToDown() {
  const Url_link = window.location.href.split("/").pop();
  if (Url_link) {
    setTimeout(() => { window.scrollTo({ top: 500, behavior: "smooth" }); }, 500);
  }
}

// // Disable right-click
// document.addEventListener("contextmenu", (event) => {
//   event.preventDefault();
// });

// // Disable key combinations (like F12, Ctrl+Shift+I, etc.)
// document.addEventListener("keydown", (event) => {
//   // Disable F12
//   if (event.key === "F12") {
//     event.preventDefault();
//   }

//   // Disable Ctrl+Shift+I (Windows/Linux) or Cmd+Option+I (Mac)
//   if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === "I") {
//     event.preventDefault();
//   }

//   // Disable Ctrl+U (View Source)
//   if ((event.ctrlKey || event.metaKey) && event.key === "u") {
//     event.preventDefault();
//   }

//   // Disable Ctrl+Shift+J (Console)
//   if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === "J") {
//     event.preventDefault();
//   }
// });

// document.addEventListener("DOMContentLoaded", function () {
//   let links = document.querySelectorAll("nav a"); // تحديد كل الروابط داخل القائمة
//   let currentUrl = window.location.pathname.split("/").pop(); // جلب اسم الصفحة الحالية

//   links.forEach(link => {
//       if (link.getAttribute("href") === currentUrl) {
//           link.classList.add("active"); // إضافة كلاس active للرابط الخاص بالصفحة الحالية
//       }
//   });
// // });

// let links = document.querySelectorAll("nav a");
// let currentUrl = window.location.pathname.split('/').pop();
// links.forEach(link => {
//   if (link.getAttribute("href") === currentUrl) {
//     link.classList.toggle("active-linkactive");
//   }
// })