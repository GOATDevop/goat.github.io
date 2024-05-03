document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('connectBtn');
    let walletConnected = false;

    // Criar uma instância de conexão ao cluster Solana
    const connection = new sol.Web3.Connection(
        sol.Web3.clusterApiUrl('devnet'), // Conectar ao devnet para testes
        'confirmed'
    );

    async function connectWallet() {
        try {
            const provider = window.solana; // Usando o provider injetado pelo wallet como Phantom
            if (provider) {
                await provider.connect();
                walletConnected = true;
                button.textContent = 'Disconnect Wallet';
                console.log('Connected to wallet with public key:', provider.publicKey.toString());
            } else {
                console.error('Wallet provider is not available.');
            }
        } catch (error) {
            console.error('Failed to connect:', error);
        }
    }

    async function disconnectWallet() {
        try {
            const provider = window.solana;
            if (provider && walletConnected) {
                await provider.disconnect();
                walletConnected = false;
                button.textContent = 'Connect Wallet';
                console.log('Disconnected from wallet.');
            }
        } catch (error) {
            console.error('Failed to disconnect:', error);
        }
    }

    button.addEventListener('click', () => {
        if (!walletConnected) {
            connectWallet();
        } else {
            disconnectWallet();
        }
    });
});














        















