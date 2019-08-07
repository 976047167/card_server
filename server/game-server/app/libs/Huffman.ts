const Buffer = require("safe-buffer").Buffer;
interface TreeNode {
    value: number ;
    char: number;
    left: TreeNode|null|undefined;
    right: TreeNode|null|undefined;
}

export default class Huffman {
    public static  encode(s: string) {
        s = "123";
        const data: Uint8Array = Buffer.from(s, "utf8");
        const root =  this.initializeTree(data);
        console.log("Huffman tree is", root);
        const treeStream = this.serializeTree(root);
        console.log("treeStream is", treeStream);
        const map = this.buildMap(root);
        console.log("map is", map);
        const dataStream = this.compress(data, map);
        console.log("dataStream is", dataStream);
        console.log("stream is", treeStream + dataStream);
        const buffer = this.writeBuffer(treeStream + dataStream);
        const result =  buffer.toString("base64");
        this.decode(result);
        return result;
    }

    public static decode(s_base64: string) {
        const data: Uint8Array = Buffer.from(s_base64, "base64");
        const stream = this.data2Stream(data);
        const ref = {p: 0};
        const root = this.deserializeTree(stream, ref);
        console.log("Huffman tree is", root);
        const buffer = this.uncompress(stream.substr(ref.p), root);
        const result = buffer.toString();
        console.log(result);
        return result;

    }
    private static initializeTree(data: Uint8Array) {
        let tree: TreeNode[] = new Array<TreeNode>(256);
        data.forEach((char) => {
            const treeNode = {
                char,
                value: tree[char] ? tree[char].value + 1 : 1,
                left: null,
                right: null,
            };
            tree[char] = treeNode;
        });

        tree = tree.filter((node) => {
            return node.value && node.value !== 0;
        });
        tree.sort((a, b) => {
            return b.value - a.value;
        });
        const root = this.buildTree(tree);
        return root;
    }


    private static buildTree(tree: TreeNode[]) {
        if (tree.length === 1) {
            return tree[0];
        }
        const left = tree.pop();
        const right = tree.pop();
        const newValue = left.value + right.value;
        const newTreeNode: TreeNode = {
            left,
            right,
            char: -1,
            value: newValue,
        };
        let i = 0;
        while (i < tree.length && newValue < tree[i].value ) {
            i++;
        }
        tree.splice(i, 0, newTreeNode);
        return this.buildTree(tree);
    }


    private static serializeTree( node: TreeNode,  s: string = "") {
        if (!node.left && !node.right) {
            s += "1";
            let bytes = node.char.toString(2);
            if (bytes.length < 8) {
                bytes = new Array(9 - bytes.length).join("0") + bytes;
            }
            s += bytes;
            return s;
        }
        s += "0";
        s = this.serializeTree(node.left, s);
        s = this.serializeTree(node.right, s);
        return s;
    }
    private static deserializeTree( s: string , ref: {p: number} = {p: 0}) {
        if (s.substr(ref.p, 1) === "1") {
            ref.p += 1;
            const byte = s.substr(ref.p, 8);
            ref.p += 8;
            const node: TreeNode = {
                char: parseInt(byte, 2),
                value: 0,
                left: null,
                right: null,
            };
            return node;
        }
        ref.p += 1;
        const left = this.deserializeTree(s, ref);
        const right = this.deserializeTree(s, ref);
        const root: TreeNode = {
            char: -1,
            value: 0,
            left,
            right,
        };
        return root;
    }

    private static compress(data: Uint8Array, map) {
        let s = "";
        data.forEach((char) => {
            s += map[char];
        });
        return s;
    }
    private static uncompress(s: string, root: TreeNode) {
        const bytes = [];
        let i = 0;
        let p: TreeNode  = root;
        while (i < s.length) {
            if (s[i] === "1") {
                p = p.right;
            } else if (s[i] === "0") {
                p = p.left;
            }
            if (p.char >= 0) {
                bytes.push(p.char);
                p = root;
            }
            i++;
        }
        const result = Buffer.from(bytes);
        return result;
    }

    private static writeBuffer(stream: string) {
        const len = Math.ceil(stream.length / 8);
        const bytes =  stream + new Array(1 + len * 8 - stream.length).join("0");
        const buffer = Buffer.alloc(len);
        let i = 0;
        while (i < len) {
            const byte = bytes.substr(i * 8, 8);
            buffer[i] = parseInt(byte, 2);
            i++;
        }
        return  buffer;
    }
    private static buildMap(node: TreeNode, map= {}, s: string = "") {
        if (node.char >= 0) {
            map[node.char] = s;
            return map;
        }
        this.buildMap(node.left, map, s + "0");
        this.buildMap(node.right, map, s + "1");
        return map;
    }
    private static data2Stream(d: Uint8Array) {
        let s = "";
        d.forEach((e) => {
            let byte = e.toString(2);
            if (byte.length < 8) {
                byte = new Array(9 - byte.length).join("0") + byte;
            }
            s += byte;
        });
        return s;
    }
}
