document.addEventListener('DOMContentLoaded', function() {
    const connectButton = document.getElementById('connectWallet');
    const sendButton = document.getElementById('sendSol');
    const amountInput = document.getElementById('amount');
    const disconnectButton = document.createElement('button');
    disconnectButton.textContent = 'Disconnect Wallet';
    disconnectButton.id = 'disconnectWallet';
    disconnectButton.style.display = 'none';
    document.body.appendChild(disconnectButton);

    connectButton.addEventListener('click', connectWallet);
    disconnectButton.addEventListener('click', disconnectWallet);
    sendButton.addEventListener('click', sendSol);

    function connectWallet() {
        if (window.solana && window.solana.isPhantom) {
            window.solana.connect()
            .then((response) => {
                console.log('Connected with Public Key:', response.publicKey.toString());
                updateBalance();
                alert('Wallet connected successfully!');
                updateUI(true);
            })
            .catch((error) => {
                console.error('Error connecting to Phantom wallet:', error);
                alert('Connection to Phantom wallet was rejected. Please try again and approve the connection request.');
            });
        } else {
            alert('Phantom wallet is not detected. Please install it and make sure it is configured for devnet.');
        }
    }

    function disconnectWallet() {
        window.solana.disconnect();
        updateUI(false);
        alert('Wallet disconnected successfully.');
    }

    async function sendSol() {
        const recipientAddress = new solanaWeb3.PublicKey("8eTayeQQrc1yrbym5w8LS31rrkVkrvzNggNKLCQHhTn1");
        const amount = parseFloat(amountInput.value) * solanaWeb3.LAMPORTS_PER_SOL;
        console.log(`Attempting to send ${amount} lamports to ${recipientAddress.toString()}`);
        
        if (amount <= 0) {
            alert('Please enter a valid amount to send.');
            return;
        }

        try {
            const transaction = new solanaWeb3.Transaction().add(
                solanaWeb3.SystemProgram.transfer({
                    fromPubkey: window.solana.publicKey,
                    toPubkey: recipientAddress,
                    lamports: amount
                })
            );
            const signature = await window.solana.connection.sendTransaction(transaction, [window.solana.publicKey]);
            console.log('Transaction signature', signature);
            await window.solana.connection.confirmTransaction(signature);
            alert('Transaction successful!');
            updateBalance();
        } catch (error) {
            console.error('Error sending SOL:', error);
            alert('Failed to send SOL. Please check the console for more details.');
        }
    }

    function updateUI(isConnected) {
        connectButton.style.display = isConnected ? 'none' : 'inline';
        disconnectButton.style.display = isConnected ? 'inline' : 'none';
    }

   async function updateBalance() {
        if (window.solana && window.solana.isConnected) {
            const balance = await window.solana.connection.getBalance(window.solana.publicKey);
            document.getElementById('balance').textContent = (balance / solanaWeb3.LAMPORTS_PER_SOL).toFixed(6) + ' SOL';
        }
    }
});

