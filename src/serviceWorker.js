export default function serviceWorker() {
  let swURL = `${process.env.PUBLIC_URL}/sw.js`;
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register(swURL)
        .then(
          function (registration) {
            console.log(
              "worker registration is successfull.\n",
              registration.scope
            );
          },
          function (err) {
            console.log("registration failed \n", err);
          }
        )
        .catch(function (err) {
          console.log("Failed to apply ", err);
        });
    });
  } else {
    console.log(" Service worker is not supported in your browser.");
  }
}
