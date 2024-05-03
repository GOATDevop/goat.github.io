document.addEventListener('DOMContentLoaded', function () {
    const statusText = document.getElementById('status');
    const connectButton = document.getElementById('connectButton');
    let walletConnected = false;
    let wallet;

    async function connectWallet() {
        if (window.solana && window.solana.isPhantom) {
            try {
                wallet = await window.solana.connect();
                walletConnected = true;
                connectButton.textContent = 'Disconnect Wallet';
                statusText.textContent = 'Wallet connected: ' + wallet.publicKey.toString();
            } catch (error) {
                console.error('Failed to connect:', error);
                statusText.textContent = 'Failed to connect wallet.';
            }
        } else {
            statusText.textContent = 'Please install Phantom wallet.';
        }
    }

    async function disconnectWallet() {
        if (walletConnected && window.solana && window.solana.disconnect) {
            try {
                await window.solana.disconnect();
                walletConnected = false;
                connectButton.textContent = 'Connect Wallet';
                statusText.textContent = 'Wallet disconnected';
            } catch (error) {
                console.error('Failed to disconnect:', error);
                statusText.textContent = 'Failed to disconnect wallet.';
            }
        }
    }

    connectButton.addEventListener('click', function () {
        if (walletConnected) {
            disconnectWallet();
        } else {
            connectWallet();
        }
    });
});





        















