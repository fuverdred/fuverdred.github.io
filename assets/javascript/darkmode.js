let darkMode = localStorage.getItem('darkMode');
const darkModeToggle = document.querySelector("#light-switch");

const enableDarkMode = () =>  {
  document.body.classList.add("darkMode");
  localStorage.setItem("darkMode", "enabled");
  document.getElementById('light-switch').className = "fa fa-toggle-on";
  document.getElementById('light-symbol').className = "fa fa-sun-o";
}

const disableDarkMode = () =>  {
  document.body.classList.remove("darkMode");
  localStorage.setItem("darkMode", null);
  document.getElementById('light-switch').className = "fa fa-toggle-off";
  document.getElementById('light-symbol').className = "fa fa-moon-o";
}

if (darkMode === "enabled"){
  enableDarkMode();
}

darkModeToggle.addEventListener("click", () => {
  darkMode = localStorage.getItem('darkMode');
  if (darkMode !== "enabled"){
    enableDarkMode();
  }
  else {
    disableDarkMode();
  }
});



var bool = true;
/*
function darkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");

  bool = !bool;
  var theme = bool ? "fa fa-toggle-off" : "fa fa-toggle-on";
  var symbol = bool ? "fa fa-moon-o" : "fa fa-sun-o";
  document.getElementById('light-switch').className = theme;
  document.getElementById('light-symbol').className = symbol;
}
*/
