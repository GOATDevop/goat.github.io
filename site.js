document.addEventListener('DOMContentLoaded', function () {
    const connectButton = document.getElementById('connectWallet');
    const sendButton = document.getElementById('sendSol');
    const amountInput = document.getElementById('amount');
    const disconnectButton = document.createElement('button');
    disconnectButton.textContent = 'Disconnect Wallet';
    disconnectButton.id = 'disconnectWallet';
    disconnectButton.style.display = 'none';
    document.body.appendChild(disconnectButton);

    let solana;
    let solanaWeb3;
    let connection; // Conexão com a rede Solana

    connectButton.addEventListener('click', connectWallet);
    disconnectButton.addEventListener('click', disconnectWallet);
    sendButton.addEventListener('click', sendSol);

    function sendSol() {
        if (!solanaWeb3) {
            alert('Solana Web3.js library is not loaded.');
            return;
        }

        const recipientAddress = new solanaWeb3.PublicKey("8eTayeQQrc1yrbym5w8LS31rrkVkrvzNggNKLCQHhTn1");
        const amount = parseFloat(amountInput.value) * solanaWeb3.LAMPORTS_PER_SOL;

        if (amount <= 0 || isNaN(amount)) {
            alert('Please enter a valid amount to send.');
            return;
        }

        try {
            const transaction = new solanaWeb3.Transaction().add(
                solanaWeb3.SystemProgram.transfer({
                    fromPubkey: solana.publicKey,
                    toPubkey: recipientAddress,
                    lamports: amount
                })
            );

            solana.sendTransaction(transaction, [solana.publicKey])
                .then((signature) => {
                    console.log('Transaction signature', signature);
                    alert('Transaction successful!');
                })
                .catch((error) => {
                    console.error('Error sending SOL:', error);
                    alert('Failed to send SOL. Please check the console for more details.');
                });
        } catch (error) {
            console.error('Error sending SOL:', error);
            alert('Failed to send SOL. Please check the console for more details.');
        }
    }

   function connectWallet() {
    if (window.solana && window.solana.isPhantom) {
        window.solana.connect()
            .then((response) => {
                console.log('Connected with Public Key:', response.publicKey.toString());
                solana = window.solana;
                solanaWeb3 = window.solanaWeb3;
                // Verifica se a biblioteca Solana Web3.js está carregada corretamente
                if (!solanaWeb3) {
                    console.error('Error connecting to Phantom wallet: Solana Web3.js library is not loaded.');
                    alert('Failed to connect to Phantom wallet. Please check the console for more details.');
                    return;
                }
                // Estabelece a conexão com a rede principal da Solana
                connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'));
                alert('Wallet connected successfully!');
                updateUI(true);
            })
            .catch((error) => {
                console.error('Error connecting to Phantom wallet:', error);
                alert('Connection to Phantom wallet was rejected. Please try again and approve the connection request.');
            });
    } else {
        alert('Phantom wallet is not detected. Please install it and make sure it is configured for the Solana network.');
    }
}


    function disconnectWallet() {
        solana.disconnect();
        updateUI(false);
        alert('Wallet disconnected successfully.');
    }

    function updateUI(isConnected) {
        connectButton.style.display = isConnected ? 'none' : 'inline';
        disconnectButton.style.display = isConnected ? 'inline' : 'none';
    }
});







