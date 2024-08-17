// Usage gets the augment meta data from meta tft augments page.
// just run in the console then left click the expanded console.log and copy object!

// [key: dbName]: { displayName: string, imageUrl: string }
let data = {};

let node = document.getElementById("AugmentTable");
// TBODY
node = node.children[0].children[0].children[1];

for (let i = 0; i < node.children.length; i++) {
    const tr = node.children[i];
    const img = tr.children[0].children[0].children[0].children[0].children[0];

    let dbName = img.id.split("augmentrow")[1];
    data[dbName] = { displayName: img.alt, imageUrl: img.src };
}

console.log(data);
