window.onload = () => show_Transcations();

let add_transcation = document.querySelector(".btn");
add_transcation.addEventListener("click", update_transcation_list);

//Showing all the transactions
let show_Transcations = () => {
    let balance = 0,income = 0,expense = 0;
    for (let i = 0; i < localStorage.length; ++i) {
        let tempobj = JSON.parse(localStorage[i]);
        let positive_sign = tempobj.amount > 0 ? true : false;
        if (positive_sign){
            income += tempobj.amount;
        }
        else{
            expense += tempobj.amount;
        }
        balance += tempobj.amount;
        create_transaction_list(tempobj.text, tempobj.amount, positive_sign);
    }
    let show_balance = document.querySelector("#show_balance");
    show_balance.innerHTML = "$" + balance.toFixed(2);

    let show_income = document.querySelector("#money-inc");
    show_income.innerHTML = "$" + income.toFixed(2);

    let show_expense = document.querySelector("#money-exp");
    show_expense.innerHTML = "$" + expense.toFixed(2);
};

// Transaction History
let create_transaction_list = (transcation_name, transcation_amount, positive_sign) => {
    let list_class = positive_sign ? "plus" : "minus";
    let sign = positive_sign ? "+ " : "";

    let label = document.createElement("label");
    label.innerHTML = transcation_name;

    let span = document.createElement("span");
    span.setAttribute("class", "money " + list_class);
    span.innerHTML = sign + transcation_amount;
    
    let li = document.createElement("li");
    li.setAttribute("class", list_class);
    li.appendChild(label);
    li.append(span);

    document.querySelector(".list").appendChild(li);
};

//Updation after every transaction
function update_transcation_list() {
    let transcation_name = document.querySelector("#text").value;
    let transcation_amount = Number.parseFloat(document.querySelector("#amount").value);

    if (transcation_name.length === 0 || isNaN(transcation_amount))
        return alert("Transaction can't proceed without name and amount !");

    if (transcation_name.length >= 20)
        return alert("Transaction name exceed limit !");

    let show_income = document.querySelector("#money-inc");
    let show_expense = document.querySelector("#money-exp");

    if(transcation_amount < 0) {
        show_amount(show_expense, transcation_amount);
    } 
    else{
        show_amount(show_income, transcation_amount);
    }

    let transction_details_object = {
        amount: transcation_amount,
        id: get_transactionID(1111111, 99999999),
        text: transcation_name,
    };

    localStorage.setItem(localStorage.length, JSON.stringify(transction_details_object));
    let positive_sign = transcation_amount > 0 ? true : false;

    create_transaction_list(transcation_name, transcation_amount, positive_sign);

    return false;
}


//Amount show
let show_amount = (tag, amount) => {
    let show_balance = document.querySelector("#show_balance");
    let balance = generate_digit(show_balance.innerHTML, 1);

    let temp = tag.innerHTML;
    temp = generate_digit(temp, 2);

    temp += Math.abs(amount);
    tag.innerHTML = "-$" + temp.toFixed(2);
    balance += amount;
    show_balance.innerHTML = "$" + balance.toFixed(2);
};

let generate_digit = (temp, index) => Number.parseFloat(temp.substr(index));

//Transaction ID generation
let get_transactionID = (min, max) =>
    Math.floor(Math.random() * (max - min) + min);