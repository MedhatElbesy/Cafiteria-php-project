export let userData = null;

export let setUserInfo = function() {
  userData = JSON.parse(sessionStorage.getItem('userData'));
  if(userData["postion"] == "user") {
    document.querySelector(".user-name").innerText = userData["user_name"];
    document.querySelector(".user-image").src = userData["img"];
  } else if(userData["position"] == "admin") {
    document.querySelector(".admin-name").innerText = userData["admin_name"];
    document.querySelector(".admin-image").src = userData["img"];
  }
} ();