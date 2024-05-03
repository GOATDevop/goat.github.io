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
            const response = await window.solana.connect({ onlyIfTrusted: true });
            console.log('Connected to Phantom Wallet:', response.publicKey.toString());
            button.textContent = 'Disconnect from Phantom';
            return true; // Indicar sucesso na conexão
        } catch (error) {
            console.error('Failed to connect:', error);
            return false; // Indicar falha na conexão
        }
    }

    // Função para desconectar da carteira Phantom
    async function disconnectWallet() {
        await window.solana.disconnect();
        button.textContent = 'Connect to Phantom';
        console.log('Disconnected from Phantom Wallet');
        return false; // Indicar que a carteira está desconectada
    }

    // Listener para o botão
    button.addEventListener('click', async () => {
        if (button.textContent.includes('Connect')) {
            if (await connectWallet()) {
                button.textContent = 'Disconnect from Phantom';
            }
        } else {
            if (await disconnectWallet()) {
                button.textContent = 'Connect to Phantom';
            }
        }
    });
});
















        















