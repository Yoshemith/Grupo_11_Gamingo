window.onload = function() {
    let errores = {};
    let lastEmailValue = "";
    let formulario = document.querySelector('.login-form');
    let email = document.querySelector('#correo');
    let password = document.querySelector('#contraseña');
    
    email.focus();

    function emailValidation(input){
        const inputName = input.name;
        const result = /\S+@\S+\.\S+/.test(input.value)

        if(input.value === ""){
            input.classList.add('invalid');
            input.placeholder = "Este campo es obligatorio";
            email.style.backgroundColor = "red";
            errores[inputName] = `${inputName} is required`
        }else if(!result) {
            input.classList.add('invalid');
            input.placeholder = "El correo ingresado no es valido"
            email.style.backgroundColor = "red";
            errores[input.name] = `${input.Name} is not an email`
        } else {
            input.classList.remove('invalid');
            lastEmailValue = input.value;
            delete errores[input.name] 
        }

    }

    function passwordValidation(input){
        const inputName = input.name;
        
        if(input.value == ""){
            input.classList.add('invalid');
            input.placeholder = "Este campo es obligatorio";
            password.style.backgroundColor = "red";
            errores[inputName] = `${inputName} is required`
        }else{
            input.classList.remove('invalid');
            delete errores[inputName]
        }
    }


    function validateEmail() {
        emailValidation(email);
    }

    function validatePassword() {
        passwordValidation(password);
    }

    function validateForm() {
        validateEmail()
        validatePassword()
    }

    email.addEventListener("blur", function(){
        validateEmail()
    })
    email.addEventListener("focus", () => {
        email.value = lastEmailValue;
    })
            
    password.addEventListener("blur", function(){
        validatePassword()
    })

    formulario.addEventListener("submit", function(e) {

        validateForm()
        
        if(Object.keys(errores).length) {
            e.preventDefault();
            console.log(errores)
        } 
    })
}