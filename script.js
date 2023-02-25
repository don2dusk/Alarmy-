const clock = document.getElementById("clock");
const SOUNDLENGTH = 6000;
let executed = false;
let alarmTimes = [];
const alarms_list = document.getElementById("alarm-container");
const add_button = document.getElementById("add-alarm");
var sound = new Audio("assets/sounds/iPhone-Alarm.mp3");
sound.loop = true;

setInterval(() => {
  // This sets the clock div to the current date
  const date = new Date();
  clock.textContent = date.toLocaleTimeString("en-us", { hour12: false });

  // This removes the seconds part of the clock
  let currentTime = clock.textContent.substring(0, 5);

  // We then check every alaram to see if it has rang
  alarmTimes.forEach((time, index) => {
    if (time.time === currentTime && time.isChecked === true) {
      if (!executed) {
        executed = true;
        playSound();

        // Set isChecked to false and uncheck the checkbox from the HTML
        time.isChecked = false;
        var checkeditems = document.querySelectorAll("#slid");
        checkeditems[index].checked = false;
      }
    }
  });
}, 1000);

add_button.addEventListener("click", function () {
  addAlarm();
});

function addAlarm() {
  const alarm_time = document.getElementById("alarm-time").value;
  if (alarm_time) {
    alarmTimes.push({ time: alarm_time, isChecked: true });
    let alarmElement = document.createElement("div");
    alarmElement.id = "alarm";
    alarmElement.innerHTML += `
            <p class = "set-time">${alarm_time}</p>
            <label class="switch">
                <input type = "checkbox" id="slid" onchange = "ischecked(this)" checked>
                <span class="slider round"></span>
            </label>
            <button id = "del" onClick=deleteAlarm(this)><img class = "del" src = "assets/imgs/trash.png" width="20px" height="20px"></button>`;
    alarms_list.appendChild(alarmElement);
  }
}

function ischecked(object) {
  var checkeditems = document.querySelectorAll("#slid");
  let index;

  for (let i = 0; i < checkeditems.length; i++) {
    const element = checkeditems[i];

    if (element === object) {
      index = i;
      break;
    }
  }

  if (object.checked) {
    alarmTimes[index].isChecked = true;
  } else {
    alarmTimes[index].isChecked = false;
  }
}

function deleteAlarm(clickedButton) {
  var delete_buttons = document.querySelectorAll("#del");
  let index;

  for (let i = 0; i < delete_buttons.length; i++) {
    const element = delete_buttons[i];

    if (element === clickedButton) {
      index = i;
      break;
    }
  }

  alarmTimes.splice(index, 1);
  clickedButton.parentElement.remove();
}

function playSound() {
  sound.play();
  setTimeout(stopPlaying, SOUNDLENGTH);
}

function stopPlaying() {
  sound.pause();
  sound.currentTime = 0;
  executed = false;

  // This is for scenarios where you have a button to stop playing
  // We don't want to keep the stop the initial timeout
  clearTimeout();
}
