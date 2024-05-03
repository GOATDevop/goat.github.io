// Checks if the Solana object is available
if (typeof solana !== 'undefined') {
    const button = document.getElementById('connectBtn');
    let connected = false;

    // Connect to the wallet
    async function connectWallet() {
        try {
            const provider = solana;
            if (provider) {
                await provider.connect();
                connected = true;
                button.textContent = 'Disconnect Wallet';
                console.log('Connected to wallet!');
            }
        } catch (error) {
            console.error('Connection error:', error);
        }
    }

    // Disconnect from the wallet
    async function disconnectWallet() {
        try {
            const provider = solana;
            if (provider && connected) {
                await provider.disconnect();
                connected = false;
                button.textContent = 'Connect Wallet';
                console.log('Disconnected from wallet!');
            }
        } catch (error) {
            console.error('Disconnection error:', error);
        }
    }

    // Event listener for button click
    button.addEventListener('click', () => {
        if (!connected) {
            connectWallet();
        } else {
            disconnectWallet();
        }
    });
} else {
    console.log('Solana object not found. Make sure @solana/web3.js is loaded properly.');
}






        















