// styling the container element for images
const imageContainerEl = document.getElementById("unsplash-image-container");
imageContainerEl.style.display = "grid";
imageContainerEl.style.gap = "1rem";
imageContainerEl.style.gridTemplateColumns = "repeat(3, 1fr)";

/**
 * set default background image's url.
 * check the local storage have the key "imageUrl" saved or not.
 * if yes, then use the url as the background image (append as the backgroundImage property to the body)
 * if not, use the local background image from /assets/images
 */
let imageUrl = "";
if (localStorage.imageUrl) {
	imageUrl = localStorage.imageUrl;
	document.body.style.backgroundImage = `url(${imageUrl})`;
} else {
	imageUrl = "/assets/images/background-2.jpg";
	document.body.style.backgroundImage = `url(${imageUrl})`;
}

// create variable to contain the url of clicked of selected image
let selectedImage = "";

// function to show the unsplash card that contains photos from API
function showUnsplashCard() {
	const unsplashCardEl = document.getElementById("unsplash-card"); // get unsplash card's element
	unsplashCardEl.classList.toggle("unsplash-card-active"); // use `element.classList.toggle` to toggle (add/remove when clicked) to apply the behavior of the styling

	getImages(); // call get image function
}

// function to remove or close the unsplash card
function closeUnsplash() {
	const unsplashCardEl = document.getElementById("unsplash-card"); // get unsplash card
	unsplashCardEl.classList.toggle("unsplash-card-active");
	imageContainerEl.innerHTML = ""; // remove the images that was appended to the container element
}

// asynchronous function to get the newest images from unsplash API
async function getImages() {
	const res = await fetch("https://api.unsplash.com/photos", {
		headers: {
			Authorization: "Client-ID DliYrHizzR3qCk6KaJSA2P2RJp_3YrTdLqwl1_nKVIA",
		},
	});
	const datas = await res.json(); // convert the response into json, and put to the `datas` variable

	/** total: 9 photos. get only 8 photos and for each photo:
	 * create <img> element and put it to `imageEl` variable
	 * inject the `src` attribute of that `imageEl` element with the url of the photo (data.urls.regular)
	 * add `unsplash-image` as the class of that `imageEl` element
	 * append the styled imageEl to the `containerEl` element
	 * add event when image is clicked:
	 * * * put the selected image's url to the `selectedImage` variable that already defined before
	 * * * set that image's url to the `imageUrl` key on local storage
	 * * * then use that url as the background image (append as the backgroundImage property to the body)
	 */
	datas.slice(0, datas.length - 1).forEach((data) => {
		const imageEl = document.createElement("img");
		imageEl.src = data.urls.regular;
		imageEl.classList.add("unsplash-image");

		imageContainerEl.append(imageEl);

		imageEl.addEventListener("click", () => {
			selectedImage = imageEl.src;
			localStorage.setItem("imageUrl", selectedImage);
			document.body.style.backgroundImage = `url(${imageEl.src})`;
		});
	});
}
