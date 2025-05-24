function updateCard() {
  const imageInput = document.getElementById('imageInput');
  const name = document.getElementById('nameInput').value.trim();
  const batch = document.getElementById('batchInput').value.trim();

  if (name) {
    document.getElementById('name').textContent = name;
  }
  if (batch) {
    document.getElementById('batch').textContent = "ব্যাচঃ " + batch;
  }

  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('profileImg').src = e.target.result;
    };
    reader.readAsDataURL(imageInput.files[0]);
  }
}



// Preview Image
const imageInput = document.getElementById('imageInput');
const previewImage = document.getElementById('previewImage');
const uploadIcon = document.getElementById('uploadIcon');

imageInput.addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      previewImage.src = e.target.result;
      previewImage.classList.remove('hidden');
      uploadIcon.classList.add('hidden');
    };

    reader.readAsDataURL(file);
  }
});



function downloadCard() {
  const card = document.getElementById('card');
  const nameValue = document.getElementById('nameInput').value.trim() || 'reunion_card';

  // Scroll to top to avoid capturing scrollbars
  window.scrollTo(0, 0);

  html2canvas(card, {
    scale: 3, // Higher scale for better quality
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
  }).then(canvas => {
    // Optional: Add a little margin around the canvas
    const finalCanvas = document.createElement("canvas");
    const ctx = finalCanvas.getContext("2d");
    finalCanvas.width = canvas.width + 40;
    finalCanvas.height = canvas.height + 40;

    // Fill background white
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

    // Draw card image on top
    ctx.drawImage(canvas, 20, 20);

    // Download logic
    const link = document.createElement('a');
    link.download = `${nameValue}_reunion-card.png`;
    link.href = finalCanvas.toDataURL("image/png");
    link.click();
  });
}
