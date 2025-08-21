const output = document.getElementById("output");
const errorDiv = document.getElementById("error");
const loadingDiv = document.getElementById("loading");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Download a single image and return a promise
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to download image: ${url}`));
  });
}

// Download all images
function downloadImages() {
  // reset states
  output.innerHTML = "";
  errorDiv.textContent = "";
  loadingDiv.style.display = "block";

  // Create array of promises
  const promises = images.map(imgObj => downloadImage(imgObj.url));

  Promise.all(promises)
    .then(imgElements => {
      loadingDiv.style.display = "none"; // hide loading

      imgElements.forEach(img => {
        output.appendChild(img);
      });
    })
    .catch(err => {
      loadingDiv.style.display = "none"; // hide loading
      errorDiv.textContent = err.message; // show error
    });
}

btn.addEventListener("click", downloadImages);
