// const Local = function (e) {
//   e.preventDefault();
//   const json = {
//     username: document.querySelector("#username").value,
//     password: document.querySelector("#current-password").value,
//   };
//   const body = JSON.stringify(json);
//   console.log(body);

//   fetch("/auth/local", {
//     method: "POST",
//     body,
//   })
//     .then((response) => {
//         console.log(response)
//     })
//     // .then((res) => {
//     //   console.log(res);
//     // });
// };

// window.onload = function () {
//   const Local_login = document.querySelector("#locallogin");
//   Local_login.onclick = Local;
// };
