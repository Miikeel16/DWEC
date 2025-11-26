function enviarFormulario() {
    const nombre = document.getElementById("nombre")
    const apellido = document.getElementById("apellido")
    const fechaNacimiento = document.getElementById("fecha")
    const tipoDocumento = document.getElementById("tipoDocumento")
    const documento = document.getElementById("documento")
    const contrasena = document.getElementById("contrasena")
    const repetirContrasena = document.getElementById("repetirContrasena")
    const correo = document.getElementById("correo")
    const repetirCorreo = document.getElementById("repetirCorreo")
    const telefono = document.getElementById("telefono")
    const numeroSoporte = document.getElementById("soporte")
    const consentimiento = document.getElementById("acepta-declaracion").checked

    //ARRAY PARA AÑADIR ERRORES A CONTENEDOR
    const errores = [];

    //ERRORES DE CAMPO VACIO
    const datos = [nombre,apellido,fechaNacimiento,tipoDocumento,documento,contrasena,repetirContrasena,correo,repetirCorreo,telefono,numeroSoporte];

    for (let i = 0; i < datos.length; i++) {
        if(datos[i].value.trim()==""){
            let nombre=datos[i].id;
            errores.push('El campo "'+ nombre +'" es obligatorio.');
        }
    }

    //VALIDAR FECHA DE NACIMIENTO
    let fecha = new Date(fechaNacimiento.value);
    let hoy = new Date();

    let edad = hoy.getFullYear() - fecha.getFullYear()
    const mesDif = hoy.getMonth() - fecha.getMonth();
    const diaDif = hoy.getDate() - fecha.getDate();

    if (mesDif < 0 || (mesDif === 0 && diaDif < 0)) {
        edad--;
    }
    if (edad<18){
        errores.push('Debe ser mayor de 18 años');
    }

    //VALIDAR TIPO DOCUMENTO (DNI/NIE)
    if (tipoDocumento.value === "DNI") {

        const dniRegex = /^\d{8}[A-Za-z]$/;
        const letras = ["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"];

        if (!dniRegex.test(documento.value)) {
            errores.push('El Tipo de documento seleccionado en el registro es DNI. Revise los campos TIPO de documento y Documento.');
            errores.push('Si es un DNI, consta de 9 caracteres, 8 numéricos y una letra al final. Si su DNI tiene menos de 9 caracteres, complete con 0 a la izquierda.');
        } else {
            const numero = documento.value.slice(0, 8);
            const letraUsuario = documento.value.slice(8).toUpperCase();
            const indice = numero % 23;
            let letraCorrecta = "";

            for (let i = 0; i < letras.length; i++) {
                if (i === indice) {
                    letraCorrecta = letras[i];
                    break;
                }
            }

            if (letraUsuario !== letraCorrecta) {
                errores.push('El DNI no es válido.');
            }
        }
    } else {

        const nieRegex = /^[XYZ]\d{7}[A-Za-z]$/;
        const letras = ["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"];

        if (!nieRegex.test(documento.value)) {
            errores.push('El Tipo de documento seleccionado en el registro es NIE. Revise los campos TIPO de documento y Documento.');
            errores.push('Si es un NIE, debe comenzar por X, Y o Z, seguido de 7 números y una letra final.');
        } else {
            let primerChar = documento.value.slice(0, 1).toUpperCase();
            let numeroBase = "";

            switch (primerChar) {
                case 'X': numeroBase = "0"; break;
                case 'Y': numeroBase = "1"; break;
                case 'Z': numeroBase = "2"; break;
            }

            numeroBase += documento.value.slice(1, 8);

            const letraUsuario = documento.value.slice(8).toUpperCase();
            const indice = numeroBase % 23;
            let letraCorrecta = letras[indice];

            if (letraUsuario !== letraCorrecta) {
                errores.push('El NIE no es válido.');
            }
        }
    }

    //VALIDAR CONTRASEÑAS
    if (repetirContrasena.value !== contrasena.value) {
        errores.push('Las contraseñas no coinciden');
    }
    if (contrasena.value.length < 12) {
        errores.push('La contraseña debe tener más de 12 caracteres');
    }

    const numeros = /[0-9]/;
    const simbolos = /[!@#%^&*]/;
    if (!numeros.test(contrasena.value) || !simbolos.test(contrasena.value)) {
        errores.push('La contraseña debe contener al menos un número y un símbolo (!@#%^&*)');
    }

    //VALIDAR CORREO
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo.value.match(correoRegex)){
        errores.push('La dirección de correo electrónico no tiene un formato correcto.');
    }
    if(repetirCorreo.value!=correo.value){
        errores.push('Los correos no coinciden')
    }

    //VALIDAR TELÉFONO
    if(telefono.value.length<9){
        errores.push('El telefono debe tener al menos 9 numeros');
    }
    const telefonoRegex = /^[6-9\+]\d*$/;

    if(!telefonoRegex.test(telefono.value)){
        errores.push('El telefono debe de empezar por 6, 7, 8, 9 o "+"');
    }

    //VALIDAR CONSENTIMIENTO (DECLARACIONES)
    if (!consentimiento){
        errores.push('Debe dar su consentimiento, en el apartado "DECLARACIONES", al tratamiento de sus datos de carácter personal.');
    }

    //CONTENEDOR DE ERRORES

    // Recojemos el contenedor de errores hecho en HTML
    const contenedor = document.getElementById("contenedor-errores");

    // Si hay errores en el array
    if (errores.length > 0) {
        // Muestra el contenedor (estaba oculto con display:none)
        contenedor.style.display = "block";

        // Inserta dentro del contenedor una lista con todos los errores
        // Cada error se mete como <li> y se construye automaticamente con map()
        contenedor.innerHTML = `<strong>Errores</strong><ul>${errores.map(e => `<li>${e}</li>`).join('')}</ul>`;

    } else {

        // Si no hay errores, oculta el contenedor
        contenedor.style.display = "none";

        // Muestra una ventana de confirmación al usuario
        const confirmar = confirm("¿Desea enviar el formulario?");

        // Si el usuario pulsa "Cancelar", se detiene la ejecucion aquí
        if (!confirmar) {
            return; // Cancela el envío del formulario
        }

        // Si confirma, muestra un mensaje de enviado
        alert("Formulario enviado correctamente");

        // Envía el formulario al servidor
        document.querySelector("form").submit();
    }


}
