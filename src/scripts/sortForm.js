import PubSub from 'pubsub-js';
import { compareAsc } from 'date-fns';
import Misc from './misc';

const formNode = document.getElementById('sort-form');
const typeNode = document.getElementById('sort-type');
const orderNode = document.getElementById('sort-order');

formNode.addEventListener('change', () => {
  PubSub.publish('sortForm');
});

function sortTodos(todos = []) {
  todos.sort(sortHandler);

  return todos;
}

function sortHandler(a, b) {
  const sortFunction = getSortFunction();
  let result = sortFunction(a, b);

  const isInverted = orderNode.checked;
  if (isInverted) {
    result = invert(result);
  }

  return result;
}

function invert(value) {
  if (value === 0) {
    return 0;
  }

  const result = value === 1 ? -1 : 1;

  return result;
}

function getSortFunction() {
  const mode = typeNode.value;

  let modeFunction;
  switch (mode) {
    case 'priority':
      modeFunction = priority;
      break;
    case 'due':
      modeFunction = due;
      break;
    case 'created':
      modeFunction = created;
      break;
    default:
      modeFunction = alphabetical;
  }

  return modeFunction;
}

function alphabetical(a, b) {
  if (a.title > b.title) return 1;
  if (a.title < b.title) return -1;
  return 0;
}

function priority(a, b) {
  if (a.priority < b.priority) return 1;
  if (a.priority > b.priority) return -1;
  return 0;
}

function due(a, b) {
  return compareAsc(a.dueDate, b.dueDate);
}

function created(a, b) {
  return compareAsc(a.creationDate, b.creationDate);
}

export default sortTodos;
