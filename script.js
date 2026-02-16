document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('stickerCanvas');
    const ctx = canvas.getContext('2d');
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

    // Initialize canvas
    ctx.fillStyle = '#ffeaa7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.font = '20px Quicksand';
    ctx.fillText('Draw your funny sticker!', 120, 200);
    console.log('Canvas initialized.');

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
            ctx.fillStyle = colorPicker.value;
            ctx.font = `24px ${fontSelect.value}`;
            ctx.fillText(text, 50, 100 + Math.random() * 200);
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
        ctx.fillStyle = colorPicker.value;
        ctx.font = '40px Arial';
        ctx.fillText(emoji, 150 + Math.random() * 100, 150 + Math.random() * 100);
        playSound('emoji');
        console.log('Emoji added.');
    });

    // Add meme template
    addMemeBtn.addEventListener('click', () => {
        console.log('Add meme button clicked.');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, 50);
        ctx.fillStyle = '#000';
        ctx.font = '20px Impact';
        ctx.fillText('WHEN YOU CREATE A FUNNY STICKER', 20, 30);
        playSound('meme');
        console.log('Meme added.');
    });

    // Clear canvas
    clearBtn.addEventListener('click', () => {
        console.log('Clear button clicked.');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffeaa7';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
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
