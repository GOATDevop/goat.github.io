document.getElementById('connectWallet').addEventListener('click', async function() {
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

async function getTokenBalance(walletAddress, mintAddress) {
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'));
    let tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        new solanaWeb3.PublicKey(walletAddress),
        { mint: new solanaWeb3.PublicKey(mintAddress) }
    );

    if (tokenAccounts.value.length > 0) {
        let balance = tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount;
        console.log(`Saldo do token é: ${balance}`);
        return balance;
    } else {
        console.log("Nenhuma conta de token encontrada para este endereço.");
        return 0;
    }
}

async function sendTokenTransaction(fromWallet, toPublicKey, amount, mintAddress) {
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'), 'confirmed');
    const fromTokenAccount = await findAssociatedTokenAddress(fromWallet.publicKey, new solanaWeb3.PublicKey(mintAddress));
    const toTokenAccount = await findAssociatedTokenAddress(new solanaWeb3.PublicKey(toPublicKey), new solanaWeb3.PublicKey(mintAddress));

    const transaction = new solanaWeb3.Transaction().add(
        splToken.Token.createTransferInstruction(
            splToken.TOKEN_PROGRAM_ID,
            fromTokenAccount,
            toTokenAccount,
            fromWallet.publicKey,
            [],
            amount * LAMPORTS_PER_SOL // Ajustar de acordo com a decimalidade do token
        )
    );

    const signature = await solanaWeb3.sendAndConfirmTransaction(
        connection,
        transaction,
        [fromWallet],
        { commitment: 'confirmed' }
    );

    console.log(`Transação de token enviada com sucesso, Signature: ${signature}`);
}











