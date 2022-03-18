$(document).ready(function(){

    // ABI Smart Contract (paste ABI here)
    const abi = [];

    // Address Smart Contract is deploy ethereum (paste address here)
    let addressSmartContract = '';

    var wallet = "";
    
    // Show Metamask accept connect from web client when click connect
    const web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    // Create contract for using side client
    var contract = web3.eth.Contract(abi,addressSM);
    // Console log google dev for testing
    console.log(contract);
    //Validate metamask installed
    checkMM();

    // Event click connect metamask from client side
    $('#btnConnectMM').click(function(){
        connectMM().then((data)=>{
           addressIndex = data[0];
           console.log(addressIndex);
           document.getElementById('sWallet').innerHTML = addressIndex;
        }).catch((err)=>{
            console.log('Connect MM failer!');
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