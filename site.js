const connectWalletButton = document.getElementById('connectWallet');

connectWalletButton.addEventListener('click', async () => {
    try {
        const provider = window.solana;
        if (provider && provider.isPhantom) {
            console.log('Phantom wallet found!');
            const response = await provider.connect();
            console.log('Connected with Public Key:', response.publicKey.toString());
            alert('Carteira conectada: ' + response.publicKey.toString());
        } else {
            alert('Carteira Phantom não encontrada. Por favor, instale a carteira Phantom.');
        }
    } catch (error) {
        console.error('Erro ao conectar a carteira:', error);
        alert('Erro ao conectar a carteira. Veja o console para mais detalhes.');
    }
});










