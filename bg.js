const UNSPLASH_API_KEYS = "4a6fd5d5a4df74080cf086bad725c8cab2430318884a81a01c9d2d629c7e06ea"
const body = document.querySelector('body')

function getRandomImg() {
  fetch(`https://api.unsplash.com/photos/random/?query=nature&client_id=${UNSPLASH_API_KEYS}`)
  .then(function(response) {
    return response.json()
  })
  .then(function(json) {
    var bg = json.urls.regular
    body.setAttribute("style", `background-image: url("${bg}")`)
  })
}

function loadImage() {
  getRandomImg()
}

function init() {
  loadImage()
}

init()
