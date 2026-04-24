// Función de apoyo para dibujar un píxel individual
function drawPixel(ctx, x, y, color = "#000000") {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

/**
 * Implementación del algoritmo de Bresenham para líneas.
 * @param {number} x0, y0 - Coordenadas iniciales
 * @param {number} x1, y1 - Coordenadas finales
 * @returns {void}
 */
function bresenhamLine(x0, y0, x1, y1, color) {
    //Se coloca para poner los puntos
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        drawPixel(ctx, x0, y0, color);

        if (x0 === x1 && y0 === y1) break;
        
        let e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}
/**
 * Implementación del algoritmo de Punto Medio para circunferencias.
 * Utiliza simetría de ocho puntos.
 */
function drawCircle(centerX, centerY, radius, color) {
    let x = 0;
    let y = radius;
    let p = 1 - radius; //El parametro p es de la decision inicial, se utiliza para hallar e punto medio
    
    // Función auxiliar que sirve para dibujar los 8 puntos simétricos
    const plotCirclePoints = (cx, cy, x, y, color) => {
        //Se implementa drawpixel para colocar los 8 puntos simetricos que debe tener la circunferencia y los dibuje en el canva.
        drawPixel(ctx, cx + x, cy + y, color);
        drawPixel(ctx, cx - x, cy + y, color);
        drawPixel(ctx, cx + x, cy - y, color);
        drawPixel(ctx, cx - x, cy - y, color);
        drawPixel(ctx, cx + y, cy + x, color);
        drawPixel(ctx, cx - y, cy + x, color);
        drawPixel(ctx, cx + y, cy - x, color);
        drawPixel(ctx, cx - y, cy - x, color);

    plotCirclePoints(centerX, centerY, x, y, color);

    while (x < y) {
        x++;
        /* Aquí se evalua si hay error para entonces continuar con la siguiente línea*/
        if (p < 0) {
            p += 2 * x + 1;
        } else {
            y--;
            p += 2 * (x - y) + 1;
        }
        plotCirclePoints(centerX, centerY, x, y, color);
    }
    };

}

/**
 * Calcula los vértices de un polígono regular.
 * @param {number} centerX, centerY - Centro
 * @param {number} sides - Número de lados
 * @param {number} radius - Radio
 * @returns {Array} Arreglo de objetos {x, y}
 */
function getPolygonVertices(centerX, centerY, sides, radius) {
   
    //Se utiliza el círculo unitario multiplicado por el radio 
    //para obtener las coordenadas cartesianas de cada vértice. 
    //Es dividido por sides que es el numero de lados
    
    const vertices = [];
    const angleStep = (2 * Math.PI) / sides;

    for (let i = 0; i < sides; i++) {
        const angle = i * angleStep;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        vertices.push({ x: x, y: y });
    }
    
    return vertices;
}
