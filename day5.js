function check() {
    const name = document.getElementById("name").value;
    const score = document.getElementById("score").value;

    fetch(`http://127.0.0.1:5000/check?name=${name}&score=${score}`)
        .then(response => response.json())
        .then(data => {
            const table = document.querySelector("table");

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${data.name}</td>
                <td>${data.score}</td>
                <td>${data.result}</td>
                <td>${data.message}</td>
            `;
            table.appendChild(row);
        })

}