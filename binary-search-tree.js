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

    buildTree(array) {
        //sort array + filter duplicates
        array = [...new Set(array)].sort((a, b) => a - b);
        
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
    
        return buildTreeHelper(0, array.length-1);
    }
}

function prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) return;
    if (node.right !== null) prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

let myTree = new BST();

// let arr = [1, 2, 3, 4, 5, 6, 7];
let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

myTree.root = myTree.buildTree(arr, 0, arr.length-1);

prettyPrint(myTree.root);