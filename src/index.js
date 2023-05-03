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

    if (root == null) return;

    queue.push(root);

    while (queue.length > 0) {
      const current = queue.shift(root);
      result.push(current.data);

      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }
    console.log(`level order ${result}`);
  }

  inorder(root = this.root) {
    if (root) {
      this.inorder(root.left);
      console.log(root.data);
      this.inorder(root.right);
    }
  }

  preorder(root = this.root) {
    if (root) {
      console.log(root.data);
      this.preorder(root.left);
      this.preorder(root.right);
    }
  }

  postorder(root = this.root) {
    if (root) {
      this.postorder(root.left);
      this.postorder(root.right);
      console.log(root.data);
    }
  }

  height(root = this.root) {
    if (!root) {
      return 0;
    }
    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(nodeVal, root = this.root, edgeCount = 1) {
    if (root === null) return;
    if (root.data === nodeVal) return edgeCount;

    if (root.data < nodeVal) {
      return this.depth(nodeVal, root.right, (edgeCount + 1));
    }
    return this.depth(nodeVal, root.left, (edgeCount + 1));
  }

  isBalanced(root = this.root) {

  }

  rebalance() {

  }

  search(root = root.this, value) {
    if (!root) {
      return false;
    }
    if (root.data === value) {
      return true;
    } if (value < root.data) {
      return this.search(root.left, value);
    }
    return this.search(root.right, value);
  }
}

const testInputArray = [1, 2, 4, 5, 6, 7, 8, 9];
const balancedBST = new Tree(testInputArray);
balancedBST.find(2);
balancedBST.levelorder();
// balancedBST.inorder();
// balancedBST.preorder();
balancedBST.postorder();
console.log("Tree Height...", balancedBST.height());
console.log("Tree Depth...", balancedBST.depth(9));
