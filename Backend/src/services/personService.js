class personService {
  constructor() {
    
  }
  getPerson() {
    const path = "./src/data/input.csv";
    if (csvParser(path)) {
      const records = csvParser(path);
      for (const record of records) {
        processLine(record);
      }
      PreOrder();
    } else {
      console.log("Error al cargar el archivo");
    }
  }
    insertPerson(person) {
        try {
        tree.insertNode(person);
        return true;
        } catch (error) {
        return console.log("Dato no insertado por " + error);
        }
    }
    deletePerson(person) {
        try {
        return tree.deleteNode(person);
        } catch (error) {
        return console.log("Dato no eliminado por " + error);
        }
    }
    patchPerson(person) {
        try {
        if (tree.patch(person) !== null) {
            return true;
        }
        } catch (error) {
        console.log("Error durante la búsqueda:", error);
        }
    }
    preOrder() {
        try {
        tree.preOrder();
        } catch (error) {
        console.log("Error durante el preorder:", error);
        }
    }
}
