let modal = document.getElementById('simpleModal');
let closeBtn = document.querySelector('.closeBtn');

// listen for close click
closeBtn.addEventListener('click', closeModal);

// listen for outside click
window.addEventListener('click', outsideClick);

window.addEventListener('DOMContentLoaded', openModal);

function openModal() {
  modal.style.display = 'block';
}


function closeModal() {
  modal.style.display = 'none';
}

// window.setTimeout(closeModal, 5000);


function outsideClick(e) {
  if(e.target == modal) {
    modal.style.display = 'none';
  }
};

// let downloadCounter = document.getElementsByClassName('download-counter');

// downloadCounter.addEventListener('click', addOne);

// function addOne(){
//   alert("mash!")

// };
