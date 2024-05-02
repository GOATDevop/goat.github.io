import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

document.addEventListener('DOMContentLoaded', function() {
    const connectButton = document.getElementById('connectWallet');
    
    if (window.solana && window.solana.isPhantom) {
        console.log('Phantom wallet found!');

        connectButton.addEventListener('click', async () => {
            try {
                const response = await window.solana.connect({ onlyIfTrusted: false });
                console.log('Connected with Public Key:', response.publicKey.toString());

                const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'), 'confirmed');
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


        let scene, camera, renderer, textureLoader, material, plane;

        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            textureLoader = new THREE.TextureLoader();
            material = new THREE.MeshBasicMaterial({
                map: textureLoader.load('logo.png'), // Substitua 'seu_logo.png' pelo caminho do seu logo
                side: THREE.DoubleSide
            });

            plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 3), material);
            scene.add(plane);

            camera.position.z = 10;

            animate();
        }

        function animate() {
            requestAnimationFrame(animate);
            plane.rotation.y += 0.01; // Ajuste esse valor para mudar a velocidade de rotação
            renderer.render(scene, camera);
        }

        window.addEventListener('resize', onWindowResize, false);

        function onWindowResize(){
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        init();















