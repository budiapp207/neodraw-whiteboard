const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let drawing = false;
let history = [];
let redoStack = [];
let erasing = false;

function resize(){
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
window.addEventListener("resize", resize);
resize();

function saveState(){
  history.push(canvas.toDataURL());
  if(history.length > 50) history.shift();
  redoStack = [];
}

canvas.addEventListener("mousedown", e=>{
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousemove", e=>{
  if(!drawing) return;

  ctx.lineWidth = size.value;
  ctx.lineCap = "round";
  ctx.strokeStyle = erasing ? "#fff" : color.value;

  if(brush.value === "neon"){
    ctx.shadowColor = color.value;
    ctx.shadowBlur = 20;
  } else {
    ctx.shadowBlur = 0;
  }

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});

canvas.addEventListener("mouseup", ()=>{
  drawing = false;
  ctx.shadowBlur = 0;
  saveState();
});

document.getElementById("eraser").onclick = ()=>{
  erasing = !erasing;
};

document.getElementById("clear").onclick = ()=>{
  ctx.clearRect(0,0,canvas.width,canvas.height);
  history = [];
  redoStack = [];
};

document.getElementById("undo").onclick = ()=>{
  if(history.length < 1) return;
  redoStack.push(history.pop());
  let img = new Image();
  img.onload = ()=>ctx.drawImage(img,0,0);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if(history.length) img.src = history[history.length-1];
};

document.getElementById("redo").onclick = ()=>{
  if(!redoStack.length) return;
  let data = redoStack.pop();
  history.push(data);
  let img = new Image();
  img.onload = ()=>ctx.drawImage(img,0,0);
  img.src = data;

  const themeBtn = document.getElementById("themeToggle");
let darkMode = false;

themeBtn.onclick = () => {
    darkMode = !darkMode;
    document.body.classList.toggle("dark");

    themeBtn.textContent = darkMode ? "🌙 Dark" : "☀️ Light";
};

};
