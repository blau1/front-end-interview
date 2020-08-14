const current = document.querySelector('#current');
const imgs = document.querySelectorAll('.imgs img');
var uploadbtn = document.getElementById('upload');
var deletebtn = document.getElementById('delete');
var parentDiv = document.getElementById('result');
const opacityFade = 0.3;

// Set opacity to first thumbnail`
imgs[0].style.opacity = opacityFade;

// Adds an event listener to all images
imgs.forEach(img => img.addEventListener('click',imgClick));

// Adds an event listener to the upload button
uploadbtn.addEventListener('click',upload);

// Handles all actions when an image is clicked on (default images)
function imgClick(e) {
	
	// Reset opacity to all images
	imgs.forEach(img => img.style.opacity = 1);

	// Swap current image with new image
	current.src = e.target.src;

	// Trigger fade-in animation
	//current.classList.add('fade-in');
	//setTimeout(() => current.classList.remove('fade-in'),500);

	// Changes opacity to thumbnail when clicked on
	e.target.style.opacity = opacityFade

}

function upload(e) {
	e.preventDefault();

	// Reads the file
	var reader = new FileReader();

	// Extracts the name of the file to the console
	var name = document.getElementById("imgUpload").files[0].name
	console.log(name);

	// Uploads the file
	reader.addEventListener('load',function() {
		if(this.result && localStorage) {
			window.localStorage.setItem(name,this.result);
			alert("New image was uploaded.");
			parentDiv.innerHTML = ''; // <---- Prevents duplicates
			showImages();
		}
		else {
			alert("Upload error.");
		}
	})

	reader.readAsDataURL(document.getElementById('imgUpload').files[0]);
}

// Displays all images from the uploads
function showImages() {
	for(let i = 0; i < window.localStorage.length; i++) {
		let res = window.localStorage.getItem(window.localStorage.key(i));
		var image = new Image();
		image.src = res;
		
		image.addEventListener('click',imgClick);
		parentDiv.appendChild(image);
		
	}
}

// Removes all images from the gallery
function remove() {
	window.localStorage.clear();
	parentDiv.innerHTML = '';
}

// Displays all images that are stored on the local storage
showImages();