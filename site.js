const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'), 'confirmed');

// Função para conectar a carteira
async function connectWallet() {
    try {
        const provider = window.solana;
        if (provider) {
            if (!provider.isConnected) {
                await provider.connect();
            }
            console.log('Carteira conectada com o endereço:', provider.publicKey.toString());
            document.getElementById('status').innerText = 'Carteira conectada';
        } else {
            console.log('Por favor, instale uma carteira compatível com Solana.');
            document.getElementById('status').innerText = 'Por favor, instale uma carteira compatível com Solana.';
        }
    } catch (error) {
        console.error('Falha ao conectar a carteira:', error);
        document.getElementById('status').innerText = 'Falha ao conectar a carteira';
    }
}

document.getElementById('connectButton').addEventListener('click', connectWallet);





        















