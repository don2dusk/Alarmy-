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
    alarmTimes.push({time: alarm_time, isChecked: true});
    let alarmElement = document.createElement("div");
    alarmElement.id = "alarm";
    console.log(alarmTimes);
    alarmElement.innerHTML +=`
            <p class = "set-time">${alarm_time}</p>
            <label class="switch">
                <input type = "checkbox" id="slid" onchange = "ischecked(this)" checked>
                <span class="slider round"></span>
            </label>
            <button id = "del" onClick=deleteAlarm(this)><img class = "del" src = "assets/imgs/trash.png" width="20px" height="20px"></button>`;
    alarms_list.appendChild(alarmElement);
  };
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
    console.log(alarmTimes);
  }
  else {
    alarmTimes[index].isChecked = false;
    console.log(alarmTimes);
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
  console.log(alarmTimes)
}

setInterval(() => {
  const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (alarmTimes.time.includes(currentTime)) {
    alert(`Alarm at ${currentTime}!`);
    alarmTimes = alarmTimes.filter((time) => time !== currentTime);
  }
}, 1000);