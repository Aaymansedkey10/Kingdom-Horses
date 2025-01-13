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


window.addEventListener("scroll", () => {
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
        // if(key==="aboutUs") {
        //     let aboutUs = document.getElementById("controllers");
        //     data[key].forEach(link => {
        //         let itemLink =
        //          `<div class="active-content content-who-we">
        //         <button class="border-0 bg-body w-100 text-end controller" data-target="who-we">${link.title}</button>
        //         <div class="d-none p-2 mb-2 mt-1 rounded-0 content-area" id="who-we"> ${link.details} </div>
        //       </div>`
        //         aboutUs.innerHTML += itemLink;
        //     });
        //     let buttons = document.querySelectorAll(".controller");
        //     let contents = document.querySelectorAll(".content-area");  
        //     buttons.forEach(button => {
        //         // getData("aboutUs");
        //         button.addEventListener("click", () => {
        //             const targetId = button.getAttribute("data-target");
        //             contents.forEach(content => {
        //                 if(content.id === targetId) {
        //                     content.classList.toggle('d-none');
        //                     content.classList.add('active-content');
        //                 }else{
        //                     content.classList.add('d-none');
        //                     // content.classList.remove('active-content');
            
        //                 }
        //             });
        //         });
        //     });
        // }
        if (key === "aboutUs") {
            let aboutUs = document.getElementById("controllers");
            data[key].forEach((link, index) => {
                let uniqueId = `section-${index}`;
                let itemLink = `
                    <div class="active-content content-who-we">
                        <button class="border-0 bg-body w-100 text-end controller" data-target="${uniqueId}">
                            ${link.title}
                        </button>
                        <div class="d-none p-2 mb-2 mt-1 rounded-0 content-area" id="${uniqueId}">
                            ${link.details}
                        </div>
                    </div>`;
                aboutUs.innerHTML += itemLink;
            });
            let buttons = document.querySelectorAll(".controller");
            let contents = document.querySelectorAll(".content-area");
        
            buttons.forEach(button => {
                button.addEventListener("click", () => {
                    const targetId = button.getAttribute("data-target");
                    contents.forEach(content => {
                        if (content.id === targetId) {
                            content.classList.toggle('d-none');
                        } else {
                            content.classList.add('d-none');
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

getData("navBar");
getData("aboutUs");
getData("services");
getData("providers");