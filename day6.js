function check() {
    const name = document.getElementById("name").value;
    const score = document.getElementById("score").value;
    const passline = document.getElementById("passline").value; // 追加

//    fetch(`http://127.0.0.1:5000/check?name=${name}&score=${score}`)
    fetch(`http://127.0.0.1:5000/check?name=${name}&score=${score}&passline=${passline}`) // 追加
        .then(response => response.json())
        .then(data => {
            const table = document.querySelector("table");

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${data.name}</td>
                <td>${data.score}</td>
                <td>${data.passline}</td>
                <td>${data.result}</td>
            `;
            table.appendChild(row);
        })

}