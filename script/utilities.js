// Loading
export const loading = function() {
  document.getElementById("loading").classList.toggle("d-none");
};

export let orderSent = function() {
  let sent = document.querySelector(".order-sent");
  sent.classList.remove("d-none");
  sent.querySelector(".ok").addEventListener("click", function() {
    window.location.reload();
  });
};
