module.exports = function getTerminalArguments(data) {
    let result = '';

    delete data['$0'];

    if(data._.length === 0 & Object.keys(data).length === 1){
        result = 'No hay argumentos de entrada';
    }

    const dataWithoutAtribute =[...data._];
    dataWithoutAtribute.forEach((x) => {
        result = result + x + ' ';
    });

    delete data._;
    const  arrOfDataWithArguments = Object.entries(data);

    arrOfDataWithArguments.forEach((x) => {
        
        let atributte = x[0];
        let value = x[1]
        if(atributte.length === 1){
            atributte = '-' + atributte;
        }else{
            atributte = '--' + atributte;
        }
        result = result + atributte + ' ' + value + ' ';
    });
    return result;

}