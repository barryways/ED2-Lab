import AVLTree from "../common/avltree.js";
const tree = new AVLTree();

function InsertData(person) {
  try {
    tree.insertNode(person);
    return true;
  } catch (error) {
    return console.log("Dato no insertado por " + error);
  }
}

function DeleteData(person) {
  try {
    return tree.deleteNode(person);
    // console.log('Dato Eliminado correctamente');
  } catch (error) {
    return console.log("Dato no eliminado por " + error);
  }
}

function PatchData(person) {
  try {
    if(tree.patch(person)!== null){
      return true
    }
    return console.log(`No se encontro nada`);
    //console.log(`Esto devuelve ${tree.search(dpi)}`);
  } catch (error) {
    console.log("Error durante la búsqueda:", error);
  }
}

function PreOrder() {
  try {
    console.log(tree.preOrder());
  } catch (error) {
    console.log("Error durante el preorder:", error);
  }
}


export { InsertData, DeleteData, PatchData, PreOrder };
