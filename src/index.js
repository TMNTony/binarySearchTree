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

  minValue(root) {
    if (!root.left) {
      return root.data;
    }
    return this.minValue(root.left);
  }

  maxValue(root) {
    if (!root.right) {
      return root.data;
    }
    return this.maxValue(root.right);
  }

  delete(value) {
    this.root = this.deleteNode(this.root, value);
    prettyPrint(this.root);
  }

  deleteNode(root, value) {
    if (root === null) {
      return root;
    }
    if (value < root.data) {
      root.left = this.deleteNode(root.left, value);
    } else if (value > root.data) {
      root.right = this.deleteNode(root.right, value);
    } else {
      if (!root.left && !root.right) {
        return null;
      }
      if (!root.left) {
        return root.right;
      } if (!root.right) {
        return root.left;
      }
      root.data = this.minValue(root.right);
      root.right = this.deleteNode(root.right, root.data);
    }
    return root;
  }

  find(value, root = this.root) {
    if (root == null) return false;

    if (root.data === value) return root;

    if (root.data > value) {
      return this.find(value, root.left);
    } if (root.data < value) {
      return this.find(value, root.right);
    }
    prettyPrint(this.root);
    return root;
  }

  levelorder(root = this.root) {
    const queue = [];
    const result = [];

    if (root === null) return;

    queue.push(root);

    while (queue.length > 0) {
      const current = queue.shift(root);
      result.push(current.data);

      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }
  }

  inorder(root = this.root) {

  }

  preorder(root = this.root) {

  }

  postorder(root = this.root) {

  }

  height(root = this.root) {

  }

  depth(nodeVal, root = this.root, edgeCount = 0) {

  }

  isBalanced(root = this.root) {

  }

  rebalance() {

  }
}

const testInputArray = [1, 2, 3, 4, 5, 6, 7];
const balancedBST = new Tree(testInputArray);
balancedBST.find(2);
