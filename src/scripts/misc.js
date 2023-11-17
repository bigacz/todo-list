const body = document.getElementsByTagName('body')[0];

function bodyAddModal() {
  body.classList.add('menu-active');
}

function bodyRemoveModal() {
  body.classList.remove('menu-active');
}

function bodyToggleModal() {
  body.classList.toggle('menu-active');
}

function bodyCheckModal() {
  return body.classList.contains('menu-active');
}

const Misc = {
  bodyAddModal,
  bodyRemoveModal,
  bodyToggleModal,
  bodyCheckModal,
};

export default Misc;
