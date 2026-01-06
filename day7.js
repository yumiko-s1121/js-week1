function check() {
    // 入力値から値を取得
    const name = document.getElementById("name").value;
    const score = document.getElementById("score").value;
    const passline = document.getElementById("passline").value;

    // Python API にリクエストを送信
    fetch(`http://127.0.0.1:5000/check?name=${name}&score=${score}&passline=${passline}`)
        .then(response => response.json())
        .then(data => {
            
            // エラー表示のための処理を追加
            // エラーメッセージ表示用の要素を取得
            const errorEl = document.getElementById("error");
            errorEl.textContent = "";

            // API がエラーを返却した場合はメッセージを表示して終了(return)
            if (data.status === "error") {
                errorEl.textContent = data.message;
                return;
            }

            // <table> をを取得
            const table = document.querySelector("table");

            // 新しい行 <tr> を作成
            const row = document.createElement("tr");

            // <tr></tr> の中に <td>...</td> を作成
            // API の結果(data)を使って <td> を 4つ作成
            row.innerHTML = `
                <td>${data.name}</td>
                <td>${data.score}</td>
                <td>${data.passline}</td>
                <td>${data.result}</td>
            `;

            // 上で生成した<tr><td>...</td><td>..</td> ... </tr> を <table></table> の中に埋め込む
            table.appendChild(row);

            // 入力欄をクリア
            document.getElementById("name").value = "";
            document.getElementById("score").value = "";
        });

}