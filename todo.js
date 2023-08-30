let btn = document.querySelector('button')
let ip = document.querySelector('input')
let ul = document.querySelector('ul')
let edit_id = null

let idCounter = 1;
// Select all edit buttons using querySelectorAll
const editButtons = document.querySelectorAll('.fa-pen-to-square');
editButtons.forEach(editButton => {
    editButton.setAttribute('data-id', idCounter++);
});

btn.addEventListener("click", event => {
    event.preventDefault();



    if (ip.value == '') {
        alert('You must write Someting !')
        return
    }
    else {

        if (edit_id !== null) {
            const listItem = document.querySelector(`[data-id="${edit_id}"]`);
            const parent = listItem.parentElement;
            console.log(parent)
            // console.log("lks00",listItem)
            if (listItem) {
                parent.innerText = ip.value;
                edit_id = null;
                ip.value = '';
                let editBtn = document.createElement('i');
                editBtn.classList.add('fa-solid', 'fa-pen-to-square', 'right');
                editBtn.setAttribute('id', 'edit')
                editBtn.setAttribute('data-id', Date.now());
                parent.appendChild(editBtn);

                let delBtn = document.createElement('i')
                delBtn.classList.add('fa-solid', 'fa-trash', 'delete')
                parent.appendChild(delBtn)
                
                saveData()
            }
        }
        else {
            let list = document.createElement('li')
            list.innerText = ip.value;
            ip.value = ''

            let editBtn = document.createElement('i');
            editBtn.classList.add('fa-solid', 'fa-pen-to-square', 'right');
            editBtn.setAttribute('id', 'edit')
            editBtn.setAttribute('data-id', Date.now());
            list.appendChild(editBtn);

            let delBtn = document.createElement('i')
            delBtn.classList.add('fa-solid', 'fa-trash', 'delete')
            delBtn.setAttribute('id','remove')
            list.appendChild(delBtn)
            ul.appendChild(list)

            saveData()
        }
    }
})


ul.addEventListener('click', event => {
    event.preventDefault()

    if (event.target.id == 'remove') {
        let listItem = event.target.parentElement;
        listItem.remove();
        saveData()
    }
    else if (event.target.tagName == 'LI') {
        event.target.classList.toggle('checked');
        saveData()
    }

    else if (event.target.id == 'edit') {
        // console.log(event.target.dataset.id)
        let listItem = event.target.parentNode; // Use parentNode to get the list item
        ip.value = listItem.textContent.trim(); // Use textContent and trim to get the task text
        edit_id = event.target.dataset.id;
        saveData()
    }
})


function saveData(){
    localStorage.setItem("data",ul.innerHTML)
}

function showTask(){
    ul.innerHTML= localStorage.getItem("data");
}

showTask();