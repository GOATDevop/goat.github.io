const walletButton = document.getElementById('walletButton');
let walletConnected = false;

walletButton.addEventListener('click', () => {
    if (!walletConnected) {
        connectWallet();
    } else {
        disconnectWallet();
    }
});

async function connectWallet() {
    try {
        const provider = window.solana;
        if (provider) {
            const response = await window.solana.connect();
            walletConnected = true;
            walletButton.textContent = 'Desconectar Carteira';
            console.log('Wallet address:', response.publicKey.toString());
        } else {
            alert('Por favor, instale uma carteira Solana (como Phantom) e recarregue a página.');
        }
    } catch (error) {
        console.error(error);
        alert('Falha ao conectar a carteira.');
    }
}

function disconnectWallet() {
    window.solana.disconnect();
    walletConnected = false;
    walletButton.textContent = 'Conectar Carteira';
}








