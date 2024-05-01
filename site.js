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











