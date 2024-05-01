document.addEventListener('DOMContentLoaded', function() {
    const connectButton = document.getElementById('connectWallet');

    if ('solana' in window) {
        const provider = window.solana;
        if (provider.isPhantom) {
            console.log('Phantom wallet found!');
            
            connectButton.addEventListener('click', async () => {
                try {
                    const response = await window.solana.connect();
                    console.log('Connected with Public Key:', response.publicKey.toString());
                    alert('Wallet connected!');
                } catch (err) {
                    console.error(err);
                    alert('Connection failed!');
                }
            });
        }
    } else {
        console.log('Solana object not found! Get a Phantom Wallet.');
        connectButton.textContent = 'No wallet found';
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











