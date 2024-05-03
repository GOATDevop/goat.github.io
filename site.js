document.addEventListener('DOMContentLoaded', function () {
    // Verifica se a biblioteca web3 foi carregada corretamente
    if (typeof web3 === 'undefined') {
        console.error('web3 is not defined. Please check if the library is loaded correctly.');
        return;
    }

    const button = document.getElementById('connectBtn');
    let walletConnected = false;

    // Corrigindo a chamada para a função clusterApiUrl
    const connection = new web3.Connection(
        web3.clusterApiUrl('mainnet-beta'), 'confirmed'
    );

    async function connectWallet() {
        try {
            // Implemente a lógica de conexão com base na documentação
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













        















