// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function () {
    // Verifica se o objeto Solana está disponível
    if (typeof solana !== 'undefined') {
        const button = document.getElementById('connectBtn');
        let connected = false;

        // Conecta à carteira
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

        // Desconecta da carteira
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

        // Adiciona o listener ao botão
        button.addEventListener('click', () => {
            if (!connected) {
                connectWallet();
            } else {
                disconnectWallet();
            }
        });
    } else {
        console.log('Objeto Solana não encontrado. Certifique-se de que @solana/web3.js está carregado corretamente.');
    }
});







        















