import coder from "../util/decoder.js";
const Coder = new coder
class operations {
  constructor(tree) {
    this.tree = tree;
  }

  InsertData(person) {
    try {
      person.companies = Coder.codificacion_persona(person);
      this.tree.insertNode(person);
      return this.tree;
    } catch (error) {
      return console.log("Dato no insertado por " + error);
    }
  }

  DeleteData(person) {
    try {
      this.tree.deleteNode(person);
      return this.tree;
    } catch (error) {
      return console.log("Dato no eliminado por " + error);
    }
  }

  PatchData(person) {
    try {
      if (this.tree.patch(person) !== null) {
        this.tree.patch(person);
        return this.tree;
      }
    } catch (error) {
      console.log("Error durante la búsqueda:", error);
    }
  }

  PreOrder() {
    try {
      this.tree.preOrder();
      return this.tree;
    } catch (error) {
      console.log("Error durante el preorder:", error);
    }
  }
  getJSONL(path) {
    try {
      if (this.tree.exportToJSONLFile(path)) {
        return true;
      }

      return false;
    } catch (error) {
      console.log("Error durante la conversion del JSONL:", error);
    }
  }

  searchByName(name) {
    try {
      const result = this.tree.searchByName(name);
      return result;
    } catch (error) {
      console.log("Error durante la búsqueda:", error);
    }
  }
  searchByDpi(dpi) {
    try {
      const result = this.tree.searchByDpi(dpi);
      if(this.tree.searchByDpi(dpi) !== null){
        return result;
      }
      return result;
    } catch (error) {
      console.log("Error durante la búsqueda:", error);
    }
  }
  searchByNameDpi(dpi, name) {
    try {
      const result = this.tree.searchByDpi(dpi);
      if(this.tree.searchByDpi(dpi) !== null){
        if(result[0] != name)  {
            return "No coincide el nombre con el DPI"
        }
        return result;
      }
      return result;
    } catch (error) {
      console.log("Error durante la búsqueda:", error);
    }
  }
  deleteByNameDpi(name, dpi){
    try {
      const result = this.tree.searchByDpi(dpi)
      this.tree.deleteNode(result);
      return result;
    } catch (error) {
      console.log(`Se obtuvo este error ${error}`);
    }
  }
}

export default operations;
