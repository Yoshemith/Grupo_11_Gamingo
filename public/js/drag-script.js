const dragContainer = document.querySelector('.container');
const dragText = document.querySelector('.drag-header');

let button = document.querySelector('.browse-button');
let input = document.querySelector('.drag-area input');

let file;

button.onclick = () => {
    input.click();
}
//when browse
input.addEventListener('change', function(){
    file = this.files[0];
    dragContainer.classList.add('active');
    displayFile();
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

    file = event.dataTransfer.files[0];
    /* console.log(file); */
    displayFile();
    /* console.log('File is dropped in the drag area'); */ 
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
            let imgTag = `<img src="${fileURL}" alt="" name="product-image">`;
            dragContainer.innerHTML = imgTag;
        };
        fileReader.readAsDataURL(file);
    }else{
        alert('Este archivo no es soportado.');
        dragContainer.classList.remove('active');
    }
};