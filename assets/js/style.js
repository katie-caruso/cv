// Make external links open in a new tab
for (let a of document.querySelectorAll('a[href^="http://"], a[href^="https://"]')) {
	a.setAttribute('target', '_blank');
}

// Set detail level based on URL or local storage

let urlParams = new URL(location).searchParams;

if (urlParams.has('detail')) {
	setDetail(urlParams.get('detail'));
}
else if (localStorage.details_filter) {
	setDetail(localStorage.details_filter);
}

details_filter.addEventListener('input', evt => {
	if (evt.isTrusted) { // If this is not a synthetic event
		// Store detail level in local storage so that refresh is not lossy
		localStorage.details_filter = evt.target.value;

		// Update URL so that the right document can be shared
		history.replaceState(null, null, `?detail=${evt.target.value}`);
	}
});

function setDetail(detail) {
	details_filter_slider.value = detail;
	details_filter_slider.dispatchEvent(new InputEvent("input"), {bubbles: true});
}
