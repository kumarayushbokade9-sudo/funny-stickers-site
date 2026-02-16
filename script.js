document.addEventListener('DOMContentLoaded', () => {
    // Initialize Fabric.js canvas
    const canvas = new fabric.Canvas('stickerCanvas', {
        backgroundColor: '#ffeaa7',
        width: 400,
        height: 400
    });

    // Add initial text
    const initialText = new fabric.Text('Draw your funny sticker!', {
        left: 120,
        top: 200,
        fontSize: 20,
        fontFamily: 'Quicksand',
        fill: '#000'
    });
    canvas.add(initialText);
    console.log('Fabric.js canvas initialized.');

    // Elements
    const textInput = document.getElementById('textInput');
    const fontSelect = document.getElementById('fontSelect');
    const colorPicker = document.getElementById('colorPicker');
    const addTextBtn = document.getElementById('addTextBtn');
    const addEmojiBtn = document.getElementById('addEmojiBtn');
    const addMemeBtn = document.getElementById('addMemeBtn');
    const clearBtn = document.getElementById('clearBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const jokeText = document.getElementById('jokeText');
    const newJokeBtn = document.getElementById('newJokeBtn');
    const imageUpload = document.getElementById('imageUpload');
    const uploadBtn = document.getElementById('uploadBtn');
    const dropZone = document.getElementById('dropZone');

    // Load initial joke
    fetchJoke();

    function fetchJoke() {
        fetch('https://icanhazdadjoke.com/', { headers: { 'Accept': 'application/json' } })
            .then(response => {
                if (!response.ok) throw new Error('Joke fetch failed');
                return response.json();
            })
            .then(data => {
                jokeText.textContent = data.joke;
                console.log('Joke loaded:', data.joke);
            })
            .catch(error => {
                console.error('Joke error:', error);
                jokeText.textContent = 'Why did the scarecrow win an award? Because he was outstanding in his field!';
            });
    }

    newJokeBtn.addEventListener('click', () => {
        console.log('New joke button clicked.');
        fetchJoke();
    });

    // Add text
    addTextBtn.addEventListener('click', () => {
        console.log('Add text button clicked.');
        const text = textInput.value;
        if (text) {
            const fabricText = new fabric.Text(text, {
                left: 50,
                top: 100 + Math.random() * 200,
                fontSize: 24,
                fontFamily: fontSelect.value,
                fill: colorPicker.value,
                selectable: true // Allows dragging
            });
            canvas.add(fabricText);
            textInput.value = '';
            playSound('add');
            console.log('Text added to canvas.');
        } else {
            console.log('No text entered.');
        }
    });

    // Add random emoji
    addEmojiBtn.addEventListener('click', () => {
        console.log('Add emoji button clicked.');
        const emojis = ['😂', '🤣', '😜', '🤪', '🥳'];
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        const fabricEmoji = new fabric.Text(emoji, {
            left: 150 + Math.random() * 100,
            top: 150 + Math.random() * 100,
            fontSize: 40,
            fontFamily: 'Arial',
            fill: colorPicker.value,
            selectable: true
        });
        canvas.add(fabricEmoji);
        playSound('emoji');
        console.log('Emoji added.');
    });

    // Add meme template
    addMemeBtn.addEventListener('click', () => {
        console.log('Add meme button clicked.');
        const memeRect = new fabric.Rect({
            left: 0,
            top: 0,
            width: canvas.width,
            height: 50,
            fill: '#fff'
        });
        const memeText = new fabric.Text('WHEN YOU CREATE A FUNNY STICKER', {
            left: 20,
            top: 15,
            fontSize: 20,
            fontFamily: 'Impact',
            fill: '#000',
            selectable: true
        });
        canvas.add(memeRect);
        canvas.add(memeText);
        playSound('meme');
        console.log('Meme added.');
    });

    // Clear canvas
    clearBtn.addEventListener('click', () => {
        console.log('Clear button clicked.');
        canvas.clear();
        canvas.setBackgroundColor('#ffeaa7', canvas.renderAll.bind(canvas));
        playSound('clear');
        console.log('Canvas cleared.');
    });

    // Download
    downloadBtn.addEventListener('click', () => {
        console.log('Download button clicked.');
        const link = document.createElement('a');
        link.download = 'funny-sticker.png';
        link.href = canvas.toDataURL();
        link.click();
        playSound('download');
        console.log('Sticker downloaded.');
    });

    // Upload image
    uploadBtn.addEventListener('click', () => {
        imageUpload.click();
    });

    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
            const reader = new FileReader();
            reader.onload = (event) => {
                fabric.Image.fromURL(event.target.result, (img) => {
                    img.set({
                        left: 100,
                        top: 100,
                        scaleX: 0.5,
                        scaleY: 0.5,
                        selectable: true // Enables dragging and resizing
                    });
                    canvas.add(img);
                    canvas.renderAll();
                    console.log('Image uploaded and added to canvas.');
                });
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file under 5MB.');
        }
    });

    // Drag-and-drop for images
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
            const reader = new FileReader();
            reader.onload = (event) => {
                fabric.Image.fromURL(event.target.result, (img) => {
                    img.set({
                        left: 100,
                        top: 100,
                        scaleX: 0.5,
                        scaleY: 0.5,
                        selectable: true
                    });
                    canvas.add(img);
                    canvas.renderAll();
                    console.log('Image dropped and added to canvas.');
                });
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please drop a valid image file under 5MB.');
        }
    });

    // Simple sound effects
    function playSound(type) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.frequency.setValueAtTime(type === 'add' ? 800 : type === 'emoji' ? 600 : type === 'meme' ? 400 : 200, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
            console.log('Sound played for:', type);
        } catch (error) {
            console.error('Sound error:', error);
        }
    }
});
