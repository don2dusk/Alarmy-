const clock = document.getElementById("clock");

setInterval(() => {
  const date = new Date();
  clock.textContent = date.toLocaleTimeString();
}, 1000);

const alarms_list = document.getElementById("alarm-container");
const add_button = document.getElementById("add-alarm");

let alarmTimes = [];

add_button.addEventListener("click", function () {
  addAlarm();
});

function addAlarm() {
  const alarm_time = document.getElementById("alarm-time").value;
  if (alarm_time) {
    alarmTimes.push(alarm_time);
    console.log(alarmTimes);
    updateAlarms();
  }
}

function deleteAlarm(index) {
  alarmTimes.splice(index, 1);
  console.log(alarmTimes);
  updateAlarms();
}

function updateAlarms() {
  alarms_list.innerHTML = "";
  alarmTimes.forEach((time, index) => {
    var alarm = `<div id = "alarm">
            <p class = "set-time">${time}</p>
            <label class="switch">
                <input type = "checkbox">
                <span class="slider round"></span>
            </label>
            <button id = "del" onClick=deleteAlarm(${index})><img class = "del" src = "assets/imgs/trash.png" width="20px" height="20px"></button>
        </div>`;
    alarms_list.innerHTML += alarm;
  });
}
