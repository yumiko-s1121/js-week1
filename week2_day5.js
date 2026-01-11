function showError(message) {
    document.getElementById("errorBox").innerText = message;
}
let currentSort = "";

// 追加（/add）
function addRecord() {
  const name = document.getElementById("addName").value.trim();
  const score = document.getElementById("addScore").value.trim();

  if (!name || !score) {
    alert("Name and score are required.");
    return;
  }

  const url = `http://127.0.0.1:5000/add?name=${encodeURIComponent(name)}&score=${encodeURIComponent(score)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.status === "error") {
        showError(data.message);
        return;
      }

      showError("");
      // 入力欄をクリア
      document.getElementById("addName").value = "";
      document.getElementById("addScore").value = "";

      alert(`Saved (id=${data.id})`);
      load(); // 追加後に一覧を更新
    });
}

// 整列を行う関数(整列の指示をセットし表示関数を呼び出す)
function setSort(sort) {
    currentSort = sort;
    load();
}

// 一覧を表示する関数
function load() {
    const name = document.getElementById("nameInput").value;

    let url = "http://127.0.0.1:5000/list";

    const params = []; // パラメータ用 array (初期値 : 空)

    // 検索用キーワードがあればパラメータ用 array に追加
    if (name) {
        params.push("name=" + encodeURIComponent(name))
    }

    // 整列の指示があればパラメータ用 array に追加
    if(currentSort) {
        params.push("sort=" + currentSort)
    }

    // パラメータを URL に追加
    if (params.length) {
        url += "?" + params.join("&");
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
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
                        <button onclick="deleteRecord(${record.id})">Delete</button>
                        <button onclick="editRecord(${record.id}, ${record.score})">Edit</button>
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
    .then(response => response.json())
    .then(data => {
        showError(data.message);
        load(); // 削除済みデータを再読み込み
    })
    showError("");
}

// 更新ボタンの処理をする関数
function editRecord(id, oldScore) {
    const newScore = prompt("New score:", oldScore);
    if (newScore === null) return;

    fetch(`http://127.0.0.1:5000/update?id=${id}&score=${newScore}`)
    .then(response => response.json())
    .then(data => {
        showError(data.message);
        load(); // 編集済みのデータを再読み込み
    })
    showError("");
}