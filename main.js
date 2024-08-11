const form = document.querySelector("#todo-form");
const titleInput = document.querySelector("#tasktitle");
const toDoList = document.querySelector("#todo-list");

let tasks = [];

function addItemToList(title, done = false) {
	const item = document.createElement("li");

	const spanText = document.createElement("span");
	spanText.textContent = title;

	if (done) {
		spanText.style.textDecoration = "line-through";
	}

	const itemCheckbox = document.createElement("input");
	itemCheckbox.setAttribute("type", "checkbox");
	itemCheckbox.addEventListener("click", (e) => {
		const spannode = e.target.parentElement.querySelector("span");
		if (itemCheckbox.checked) {
			spannode.style.textDecoration = "line-through";
		} else {
			spannode.style.textDecoration = "none";
		}

		tasks = tasks.map((t) => {
			if (t.title === spannode.textContent) {
				return {
					title: t.title,
					done: !t.done,
				};
			}

			return t;
		});
		localStorage.setItem("tasks", JSON.stringify(tasks));
	});
	itemCheckbox.checked = done;

	const removeButton = document.createElement("button");
	removeButton.textContent = "Remover";
	removeButton.addEventListener("click", (e) => {
		toDoList.removeChild(e.target.parentElement);
		tasks = tasks.filter((i) => {
			return (
				i.title !== e.target.parentElement.querySelector("span").textContent
			);
		});
		localStorage.setItem("tasks", JSON.stringify(tasks));
	});

	item.appendChild(itemCheckbox);
	item.appendChild(spanText);
	item.appendChild(removeButton);
	toDoList.appendChild(item);
}

window.onload = () => {
	const tasksOnLocalStorage = localStorage.getItem("tasks");
	if (!tasksOnLocalStorage) return;
	tasks = JSON.parse(tasksOnLocalStorage);
	// biome-ignore lint/complexity/noForEach: <explanation>
	tasks.forEach((t) => {
		addItemToList(t.title, t.done);
	});
};

form.addEventListener("submit", (e) => {
	e.preventDefault();

	const title = titleInput.value;
	titleInput.value = "";

	if (title.length < 3) return;

	tasks.push({
		title: title,
		done: false,
	});
	localStorage.setItem("tasks", JSON.stringify(tasks));

	addItemToList(title);
});
