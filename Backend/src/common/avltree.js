// node class
class Node {
  constructor(item) {
    this.item = item;
    this.keyDPI = null;
    this.keyName = null;
    this.height = 1;
    this.left = null;
    this.right = null;
  }
}
//AVL Tree class
class AVLTree {
  constructor() {
    this.root = null;
  }
  height(N) {
    if (N === null) {
      return 0;
    }
    return N.height;
  }
  rightRotate(y) {
    let x = y.left;
    let T2 = x.right;
    x.right = y;
    y.left = T2;
    y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
    x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
    return x;
  }
  leftRotate(x) {
    let y = x.right;
    let T2 = y.left;
    y.left = x;
    x.right = T2;
    x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
    y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
    return y;
  }

  getBalanceFactor(N) {
    if (N == null) {
      return 0;
    }

    return this.height(N.left) - this.height(N.right);
  }

  insertNodeHelper(node, item) {
    // find the position and insert the node
    if (node === null) {
      return new Node(item);
    }

    if (item.dpi < node.item.dpi) {
      node.left = this.insertNodeHelper(node.left, item);
    } else if (item.dpi > node.item.dpi) {
      node.right = this.insertNodeHelper(node.right, item);
    } else {
      return node;
    }

    // update the balance factor of each node
    // and, balance the tree
    node.height = 1 + Math.max(this.height(node.left), this.height(node.right));

    let balanceFactor = this.getBalanceFactor(node);

    if (balanceFactor > 1) {
      if (item.dpi < node.left.item.dpi) {
        return this.rightRotate(node);
      } else if (item.dpi > node.left.item.dpi) {
        node.left = this.leftRotate(node.left);
        return this.rightRotate(node);
      }
    }

    if (balanceFactor < -1) {
      if (item.dpi > node.right.item.dpi) {
        return this.leftRotate(node);
      } else if (item.dpi < node.right.item.dpi) {
        node.right = this.rightRotate(node.right);
        return this.leftRotate(node);
      }
    }

    return node;
  }
  insertNode(item) {
    //console.log(item);
    this.root = this.insertNodeHelper(this.root, item);
  }

  //get node with minimum value
  nodeWithMimumValue(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  // delete helper
  deleteNodeHelper(root, item) {
    // find the node to be deleted and remove it
    if (root == null) {
      return root;
    }
    if (item.dpi < root.item.dpi) {
      root.left = this.deleteNodeHelper(root.left, item);
    } else if (item.dpi > root.item.dpi) {
      root.right = this.deleteNodeHelper(root.right, item);
    } else {
      if (root.left === null || root.right === null) {
        let temp = null;
        if (temp == root.left) {
          temp = root.right;
        } else {
          temp = root.left;
        }

        if (temp == null) {
          temp = root;
          root = null;
        } else {
          root = temp;
        }
      } else {
        let temp = this.nodeWithMimumValue(root.right);
        root.item = temp.item;
        root.right = this.deleteNodeHelper(root.right, temp.item);
      }
    }
    if (root == null) {
      return root;
    }

    // Update the balance factor of each node and balance the tree
    root.height = Math.max(this.height(root.left), this.height(root.right)) + 1;

    let balanceFactor = this.getBalanceFactor(root);
    if (balanceFactor > 1) {
      if (this.getBalanceFactor(root.left) >= 0) {
        return this.rightRotate(root);
      } else {
        root.left = this.leftRotate(root.left);
        return this.rightRotate(root);
      }
    }
    if (balanceFactor < -1) {
      if (this.getBalanceFactor(root.right) <= 0) {
        return this.leftRotate(root);
      } else {
        root.right = this.rightRotate(root.right);
        return this.leftRotate(root);
      }
    }
    return root;
  }

  //delete a node
  deleteNode(item) {
    this.root = this.deleteNodeHelper(this.root, item);
  }

  // print the tree in pre - order
  preOrder() {
    return this.preOrderHelper(this.root);
  }

  preOrderHelper(node) {
    if (node) {
      console.log(node.item);
      this.preOrderHelper(node.left);
      this.preOrderHelper(node.right);
    }
  }

  search(person) {
    return this.searchNodeHelper(this.root, person);
  }

  searchNodeHelper(node, person) {
    if (node === null || node.item.dpi === person.dpi) {
      return node ? node.item.dpi : null;
    }
    if (person.dpi < node.item.dpi) {
      return this.searchNodeHelper(node.left, person);
    } else {
      return this.searchNodeHelper(node.right, person);
    }
  }

  patch(person) {
    try {
      var persona = this.patchNodeHelper(this.root, person);
      persona.item.name = person.name;
      persona.item.dpi = person.dpi;
      persona.item.datebirth = person.datebirth;
      persona.item.address = person.address;
      return true;
    } catch (error) {
      return false;
    }
  }
  patchNodeHelper(node, person) {
    if (node === null || node.item.dpi === person.dpi) {
      return node ? node : null;
    }
    if (person.dpi < node.item.dpi) {
      return this.patchNodeHelper(node.left, person);
    } else {
      return this.patchNodeHelper(node.right, person);
    }
  }
}

export default AVLTree;
