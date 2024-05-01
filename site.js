const connectWalletButton = document.getElementById('connectWallet');

connectWalletButton.addEventListener('click', async () => {
    try {
        const provider = window.solana;
        if (!provider) {
            throw new Error('Nenhuma carteira compatível com Solana encontrada.');
        }

        if (provider.isPhantom) {
            const response = await provider.connect({ onlyIfTrusted: true });
            console.log('Conexão estabelecida com a chave pública:', response.publicKey.toString());
            alert('Carteira conectada: ' + response.publicKey.toString());
        } else {
            throw new Error('Carteira Phantom não detectada.');
        }
    } catch (error) {
        console.error('Erro ao conectar a carteira:', error);
        alert('Erro ao conectar a carteira: ' + error.message);
    }
});

async function getBalance(publicKey) {
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'), 'confirmed');
    const balance = await connection.getBalance(new solanaWeb3.PublicKey(publicKey));
    console.log('Saldo da conta:', balance);
    return balance;
}

async function sendTransaction(from, to, amount) {
    const transaction = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
            fromPubkey: new solanaWeb3.PublicKey(from),
            toPubkey: new solanaWeb3.PublicKey(to),
            lamports: amount
        })
    );

    const { blockhash } = await connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhash;
    // Assumir que o usuário irá assinar a transação com sua carteira
    const signed = await window.solana.signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction(signature);
    console.log('Transação enviada com sucesso, Signature:', signature);
}

function showLoading(message) {
    const loadingDiv = document.getElementById('loading');
    loadingDiv.textContent = message;
    loadingDiv.classList.add('show');
}

function hideLoading() {
    const loadingDiv = document.getElementById('loading');
    loadingDiv.classList.remove('show');
}










