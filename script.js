/* ... (keep your existing CSS) ... */

.upload-section {
    margin-bottom: 20px;
    text-align: center;
}

#uploadBtn {
    background: linear-gradient(45deg, #fd79a8, #e84393);
    color: white;
    padding: 12px 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 10px;
}

#uploadBtn:hover {
    background: linear-gradient(45deg, #e84393, #fd79a8);
    transform: scale(1.05);
}

.drop-zone {
    border: 2px dashed #ddd;
    border-radius: 10px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.8);
    color: #666;
    font-size: 1em;
    transition: all 0.3s ease;
    cursor: pointer;
}

.drop-zone.dragover {
    border-color: #74b9ff;
    background: rgba(116, 185, 255, 0.1);
    color: #0984e3;
}

/* ... (rest of your existing CSS) ... */
