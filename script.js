/*
Reto: Desarrollar un script en JavaScript que, al cargar la página,
genere automáticamente una figura compuesta por un polígono regular de n lados 
(donde n es un número aleatorio entre 5 y 10). En cada vértice del polígono, 
se debe trazar una circunferencia de radio R/4 (donde R es el radio del polígono). 
Todo el trazado debe realizarse píxel a píxel.
----------
 Universidad - Facultad de Ingeniería
 Asignatura: Introducción a la Computación Gráfica
 Estudiante: ISABELLA SCARPETTA ESCOBAR

*/
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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
    let p = 1 - radius; //El parametro p es de la decision inicial, se utiliza para hallar el punto medio
    
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
        plot(x, y);
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
//Función principal para integrar la composición geométrica.
 
function init() {//Función para inicializar. El canva queda centrado 
    const centerX = canvas.width / 2; 
    const centerY = canvas.height / 2;
    const R = 200; // Radio del polígono a cada vertice del poligono 
    const n = Math.floor(Math.random() * (10 - 5 + 1)) + 5; // n aleatorio entre 5 y 10, se pone math.floor para que sea aleatorio

    console.log(`Generando polígono de #{n} lados con n aleatorio.`);

    //Llamar a los vertices
    const vertices = getPolygonVertices(centerX, centerY, n, R);

    //Aquí se inicia el for para empezar a conectar el primer vertice con el ultimo y de esta manera general el circulo
    for (let i = 0; i < n; i++) {
        const start = vertices[i];
        const end = vertices[(i + 1) % n];
        
        bresenhamLine(start.x, start.y, end.x, end.y, "#2c3e50"); //Dibujua la linea
    }

    // La circunferencia que nos pide es de R/4 entonces se empieza a trazar cada línea
    const circleRadius = R / 4;
    vertices.forEach(v => {
        drawCircle(v.x, v.y, circleRadius, "#e74c3c");
    });
    
}
// Ejecutar al cargar la ventana
window.onload = init;   
// Link chatgpt: https://chatgpt.com/share/69eb9242-b2ac-83e9-8a29-a150b547f5e9


