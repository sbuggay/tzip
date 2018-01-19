class HNode { constructor(public left, public right, public count) { } }
class HLeaf { constructor(public byte, public count) { } }

function compress(original) {
    buildTree(original);
}

function buildTree(str: string) {
    const bytes = str.split("").map(byte => byte.charCodeAt(0));
    const uniqueBytes = Array.from(new Set(bytes));

    const nodes: any[] = uniqueBytes.map(byte => new HLeaf(byte, bytes.filter(x => x === byte).length));

    function min(nodes) {
        let minIndex = 0;
        nodes.reduce((a, b, c) => {
            if (a.count < b.count) {
                return a;
            }
            else {
                minIndex = c;
                return b;
            }
        });
        return nodes.splice(minIndex, 1);
    }


    while(nodes.length > 1) {
        const node1 = min(nodes)[0];
        const node2 = min(nodes)[0];
        nodes.push(new HNode(node1, node2, node1.count + node2.count));
    }
    
    return nodes;
}
