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

    //remove value from tree
    deleteItem(value) {

        //tree doesn't exist
        if (!this.root) return;
        
        //start at root
        let current = this.root;
        let prev = null;

        //traverse down tree recursively
        while (current) {
            //found value
            if (current.data === value) break;

            prev = current;

            //haven't found it yet
            if (value < current.data && current.left) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        if (!current) return;

        //case 1: no children
        if (!current.left && !current.right) {
            if (prev) {
                if (current === prev.left) {
                    prev.left = null //skip over node
                } else {
                    prev.right = null; //skip over node
                }
            } else {
                this.root = null; 
            }
        }

        //case 2: one child exists
        if (current.right && !current.left) prev.right = current.right; //skip over node
        if (!current.right && current.left) prev.left = current.left; //skip over node
        
        //case 3: two children exist 
        if (current.right && current.left) {
            //set variables to go get the lowest value from the right subtree
            let fetcher = current.right;
            let fetcherParent = null;
            
            //right child doesn't have a left child
            if (!fetcher.left) { 
                current.right = fetcher.right;
            }  

            //recursively go down the left line until the end
            while (fetcher.left) {
                fetcherParent = fetcher;
                fetcher = fetcher.left;
            };
            
            //replace the current node with the fetched node
            current.data = fetcher.data;
            //remove the fetched node from tree
            if (fetcherParent) fetcherParent.left = null;
        }
    }

    find(value) {

        //tree doesn't exist
        if (!this.root) return;

        let current = this.root;

        while (current) {
            if (value === current.data) break; //node found - break out and return

            //traverse tree
            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        //node is either found or null
        return current;
    }
}

//print visualization in console
function prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) return;
    if (node.right !== null) prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

let arr = [1, 2, 3, 4, 5, 6, 7];
// let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let myTree = new BST();

myTree.root = myTree.buildTree(arr, 0, arr.length-1);

myTree.deleteItem(4)

myTree.insert(4)

console.log(myTree.find(6));

prettyPrint(myTree.root);