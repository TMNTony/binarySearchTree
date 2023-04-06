import "./style.css";
import Node from "./node.js";



class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  function buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;
  
    const mid = parseInt((start + end) / 2);
    const root = Node(array[mid]);
  
    root.left = buildTree(array, start, mid - 1);
    root.right = buildTree(array, mid + 1, end);
  
    return root;
  }
}
