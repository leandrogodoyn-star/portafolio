// ==========================================
// EFECTO DE ESTELA SUAVE DEL CURSOR
// ==========================================

(function() {
    'use strict';
    
    // Crear el cursor principal
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    document.body.appendChild(cursor);
    
    // Configuración
    const config = {
        maxTrails: 10,        // Cantidad de puntos en la estela (5-15 recomendado)
        smoothness: 0.18,     // Suavidad del movimiento (0.1-0.3)
        trailSmoothness: 0.25 // Suavidad de la estela (0.2-0.4)
    };
    
    // Crear puntos de la estela
    const trails = [];
    for (let i = 0; i < config.maxTrails; i++) {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: ${6 - (i * 0.5)}px;
            height: ${6 - (i * 0.5)}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, ${0.7 - (i * 0.07)});
            pointer-events: none;
            z-index: ${9998 - i};
            transition: all 0.15s ease-out;
        `;
        document.body.appendChild(trail);
        trails.push({ 
            element: trail, 
            x: 0, 
            y: 0 
        });
    }
    
    // Variables de posición
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    // Detectar movimiento del mouse
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Efecto hover en elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Animación principal
    function animate() {
        // Suavizar movimiento del cursor principal
        currentX += (mouseX - currentX) * config.smoothness;
        currentY += (mouseY - currentY) * config.smoothness;
        
        cursor.style.left = currentX + 'px';
        cursor.style.top = currentY + 'px';
        
        // Actualizar estela
        trails.forEach((trail, index) => {
            const prevTrail = index === 0 
                ? { x: currentX, y: currentY } 
                : trails[index - 1];
            
            trail.x += (prevTrail.x - trail.x) * config.trailSmoothness;
            trail.y += (prevTrail.y - trail.y) * config.trailSmoothness;
            
            trail.element.style.left = trail.x + 'px';
            trail.element.style.top = trail.y + 'px';
        });
        
        requestAnimationFrame(animate);
    }
    
    // Iniciar animación cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', animate);
    } else {
        animate();
    }
    
    // Ocultar cursor al salir de la ventana
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        trails.forEach(trail => trail.element.style.opacity = '0');
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        trails.forEach((trail, index) => {
            trail.element.style.opacity = 0.7 - (index * 0.07);
        });
    });
    
})();
