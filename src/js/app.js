// Elements
const $btn = document.getElementById('btn');
const $popover = document.getElementById('popover');

// Events
$btn.addEventListener('click', () => {
  const isVisible = $popover.style.visibility === 'visible';
  if (isVisible) {
    $popover.style.visibility = 'hidden';
  } else {
    $popover.style.visibility = 'visible';
  }
});
