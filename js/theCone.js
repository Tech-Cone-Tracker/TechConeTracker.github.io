//get canvas element from HTML file
const canvas = document.getElementById("glCanvas");

//initialize context
let gl = canvas.getContext("webgl");

//check if gl works
if (!gl) {
    console.log("WebGL not supported, falling back on experimental-webgl");
    gl = canvas.getContext("experimental-webgl");
}

//set clear color to white
//clear color buffer(stores color values for each pixel)
gl.clearColor(1.0, 1.0, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

//vertex shader: responsible for processing vetex data before ratserization (conversion into pixels)
const vertexShaderSource = `
    attribute vec2 coordinates;
    void main(void) {
        gl_Position = vec4(coordinates, 0.0, 1.0);
    }
`;

//fragment shader: program that runs on GPU to calculate color of fragments, that correspond to pixels. Takes information from vertex shader and converts that into color data per pixel
const fragmentShaderSource = `
    void main(void) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // Black color
    }
`;

//creates shader object and assigns reference to variable
//attaches source code for vertex shadcer to shader object
//compiles vertex shader source code into executable code
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);

const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

// Function to draw a line
function drawLine(x1, y1, x2, y2) {
    //math: standard HTML canvas = (0,canvas.width)+(0,canvas.height). x1/width normalizees to (0,1). Multiplying 2 - 1 normalizes it to (-1,1)
    //y: similar, but inverts (canvas.y=0 == NDC.y=1)
    //NDC: Normalized Device Coordinates, coordinate system in computer graphics (-1,1)
    const x1NDC = (x1 / canvas.width) * 2 - 1; 
    const y1NDC = 1 - (y1 / canvas.height) * 2;
    const x2NDC = (x2 / canvas.width) * 2 - 1;
    const y2NDC = 1 - (y2 / canvas.height) * 2;
    //array contains NDC for two points of the line
    const lineVertices = new Float32Array([
        x1NDC, y1NDC,
        x2NDC, y2NDC,
    ]);

    //creates buffer to hold vertex data
    //
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, lineVertices, gl.STATIC_DRAW);

    // Bind the buffer and enable the vertex attribute
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const coord = gl.getAttribLocation(shaderProgram, "coordinates");
    gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);

    // Draw the line
    gl.drawArrays(gl.LINES, 0, 2);
}

// Clear the canvas and draw the timeline
gl.clear(gl.COLOR_BUFFER_BIT);
drawLine(50, 240, 590, 240); // Draw the main timeline
