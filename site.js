document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('connectBtn');
    let walletConnected = false;

    // Instância de conexão Solana
    const connection = new solanaWeb3.Connection(
        solanaWeb3.clusterApiUrl('mainnet-beta'), 'confirmed'
    );

    // Função para conectar à carteira
    async function connectWallet() {
        try {
            const providerUrl = 'https://www.sollet.io';
            const provider = new solanaWeb3.WalletProvider(providerUrl);
            await provider.connect();
            walletConnected = true;
            button.textContent = 'Disconnect Wallet';
            console.log('Connected: ' + provider.publicKey.toString());
        } catch (error) {
            console.error('Connection error:', error);
        }
    }

    // Função para desconectar da carteira
    async function disconnectWallet() {
        try {
            if (walletConnected) {
                walletConnected = false;
                button.textContent = 'Connect Wallet';
                console.log('Disconnected from wallet');
            }
        } catch (error) {
            console.error('Disconnection error:', error);
        }
    }

    // Listener para o botão
    button.addEventListener('click', () => {
        if (!walletConnected) {
            connectWallet();
        } else {
            disconnectWallet();
        }
    });
});









        















