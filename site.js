document.addEventListener('DOMContentLoaded', function () {
    if (typeof solanaWeb3 === 'undefined') {
        console.error('solanaWeb3 is not defined. Please check if the library is loaded correctly.');
        return;
    }

    const button = document.getElementById('connectBtn');
    let walletConnected = false;

    // Verifique se usamos o objeto correto
    const connection = new solanaWeb3.Connection(
        solanaWeb3.clusterApiUrl('mainnet-beta'), 'confirmed'
    );

    async function connectWallet() {
        try {
            // Assumindo que 'solanaWeb3' é definido, devemos usar solanaWeb3.Wallet, se existir
            // Caso contrário, você precisa revisar como a biblioteca lida com conexões
            console.log('Attempting to connect...');
            walletConnected = true;
            button.textContent = 'Disconnect Wallet';
        } catch (error) {
            console.error('Connection error:', error);
        }
    }

    async function disconnectWallet() {
        if (walletConnected) {
            console.log('Disconnecting...');
            walletConnected = false;
            button.textContent = 'Connect Wallet';
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










        















