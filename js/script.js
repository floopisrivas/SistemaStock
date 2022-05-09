
function login(){
    var user, pass;

    user = document.getElementById("usuario").value;
    pass = document.getElementById("contraseña").value;
    
    if(user == "administrador" && pass == "2580" ){
        var URL="index.html";
        this.location.href=URL; 
    } 
    else{

     if(user == "vendedor" && pass == "2581"){

        var URL="bienvenidoUsser.html";
        this.location.href=URL;
    }
        else
        {
        alert("Error, intente de nuevo");
        }
    }
}

