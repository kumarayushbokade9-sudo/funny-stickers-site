body 
    font-family: 'Quicksand', sans-serif;
    background: linear-gradient(135deg, #a8edea, #fed6e3, #d299c2);
    color: #333;
    margin: 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

header {
    text-align: center;
    margin-bottom: 30px;
}

h1 {
    font-size: 2.5em;
    color: #ff9ff3;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
}

.sticker-maker {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    padding: 25px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.15);
    backdrop-filter: blur(15px);
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 500px;
    width: 100%;
}

canvas {
    border: 3px solid #ddd;
    border-radius: 15px;
    margin-bottom: 20px;
    cursor: crosshair;
}

.controls {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;
}

button, input, select {
    padding: 12px 15px;
    border: none;
    border-radius: 10px;
    font-size: 1em;
    cursor: pointer;
    transition: all 0.3s ease;
}

button {
    background: linear-gradient(45deg, #74b9ff, #0984e3);
    color: white;
}

button:hover {
    background: linear-gradient(45deg, #0984e3, #74b9ff);
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

input, select {
    background: #f8f9fa;
    border: 1px solid #ccc;
}

input:focus, select:focus {
    outline: none;
    border-color: #74b9ff;
    box-shadow: 0 0 5px rgba(116, 185, 255, 0.5);
}

.joke-section {
    text-align: center;
    margin-top: 20px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

#jokeText {
    font-style: italic;
    color: #6c5ce7;
}

@media (max-width: 600px) {
    .controls {
        flex-direction: column;
        align-items: center;
    }
    canvas {
        width: 100%;
        height: auto;
    }
}
