'use strict';

let html = document.getElementsByTagName('html')[0];

if (localStorage.getItem('pageTheme') == 'light-theme') {
	html.className = 'light-theme';
} else {
	html.className = 'dark-theme';
}

localStorage.setItem('pageTheme', html.className);

function createAppElement(place = appContent, name = 'None', task = '', src = '') {
	let app = document.createElement('div');
	let appImage = document.createElement('img');
	let appName = document.createElement('span');
	let appBlock = document.createElement('div');


	place.append(app);
	app.append(appImage);
	app.append(appName);
	app.append(appBlock);

	app.className = 'app';
	app.id = name;
	app.onclick = task;

	appImage.className = 'app-image';
	appImage.src = src;

	appName.className = 'app-name';
	appName.innerHTML = name;

	appBlock.className = 'app-image-block';

	return [app, appImage, appName, appBlock];
}

function createCheckBoxElement(place = appContent, id = '', title = 'None', task = '', used = false, className = 'settings-checkbox') {
	let checkbox = document.createElement('input');
	place.append(checkbox);
	checkbox.id = id; checkbox.innerHTML = title; checkbox.type = 'checkbox';
	checkbox.className = className; checkbox.checked = used;
	checkbox.onchange = task;
	return checkbox;
}

function loadApps() {
	for (let key in localStorage) {
		// console.log(key);

		if (key != 'pageTheme' && key != 'key' &&
			key != 'getItem' && key != 'setItem' &&
			key != 'removeItem' && key != 'clear' &&
			key != 'length') {

			createAppElement(appContent, key);

			let app = document.createElement('div');
			let appImage = document.createElement('img');
			let appName = document.createElement('span');
			let appBlock = document.createElement('div');
		}
	}
}