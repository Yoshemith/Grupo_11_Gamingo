const dragContainer = document.querySelector('.container');
const dragText = document.querySelector('.drag-header');

const button = document.querySelector('.browse-button');
const input = document.querySelector('#productImage');
const inputId = document.getElementById('productImage');

let file;

button.onclick = () => {
    input.click();
}
//when browse
input.addEventListener('change', function(){
    //inputId.files = this.files; //prueba para ver si guarda la imagen
    inputId.file = this.files[0];
    console.log(inputId.file);

    file = inputId.file;//this.files[0];
    dragContainer.classList.add('active');
    displayFile();
    console.log(inputId.file.type);
});

//when file is inside the drag area
dragContainer.addEventListener('dragover', (event) => {
    event.preventDefault();
    dragText.textContent = 'Suelta para cargar';
    dragContainer.classList.add('active');
    /* console.log('File is inside the drag area'); */
});

//when file leaves the drag area
dragContainer.addEventListener('dragleave', () => {
    dragText.textContent = 'Arrastra y suelta';
    dragContainer.classList.remove('active');
    /* console.log('File left the drag area'); */
});

//when the file is dropped in the drag area
dragContainer.addEventListener('drop', (event) => {
    event.preventDefault();

    //inputId.files = event.dataTransfer.files; //prueba para ver si guarda la imagen
    inputId.file = event.dataTransfer.files[0]; //prueba de manera individual
    console.log(inputId.file);

    file = inputId.file;//event.dataTransfer.files[0];
    /* console.log(file); */
    displayFile();
    /* console.log('File is dropped in the drag area'); */ 
    console.log(inputId.file.type);
});

function displayFile(){
    let filetype = file.type;
    /* console.log(filetype); */

    let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
    if(validExtensions.includes(filetype)){
        let fileReader = new FileReader();

        fileReader.onload = () => {
            let fileURL = fileReader.result;
            /* console.log(fileUrl); */
            let imgTag = `<img src="${fileURL}" alt="">`;
            dragContainer.innerHTML = imgTag;
        };
        fileReader.readAsDataURL(file);
    }else{
        alert('Este archivo no es soportado.');
        dragContainer.classList.remove('active');
        dragText.textContent = 'Arrastra y suelta';
    }
};

//dragContainer.addEventListener('click', () => inputId.click())