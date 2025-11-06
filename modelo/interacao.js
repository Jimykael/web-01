function calcular(){
    let n1 = Number(document.getElementById("num1").value);
    let n2 = Number(document.getElementById("num2").value);

    let texto = document.getElementById("txtresultado");

    

    texto.innerHTML = "<br>soma: "+(n1+n2);
    texto.innerHTML += "<br>subtração "+ (n1-n2);
    texto.innerHTML += "<br>divisão "+ (n1/n2);
    texto.innerHTML += "<br>multiplicação "+ (n1*n2);
    texto.innerHTML += "<br>potencia"+ (n1**n2);
    texto.innerHTML += "<br>Resto da divisão"+ (n1%n2);
}