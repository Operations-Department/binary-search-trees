# Binary Search Tree
assignment submission for binary search trees for the Odin Project

## Features

+ buildTree(array) - sorts an array and removes any duplicate values, which goes to the helper function that constructs a balanced tree
+  insert(value) - creates a new node and inserts that node into the tree
+  deleteItem(value) - removes the node with the given value while maintaining tree structure and rules
+  find(value) - returns the node with the given value
+  levelOrder() - traverses the tree, then returns the values from top to bottom
+  inOrder() - traverses the tree, returning the values in order lowest -> highest
+  preOrder() - traverses the tree, then returns each value from top to bottom and left to right
+  postOrder() - traverses the tree perimeter in a counter-clockwise fashion, returning each value as it goes around
+  height(value) - returns the edge count from the given node to the furthest leaf
+  depth(value) - returns the edge count from the called node to the root node
+  isBalanced() - returns true if the tree is balanced
+  rebalance() - returns a balanced tree
+  prettyPrint() - logs a visual of the tree to the console
