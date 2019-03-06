let loadingImages = true;
$(document).ready(function() {
  (function() {
    generateBoxesWithImage(10);
  })();

  $(window).on("scroll", function() {
    if (loadingImages) return;
    hasReachedBottom();
  });

  $("#scroll-top").on("click", function() {
    $("html, body").animate(
      {
        scrollTop: 0
      },
      1000
    );
  });
});

function hasReachedBottom() {
  let scrolled = $(window).scrollTop() + screen.availHeight;
  if (scrolled > $(document).height() + 50) {
    loadingImages = true;
    generateBoxesWithImage(5);
  }
}

function generateBox() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  let h = Math.floor(Mahth.random() * 300) + 200;
  let div = document.createElement("div");
  div.classList.add("box");
  div.style.backgroundColor = `rgb(${r} ${g} ${b})`;
  div.style.height = `${h}px`;
  document.getElementById("container").appendChild(div);
}

function generateBoxWithImage() {
  const count = 10;
  let imgNum = Math.floor(Math.random() * count);
  const loading = document.getElementById("loading");
  let url = `https://source.unsplash.com/random/400x400/?sig=${imgNum}`;

  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  loading.style.display = "block";
  fetch(url)
    .then(res => {
      let img = document.createElement("img");
      let div = document.createElement("div");

      img.setAttribute("src", res.url);
      img.classList.add("gen-img");

      div.classList.add("box");
      div.style.backgroundColor = `rgb(${r} ${g} ${b})`;
      div.appendChild(img);

      document.getElementById("container").appendChild(div);
      loading.style.display = "none";
    })
    .catch(err => {
      alert("An Error has occured:\n" + err);
    });
}

function generateBoxesWithImage(imgNum = 10) {
  if (!loadingImages) {
    return;
  }
  console.log("called generateBoxes...");

  const loading = document.getElementById("loading");
  let accessKey =
    "ff6ebc78aa977877f832650bc4203d2dfc118be64aac6a0847fe95388d760b42";
  let url = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${imgNum}`;

  loading.style.display = "block";
  fetch(url)
    .then(res => res.json())
    .then(res => {
      for (ele in res) {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        let img = document.createElement("img");
        let div = document.createElement("div");

        img.setAttribute("src", res[ele].urls.small);
        img.setAttribute("alt", res[ele].description);
        img.classList.add("gen-img");

        div.classList.add("box");
        div.style.backgroundColor = `rgb(${r} ${g} ${b})`;
        div.style.height = img.style.height;
        div.appendChild(img);

        document.getElementById("container").appendChild(div);
      }
      loadingImages = false;
      loading.style.display = "none";
    })
    .catch(err => {
      alert("An Error has occured:\n" + err);
    });
}

function loadBoxes(num = 10) {
  for (let i = 0; i < num; i++) {
    //generateBoxWithImage();
    generateBox();
  }
}
