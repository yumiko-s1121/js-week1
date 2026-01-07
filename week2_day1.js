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

            // API の結果(records)から1件ずつ取り出して処理
            data.records.forEach (record => {
                // 新しい行 (<tr>) を作成
                const row = document.createElement("tr");

                // 1件分の内容を <td> として設定
                row.innerHTML = `
                    <td>${record.name}</td>
                    <td>${record.score}</td>
                `;

                // 作成した行を表に追加
                table.appendChild(row);
            });
        });
}