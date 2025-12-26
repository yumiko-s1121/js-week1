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