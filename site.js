const walletButton = document.getElementById('walletButton');
const walletStatus = document.getElementById('walletStatus');
let walletConnected = false;

walletButton.addEventListener('click', () => {
    if (!walletConnected) {
        connectWallet();
    } else {
        disconnectWallet();
    }
});

async function connectWallet() {
    try {
        const provider = window.solana;
        if (provider) {
            await provider.connect();
            walletConnected = true;
            walletButton.textContent = 'Disconnect Wallet';
            walletStatus.textContent = 'Wallet connected.';
            console.log('Wallet address:', provider.publicKey.toString());
        } else {
            alert('Please install a Solana wallet (like Phantom) and reload the page.');
        }
    } catch (error) {
        console.error(error);
        alert('Failed to connect the wallet.');
    }
}

function disconnectWallet() {
    window.solana.disconnect();
    walletConnected = false;
    walletButton.textContent = 'Connect Wallet';
    walletStatus.textContent = 'Wallet disconnected.';
}









