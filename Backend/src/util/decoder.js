export default class coder{
    constructor(){

    }
    texto_codificacion(array){
        let dpiEmpresa= ""
        dpiEmpresa += array[1] + "_";
        for (let index = 0; index < array.length; index++) {
            const element = array[4][index];
            const textoSinEspacios = element.split(' ').join('');
            dpiEmpresa += textoSinEspacios + ',';
        }
        return dpiEmpresa;
    }

}