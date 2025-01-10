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


buttons.forEach(button => {
    button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-target");
        contents.forEach(content => {
            if(content.id === targetId) {
                content.classList.toggle('d-none');
                content.classList.add('active-content');
            }else{
                content.classList.add('d-none');
                content.classList.remove('active-content');

            }
        });
    });
});
