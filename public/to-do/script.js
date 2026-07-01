window.addEventListener("load", function () {
    const form = this.document.getElementById("form");
    const input = this.document.getElementById("myInput");
    const list_el = this.document.getElementById("tasks");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const task = input.value;

        if (!task) {
            this.alert("please fill out the task");
            return;
        }

        const task_el = this.document.createElement("div");
        task_el.classList.add("task");

        const task_content_list = this.document.createElement("div");
        task_content_list.classList.add("content");

        task_el.appendChild(task_content_list);

        const task_input_el = this.document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly");

        task_content_list.appendChild(task_input_el);


        const actions = this.document.createElement("div");
        actions.classList.add("actions");

        const edit_button = this.document.createElement("button");
        edit_button.classList.add("edit");
        edit_button.innerText = "Edit";

        const delete_button = this.document.createElement("button");
        delete_button.classList.add("delete");
        delete_button.innerText = "Delete";

        actions.appendChild(edit_button);
        actions.appendChild(delete_button);

        task_el.appendChild(actions);


        list_el.appendChild(task_el);


        input.value = "";


        edit_button.addEventListener("click", () => {
            if (task_input_el.hasAttribute("readonly")) {
                task_input_el.removeAttribute("readonly", "readonly");
                edit_button.innerText = "Save";
                task_input_el.focus();
            }
            else {
                edit_button.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
            }
        })

        delete_button.addEventListener("click", () => {
            list_el.removeChild(delete_button.parentElement.parentElement);
        })

    })
})



const currentDate = new Date();

const dayIndex = currentDate.getDay();

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const currentDay = daysOfWeek[dayIndex];

document.querySelector("h1").innerText += " " + currentDay;