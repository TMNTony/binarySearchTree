import "./style.css";
import node from "./node.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
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
}

//   insert(value) {
//     const newNode = new node(value);
//     if (!this.root) {
//       this.root = newNode;
//       return this;
//     }
//     let tree = this.root;

//     while (true) {
//       if (value < tree.value) {
//         if (!tree.left) {
//           tree.left = newNode;
//           return this;
//         }
//         tree = tree.left;
//       } else {
//         if (!tree.right) {
//           tree.right = newNode;
//           return this;
//         }
//         tree = tree.right;
//       }
//     }
//     return this;
//   }

//   delete(value) {

//   }

//   find(value) {
//     if (!this.root) {
//       return false;
//     }
//     let tree = this.root;

//     while (tree) {
//       if (value < tree.value) {
//         tree = tree.left;
//       } else if (value > tree.value) {
//         tree = tree.right;
//       } else if (value === tree.value) {
//         return tree;
//       }
//     }
//     return false;
//   }

//   levelorder() {

//   }

//   inorder() {

//   }

//   preorder() {

//   }

//   postorder() {

//   }

//   height(node) {

//   }

//   depth(node) {

//   }

//   isBalanced() {

//   }

//   rebalance() {

//   }
// }
const testInputArray = [1, 2, 3, 4, 5, 6, 7];
const balancedBST = new Tree(testInputArray);
