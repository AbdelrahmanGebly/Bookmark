document.title = "Book Marker";
let siteName = document.getElementById('siteName');
let siteUrl = document.getElementById('siteUrl');
let btn = document.getElementById('btn');
let container = document.getElementById('container');
let closeButton = document.querySelector('.fa-xmark');
let errorContainer = document.querySelector('.errorContainer');
let errorBox = document.querySelector('.error');
let deleteAll = document.querySelector('#deleteAll');
let rows;

if(localStorage.getItem('books')){
    rows = JSON.parse(localStorage.getItem('books'));
    showBookMarks();
}else rows = [];




hideDeleteAllButton();
btn.onclick = function(){
    if(siteName.classList.contains('valid')&&siteUrl.classList.contains('valid') && siteName.value !=''&&siteUrl.value !=''){
        addBookMark();
        showBookMarks();
        clearInputs();
    }
    else{
        errorContainer.classList.replace('d-none','d-flex');
    }
    hideDeleteAllButton();
}






// function to add bookmark to the row
function addBookMark(){
    let newBookMark = {
        name:siteName.value,
        url:siteUrl.value
    }
    let regex = /^(https:\/\/)/;
    
    if(!regex.test(siteUrl.value)) {
        newBookMark.url = `https://${newBookMark.url}`;
        console.log('yes');
    }
    rows.push(newBookMark);
}

// function to show Book marks from the array
function showBookMarks(){
    var box = '';
    for(let i = 0; i<rows.length; i++){
        box +=`
        <tr class="border py-3 w-100">
            <td class="text-center">${i+1}</td>
            <td class="text-center">${rows[i].name}</td>
            <td class="text-center">
            <button class="btn btn-success">
                <a href="${rows[i].url}" target = "_blanck">
                    <i class="fa-solid fa-eye pe-2"></i>
                    Visit
                </a>
            </button>
            </td>
            <td class="text-center">
            <button class="btn btn-danger" onclick = "deleteBookMark(${i})">
                <i class="fa-solid fa-trash-can"></i>
                Delete
            </button>
            </td>
        </tr>
        `
    }
    container.innerHTML = box;
    localStorage.setItem('books',JSON.stringify(rows));
}

// function to clear the inputs
function clearInputs(){
    siteName.value = '';
    siteUrl.value = '';
    siteName.classList.remove('notValid','valid');
    siteUrl.classList.remove('notValid','valid');
}

// Delete function
function deleteBookMark(index){
    rows.splice(index,1);
    localStorage.setItem('books',JSON.stringify(rows));
    showBookMarks();
}

// validation function for site name
function siteNameValidation(){
    let regex = /^\w{3,10}$/;
    if(regex.test(siteName.value)) {
        siteName.classList.remove('notValid');
        siteName.classList.add('valid');
    }
    else {
        siteName.classList.remove('valid');
        siteName.classList.add('notValid');
    }
    
}

siteName.onkeyup = function(){
    siteNameValidation();
    if(siteName.value == '')siteName.classList.remove('notValid','valid');
}


// validation function for site url
function siteUrlValidation(){
    let regex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
    if(regex.test(siteUrl.value)) {
        siteUrl.classList.remove('notValid');
        siteUrl.classList.add('valid');
    }
    else {
        siteUrl.classList.remove('valid');
        siteUrl.classList.add('notValid');
    }
    
}

siteUrl.onkeyup = function(){
    siteUrlValidation();
    if(siteUrl.value == '')siteUrl.classList.remove('notValid','valid');
}

// functions to close error container
errorContainer.onclick = function(){
    hideErrorBox();
}
closeButton.onclick = function(){
    hideErrorBox();
}

// function to isolate the child from the parent of error container
errorBox.addEventListener('click',function(e){
    e.stopPropagation();
})

function hideErrorBox(){
    errorContainer.classList.add('d-none');
}

// function show delete all button or hide
function hideDeleteAllButton(){
    if(container.innerHTML == "") deleteAll.classList.add('d-none');
    else deleteAll.classList.remove('d-none')
}

// function to delete all Book marks
deleteAll.onclick = function(){
    rows = [];
    localStorage.removeItem('books');
    showBookMarks();
    hideDeleteAllButton();
}