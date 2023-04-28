import "./style.css";
import node from "./node.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

class Tree {
  constructor(array) {
    this.root = this.buildTree(array, 0, array.length - 1);
    prettyPrint(this.root);
  }

  buildTree(array, start, end) {
    if (start > end) return null;

    const mid = parseInt((start + end) / 2);
    const root = new node(array[mid]);

    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);
    return root;
  }

  insert(value, root = this.root) {
    if (root == null) {
      return (root = new node(value));
    }

    if (root.data < value) {
      root.right = this.insert(value, root.right);
    } else {
      root.left = this.insert(value, root.left);
    }
    prettyPrint(this.root);
    return root;
  }

  delete(value, root = this.root) {
    if (root == null) {
      return root;
    }

    if (root.data > value) {
      root.left = this.delete(value, root.left);
    } else if (root.data < value) {
      root.right = this.delete(value, root.right);
    } else {
      if (root.left == null) {
        return root.right;
      } if (root.right == null) {
        return root.left;
      }
      root.data = minValue(root);
      root.right = this.delete(root.right, root.data);
    }
    prettyPrint(this.root);
    return root;
  }

  find(value) {
    if (!this.root) {
      return false;
    }
    let tree = this.root;

    while (tree) {
      if (value < tree.value) {
        tree = tree.left;
      } else if (value > tree.value) {
        tree = tree.right;
      } else if (value === tree.value) {
        return tree;
      }
    }
    return false;
  }

  levelorder() {

  }

  inorder() {

  }

  preorder() {

  }

  postorder() {

  }

  height(node) {

  }

  depth(node) {

  }

  isBalanced() {

  }

  rebalance() {

  }
}

function minValue(root) {
  let min = root.data;
  while (root != null) {
    min = root.data;
    root = root.left;
  }
  return min;
}

const testInputArray = [1, 2, 3, 4, 5, 6, 7];
const balancedBST = new Tree(testInputArray);
balancedBST.delete(4);
