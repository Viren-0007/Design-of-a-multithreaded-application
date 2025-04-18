function processFiles() {
  const files = document.getElementById('fileInput').files;
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = ''; // Clear previous results

  if (files.length === 0) {
    resultDiv.innerHTML = `<div class="file-result">⚠️ Please select at least one .txt file.</div>`;
    return;
  }

  Array.from(files).forEach(file => {
    const fileContainer = document.createElement('div');
    fileContainer.className = 'file-result';

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.innerHTML = '<div class="progress-fill"></div>';

    fileContainer.innerHTML = `<strong>${file.name}</strong><br>Processing...`;
    fileContainer.appendChild(progressBar);
    resultDiv.appendChild(fileContainer);

    const reader = new FileReader();

    // Animate the progress bar (just for effect)
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      progressBar.querySelector('.progress-fill').style.width = `${progress}%`;
      if (progress >= 100) clearInterval(interval);
    }, 100);

    reader.onload = function(event) {
      const text = event.target.result.trim();
      const wordCount = text === "" ? 0 : text.split(/\s+/).length;

      clearInterval(interval);
      progressBar.querySelector('.progress-fill').style.width = `100%`;

      setTimeout(() => {
        fileContainer.innerHTML = `
          <strong>${file.name}</strong><br>
          📝 ${wordCount} words`;
      }, 300); // short delay for smooth transition
    };

    if (file.name.endsWith('.txt')) {
      reader.readAsText(file);
    } else {
      fileContainer.innerHTML = `❌ <strong>${file.name}</strong> is not a .txt file and was skipped.`;
    }
  });
}