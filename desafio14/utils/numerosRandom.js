module.exports = function numerosRandom(cantidadNumeros) {
    cantidadNumeros = Number(cantidadNumeros);
    const numeros = {};

    for(let i = 0; i <= cantidadNumeros; i++){
        let num = Math.floor(Math.random() * (100 - 0 + 1) + 0);

        if(numeros[num]){
            numeros[num]++
        }else{
            numeros[num] = 1;
        }
    }
    return numeros;
}