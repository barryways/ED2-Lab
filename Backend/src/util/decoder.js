import array_log_writer from "../util/logWriter.js";
import lz78 from "../common/lz78.js";
const LZ78 = new lz78();
export default class coder {
  constructor() {}
  texto_codificacion(array) {
    try {
      let dpiEmpresa = "",
        codificadoEmpresas = [],
        verification = true;

      dpiEmpresa += array[1] + "_";
      console.log(dpiEmpresa);
      const codificado_empresa = this.codificacion_por_empresa(
        dpiEmpresa,
        array[4]
      );
      console.log(codificado_empresa);
      let contador = 0;
      codificado_empresa.forEach((element) => {
        const texto_comprimido = LZ78.compress(element);
        const texto_descomprimido = LZ78.decompress(texto_comprimido);
        array_log_writer(
          `El texto comprimido es: \'${texto_comprimido}\'\nPara el texto descomprimido \'${texto_descomprimido}\'`
        );
      });

      if (verification) {
        return "codificacion perfecta";
      } else {
        return "codificacion con errores";
      }
    } catch (error) {
      return error;
    }
  }

  codificacion_por_empresa(dpiEmpresa, companies) {
    try {
      const result = [];
      for (let index = 0; index < companies.length; index++) {
        let dpi_solitario = dpiEmpresa;
        const element = companies[index];
        const textoSinEspacios = element.split(" ").join("_");
        result.push((dpi_solitario += textoSinEspacios + " "));
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
