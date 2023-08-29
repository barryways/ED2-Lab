
class operations{

  constructor(tree){
    this.tree = tree;
  }

  InsertData(person) {
    try {
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
      if(this.tree.exportToJSONLFile(path)){
        return true;
      }
      
      return false;

    } catch (error) {
      console.log("Error durante la conversion del JSONL:", error);
    }
  }
}



export default operations;
