class TreeNode {
  constructor() {
    this.keys = []; // Array para almacenar las keys (en este caso, valores de dpi)
    this.values = []; // Array para almacenar los valores (los datos en formato JSON)
    this.children = []; // Array para almacenar los nodos hijos
  }
}

class BTree {
  constructor(degree) {
    this.root = new TreeNode();
    this.degree = degree;
  }

  insert(key, value) {
    if (this.root.keys.length === 2 * this.degree - 1) {
      const newRoot = new TreeNode();
      newRoot.children.push(this.root);
      this.splitChild(newRoot, 0);
      this.root = newRoot;
    }
    this.insertNonFull(this.root, key, value);
  }

  insertNonFull(node, key, value) {
    let i = node.keys.length - 1;
    if (node.children.length === 0) {
      while (i >= 0 && key < node.keys[i]) {
        i--;
      }
      node.keys.splice(i + 1, 0, key);
      node.values.splice(i + 1, 0, value);
    } else {
      while (i >= 0 && key < node.keys[i]) {
        i--;
      }
      i++;
      if (node.children[i].keys.length === 2 * this.degree - 1) {
        this.splitChild(node, i);
        if (key > node.keys[i]) {
          i++;
        }
      }
      this.insertNonFull(node.children[i], key, value);
    }
  }

  splitChild(parent, index) {
    const degree = this.degree;
    const child = parent.children[index];
    const newChild = new TreeNode();
    parent.children.splice(index + 1, 0, newChild);
    parent.keys.splice(index, 0, child.keys[degree - 1]);
    parent.values.splice(index, 0, child.values[degree - 1]);
    newChild.keys = child.keys.splice(degree, degree - 1);
    newChild.values = child.values.splice(degree, degree - 1);
    newChild.children = child.children.splice(degree, degree);
  }
  search(key) {
    return this.searchNode(this.root, key);
  }

  searchNode(node, key) {
    let i = 0;
    while (i < node.keys.length && key > node.keys[i]) {
      i++;
    }

    if (i < node.keys.length && key === node.keys[i]) {
      return node.values[i];
    } else if (node.children.length > 0) {
      return this.searchNode(node.children[i], key);
    } else {
      return null;
    }
  }

  delete(key) {
    if (!this.root) {
      return;
    }

    this.deleteKey(this.root, key);

    if (this.root.keys.length === 0 && this.root.children.length > 0) {
      this.root = this.root.children[0];
    }
  }

  deleteKey(node, key) {
    if (node && node.keys) {
      const index = node.keys.findIndex((k) => k === key);
      if (index !== -1) {
        if (node.children.length === 0) {
          node.keys.splice(index, 1);
          node.values.splice(index, 1);
        } else {
          // Handle deletion when node has children
          if (node.children[index].keys.length >= this.degree) {
            const predecessor = this.findPredecessor(node.children[index]);
            node.keys[index] = predecessor.key;
            node.values[index] = predecessor.value;
            this.deleteKey(node.children[index], predecessor.key);
          } else if (node.children[index + 1].keys.length >= this.degree) {
            const successor = this.findSuccessor(node.children[index + 1]);
            node.keys[index] = successor.key;
            node.values[index] = successor.value;
            this.deleteKey(node.children[index + 1], successor.key);
          } else {
            const merged = this.mergeNodes(
              node.children[index],
              node.children[index + 1]
            );
            node.keys.splice(index, 1);
            node.values.splice(index, 1);
            node.children.splice(index + 1, 1);
            this.deleteKey(merged, key);
          }
        }
      } else if (node.children.length > 0) {
        const childIndex = node.keys.findIndex((k) => key < k);
        if (
          node.children[childIndex] &&
          node.children[childIndex].keys !== undefined
        ) {
          if (node.children[childIndex].keys.length < this.degree - 1) {
            this.fixUnderflow(node, childIndex);
          }
        }
        this.deleteKey(node.children[childIndex], key);
      }
    }
  }
  // Helper methods for deletion
  findPredecessor(node) {
    while (node.children.length > 0) {
      node = node.children[node.children.length - 1];
    }
    return {
      key: node.keys[node.keys.length - 1],
      value: node.values[node.keys.length - 1],
    };
  }

  findSuccessor(node) {
    while (node.children.length > 0) {
      node = node.children[0];
    }
    return { key: node.keys[0], value: node.values[0] };
  }

  mergeNodes(left, right) {
    const merged = new TreeNode();
    merged.keys = left.keys.concat(right.keys);
    merged.values = left.values.concat(right.values);
    merged.children = left.children.concat(right.children);
    return merged;
  }

  fixUnderflow(parent, index) {
    const degree = this.degree;
    const leftSibling = parent.children[index - 1];
    const rightSibling = parent.children[index + 1];
    const currentNode = parent.children[index];

    // Try to borrow from the right sibling
    if (rightSibling && rightSibling.keys.length > degree - 1) {
      const borrowedKey = rightSibling.keys.shift();
      const borrowedValue = rightSibling.values.shift();
      currentNode.keys.push(parent.keys[index]);
      currentNode.values.push(parent.values[index]);
      parent.keys[index] = borrowedKey;
      parent.values[index] = borrowedValue;

      if (rightSibling.children.length > 0) {
        const borrowedChild = rightSibling.children.shift();
        currentNode.children.push(borrowedChild);
      }
    }
    // Try to borrow from the left sibling
    else if (leftSibling && leftSibling.keys.length > degree - 1) {
      const borrowedKey = leftSibling.keys.pop();
      const borrowedValue = leftSibling.values.pop();
      currentNode.keys.unshift(parent.keys[index - 1]);
      currentNode.values.unshift(parent.values[index - 1]);
      parent.keys[index - 1] = borrowedKey;
      parent.values[index - 1] = borrowedValue;

      if (leftSibling.children.length > 0) {
        const borrowedChild = leftSibling.children.pop();
        currentNode.children.unshift(borrowedChild);
      }
    }
    // Merge with a sibling
    else if (rightSibling) {
      const merged = this.mergeNodes(currentNode, rightSibling);
      currentNode.keys.push(parent.keys[index]);
      currentNode.values.push(parent.values[index]);
      parent.keys.splice(index, 1);
      parent.values.splice(index, 1);
      parent.children.splice(index + 1, 1, merged);
    } else if (leftSibling) {
      const merged = this.mergeNodes(leftSibling, currentNode);
      parent.keys.splice(index - 1, 1);
      parent.values.splice(index - 1, 1);
      parent.children.splice(index, 1, merged);
    }
  }

  traverseAndConcatJSONL(node) {
    let result = "";
    if (node) {
      for (let i = 0; i < node.keys.length; i++) {
        if (i > 0 || result !== "") {
          result += "\n"; // Add newline before each JSON object (except the first)
        }

        result += JSON.stringify(node.values[i]); // Append the JSON object

        if (node.children.length > i) {
          result += this.traverseAndConcatJSONL(node.children[i]);
        }
      }
      if (node.children.length > node.keys.length) {
        result += this.traverseAndConcatJSONL(
          node.children[node.keys.length]
        );
      }
    }
    return result;
  }


  // Method to get all data in JSONL format
  getAllDataJSONL() {
    return this.traverseAndConcatJSONL(this.root, "");
  }


}
export default BTree;
