function RBT() {//创建红黑树的类
    this.root = null//根节点
    this.length = 0
    function Node(key, value) {//新节点
        this.key = key
        this.value = value
        this.parent = null
        this.left = new NIL()//每创建一个节点默认有两个NIL节点
        this.right = new NIL()
        this.color = 'red'
    }
    function NIL() {//空节点
        this.color = 'black'
    }
    // 1.插入方法
    RBT.prototype.push = function (key, value) {//插入函数
        let newNode = new Node(key, value)
        if (this.root == null) {
            this.root = newNode
        }
        else {
            newNode.parent = this.root
            this.pushNode(newNode)
        }
        //1.通过以上方法已经完美转化成一颗搜索二叉树，现在只要将搜索二叉树转化成红黑树即可，调用BST_TO_RBT方法实现
        this.BST_TO_RBT(newNode)
        this.length++
    }
    this.pushNode = function (Node) {
        if (Node.key < Node.parent.key) {
            if (!(Node.parent.left instanceof NIL)) {
                Node.parent = Node.parent.left
                this.pushNode(Node)
            }
            else {
                Node.parent.left = Node
            }
        }
        else {
            if (!(Node.parent.right instanceof NIL)) {
                Node.parent = Node.parent.right
                this.pushNode(Node)
            }
            else {
                Node.parent.right = Node
            }
        }
    }
    this.BST_TO_RBT = function (Node) {
        // 搜索二叉树转红黑树
        if (Node.parent) {
            if (Node.parent.parent) {//根据红黑树的变化规则可以知道，如果不存在爷爷节点，只需要将根节点变为黑色即可
                if (Node.parent.color === "red" && Node.color === 'red') {//只有父亲和孩子都是红色才要变化
                    if (Node.parent == Node.parent.parent.left) {//如果父亲是爷爷的左孩子
                        if (Node.parent.parent.right.color === "red") {
                            // 如果叔叔是红色,进行情况四变换

                            Node.parent.color = "black"
                            Node.parent.parent.color = "red"
                            Node.parent.parent.right.color = "black"
                            // console.log(Node.parent.parent);

                            this.BST_TO_RBT(Node.parent.parent)//将爷爷当作新的节点进行递归操作
                        }
                        else {
                            // 如果叔叔是黑色

                            if (Node == Node.parent.left) { // 如果自己是父亲的左孩子，则进行情况5变化
                                Node.parent.color = 'black'
                                Node.parent.parent.color = "red"
                                if (Node.parent.parent.parent == null) {//如果爷爷是根节点


                                    Node.parent.right.parent = Node.parent.parent
                                    Node.parent.parent.left = Node.parent.right
                                    Node.parent.right = Node.parent.parent
                                    Node.parent.parent = Node.parent.parent.parent
                                    Node.parent.right.parent = Node.parent
                                    this.root = Node.parent
                                }
                                else {
                                    if (Node.parent.parent == Node.parent.parent.parent.left) {
                                        //如果爷爷是曾祖父的左孩子

                                        Node.parent.right.parent = Node.parent.parent
                                        Node.parent.parent.left = Node.parent.right
                                        Node.parent.right = Node.parent.parent
                                        Node.parent.parent = Node.parent.parent.parent
                                        Node.parent.parent.left = Node.parent
                                        Node.parent.right.parent = Node.parent

                                    }
                                    else {
                                        //如果爷爷是曾祖父的右孩子
                                        Node.parent.right.parent = Node.parent.parent
                                        Node.parent.parent.left = Node.parent.right
                                        Node.parent.right = Node.parent.parent
                                        Node.parent.parent = Node.parent.parent.parent
                                        Node.parent.parent.right = Node.parent
                                        Node.parent.right.parent = Node.parent
                                    }
                                }
                                this.BST_TO_RBT(Node.parent)
                            }
                            else {
                                // 如果自己是父亲的右孩子，则进行情况6变化
                                Node.parent.parent.left = Node
                                Node.parent.right = Node.left
                                Node.left = Node.parent
                                Node.parent = Node.parent.parent
                                Node.left.parent = Node
                                this.BST_TO_RBT(Node)
                            }
                        }
                    }
                    else {//如果父亲是爷爷的右孩子
                        if (Node.parent.parent.left.color === "red") {
                            // 如果叔叔是红色,进行情况四变换
                            Node.parent.color = "black"
                            Node.parent.parent.color = "red"
                            Node.parent.parent.left.color = "black"
                            this.BST_TO_RBT(Node.parent.parent)//将爷爷当作新的节点进行递归操作
                        }
                        else {
                            // 如果叔叔是黑色
                            if (Node == Node.parent.right) { // 如果自己是父亲的右孩子，则进行情况5变化
                                Node.parent.color = 'black'
                                Node.parent.parent.color = "red"
                                if (Node.parent.parent.parent == null) {//如果爷爷是根节点
                                    Node.parent.left.parent = Node.parent.parent
                                    Node.parent.parent.right = Node.parent.left
                                    Node.parent.left = Node.parent.parent
                                    Node.parent.parent = Node.parent.parent.parent
                                    Node.parent.left.parent = Node.parent
                                    this.root = Node.parent
                                }
                                else {
                                    if (Node.parent.parent == Node.parent.parent.parent.left) {
                                        //如果爷爷是曾祖父的左孩子
                                        Node.parent.left.parent = Node.parent.parent
                                        Node.parent.parent.right = Node.parent.left
                                        Node.parent.left = Node.parent.parent
                                        Node.parent.parent = Node.parent.parent.parent
                                        Node.parent.parent.left = Node.parent
                                        Node.parent.left.parent = Node.parent
                                    }
                                    else {
                                        //如果爷爷是曾祖父的右孩子
                                        Node.parent.left.parent = Node.parent.parent
                                        Node.parent.parent.right = Node.parent.left
                                        Node.parent.left = Node.parent.parent
                                        Node.parent.parent = Node.parent.parent.parent
                                        Node.parent.parent.right = Node.parent
                                        Node.parent.left.parent = Node.parent
                                    }
                                }
                                this.BST_TO_RBT(Node.parent)
                            }
                            else {
                                // 如果自己是父亲的左孩子，则进行情况6变化
                                Node.parent.parent.right = Node
                                Node.parent.left = Node.right
                                Node.right = Node.parent
                                Node.parent = Node.parent.parent
                                Node.right.parent = Node
                                this.BST_TO_RBT(Node.right)
                            }
                        }
                    }
                }
            }
        }
        if (this.root.color === "red") {
            this.root.color = "black"//条件四
        }
    }
    RBT.prototype.remove = function (key) {
        if (this.length === 0) {
            return -1
        }
        else {
            let deleteelement = this.search(key)
            if (deleteelement === -1) {
                return -1
            }
            else {
                if (!(deleteelement.right instanceof NIL)) {
                    let subNode = deleteelement.right
                    while (!(subNode.right instanceof NIL)) {
                        subNode = subNode.left
                    }
                    let key = deleteelement.key
                    let value = deleteelement.value
                    //将后继节点的值和要删除的值互换，
                    deleteelement.key = subNode.key
                    deleteelement.value = subNode.value
                    subNode.key = key
                    subNode.value = value
                    this.remove_BST_TO_RBT(subNode)
                }
                else {
                    //如果后继为空，不需要互换，自己就为自己的后继
                    this.remove_BST_TO_RBT(deleteelement)
                }
            }

            this.length--
        }
    }
    this.remove_BST_TO_RBT = function (Node) {
        if (Node.color === 'black') {
            if (!Node.parent) {
                this.root = null
                Node = null
            }
            else {
                if (Node.right.color === 'red') {//后继节点如果右孩子存在，必定为红色
                    Node.right.color === "black"
                    if (Node.parent.left === Node) {
                        Node.parent.left = Node.right
                        Node.right.parent = Node.parent
                    }
                    else {
                        Node.parent.right = Node.right
                        Node.right.parent = Node.parent
                    }
                }
                else {//后继节点没有孩子
                    if (Node.parent.left === Node) {
                        if (Node.parent.color === 'red' && Node.parent.right.color === "black" && Node.parent.right.left.color === "black" && Node.parent.right.right.color === "black") {
                            Node.parent.left = new NIL()
                            Node.parent.color = "black"
                            Node.parent.right.color = "red"
                            Node = null
                        }
                        if (Node.parent.right.color === 'black' && Node.parent.right.right === "red") {
                            Node.parent.right.right.color = "black"
                            Node.parent.right.color = Node.parent.color
                            Node.parent.color = "black"
                            if (Node.parent.parent.left === Node) {
                                Node.parent.parent.left = Node.parent.right
                            }
                            else {
                                Node.parent.parent.right = Node.parent.right
                            }
                            Node.parent.right.parent = Node.parent.parent
                            Node.parent.right.left = Node.parent
                            Node.parent.parent = Node.parent.right
                            Node.parent.left = new NIL()
                            Node.parent.right = new NIL()
                        }
                        if (Node.parent.right.color === 'black' && Node.parent.right.left === "red") {
                            Node.parent.right.color = 'red'
                            Node.parent.right.left.color = "black"
                            Node.parent.right.right.left = Node.parent.right
                            Node.parent.right.right.parent = Node.parent
                            Node.parent.right.parent = Node.parent.right.right
                            Node.parent.right.left = new NIL()
                            Node.parent.right.right = new NIL()
                            Node.parent.right = Node.parent.right.parent
                            this.remove_BST_TO_RBT(Node.parent.right)
                        }
                        if (Node.parent.right.color === 'black' && Node.parent.color === "black" && Node.parent.right.right.color === "black" && Node.parent.right.left.color === "black") {
                            Node.parent.right.color = 'red'
                            Node.parent.left = new NIL()
                            this.remove_BST_TO_RBT(Node.parent.right)
                        }
                        if (Node.parent.right.color === "red") {
                            Node.parent.right.color = "black"
                            Node.parent.color = 'red'

                        }
                    }
                    else {
                        if (Node.parent.color === 'red' && Node.parent.left.color === "black" && Node.parent.left.left.color === "black" && Node.parent.left.right.color === "black") {
                            Node.parent.right = new NIL()
                            Node.parent.color = "black"
                            Node.parent.left.color = "red"
                            Node = null
                        }
                    }
                }
            }
        }
        //红色符合规则，不做变化
    }
    //前序遍历
    this.preorderTraversal = function () {
        if (this.length === 0) {
            return -1
        }
        else {
            this.preorderTraversalNode(this.root)
        }
    }
    RBT.prototype.preorderTraversalNode = function (Node) {

        console.log(Node.key);
        if (!(Node.left instanceof NIL)) {
            this.preorderTraversalNode(Node.left)
        }
        if (!(Node.right instanceof NIL)) {
            this.preorderTraversalNode(Node.right)
        }
    }
    //后序遍历
    RBT.prototype.postorderTraversal = function () {
        if (this.length === 0) {
            return -1
        }
        else {
            this.postorderTraversalNode(this.root)
        }
    }
    this.postorderTraversalNode = function (Node) {
        if (!(Node.left instanceof NIL)) {
            this.postorderTraversalNode(Node.left)
        }
        if (!(Node.right instanceof NIL)) {
            this.postorderTraversalNode(Node.right)
        }
        console.log(Node.key);
    }
    //中序遍历
    RBT.prototype.inorderTraversal = function () {
        if (this.length === 0) {
            return -1
        }
        else {
            this.inorderTraversalNode(this.root)
        }
    }
    this.inorderTraversalNode = function (Node) {
        if (!(Node.left instanceof NIL)) {
            this.inorderTraversalNode(Node.left)
        }
        console.log(Node.key);
        if (!(Node.right instanceof NIL)) {
            this.inorderTraversalNode(Node.right)
        }

    }
    //max值
    RBT.prototype.max = function () {
        let current = this.root
        while (!(current.right instanceof NIL)) {
            current = current.right
        }
        return current.key
    }
    //最小值
    RBT.prototype.min = function () {
        let current = this.root
        while (!(current.left instanceof NIL)) {
            current = current.left
        }
        return current.key
    }
    //搜索特定key
    RBT.prototype.search = function (key) {
        let current = this.root
        while (current.key != null) {
            if (key === current.key) {
                return current
            }
            if (key < current.key) {
                current = current.left
            }
            if (key > current.key) {
                current = current.right
            }
        }
        return -1
    }
    //更新数据
    RBT.prototype.update = function (key, value) {
        this.search(key).value = value
    }

}
let Rbt = new RBT()
Rbt.push(10, 10)
Rbt.push(9, 9)
Rbt.push(8, 8)
Rbt.push(7, 7)
Rbt.push(6, 6)
Rbt.push(5, 5)
Rbt.push(4, 4)
Rbt.push(3, 3)
Rbt.push(2, 2)
Rbt.push(1, 1)
Rbt.remove(7)
Rbt.preorderTraversal()