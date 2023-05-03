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
    this.array = [...removeDuplicates(mergeSort(array))];
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
    if (root === null) return "No";
    const lefthalf = root.left;
    const righthalf = root.right;

    if (Math.abs(this.height(lefthalf) - this.height(righthalf)) > 1) {
      return "No";
    }
    return "Yes";
  }

  rebalance() {
    if (this.isBalanced(this.root)) return this.root;

    let rebalancedArray = [];
    rebalancedArray = this.traverse(this.root, rebalancedArray);

    const balancedTree = new Tree(rebalancedArray);
    prettyPrint(balancedTree.root);
    console.log("Is the tree balanced? ", balancedTree.isBalanced());
    return balancedTree.root;
  }

  traverse(root, array) {
    if (array !== undefined) array.push(root.data);
    if (root.left !== null) {
      this.traverse(root.left, array);
    }

    if (root.right !== null) {
      this.traverse(root.right, array);
    }
    return array;
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

function mergeSort(inputArray) {
  if (inputArray.length == 1) return inputArray;

  const newArray = [];

  const left = mergeSort(inputArray.slice(0, inputArray.length / 2));
  const right = mergeSort(inputArray.slice(inputArray.length / 2));

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      newArray.push(left.shift());
    } else {
      newArray.push(right.shift());
    }
  }

  return [...newArray, ...left, ...right];
}

function removeDuplicates(inputArray) {
  return [...new Set(inputArray)];
}

const testInputArray = [1, 2, 3, 4, 5, 6, 7];
const balancedBST = new Tree(testInputArray);
balancedBST.insert(8);
balancedBST.insert(9);
balancedBST.delete(3);
console.log(balancedBST.find(8));
balancedBST.levelorder();
balancedBST.inorder();
balancedBST.preorder();
balancedBST.postorder();
console.log("Tree Height...", balancedBST.height());
console.log("Tree Depth...", balancedBST.depth(7));
console.log("Is the tree balanced??...", balancedBST.isBalanced());
console.log("Rebalancing the tree!...", balancedBST.rebalance());
