/**
 * contact-bg.js
 * Custom Three.js background for the Contact page.
 * Creates an interconnected particle web that slowly rotates and responds slightly to mouse movement.
 */

// Scene setup
const canvas = document.getElementById('contact-canvas');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.0015);

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 40;

// Renderer setup
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Particle system configuration
const particleCount = 150;
const connectDistance = 15;

const particles = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particleCount * 3);
const particleVelocities = [];

// Initialize particles with random positions and velocities
for (let i = 0; i < particleCount; i++) {
    // Random position in a roughly spherical area
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    const radius = 25 + Math.random() * 15;

    particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);     // x
    particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta); // y
    particlePositions[i * 3 + 2] = radius * Math.cos(phi);                   // z

    // Random velocity
    particleVelocities.push({
        x: (Math.random() - 0.5) * 0.05,
        y: (Math.random() - 0.5) * 0.05,
        z: (Math.random() - 0.5) * 0.05
    });
}

particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

// Particle material
const particleMaterial = new THREE.PointsMaterial({
    color: 0x06b6d4, // Cyan
    size: 0.4,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

// Lines configuration (for connecting particles)
const linesMaterial = new THREE.LineBasicMaterial({
    color: 0x06b6d4,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending
});

// We'll update the line geometry in the animation loop
let lineGeometry = new THREE.BufferGeometry();
let linesMesh = new THREE.LineSegments(lineGeometry, linesMaterial);
scene.add(linesMesh);

// Mouse interaction
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX) * 0.05;
    mouseY = (event.clientY - windowHalfY) * 0.05;
});

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    
    const delta = clock.getDelta();

    // Smooth camera movement based on mouse
    targetX = mouseX * 0.5;
    targetY = mouseY * 0.5;
    
    camera.position.x += (targetX - camera.position.x) * 0.02;
    camera.position.y += (-targetY - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    // Rotate the entire system slowly
    particleSystem.rotation.y += 0.001;
    particleSystem.rotation.x += 0.0005;
    linesMesh.rotation.y = particleSystem.rotation.y;
    linesMesh.rotation.x = particleSystem.rotation.x;

    // Update particle positions
    const positions = particleSystem.geometry.attributes.position.array;
    
    // Arrays for lines
    const linePositions = [];
    
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const velocity = particleVelocities[i];

        // Move particles
        positions[i3] += velocity.x;
        positions[i3 + 1] += velocity.y;
        positions[i3 + 2] += velocity.z;

        // Keep them within a certain radius
        const dist = Math.sqrt(
            positions[i3] ** 2 + 
            positions[i3 + 1] ** 2 + 
            positions[i3 + 2] ** 2
        );

        if (dist > 45) {
            // Bounce back
            velocity.x *= -1;
            velocity.y *= -1;
            velocity.z *= -1;
        }

        // Check connections and build line array
        for (let j = i + 1; j < particleCount; j++) {
            const j3 = j * 3;
            
            const dx = positions[i3] - positions[j3];
            const dy = positions[i3 + 1] - positions[j3 + 1];
            const dz = positions[i3 + 2] - positions[j3 + 2];
            
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < connectDistance * connectDistance) {
                // Add line vertices
                linePositions.push(
                    positions[i3], positions[i3 + 1], positions[i3 + 2],
                    positions[j3], positions[j3 + 1], positions[j3 + 2]
                );
            }
        }
    }

    // Update line geometry
    linesMesh.geometry.dispose(); // Cleanup old geometry
    const newGeometry = new THREE.BufferGeometry();
    newGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    linesMesh.geometry = newGeometry;

    particleSystem.geometry.attributes.position.needsUpdate = true;

    // Pulse opacity effect
    const time = Date.now() * 0.001;
    particleMaterial.opacity = 0.5 + Math.sin(time) * 0.3;
    linesMaterial.opacity = 0.1 + Math.sin(time * 0.8) * 0.08;

    renderer.render(scene, camera);
}

// Start animation
animate();
