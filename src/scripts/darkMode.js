const checkbox = document.getElementById('darkmode-checkbox');
const htmlElement = document.getElementsByTagName('html')[0];

checkbox.addEventListener('change', changeMode);

applyUserPreference();

function applyUserPreference() {
  const storagePreference = getStoragePreference();

  if (storagePreference === undefined) {
    const osPreference = getOsPreference();

    if (osPreference) {
      addDarkMode();
    } else {
      addLightMode();
    }
  } else if (storagePreference) {
    addDarkMode();
  } else {
    addLightMode();
  }
}

function changeMode() {
  htmlElement.classList.toggle('dark');
  htmlElement.classList.toggle('light');

  const isDark = htmlElement.classList.contains('dark');
  const isLight = htmlElement.classList.contains('light');

  if (isDark && isLight) {
    throw new Error('No accent specified');
  }

  if (isDark) {
    localStorage.setItem('darkmode', true);
  } else if (isLight) {
    localStorage.setItem('darkmode', false);
  }
}

function addDarkMode() {
  checkbox.checked = true;

  htmlElement.classList.add('dark');
  htmlElement.classList.remove('light');
}

function addLightMode() {
  checkbox.checked = false;

  htmlElement.classList.add('light');
  htmlElement.classList.remove('dark');
}

function getOsPreference() {
  const preference = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return preference;
}

function getStoragePreference() {
  const preference = localStorage.getItem('darkmode');

  if (preference === null || preference === undefined) {
    return undefined;
  }

  return JSON.parse(preference);
}

export default {};
