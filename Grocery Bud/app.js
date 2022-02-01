const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");


let editElement;
let editFlag = false;
let editId = "";

form.addEventListener('submit', addItem)
clearBtn.addEventListener('click', clearItems)

function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();


    if (value && !editFlag) {
        const element = document.createElement("article");
        element.classList.add("grocery-item");

        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr)
        element.innerHTML = `<p class="title">${value}</p>
                    <div class="btn-container">
                        <button type="button" class="edit-btn">
                            <i class="fas fa-edit"></i>
                        </button>
                         <button type="button" class="delete-btn">
                             <i class="fas fa-trash"></i>
                        </button>
                    </div>`       
        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');
        // deleteBtn.addEventListener('click', deleteItem);
        editBtn.addEventListener('click', editItem);
        list.appendChild(element);
        displayAlert('item added to the list', 'alert-success');
        container.classList.add("show-container");

        addTOlocalStorage(id,value);
        setBackToDefault()
    }
    else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert('value changed', 'alert-success');
        editLocalStorage(editId,value);
        setBackToDefault();
    }
    else {
        displayAlert('please enter value', 'alert-danger')
    };
}

function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(action);

    setTimeout(function(){
        alert.textContent = "";
        alert.classList.remove(action);
    },1000)
}


function clearItems(){
    const items = document.querySelectorAll('.grocery-item');
    // console.log(items);
    if(items.length > 0){
        items.forEach(function(item){
            list.removeChild(item)
        })
    }
    container.classList.remove('show-container')
    displayAlert("empty list", 'alert-danger')
    setBackToDefault()
}

function editItem(e){
    const element = e.currentTarget.parentElement.previousElementSibling;
    editElement = e.currentTarget.parentElement.previousElementSibling;

    grocery.value = editElement.innerHTML;
    editFlag = true;
    editId = element.dataset.id;
    submitBtn.textContent = 'edit';

}

function setBackToDefault(){
    grocery.value = "";
    editFlag = false;
    editId = "";
    submitBtn.textContent = "submit";

}

function addTOlocalStorage(id,value){

}


function editLocalStorage(id,value){};