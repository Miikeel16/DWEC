function ej1(producto, iva) {
    return producto + iva
}
function ej2(lado) {
    let perimetro= lado*4
    let area= lado*lado
    console.log("Perimetro: "+perimetro+"Lado: "+lado)
}
function ej3(num1, num2) {
    let cociente= num1/num2 
    if (cociente=0){
        console.error
    }else{
        console.log(cociente)
    }
}
function ej4(num1, num2) {
    if (num1>num2){
        let dif= num1-num2
    }else{
        dif = num2-num1
    }
    return dif
}
function ej5(cantidad, precio) {
    if (cantidad>10 && precio >40)
        return precio*15%100
}
function ej6() {
    console.log("Dame un numero entre 1 y 5: ")
    let num = Number(prompt("Dame un número entre 1 y 5: "));
    while (num>5 || num < 1){
        console.log("El numero ",num," no esta entre el 1 y el 5")
        num= Number(prompt("Vuelve a introducirlo"))
    }
    console.log("Gracias")
}
function ej7() {
    let aux=2
    console.log("Dame un numero: ")
    let num = Number(prompt("Dame un número: "));
    while(num % aux !=0 ){
        aux++
    }
    if(num==aux){
        console.log("Es primo")
    }else{
        console.log("No es primo")

    }
    console.log("Gracias")
}
function ej8() {
    console.log("Dame un numero: ")
    let num = Number(prompt("Dame un número: "));
    let min=Infinity
    let max=-Infinity
    while(num!=0){
        if (num > 0){
            if(num>max){
                max=num
            }
            if(num<min){
                min=num
            }
        }else{
            alert("El numero debe de ser positivo")
        }
        
        num = Number(prompt("Dame un número: "));
    }
    console.log("Mas grande: ",max)
    console.log("Mas pequeño ",min)
    console.log("Gracias")
}
function ej9() {
    const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    let num = Number(prompt("Introduce un número entre 0 y 6:"));
    console.log("El día de la semana es:", dias[num]);
    alert("El día de la semana es: " + dias[num]);
}
//EJ 10
function sumaLista(arr) {
    let suma = 0;
    for (let i = 0; i < arr.length; i++) {
        suma += arr[i];
    }
    return suma;
}
function ej11(letra) {
    letra=letra.toUpperCase();
    let vocales= ['A','E','I','O','U']
    return vocales.includes(letra)
}
function ej12(arr) {
  return arr.join("-");
}
function ej13(nombreProducto) {
    for (let i = 0; i < productos.length; i++) {
        if (productos[i][0] === nombreProducto) {
      return productos[i][1];
        }
    }
    return "Producto no encontrado";
}