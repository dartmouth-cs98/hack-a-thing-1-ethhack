#CS98 Hackthing 1 William Wolfe
###Description:
The following is a simple bitcoin wallet that generates a raw transaction from the wallet data pulled from a bitcoin block explorer. 
The transaction requires a bitcoind to be installed inorder to sign the transaction and send it to the network. 
I used (https://medium.com/coinmonks/how-to-create-a-raw-bitcoin-transaction-step-by-step-239b888e87f2) as a tutorial on transaction structures.
I am also newish to Nodejs so I found this hashing tutorial useful (https://blog.ajduke.in/2016/05/28/creating-a-hash-in-node-js/) and stack overflow tutorial on https using nodejs

###What I learned:
- Basic nodejs and its asynchronous structure
- How bitcoin transactions work
- How Bitoin UTXOs work
- Bitcoin block structure

###What Doesnt work
Unfortuanatly the code doesnt work. I can gnerate some of the hashes required to build the rawtx and I can get the UTXO that needs to be used. 
I ran out of time trying to figure out how to generate the other data such as signing with bitcoind. 

