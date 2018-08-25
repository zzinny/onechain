const CryptoJS = require("crypto-js");

function Blockchain(){
    this.chain=[];
    const genesisBlock= new Block(0,'de6f45f9f324a64a08f4c01a53b8bd93721494fc810a3b7b776b2b482a3b4c35','',1535165503,"genesis Block!!!")
    this.chain.push(genesisBlock);
}

function Block(index, hash, previousHash, timestamp, data){   //except diificulty,nonce
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash;
    this.difficulty = difficulty;
    this.nonce = nonce;
    
}

Blockchain.prototype.calculateHashForBlock=function(index,previousHash,timestamp,data){
    hash=CryptoJS.SHA256(index+previousHash+timestamp+data).toString();
    return hash;
}

Blockchain.prototype.generateNextBlock=function(hash, previousHash, data){  
    index= this. chain.length,
    hash=hash, 
    previousHash=previousHash,
    timestamp= Math.round(new Date().getTime()/1000),    
    data=data  //이거는 transactionLIst 거래내역임 나중에 리스트로 바꿔도 될 듯
    nextBlock= new Block(index, hash, previousHash, timestamp, data);


    this.chain.push(nextBlock);
    return nextBlock;
}

Block.prototype.isValidBlockStructure=function(Block){
    return typeof block.index==='number'
    &&typeof block.hash==='string'
    && typeof block.previousHash==='string'
    &&typeof block.timestamp==='number'
    &&typeof block.data==='object';
}

Block.prototype.isValidBlock=function(newBlock,previousBlock){
    if(!this.isValidBlockStructure(newBlock)){  //타입 미스
        console.log('invalis block structure %s',JSON.stringify(newBlock));  //여기 수정 중
        return false;
    }
    if(previousBlock.index+1 !== newBLock.index){  //내용 미스
        console.log('invalid index');
        return false;
    }else if(previousBlock.hash!==newBlock.previousHash){
        console.log('invalid previoushash');
        return false;
    }else if(calculateHashForBlock(newBlock)!==newBlock.hash){
        console.log('invalid hash\n'+'Hash:'+newBlock.hash+'\ncalculatedHash:'+calculateHashForBlock(newBlock));
        return false;
    }
}

Blockchain.prototype.isValidChain=function(blockchain){
    const isValidGenesis=function(block) {
        return JSONstringify(block)===JSON.stringify(genesisBlock); }
    if(!isValidGenesis(blockchain[0])){
        return false;
    }
    for(let i=1;i<blockchain.length;i++){
        if(!blockchain[i].isValidBlock(blockchain[i],blockchain[i-1])){
            return false;
        }
    }
    return true;
}