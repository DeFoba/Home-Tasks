'use strict';

let modal = document.getElementById('modal');
let appInformation = modal.getElementsByClassName('app-information')[0];
let appContent = document.getElementsByClassName('content')[0];

let startApp = loadApps()

document.addEventListener('click', ({target}) => {
	if (target.parentNode.id == 'Settings') {
		createAppElement(appInformation, 'Theme', themeSwich);
		createAppElement(appInformation, 'Clear', clearLocalStorage);
		createCheckBoxElement(appInformation, 'Math', 'Math', '', true);

		showModal();
	}
});

function clearLocalStorage() {
	for (let key in localStorage) {
		localStorage.removeItem(key);
	}
}

function themeSwich() {
	html = document.getElementsByTagName('html')[0];
	if (html.className != 'light-theme') {
		html.className = 'light-theme';
		localStorage.setItem('pageTheme', html.className);
	} else {
		html.className = 'dark-theme';
		localStorage.setItem('pageTheme', html.className);
	}
}

function showModal() {
	modal.style.zIndex = '2';
	modal.style.filter = 'opacity(1)';
	appInformation.style.zIndex = '3';
}

function hideModal() {
	modal.style.zIndex = '0';
	modal.style.filter = 'opacity(0)';
	appInformation.style.zIndex = '0';
	appInformation.innerHTML = '';
}