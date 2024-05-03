import { Connection, PublicKey, clusterApiUrl } from 'https://cdn.skypack.dev/@solana/web3.js';

document.addEventListener('DOMContentLoaded', function() {
    const connectButton = document.getElementById('connectWallet');
    
    if (window.solana && window.solana.isPhantom) {
        console.log('Phantom wallet found!');

        connectButton.addEventListener('click', async () => {
            try {
                const response = await window.solana.connect({ onlyIfTrusted: false });
                console.log('Connected with Public Key:', response.publicKey.toString());

                const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
                const balance = await connection.getBalance(new PublicKey(response.publicKey));
                console.log('Wallet balance:', balance);

                alert(`Wallet connected! Your balance is ${balance} lamports.`);
            } catch (err) {
                console.error(err);
                alert('Connection failed: ' + err.message);
            }
        });
    } else {
        console.log('Phantom wallet not found! Please install it.');
        connectButton.textContent = 'Phantom Wallet Not Found';
        connectButton.disabled = true;
    }
});

        















