import * as utility from './utilities.js';

export let userData = null;
export let setUserInfo = function() {
  userData = JSON.parse(sessionStorage.getItem('userData'));
  if(userData["position"] == "user") {
    document.querySelector(".user-name").innerText = userData["user_name"];
    document.querySelector(".user-image").src = userData["img"];
  } else if(userData["position"] == "admin") {
    document.querySelector(".admin-name").innerText = userData["admin_name"];
    document.querySelector(".admin-image").src = userData["img"];
  }
} ();

// Logging Out
document.getElementById("log-out").addEventListener("click", function() {
  goToLoginPage();
});

let goToLoginPage = async function () {
  try {
    utility.loading();
      await fetch('../api/logout.php', {
      method: 'POST'
    });
    utility.loading();
    sessionStorage.removeItem('userData');
    window.location.href = "../html/index.html";
  } catch (error) {
    console.error('Error Logging Out:', error);
  }
};