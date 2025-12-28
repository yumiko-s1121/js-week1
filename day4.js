function check() {
  let score = document.getElementById("score").value;

  fetch("http://127.0.0.1:5000/check?score=" + score)
    .then(response => response.json())
    .then(data => {
      document.getElementById("result").textContent = data.result;
    });
}
