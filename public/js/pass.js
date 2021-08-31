function funcionContraseña(){
    var tipo = document.getElementById("contraseña");
    if(tipo.type=="password"){
        tipo.type="text";
    }else{
        tipo.type="password";
    }
}
