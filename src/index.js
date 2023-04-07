import "./style.css";
import Node from "./node.js";

class Tree {
  constructor(array) {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let tree = this.root;

    while (true) {
      if (value < tree.value) {
        if (!tree.left) {
          tree.left = newNode;
          return this;
        }
        tree = tree.left;
      } else {
        if (!tree.right) {
          tree.right = newNode;
          return this;
        }
        tree = tree.right;
      }
    }
    return this;
  }

  lookup(value) {
    if (!this.root) {
      return false;
    }
  }
}

const tree = new Tree();

tree.insert(1);
tree.insert(6);
