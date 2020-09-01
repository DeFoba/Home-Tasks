'use strict';

let modal = document.getElementById('modal');
let appInformation = modal.getElementsByClassName('app-information')[0];
let appContent = document.getElementsByClassName('content')[0];

let checkModalOpened = false;

let startApp = loadApps()

function uploadPageStyle() {
	for (let key of document.getElementsByClassName('app')) {
		key.style.flexGrow = localStorage.getItem('pageStyle');
	}
}

uploadPageStyle();

document.addEventListener('click', ({target}) => {
	if (target.parentNode.id == 'Settings') {
		if (checkModalOpened != true) checkModalOpened = true;
		else return;

		let checkboxList = document.createElement('div');
		let appSettingsContainer = document.createElement('div');

		appInformation.append(appSettingsContainer);

		createAppElement(appSettingsContainer, 'Theme', themeSwich);
		createAppElement(appSettingsContainer, 'Style', styleChenger);
		createAppElement(appSettingsContainer, 'Clear', clearLocalStorage);
		createAppElement(appSettingsContainer, '+', addApp);

		appInformation.append(checkboxList);

		// createCheckBoxElement(checkboxList, 'Math', 'Math', onChangeCheckbox, false);
		// createCheckBoxElement(checkboxList, 'Russ', 'Russ', onChangeCheckbox, false);
		// createCheckBoxElement(checkboxList, 'Geog', 'Geog', onChangeCheckbox, false);

		checkboxList.className = 'checkbox-list';
		appSettingsContainer.className = 'app-settings-container';

		addAppInput()
		showModal();
	}
	
	if (target.parentNode.className == 'app' && target.parentNode.id != 'Settings') {
		if (checkModalOpened != true) checkModalOpened = true;
		else return;

		// console.log(target.parentNode.id);

		let appTitle = document.createElement('h1');
		let toDoInput = document.createElement('input');

		appInformation.append(appTitle);
		// createAppElement(appInformation, '+', appInputAdd);
		appInformation.append(toDoInput);

		appTitle.innerHTML = target.parentNode.id;
		appTitle.className = 'app-title';

		toDoInput.id = 'toDoInput';
		toDoInput.className = 'todo-input';

		if (localStorage.getItem(target.parentNode.id) != '') {
			toDoInput.value = localStorage.getItem(target.parentNode.id);
		}

		toDoInput.onchange = () => {
			localStorage.setItem(target.parentNode.id, toDoInput.value)
			// console.log(toDoInput.value);
		};

		showModal();
	}
});

function addApp() {
	let appNameValue = appInformation.querySelector('#toDoInput');
	if (appNameValue != '' && appNameValue != ' ') {
		localStorage.setItem(appNameValue.value, '');
	} else return;
	appNameValue.value = '';
	appContent.innerHTML = '';
	loadApps();
	uploadPageStyle();
}

function addAppInput() {
	let appTitle = document.createElement('h1');
	let toDoInput = document.createElement('input');
	appInformation.append(appTitle);
	appInformation.append(toDoInput);
	appTitle.innerHTML = 'App name:';
	appTitle.className = 'app-title';
	toDoInput.id = 'toDoInput';
	toDoInput.className = 'todo-input';
}

function appInputAdd() {
	let toDoInput = document.createElement('input');
	appInformation.append(toDoInput);
	toDoInput.id = 'toDoInput';
	toDoInput.className = 'todo-input';
}

function clearLocalStorage() {
	for (let key in localStorage) {
		localStorage.removeItem(key);
	}
	location.reload();
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

function styleChenger() {
	if (localStorage.getItem('pageStyle') == '0') localStorage.setItem('pageStyle', '1');
	else localStorage.setItem('pageStyle', '0');
	for (let key of document.getElementsByClassName('app')) {
		key.style.flexGrow = localStorage.getItem('pageStyle');
	}
}

function showModal() {
	uploadPageStyle();
	modal.style.zIndex = '2';
	modal.style.filter = 'opacity(1)';
	appInformation.style.zIndex = '3';
	appInformation.style.transform = 'translate(-50%, -50%) scale(1)';
}

function hideModal() {
	checkModalOpened = false;
	appInformation.style.transform = 'translate(-50%, -50%) scale(0.6)';
	modal.style.zIndex = '0';
	modal.style.filter = 'opacity(0)';
	appInformation.style.zIndex = '0';
	appInformation.innerHTML = '';
}

function onChangeCheckbox() {
	appContent.innerHTML = '';
	let checkboxList = document.getElementsByClassName('settings-checkbox');

	// console.log('Function has been started!');

	for (let key of checkboxList) {
		if (key.checked != false) {
			let keyInfo = localStorage.getItem(key.id);
			if (keyInfo == null) keyInfo = '';
			localStorage.setItem(key.id, keyInfo);
			// console.log(`Key '${key.id}': ${key.value}`)
		} else {
			localStorage.removeItem(key.id);
			// console.log(`Key '${key.id}': ${key.value}`)
		}
	}

	loadApps();

	// console.log('Function has been finished!');
}