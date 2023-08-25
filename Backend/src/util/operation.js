import AVLTree from "../common/avltree.js";
const tree = new AVLTree();

function InsertData(person){
    try {
        return tree.insertNode(person);
        //return console.log('Dato insertado correctamente');
    } catch (error) {
        return console.log('Dato no insertado por '+error)
    }

}

function DeleteData(person){
    try {
        return tree.deleteNode(person)
        // console.log('Dato Eliminado correctamente');
    } catch (error) {
        return console.log('Dato no eliminado por '+error)
    }

}

function PatchData(person) {
    try {
      const foundNode = tree.search(person);
      if (foundNode !== undefined) {
        console.log('Dato ubicado correctamente', foundNode);
      } else {
        //console.log('Dato no encontrado');
      }
    } catch (error) {
      console.log('Error durante la búsqueda:', error);
    }
  }

export {InsertData,DeleteData,PatchData}

