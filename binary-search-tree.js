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
            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        //node is either found or null
        return current;
    }

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
}

//print visualization in console
function prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) return;
    if (node.right !== null) prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

let arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
// let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let myTree = new BST();

myTree.root = myTree.buildTree(arr, 0, arr.length-1);

// myTree.insert(6)
// myTree.deleteItem(1)

prettyPrint(myTree.root);

console.log(myTree.find(70));
console.log(myTree.levelOrder());
console.log(myTree.inOrder());