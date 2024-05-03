document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('connectBtn');
    button.textContent = 'Connect Wallet'; // Define o texto inicial do botão

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
            const response = await window.solana.connect({ onlyIfTrusted: false });
            console.log('Connected to Phantom Wallet:', response.publicKey.toString());
            button.textContent = 'Disconnect from Phantom';
        } catch (error) {
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
        console.log('Disconnected from Phantom Wallet');
        button.textContent = 'Connect Wallet';
    }

    // Listener para o botão
    button.addEventListener('click', async () => {
        if (button.textContent === 'Connect Wallet') {
            await connectWallet();
        } else {
            await disconnectWallet();
        }
    });

    // Atualiza o status da carteira e o endereço na página
function updateUI(isConnected, address = null) {
    const statusElement = document.getElementById('status');
    const addressElement = document.getElementById('walletAddress');

    if (isConnected) {
        statusElement.textContent = 'Status: Connected';
        addressElement.textContent = 'Address: ' + address;
    } else {
        statusElement.textContent = 'Status: Disconnected';
        addressElement.textContent = 'Address: N/A';
    }
}

// Adicionando chamadas à função updateUI dentro das funções connectWallet e disconnectWallet
async function connectWallet() {
    if (!isPhantomInstalled()) {
        console.error('Phantom wallet is not installed.');
        alert('Please install Phantom wallet.');
        return;
    }

    try {
        const response = await window.solana.connect({ onlyIfTrusted: false });
        console.log('Connected to Phantom Wallet:', response.publicKey.toString());
        button.textContent = 'Disconnect from Phantom';
        updateUI(true, response.publicKey.toString()); // Atualiza a UI após a conexão
    } catch (error) {
        if (error.message.includes("User rejected the request")) {
            alert("Connection request was rejected. Please allow the connection in your Phantom wallet.");
        } else {
            console.error('Failed to connect:', error);
        }
    }
}

async function disconnectWallet() {
    await window.solana.disconnect();
    console.log('Disconnected from Phantom Wallet');
    button.textContent = 'Connect Wallet';
    updateUI(false); // Atualiza a UI após a desconexão
}

});


















        















