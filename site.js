document.addEventListener('DOMContentLoaded', function () {
    // Verificando se o objeto solana está disponível
    if (typeof solana === 'undefined') {
        console.error('Solana is not defined. Please check if the library is loaded correctly.');
        return;
    }

    const button = document.getElementById('connectBtn');
    let walletConnected = false;

    // Criando uma instância de conexão Solana usando o objeto global correto
    const connection = new solana.Connection(
        solana.clusterApiUrl('mainnet-beta'), 'confirmed'
    );

    async function connectWallet() {
        try {
            // Exemplo: tentativa de obtenção da chave pública para conectar
            // Isto é apenas um exemplo e pode precisar de adaptação com métodos reais
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











        















