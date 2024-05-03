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
            // Solicita a conexão à carteira Phantom com configuração para sempre mostrar o popup de permissão
            const response = await window.solana.connect({ onlyIfTrusted: false });
            console.log('Connected to Phantom Wallet:', response.publicKey.toString());
            button.textContent = 'Disconnect from Phantom';
        } catch (error) {
            // Tratamento específico para a rejeição do usuário
            if (error.message.includes("User rejected the request")) {
                alert("Connection request was rejected. Please allow the connection in your Phantom wallet.");
            } else {
                console.error('Failed to connect:', error);
            }
        }
    }

    // Função para desconectar da carteira Phantom
    async function disconnectWallet() {
        await window.solana.disconnect();
        button.textContent = 'Connect to Phantom';
        console.log('Disconnected from Phantom Wallet');
    }

    // Listener para o botão
    button.addEventListener('click', async () => {
        if (button.textContent === 'Connect to Phantom') {
            await connectWallet();
        } else {
            await disconnectWallet();
        }
    });
});

















        















