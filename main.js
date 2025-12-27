// ---- 12/25 作成部分 ----
// function sayHello() {
//    alert("Hello JavaScript!")
//}

// ---- 12/26 作成部分 ----
function sayHello(){
    let age = document.getElementById("age").value;
    age = Number(age);

    if (age >= 20) {
        alert("You are an adult")
    } else {
        alert("You are a child")
    }
}

function checkScore() {
    let score = document.getElementById("score").value;
    score = Number(score);

    let result = "";

    if (score >= 80) {
        result = "Pass";
    } else {
        result = "Fail"
    }

    document.getElementById("result").textContent = result
}

let people = [
    {name: "Yumiko", score : 78},
    {name: "John", score : 92},
    {name: "Amy", score : 55},
    {name: "Ken", score : 83}
];

function showPeople() {
    let text = "";

    for (let p of people) {
        if(p.score >= 80) {
            text += p.name + ": Pass\n";
        } else {
            text += p.name + ": Fail\n";
        }
    }

    alert(text);
}

fetch("result.csv")
.then(response => response.text())
.then(text => {
    let lines = text.trim().split("\n");
    let tbody = document.getElementById("table-body");

    for (let i = 1; i < lines.length; i++) {
        let cols = lines[i].split(",");
        let tr = document.createElement("tr");

        /*
        for (let c of cols) {
            let td = document.createElement("td");
            td.textContent = c;
            tr.appendChild(td);
        }
        */

        for (let j = 0; j < cols.length; j++) {
            let td = document.createElement("td");
            td.textContent = cols[j];

            // 3列目(Result)なら色をつける
            if (j === 2) {
                if (cols[j] === "Pass") {
                    td.className = "pass";
                }
                else {
                    td.className = "fail"
                }
            }
            tr.appendChild(td);
       }

        tbody.appendChild(tr);
    }
})