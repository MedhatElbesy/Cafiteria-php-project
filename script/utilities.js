// Loading
export const loading = function() {
  document.getElementById("loading").classList.toggle("d-none");
};

export let orderSent = function() {
  let sent = document.querySelector(".order-sent");
  sent.classList.toggle("d-none");
  sent.querySelector(".ok").addEventListener("click", function(e) {
    window.location.reload();
  });
};