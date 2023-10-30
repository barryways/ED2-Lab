import array_log_writer from "../util/logWriter.js";
import lz78 from "../common/lz78.js";
const LZ78 = new lz78();
export default class coder {
  constructor() {}
  texto_decodificacion(codificado_empresa) {
    try {
      let dpiEmpresa = "",
      decodificadoEmpresas = [];
        
      codificado_empresa[4].forEach((element) => {
        const texto_comprimido = element;
        const texto_descomprimido = LZ78.decompress(element);
        array_log_writer(
          `El texto comprimido es: \'${texto_comprimido}\'\nPara el texto descomprimido \'${texto_descomprimido}\'`
        );
        decodificadoEmpresas.push(texto_descomprimido);
      });

      return decodificadoEmpresas;
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
  codificacion_persona(person) {
    try {
      const espacioVacio = "",
      codificadoEmpresas = [];
      person.companies.forEach(element => {
        let espacio_vacio = espacioVacio;
        const dpi_empresa = LZ78.compress(element += espacio_vacio);
      
        codificadoEmpresas.push(dpi_empresa)
      });
      return codificadoEmpresas;
    } catch (error) {
      return error;
    }
  }
  decodificadoEmpresas(codificado_empresa){
    try {
      let dpiEmpresa = "",
      decodificadoEmpresas = "";
        
      codificado_empresa[4].forEach((element) => {
        const texto_comprimido = element;
        const texto_descomprimido = LZ78.decompress(element);
        decodificadoEmpresas+=`${texto_descomprimido}, `;
      });
      return decodificadoEmpresas;
    } catch (error) {
      return error;
    }
  }

   decodificadoEmpresas_nombre(codificado_empresa) {
    try {
      for (let i = 0; i < codificado_empresa.length; i++) {
        let texto_descomprimido = codificado_empresa[i][4].map(LZ78.decompress).join(', ');
        codificado_empresa[i][4] = texto_descomprimido;
      }
      return codificado_empresa;
    } catch (error) {
      return error;
    }
  }
  
}
