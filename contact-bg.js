/**
 * contact-bg.js
 * Custom Three.js background for the Contact page.
 * Creates an interconnected particle web that slowly rotates and responds slightly to mouse movement.
 * Updated for SPA architecture.
 */

window.contactBgState = {
    animationId: null,
    scene: null,
    camera: null,
    renderer: null,
    particles: null,
    linesMesh: null,
    isInitialized: false
};

window.initContactBg = function() {
    const canvas = document.getElementById('contact-canvas');
    if (!canvas) return;
    
    // Prevent multiple initializations
    if (window.contactBgState.isInitialized) return;
    window.contactBgState.isInitialized = true;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0015);
    window.contactBgState.scene = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 40;
    window.contactBgState.camera = camera;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    window.contactBgState.renderer = renderer;

    const particleCount = 150;
    const connectDistance = 15;

    const particles = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = [];

    for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const radius = 25 + Math.random() * 15;

        particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        particlePositions[i * 3 + 2] = radius * Math.cos(phi);

        particleVelocities.push({
            x: (Math.random() - 0.5) * 0.05,
            y: (Math.random() - 0.5) * 0.05,
            z: (Math.random() - 0.5) * 0.05
        });
    }

    particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
        color: 0x06b6d4, // Cyan
        size: 0.4,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    window.contactBgState.particles = particleSystem;

    const linesMaterial = new THREE.LineBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending
    });

    let lineGeometry = new THREE.BufferGeometry();
    let linesMesh = new THREE.LineSegments(lineGeometry, linesMaterial);
    scene.add(linesMesh);
    window.contactBgState.linesMesh = linesMesh;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onMouseMove = (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.05;
        mouseY = (event.clientY - windowHalfY) * 0.05;
    };
    document.addEventListener('mousemove', onMouseMove);
    window.contactBgState.onMouseMove = onMouseMove;

    const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);
    window.contactBgState.onResize = onResize;

    const clock = new THREE.Clock();

    function animate() {
        window.contactBgState.animationId = requestAnimationFrame(animate);
        
        const delta = clock.getDelta();

        targetX = mouseX * 0.5;
        targetY = mouseY * 0.5;
        
        camera.position.x += (targetX - camera.position.x) * 0.02;
        camera.position.y += (-targetY - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        particleSystem.rotation.y += 0.001;
        particleSystem.rotation.x += 0.0005;
        linesMesh.rotation.y = particleSystem.rotation.y;
        linesMesh.rotation.x = particleSystem.rotation.x;

        const positions = particleSystem.geometry.attributes.position.array;
        const linePositions = [];
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const velocity = particleVelocities[i];

            positions[i3] += velocity.x;
            positions[i3 + 1] += velocity.y;
            positions[i3 + 2] += velocity.z;

            const dist = Math.sqrt(
                positions[i3] ** 2 + 
                positions[i3 + 1] ** 2 + 
                positions[i3 + 2] ** 2
            );

            if (dist > 45) {
                velocity.x *= -1;
                velocity.y *= -1;
                velocity.z *= -1;
            }

            for (let j = i + 1; j < particleCount; j++) {
                const j3 = j * 3;
                
                const dx = positions[i3] - positions[j3];
                const dy = positions[i3 + 1] - positions[j3 + 1];
                const dz = positions[i3 + 2] - positions[j3 + 2];
                
                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < connectDistance * connectDistance) {
                    linePositions.push(
                        positions[i3], positions[i3 + 1], positions[i3 + 2],
                        positions[j3], positions[j3 + 1], positions[j3 + 2]
                    );
                }
            }
        }

        linesMesh.geometry.dispose();
        const newGeometry = new THREE.BufferGeometry();
        newGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        linesMesh.geometry = newGeometry;

        particleSystem.geometry.attributes.position.needsUpdate = true;

        const time = Date.now() * 0.001;
        particleMaterial.opacity = 0.5 + Math.sin(time) * 0.3;
        linesMaterial.opacity = 0.1 + Math.sin(time * 0.8) * 0.08;

        renderer.render(scene, camera);
    }

    animate();
};

window.destroyContactBg = function() {
    if (!window.contactBgState.isInitialized) return;
    
    if (window.contactBgState.animationId) {
        cancelAnimationFrame(window.contactBgState.animationId);
    }
    
    if (window.contactBgState.onMouseMove) {
        document.removeEventListener('mousemove', window.contactBgState.onMouseMove);
    }
    
    if (window.contactBgState.onResize) {
        window.removeEventListener('resize', window.contactBgState.onResize);
    }
    
    if (window.contactBgState.renderer) {
        window.contactBgState.renderer.dispose();
    }
    
    // reset state
    window.contactBgState = {
        animationId: null,
        scene: null,
        camera: null,
        renderer: null,
        particles: null,
        linesMesh: null,
        isInitialized: false
    };
};

// Initial run if loaded directly on contact page
if (window.location.pathname.includes('contact.html')) {
    document.addEventListener("DOMContentLoaded", window.initContactBg);
}
