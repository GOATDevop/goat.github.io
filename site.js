document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('connectBtn');
    // Inicializa a interface com base nos dados do localStorage
    updateUIFromStorage();

    function updateUIFromStorage() {
        const connected = localStorage.getItem('isConnected') === 'true';
        const address = localStorage.getItem('walletAddress');
        updateUI(connected, address);
        button.textContent = connected ? 'Disconnect from Phantom' : 'Connect Wallet';
    }

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
            localStorage.setItem('isConnected', 'true');
            localStorage.setItem('walletAddress', response.publicKey.toString());
            updateUI(true, response.publicKey.toString());
        } catch (error) {
            if (error.message.includes("User rejected the request")) {
                alert("Connection request was rejected. Please allow the connection in your Phantom wallet.");
            } else {
                console.error('Failed to connect:', error);
            }
        }
    }

async function updateBalance(publicKey) {
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'), 'confirmed');
    const balance = await connection.getBalance(new solanaWeb3.PublicKey(publicKey));
    const solBalance = balance / solanaWeb3.LAMPORTS_PER_SOL; // Convertendo lamports para SOL
    const balanceElement = document.getElementById('walletBalance');
    balanceElement.textContent = `Balance: ${solBalance.toFixed(2)} SOL`;
}
    
    // Função para desconectar da carteira Phantom
    async function disconnectWallet() {
        await window.solana.disconnect();
        console.log('Disconnected from Phantom Wallet');
        button.textContent = 'Connect Wallet';
        localStorage.removeItem('isConnected');
        localStorage.removeItem('walletAddress');
        updateUI(false);
    }

    // Atualiza o status da carteira e o endereço na página
    function updateUI(isConnected, address = null) {
    const statusElement = document.getElementById('status');
    const addressElement = document.getElementById('walletAddress');
    const balanceElement = document.getElementById('walletBalance');    
    const infoDisplay = document.getElementById('infoDisplay');

    if (isConnected) {
        statusElement.textContent = 'Status: Connected';
        addressElement.textContent = 'Address: ' + address;
        infoDisplay.style.display = 'block'; // Mostra o infoDisplay quando conectado
    } else {
        infoDisplay.style.display = 'none'; // Oculta quando não conectado
        balanceElement.textContent = 'Balance: 0 SOL'; // Reseta o saldo
    }
}

    // Listener para o botão
    button.addEventListener('click', async () => {
        if (button.textContent === 'Connect Wallet') {
            await connectWallet();
        } else {
            await disconnectWallet();
        }
    });
});





















        















