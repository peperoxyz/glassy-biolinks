const imageContainerEl = document.getElementById("unsplash-image-container");
let imageUrl = "";
if (localStorage.imageUrl) {
	imageUrl = localStorage.imageUrl;
	document.body.style.backgroundImage = `url(${imageUrl})`;
	console.log("babi");
} else {
	imageUrl = "/assets/images/background-2.jpg";
	document.body.style.backgroundImage = `url(${imageUrl})`;
}

let selectedImage = "";

function showUnsplashCard(condition) {
	const unsplashCardEl = document.getElementById("unsplash-card"); // get unsplash card
	unsplashCardEl.classList.toggle("unsplash-card-active");

	getImages();
	imageContainerEl.innerHTML = "";
}

function closeUnsplash() {
	const unsplashCardEl = document.getElementById("unsplash-card"); // get unsplash card
	unsplashCardEl.classList.toggle("unsplash-card-active");
	imageContainerEl.innerHTML = "";
	// if (confirm("You have an unsaved changes. Sure want to quit?")) {
	// 	const unsplashCardEl = document.getElementById("unsplash-card"); // get unsplash card
	// 	unsplashCardEl.classList.toggle("unsplash-card-active");
	// 	imageContainerEl.innerHTML = "";
	// } else {
	// 	if (localStorage.imageUrl) {
	// 	} else {
	// 		alert("Please select an image and save.");
	// 	}
	// }
}

async function getImages() {
	const res = await fetch("https://api.unsplash.com/photos", {
		headers: {
			Authorization: "Client-ID DliYrHizzR3qCk6KaJSA2P2RJp_3YrTdLqwl1_nKVIA",
		},
	});
	const datas = await res.json();
	datas.slice(0, datas.length - 1).forEach((data) => {
		console.log(data.urls.raw);

		const imageEl = document.createElement("img");
		imageEl.src = data.urls.regular;
		imageEl.classList.add("unsplash-image");
		imageContainerEl.style.display = "grid";
		imageContainerEl.style.gap = "1rem";
		imageContainerEl.style.gridTemplateColumns = "repeat(3, 1fr)";
		imageContainerEl.append(imageEl);

		imageEl.addEventListener("click", () => {
			selectedImage = imageEl.src;
			localStorage.setItem("imageUrl", selectedImage);
			document.body.style.backgroundImage = `url(${imageEl.src})`;
		});
	});
	// imageContainerEl.innerHTML = "";
}
