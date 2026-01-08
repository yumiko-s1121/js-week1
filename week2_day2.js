// 一覧を表示する関数
function load() {
    fetch("http://127.0.0.1:5000/list")
        .then(response => response.json())
        .then(data => {

             // API がエラーを返却した場合はメッセージを表示して終了(return)
            if (data.status === "error") {
                alert(data.message);
                return;
            }

            // 表(<table>) を取得
            const table = document.querySelector("table");

            // 表をリセット
            table.innerHTML = `
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Action</th>
                </tr>
            `;

            // API の結果(records)から1件ずつ取り出して処理
            data.records.forEach (record => {
                // 新しい行 (<tr>) を作成
                const row = document.createElement("tr");

                // 1件分の内容を <td> として設定
                row.innerHTML = `
                    <td>${record.id}</td>
                    <td>${record.name}</td>
                    <td>${record.score}</td>
                    <td>
                        <button onclick="deleteRecord(${record.id})">Delete</td>
                        <button onclick="editRecord(${record.id}, ${record.score})">Edit</td>
                    </td>
                `;

                // 作成した行を表に追加
                table.appendChild(row);
            });
        });
}

// 削除ボタンの処理をする関数
function deleteRecord(id) {
    if (!confirm("Delete this record?")) return;

    fetch(`http://127.0.0.1:5000/delete?id=${id}`)
    .then(response => response.json)
    .then(data => {
        alert(data.message);
        load(); // 削除済みデータを再読み込み
    })
}

// 削除ボタンの処理をする関数
function editRecord(id, oldScore) {
    const newScore = prompt("New score:", oldScore);
    if (newScore === null) return;

    fetch(`http://127.0.0.1:5000/update?id=${id}&score=${newScore}`)
    .then(response => response.json)
    .then(data => {
        alert(data.message);
        load(); // 編集済みのデータを再読み込み
    })
}