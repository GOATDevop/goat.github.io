document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('connectBtn');

    // Função para detectar se a carteira Phantom está instalada
    function isPhantomInstalled() {
        return window.solana && window.solana.isPhantom;
    }

    // Função para conectar à carteira Phantom
    async function connectWallet() {
        if (!isPhantomInstalled()) {
            console.error('Phantom wallet is not installed.');
            alert('Please install Phantom wallet.');
            return;
        }

        try {
            // Solicita a conexão à carteira Phantom
            const response = await window.solana.connect({ onlyIfTrusted: true });
            console.log('Connected to Phantom Wallet:', response.publicKey.toString());
            button.textContent = 'Disconnect from Phantom';
        } catch (error) {
            console.error('Failed to connect:', error);
        }
    }

    // Função para desconectar da carteira Phantom
    async function disconnectWallet() {
        await window.solana.disconnect();
        button.textContent = 'Connect to Phantom';
        console.log('Disconnected from Phantom Wallet');
    }

    let walletConnected = false;

    // Listener para o botão
    button.addEventListener('click', () => {
        if (!walletConnected) {
            connectWallet();
            walletConnected = true;
        } else {
            disconnectWallet();
            walletConnected = false;
        }
    });
});















        















