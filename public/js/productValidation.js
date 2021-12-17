window.onload = function(){
    let errors = {};
    let form = document.getElementsByClassName("create-form")
    let name = document.getElementById('name');
    let category = document.getElementById('category');
    let price = document.getElementById('price');
    let description = document.getElementById('description');

    name.focus();

    function nameValidation(input){

        if(input.value == ""){
            input.classList.add('invalid');
            input.placeholder = "Este campo es obligatorio"
            name.style.backgroundColor = "red";
            errors[input.name] = `${input.name} is required`
        }else if(input.value.length < 2){
            input.classList.add('invalid');
            input.placeholder = "Se deben ingresar al menos 2 caracteres"
            input.value = ""
            name.style.backgroundColor = "red";
            errors[input.name] = `${input.name} does not have the required length`
        }else{
            input.classList.remove('invalid');
            delete errors[input.name]
        }
    }
/*
    function categoryValidation(select){
        const result = /\S+@\S+\.\S+/.test(select.value)

        if(select.value == ""){
            select.classList.add('invalid');
            select.placeholder = "Este campo es obligatorio"
            category.style.backgroundColor = "red";
            errors[select.name] = `${select.name} is required`
        }else if(!result) {
            select.classList.add('invalid');
            select.placeholder = "El correo ingresado no es valido"
            category.style.backgroundColor = "red";
            errors[select.name] = `${select.name} is not an email`
        } else {
            select.classList.remove('invalid');
            delete errors[select.name] 
        }
    }
*/

    function priceValidation(input){
        if(input.value == ""){
            input.classList.add('invalid');
            input.placeholder = "Este campo es obligatorio"
            price.style.backgroundColor = "red";
            errors[input.name] = `${input.name} is required`
        }else if(input.value.length <= 0){
            input.classList.add('invalid');
            input.placeholder = "Se deben ingresar al menos 1 numero"
            input.value = ""
            price.style.backgroundColor = "red";
            errors[input.name] = `${input.name} does not have the required length`
        }else{
            input.classList.remove('invalid');
            delete errors[input.name]
        }
    }

    function descriptionValidation(input){

        if(input.value == ""){
            input.classList.add('invalid');
            input.placeholder = "Este campo es obligatorio"
            description.style.backgroundColor = "red";
            errors[input.name] = `${input.name} is required`
        }else{
            input.classList.remove('invalid');
            delete errors[input.name]
        }
    }

    function imageValidation(input){
        if(input.value != ""){
            let fileName = input.value;
            let extension = fileName.substring(fileName.lastIndexOf('.') + 1);
            if(!['PNG', 'JPG', 'JPEG', 'GIF'].includes(extension.toUpperCase())){ //Formato invalido
                if(document.querySelector('.image-format-message')){
                    document.querySelector('.image-format-message').style.color = 'FireBrick';
                    document.querySelector('.image-format-message').innerText = "Las extensiones validas son PNG, JPG, JPEG y GIF."
                }else{
                let node = document.createElement("P");
                let message = document.createTextNode("Las extensiones validas son PNG, JPG, JPEG y GIF.");
                node.style.color = 'FireBrick';
                node.classList.add('image-format-message')
                node.appendChild(message);
                document.querySelector('.img-container').appendChild(node);
            }
            }else{ // Formato valido
                if(document.querySelector('.image-format-message')){
                    document.querySelector('.image-format-message').style.color = 'MediumSeaGreen';
                    document.querySelector('.image-format-message').innerText = "Archivo cargado correctamente."
                }else{
                    let node = document.createElement("P");
                    let message = document.createTextNode("Archivo cargado correctamente.");
                    node.style.color = 'MediumSeaGreen';
                    node.classList.add('image-format-message')
                    node.appendChild(message);
                    document.querySelector('.img-container').appendChild(node);
                }
            }
        }
    }

    function validateName(){
        nameValidation(name);
    }
/*
    function validateCategory(){
        categoryValidation(category);
    }
*/
    function validatePrice(){
        priceValidation(price);
    }

    function validateDescription(){
        descriptionValidation(description);
    }

    function validateImg(){
        imageValidation(productImg)
    }

    name.addEventListener('blur', () => validateName())
    /*
    category.addEventListener('blur', () => validateCategory())
    */
    price.addEventListener('blur', () => validatePrice())

    description.addEventListener('blur', () => validateDescription())
    productImg.addEventListener('change', () => validateImg())
    
}