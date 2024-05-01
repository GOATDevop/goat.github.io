document.getElementById('connect-wallet').addEventListener('click', async function() {
    try {
        const solana = window.solana;

        if (solana && solana.isPhantom) {
            console.log("Phantom wallet found!");
            const response = await solana.connect({ onlyIfTrusted: true });
            console.log('Connected with public key:', response.publicKey.toString());
        } else {
            alert("Phantom wallet not found. Please install it.");
        }
    } catch (error) {
        console.error("Failed to connect", error);
        alert("An error occurred while connecting to the wallet.");
    }
});












