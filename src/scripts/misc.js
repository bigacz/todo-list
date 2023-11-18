const body = document.getElementsByTagName('body')[0];

function bodyAddModal() {
  body.classList.add('menu-active');
  console.log('add');
}

function bodyRemoveModal() {
  body.classList.remove('menu-active');
  console.log('remove');
}

function bodyToggleModal() {
  body.classList.toggle('menu-active');
  console.log('toggle');
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
