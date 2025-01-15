let butttonToShowConettionButtons = document.getElementById("butttonToShowConettionButtons");
let conettionButtons = document.getElementById("conettionButtons");
let buttons = document.querySelectorAll(".controller");
let contents = document.querySelectorAll(".content-area");

butttonToShowConettionButtons.addEventListener("click", () => {
    if (conettionButtons.classList.contains("d-none")) {
        conettionButtons.classList.remove("d-none");
        conettionButtons.classList.add("d-flex");
        let buttonContent = conettionButtons.classList.contains("d-none") ? `<i class="fa-solid fa-comment"></i>` : '<i class="fa-solid fa-xmark"></i>';
        butttonToShowConettionButtons.innerHTML = buttonContent ;
    } else {
        conettionButtons.classList.remove("d-flex");
        conettionButtons.classList.add("d-none");
        let buttonContent = conettionButtons.classList.contains("d-none") ? `<i class="fa-solid fa-comment"></i>` : '<i class="fa-solid fa-xmark"></i>';
        butttonToShowConettionButtons.innerHTML = buttonContent ;
    }
})


window.addEventListener("scroll",() => {
    showElements();
    let navBar = document.getElementById("navBar");
    let containerButtonConnection = document.getElementById("container-button-connection");
    if (window.scrollY > 0) {
       navBar.classList.add("position-fixed-navbar");
       containerButtonConnection.classList.remove("d-none");
    }else{
        navBar.classList.remove("position-fixed-navbar");
        containerButtonConnection.classList.add("d-none");
    }
})

// call function for show data 
getData("navBar");
getData("aboutUs");
getData("services");
getData("providers");

// funtion for get data from json 
async function getData(key) {
    let response = await fetch("./data/data.json");
    let data = await response.json();

    if(data !== null && data.status === true) {
        if(key==="navBar") {
            let navBar = document.getElementById("nav-bar-list");
            data[key].forEach(link => {
                let itemLink = `<li class="nav-item">
                                    <a class="nav-link fw-bold" aria-current="page" href="${link.link}">${link.title}</a>
                                </li>`
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
                            <div class="d-flex align-items-center justify-content-between p-2 controller">
                                <button class="border-0 bg-body fw-bold w-100 text-end controller-button" data-target="${uniqueId}">
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
                            <div class="d-flex align-items-center justify-content-between p-2 controller">
                                <button class="border-0 bg-body fw-bold w-100 text-end controller-button" data-target="${uniqueId}">
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
            let controller = document.querySelectorAll(".controller");
        
            buttons.forEach((button) => {
                button.addEventListener("click", () => {
                    const targetId = button.getAttribute("data-target");
                    contents.forEach((content) => {
                        if (content.id === targetId) {
                            const span = button.nextElementSibling;
                            const parent = button.parentElement;
                            if (content.classList.contains("d-none")) {
                                content.classList.remove("d-none");
                                span.innerHTML = '<i class="bi bi-caret-up"></i>';
                                parent.classList.add("border-bottom-controller");
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
        if(key === "services") {
            let services = document.getElementById("services");
            data[key].forEach(link => {
                let itemLink = `<div class="col-12 col-lg-4 mb-4">
                                    <div class="card overflow-hidden">
                                        <div class=" overflow-hidden">
                                            <img src="${link.image}" class="card-img-top" alt="...">
                                        </div>
                                        <div class="card-body">
                                            <h3>${link.title}</h3>
                                            <p class="card-text">${link.details}</p>
                                        </div>
                                    </div>
                                </div>`
                services.innerHTML += itemLink;
            });
        }
        if(key === "providers") {
            let providers = document.getElementById("providers");
            data[key].forEach(link => {
                let itemLink = `<div class="col-12 col-lg-4 mb-4">
                                <div class="card border-0 overflow-hidden">
                                    <div class="overflow-hidden">
                                        <img src="${link.image}" class="card-img-top2" alt="...">
                                    </div>
                                    <div class="card-body">
                                    <h3 class="card-title">${link.title}</h3>
                                    <p class="card-text fw-bold">${link.details}</p>
                                    </div>
                                </div>
                                </div>`
                providers.innerHTML += itemLink;
            });
        }
        
    }
    
}
// show elements when scroll 
function showElements() {
    const elements = document.querySelectorAll('.content');
    elements.forEach((element) => {
      const windowHeight = window.innerHeight;
      const revealTop = element.getBoundingClientRect().top;
      const revealPoint = 100;
  
      if (revealTop < windowHeight - revealPoint) {
        element.classList.add('visible');
      } else {
        element.classList.remove('visible');
      }
    });
  }