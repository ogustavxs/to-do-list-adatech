const form = document.querySelector("#todo-form");
const titleInput = document.querySelector("#tasktitle");
const toDoList = document.querySelector("#todo-list");


form.addEventListener("submit", (e) => {
	e.preventDefault();

	const title = titleInput.value;
	titleInput.value = "";

	if (title.length < 3) return;

	const item = document.createElement("li");

	const spanText = document.createElement("span");
	spanText.textContent = title;

	const itemCheckbox = document.createElement("input");
	itemCheckbox.setAttribute("type", "checkbox");
	itemCheckbox.addEventListener("click", (e) => {
		const spannode = e.target.parentElement.querySelector("span");
		if (itemCheckbox.checked) {
			spannode.style.textDecoration = "line-through";
		} else {
			spannode.style.textDecoration = "none";
		}
	});

	const removeButton = document.createElement("button");
	removeButton.textContent = "Remover";
	removeButton.addEventListener("click", (e) => {
		toDoList.removeChild(e.target.parentElement);
	});

	item.appendChild(itemCheckbox);
	item.appendChild(spanText);
	item.appendChild(removeButton);
	toDoList.appendChild(item);
});
