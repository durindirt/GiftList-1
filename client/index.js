const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  let name = 'Toni Hahn';
  const merkleTree = new MerkleTree(niceList);
  let index = niceList.findIndex(n => n === name);
  let proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name,
    proof,
  });
  console.log({ gift });

      // Test with a name that is not available
      name = "Hello world";

      // Build the proof
      index = niceList.findIndex((n) => n === name);
      proof = merkleTree.getProof(index);
  
      const { data: gift2 } = await axios.post(`${serverUrl}/gift`, {
          name,
          proof,
      });
  
      console.log(name, { gift2 });
}

main();