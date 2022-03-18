$(document).ready(function(){

    // ABI Smart Contract (paste ABI here)
    const abi = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_str",
                    "type": "string"
                }
            ],
            "name": "set",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "get",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    // Address Smart Contract is deploy ethereum (paste address here)
    let addressSmartContract = '0x7d8Caf266337d0046eF5ae509fAa73EfEbC4Ff82';

    var wallet = "";
    
    // Show Metamask accept connect from web client when click connect
    const web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    // Create contract for using side client
    var contract = web3.eth.Contract(abi,addressSmartContract);
    // Console log google dev for testing
    console.log(contract);
    //Validate metamask installed
    checkMM();

    // Event click connect metamask from client side
    $('#btnconnectMM').click(function(){
        connectMM().then((data)=>{
            wallet = data[0];
            console.log(wallet);
        });
    });


    $('#btnSet').click(function(){
        // Lam gi do
        var value = $('#inText').val();
        
         contract.methods.set(value).send({from:wallet}).on('transactionHash',function(hash){
         console.log(hash);
     });
    });

    $('#btnGet').click(function(){
        // Lam gi do        
         contract.methods.get().call({from:wallet}).then(function(value){
             document.getElementById("showData").innerHTML = value;
         });
    });

    ///
    // Interactive with smart contract into blockchain
    ///
    // contract.methods.dk('dasd','dasd').send({from:wallet}).on('transactionHash',function(hash){
    //     console.log(hash);
    // });
});

async function connectMM(){
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    return accounts;
}

function checkMM(){
    if (typeof window.ethereum !== 'undefined') {
        alert('MetaMask is installed!');
      } else {
          alert('MM isn\'t installed!');
      }
}