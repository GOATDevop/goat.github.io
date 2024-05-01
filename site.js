document.addEventListener('DOMContentLoaded', function() {
            const connectButton = document.getElementById('connectWallet');
            
            // Verificar se o objeto solana está no escopo global e se a extensão Phantom está instalada
            if (window.solana && window.solana.isPhantom) {
                console.log('Phantom wallet found!');

                connectButton.addEventListener('click', async () => {
                    try {
                        // Solicitar conexão à carteira
                        const response = await window.solana.connect({ onlyIfTrusted: false });
                        console.log('Connected with Public Key:', response.publicKey.toString());

                        // Configurar a conexão com a rede principal da Solana (mainnet-beta)
                        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'), 'confirmed');

                        // Obter o saldo da carteira em lamports
                        const balance = await connection.getBalance(new solanaWeb3.PublicKey(response.publicKey));
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


document.addEventListener('DOMContentLoaded', function() {
    const logo = document.getElementById('draggableLogo');

    logo.addEventListener('mousedown', function(event) {
        event.preventDefault();

        let shiftX = event.clientX - logo.getBoundingClientRect().left;
        let shiftY = event.clientY - logo.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            logo.style.left = pageX - shiftX + 'px';
            logo.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        logo.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', onMouseMove);
            logo.removeEventListener('mouseup', this);
        });
    });

    logo.addEventListener('dragstart', function() {
        return false; // Impede a ação de arrastar nativa do navegador
    });
});











