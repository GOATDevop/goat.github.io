document.addEventListener('DOMContentLoaded', function () {
    if (typeof solanaWeb3 === 'undefined') {
        console.error('solanaWeb3 is not defined. Please check if the library is loaded correctly.');
        return;
    }

    const button = document.getElementById('connectBtn');
    let walletConnected = false;

    // Usar Web3.ClusterApiUrl para a conexão, corrigindo a chamada
    const connection = new solanaWeb3.Connection(
        solanaWeb3.ClusterApiUrl('mainnet-beta'), 'confirmed'
    );

    async function connectWallet() {
        try {
            // Detalhes da função connectWallet devem ser revisados com base na documentação da biblioteca
            console.log('Attempting to connect...');
            walletConnected = true;
            button.textContent = 'Disconnect Wallet';
            console.log('Connected: [Public Key]');
        } catch (error) {
            console.error('Connection error:', error);
        }
    }

    async function disconnectWallet() {
        if (walletConnected) {
            console.log('Disconnecting...');
            walletConnected = false;
            button.textContent = 'Connect Wallet';
            console.log('Disconnected');
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












        















