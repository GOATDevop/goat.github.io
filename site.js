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

    connectButton.addEventListener('click', connectWallet);
    disconnectButton.addEventListener('click', disconnectWallet);
    sendButton.addEventListener('click', addToQueue);

    // Queue to handle transactions
    const transactionQueue = [];

    async function addToQueue() {
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

        const transaction = {
            recipientAddress,
            amount
        };

        transactionQueue.push(transaction);
        processQueue();
    }

    async function processQueue() {
        if (transactionQueue.length === 0) return;

        const transaction = transactionQueue.shift();

        try {
            const signature = await sendTransaction(transaction.recipientAddress, transaction.amount);
            console.log('Transaction signature', signature);
            alert('Transaction successful!');
            updateBalance();
        } catch (error) {
            console.error('Error sending SOL:', error);
            alert('Failed to send SOL. Please check the console for more details.');
        }
    }

    async function sendTransaction(recipientAddress, amount) {
        const transaction = new solanaWeb3.Transaction().add(
            solanaWeb3.SystemProgram.transfer({
                fromPubkey: solana.publicKey,
                toPubkey: recipientAddress,
                lamports: amount
            })
        );

        const signature = await solana.sendTransaction(transaction, [solana.publicKey]);
        await solana.confirmTransaction(signature);
        return signature;
    }

    function connectWallet() {
        if (window.solana && window.solana.isPhantom) {
            window.solana.connect()
                .then((response) => {
                    console.log('Connected with Public Key:', response.publicKey.toString());
                    solana = window.solana;
                    solanaWeb3 = window.solanaWeb3;
                    updateBalance();
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

    async function updateBalance() {
        if (solana && solana.isConnected) {
            const balance = await solana.getBalance(solana.publicKey);
            document.getElementById('balance').textContent = (balance / solanaWeb3.LAMPORTS_PER_SOL).toFixed(6) + ' SOL';
        }
    }
});





