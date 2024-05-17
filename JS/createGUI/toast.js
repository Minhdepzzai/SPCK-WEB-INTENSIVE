function showSuccessToast(text) {
  Toastify({
    text: text,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      background: "#34c724",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

function showErrorToast(text) {
  Toastify({
    text: text,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      background: "#ed4337",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

export { showSuccessToast, showErrorToast };
