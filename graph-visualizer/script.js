function handleSubmit() {
    const nodeCount = parseInt(document.getElementById("nodeCount").value);
    const matrixRaw = document.getElementById("adjMatrix").value;
    const colorsRaw = document.getElementById("colors").value;
  
    localStorage.setItem("nodeCount", nodeCount);
    localStorage.setItem("adjMatrix", matrixRaw);
    localStorage.setItem("colors", colorsRaw);
  
    window.location.href = "graph.html";
  }
  
  function drawGraph() {
    const canvas = document.getElementById("graphCanvas");
    if (!canvas) return;
  
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
  
    const nodeCount = parseInt(localStorage.getItem("nodeCount"));
    const matrix = localStorage.getItem("adjMatrix")
      .split(";")
      .map(row => row.split(",").map(Number));
    const colors = localStorage.getItem("colors").split(",").map(Number);
  
    const radius = 200;
    const centerX = width / 2;
    const centerY = height / 2;
  
    const positions = [];
  
    // Draw nodes
    for (let i = 0; i < nodeCount; i++) {
      const angle = (2 * Math.PI * i) / nodeCount;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      positions.push({ x, y });
    }
  
    // Draw edges
    ctx.strokeStyle = "#888";
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (matrix[i][j] === 1) {
          ctx.beginPath();
          ctx.moveTo(positions[i].x, positions[i].y);
          ctx.lineTo(positions[j].x, positions[j].y);
          ctx.stroke();
        }
      }
    }
  
    // Draw nodes
    for (let i = 0; i < nodeCount; i++) {
      ctx.beginPath();
      ctx.arc(positions[i].x, positions[i].y, 20, 0, Math.PI * 2);
      ctx.fillStyle = colors[i] === 1 ? "black" : "white";
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.stroke();
  
      // Label nodes
      ctx.fillStyle = colors[i] === 1 ? "white" : "black";
      ctx.fillText(i, positions[i].x - 5, positions[i].y + 4);
    }
  }
  
  window.onload = drawGraph;
  