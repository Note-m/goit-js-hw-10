import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

const inpDelay = document.querySelector('.form-input-delay');

form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = inpDelay.value;
  const inpValue = document.querySelector('.form-input-state:checked');
  if (inpDelay.value !== '') {
    if (inpValue) {
      createPromise(delay, inpValue.value)
        .then(delay => {
          iziToast.success({
            title: '',
            message: `Fulfilled promise in ${delay}ms`,
            position: 'topRight',
          });
          inpDelay.value = '';
        })
        .catch(delay => {
          iziToast.error({
            title: '',
            message: `Rejected promise in ${delay}ms`,
            position: 'topRight',
          });
          inpDelay.value = '';
        });
    } else {
      iziToast.error({
        title: '',
        message: `Please choose some radio-button`,
        position: 'topRight',
      });
    }
  } else {
    iziToast.error({
      title: '',
      message: `Please fill field with delay`,
      position: 'topRight',
    });
  }
});

// btnCreate.addEventListener('click', event => {
//   event.preventDefault();
//   const delay = inpDelay.value;
//   if (
//     document.querySelector('.form-input-state:checked').value === 'fulfilled'
//   ) {
// iziToast.success({
//   title: '',
//   message: `Fulfilled promise in ${delay}ms`,
//   position: 'topRight',
// });
//     inpDelay.value = '';
//   } else {
// iziToast.error({
//   title: '',
//   message: `Rejected promise in ${delay}ms`,
//   position: 'topRight',
// });
//     inpDelay.value = '';
//   }
// });
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
