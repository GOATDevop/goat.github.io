document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('connectBtn');
    // Inicializa a interface com base nos dados do localStorage
    updateUIFromStorage();

    function updateUIFromStorage() {
        const connected = localStorage.getItem('isConnected') === 'true';
        const address = localStorage.getItem('walletAddress');
        updateUI(connected, address);
        button.textContent = connected ? 'Disconnect from Phantom': 'Connect Wallet';
    }

    function isPhantomInstalled() {
        return window.solana && window.solana.isPhantom;
    }

    // Função para conectar à carteira Phantom
    async function connectWallet() {
        if (!isPhantomInstalled()) {
            console.error('Phantom wallet is not installed.');
            alert('Please install Phantom wallet.');
            return;
        }

        try {
            const response = await window.solana.connect({ onlyIfTrusted: false });
            console.log('Connected to Phantom Wallet:', response.publicKey.toString());
            button.textContent = 'Disconnect from Phantom';
            localStorage.setItem('isConnected', 'true');
            localStorage.setItem('walletAddress', response.publicKey.toString());
            updateUI(true, response.publicKey.toString());
        } catch (error) {
            if (error.message.includes("User rejected the request")) {
                alert("Connection request was rejected. Please allow the connection in your Phantom wallet.");
            } else {
                console.error('Failed to connect:', error);
            }
        }
    }
    
    // Função para desconectar da carteira Phantom
    async function disconnectWallet() {
        await window.solana.disconnect();
        console.log('Disconnected from Phantom Wallet');
        button.textContent = 'Connect Wallet';
        localStorage.removeItem('isConnected');
        localStorage.removeItem('walletAddress');
        updateUI(false);
    }

    // Atualiza o status da carteira e o endereço na página
    function updateUI(isConnected, address = null) {
    const statusElement = document.getElementById('status');
    const addressElement = document.getElementById('walletAddress');    
    const infoDisplay = document.getElementById('infoDisplay');

    if (isConnected) {
        statusElement.textContent = 'Status: Connected';
        addressElement.textContent = 'Address: ' + address;
        infoDisplay.style.display = 'block'; // Mostra o infoDisplay quando conectado
    } else {
        infoDisplay.style.display = 'none'; // Oculta quando não conectado
    }
}

    // Listener para o botão
    button.addEventListener('click', async () => {
        if (button.textContent === 'Connect Wallet') {
            await connectWallet();
        } else {
            await disconnectWallet();
        }
    });

    const mediaFiles = ['goat.gif', 'goat1.gif'];
    const carouselContainer = document.querySelector('.carousel-images');
    let currentIndex = 0;

    function updateCarousel() {
        carouselContainer.innerHTML = ''; // Limpa o conteúdo anterior
        const fileElement = document.createElement(mediaFiles[currentIndex].endsWith('.mp4') ? 'video' : 'img');
        fileElement.src = mediaFiles[currentIndex];
        if (fileElement.nodeName === 'VIDEO') {
            fileElement.autoplay = true;
            fileElement.loop = true;
        }
        carouselContainer.appendChild(fileElement);
    }

    updateCarousel(); // Carrega o primeiro item

    setInterval(() => {
        currentIndex = (currentIndex + 1) % mediaFiles.length; // Incrementa ou volta ao início
        updateCarousel();
    }, 5000); // Altera a imagem/vídeo a cada 5 segundos

    const startTime = new Date("may 07, 2024 18:50:00").getTime();
    const endTime = new Date("jun 3, 2024 15:00:00").getTime();
    const timerElement = document.getElementById('timer');
    const presaleLiveElement = document.getElementById('presaleLive');
    const linkElement = document.getElementById('presaleLink');
    const remainingTimeElement = document.getElementById('remainingTime');
    const startsInMessageElement = document.getElementById('startsInMessage');

    const interval = setInterval(function() {
        const now = new Date().getTime();
        let distance = startTime - now;

        if (distance > 0) {
            timerElement.textContent = formatTime(distance);
        } else {
            distance = endTime - now;
            if (distance > 0) {
                startsInMessageElement.style.display = "none";
                timerElement.textContent = formatTime(distance);
                presaleLiveElement.style.display = "block";
                linkElement.style.display = "block";
                remainingTimeElement.style.display = "block";
                remainingTimeElement.textContent = "Ends in: " + formatTime(distance);
            } else {
                clearInterval(interval);
                timerElement.textContent = "Presale has ended.";
                presaleLiveElement.textContent = "The presale is now offline.";
                linkElement.style.display = "none";
                remainingTimeElement.textContent = "Presale has ended.";
            }
        }
    }, 1000);
});

function formatTime(distance) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
}




















        















