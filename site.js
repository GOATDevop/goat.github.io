let walletConnected = false;
const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'));

async function connectWallet() {
    try {
        const providerUrl = 'https://www.sollet.io';
        const wallet = new web3.Wallet(providerUrl);
        await wallet.connect();
        walletConnected = true;
        document.getElementById('status').innerText = 'Wallet connected';
        document.getElementById('connectButton').innerText = 'Disconnect Wallet';
    } catch (error) {
        console.error('Connection failed:', error);
    }
}

async function disconnectWallet() {
    try {
        // Assumes wallet disconnect method exists, adjust based on actual wallet API
        await wallet.disconnect();
        walletConnected = false;
        document.getElementById('status').innerText = 'Wallet disconnected';
        document.getElementById('connectButton').innerText = 'Connect Wallet';
    } catch (error) {
        console.error('Disconnection failed:', error);
    }
}

document.getElementById('connectButton').addEventListener('click', () => {
    if (walletConnected) {
        disconnectWallet();
    } else {
        connectWallet();
    }
});




        















