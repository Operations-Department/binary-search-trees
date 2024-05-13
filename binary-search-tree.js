class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  //create the tree from an array
  buildTree(array) {
    //sort array + filter duplicates
    let arrCopy = array.slice();
    arrCopy = [...new Set(array)].sort((a, b) => a - b);

    // Recursive helper function to build the tree
    function buildTreeHelper(start, end) {
      //base case
      if (start > end) return null;

      //set mid point and root node
      let mid = Math.floor((start + end) / 2);
      let root = new Node(array[mid]);

      //recursively go through each side
      root.left = buildTreeHelper(start, mid - 1);
      root.right = buildTreeHelper(mid + 1, end);

      return root;
    }

    return buildTreeHelper(0, arrCopy.length - 1);
  }

  //add new value/node to tree
  insert(value) {
    //create new node to be inserted
    const newNode = new Node(value);

    //if bst is empty insert as root
    if (!this.root) this.root = newNode;

    //start at the root
    let current = this.root;

    //traverse the bst until you get to the right spot
    while (true) {
      //prevent duplicates
      if (value === current.data) return;

      //if value is left than current node - go left
      if (value < current.data) {
        if (!current.left) {
          current.left = newNode; //insert new node
          break;
        }
        current = current.left;
      }

      //if value is greater than current node - go right
      else {
        if (!current.right) {
          current.right = newNode; //insert new node
          break;
        }
        current = current.right;
      }
    }
  }

  //removes the node with the given value while maintaining tree structure and rules
  deleteItem(value) {
    if (!this.root || value === undefined) return;

    let current = this.root;
    let prev = null;

    //find the node to be deleted
    while (current) {
      if (value === current.data) break;
      prev = current;
      if (value < current.data) current = current.left;
      else current = current.right;
    }

    //if the value is not found
    if (!current) return;

    //case 1: node to be deleted has no children
    if (!current.left && !current.right) {
      if (!prev) this.root = null; // deleting root node
      else if (prev.left === current) prev.left = null;
      else prev.right = null;
    }
    //case 2: node to be deleted has only one child
    else if (!current.left || !current.right) {
      const child = current.left || current.right;
      if (!prev) this.root = child; // deleting root node
      else if (prev.left === current) prev.left = child;
      else prev.right = child;
    }
    //case 3: node to be deleted has two children
    else {
      let fetcherParent = current;
      let fetcher = current.right;

      while (fetcher.left) {
        fetcherParent = fetcher;
        fetcher = fetcher.left;
      }

      // replace the data of current node with fetcher data
      current.data = fetcher.data;

      // delete the fetcher node
      if (fetcherParent === current) fetcherParent.right = fetcher.right;
      else fetcherParent.left = fetcher.right;
    }
  }

  find(value) {
    //tree doesn't exist
    if (!this.root) return;

    let current = this.root;

    while (current) {
      if (value === current.data) break; //node found - break out and return

      //traverse tree
      if (value < current.data) current = current.left;
      else current = current.right;
    }

    //node is either found or null
    return current;
  }

  //traverse the tree, process the value of each node from top to bottom
  levelOrder(callback) {
    if (!this.root) return [];
    //initialize queue
    let q = [this.root];
    let result = [];

    while (q.length) {
      //process first element in queue
      const node = q.shift();

      //process optional callback
      if (callback) callback(node);

      //record each element - ensure traversing properly
      result.push(node.data);

      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }

    return result;
  }

  //traverse the tree. process the values in order lowest to highest
  //node is processed after second visit
  inOrder(callback) {
    function traverse(node) {
      if (!node) return;

      traverse(node.left);
      if (callback) callback(node);
      result.push(node.data);
      traverse(node.right);
    }

    const result = [];
    traverse(this.root);
    return result;
  }

  //traverse the tree processing each value from top to bottom and left to right
  //node is processed after first visit
  preOrder(callback) {
    function traverse(node) {
        if (!node) return;

        if (callback) callback(node);
        result.push(node.data);
        traverse(node.left);
        traverse(node.right);
    }

    const result = [];
    traverse(this.root);
    return result;
  }

  //traverse the tree perimeter
  //node is processed on the third visit
  postOrder(callback) {
    function traverse(node) {
      if (!node) return;

      traverse(node.left);
      traverse(node.right);
      if (callback) callback(node);
      result.push(node.data);
    }

    const result = [];
    traverse(this.root);
    return result;
  }

  //find the called node and counts the edges to the furthest leaf 
  height(node) {
    node = this.find(node);
    if (!node) return 0;

    function traverse(node) {
      if (!node) return -1;

      let leftHeight = traverse(node.left);
      let rightHeight = traverse(node.right);
    
      return Math.max(leftHeight, rightHeight) + 1;
    }

    return traverse(node);
  }

  //returns edge count from called node to root
  depth(node) {
    if (!this.root) return -1;

    let current = this.root;
    let count = 0;

    while (current) {
      if (node === current.data) return count;

      if (node < current.data) current = current.left;
      else current = current.right;
      count++;
    }
  }

  //returns true if balanced, otherwise false
  isBalanced() {
    let root = this.root;
    if (root === null) return true;

    function totalHeight(root) {
      if (root === null) return 0;
      const leftHeight = totalHeight(root.left);
      const rightHeight = totalHeight(root.right);
      return Math.max(leftHeight, rightHeight) + 1;
    }

    const leftHeight = totalHeight(root.left);
    const rightHeight = totalHeight(root.right);
    const heightDiff = Math.abs(leftHeight - rightHeight);
    if (heightDiff > 1) return false;
    return new BST().isBalanced.call({ root: root.left }) && new BST().isBalanced.call({ root: root.right });
  }
 
  //balances an unbalanced tree
  rebalance() {
    if (!this.root) return -1;
    return this.root = this.buildTree(this.inOrder());
  }
}

//print visualization in console
function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null) return;
  if (node.right !== null)
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null)
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
}

let arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

let myTree = new BST();

myTree.root = myTree.buildTree(arr, 0, arr.length - 1);

console.log(myTree.isBalanced()); //true

myTree.deleteItem(10);
myTree.insert(110);
myTree.insert(120);
myTree.insert(130);
myTree.insert(140);
myTree.insert(150);
myTree.insert(160);

prettyPrint(myTree.root);
console.log(myTree.isBalanced()); //false

console.log(myTree.find(30));     //node{ data: 30, left: null, right: Node {...}}
console.log(myTree.levelOrder()); //[  50,  20,  80,  30,  60, 90,  40,  70, 100, 110, 120, 130, 140, 150, 160 ]
console.log(myTree.inOrder());    //[ 20,  30,  40,  50,  60, 70,  80,  90, 100, 110, 120, 130, 140, 150, 160 ]
console.log(myTree.preOrder());   //[ 50,  20,  30,  40,  80, 60,  70,  90, 100, 110, 120, 130, 140, 150, 160 ]
console.log(myTree.postOrder());  //[ 40,  30,  20,  70,  60, 160, 150, 140, 130, 120, 110, 100,  90,  80,  50 ]
console.log(myTree.height(80));   //8
console.log(myTree.depth(70));    //3

prettyPrint(myTree.rebalance());
console.log(myTree.isBalanced()); //true
