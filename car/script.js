const panels = document.querySelectorAll(".panel");

panels.forEach(panel => {
    panel.addEventListener("click",function(){
        removeClassList();
        panel.classList.add("active");
    })
})

function removeClassList(){
    panels.forEach(panel => panel.classList.remove("active"))
}