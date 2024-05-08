import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('.input-date');
const buttonStart = document.querySelector('.button-start');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      buttonStart.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      buttonStart.disabled = false;
    }
    const dateDifference = selectedDate - currentDate;
    console.log(convertMs(dateDifference));
  },
};
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  const stringValue = String(value);
  return stringValue.padStart(2, '0');
}
flatpickr('#datetime-picker', options);

buttonStart.addEventListener('click', () => {
  if (!buttonStart.disabled && userSelectedDate) {
    const interval = setInterval(() => {
      const now = new Date();
      const timeLeft = userSelectedDate - now;
      if (timeLeft <= 0) {
        clearInterval(interval);
        iziToast.success({
          title: 'Congratulation',
          message: 'The time has come.',
          position: 'center',
        });
      } else {
        input.disabled = true;
        buttonStart.disabled = true;
        const time = convertMs(timeLeft);
        daysSpan.textContent = addLeadingZero(time.days);
        hoursSpan.textContent = addLeadingZero(time.hours);
        minutesSpan.textContent = addLeadingZero(time.minutes);
        secondsSpan.textContent = addLeadingZero(time.seconds);
      }
    }, 1000);
  }
});
