minSum = 100                //the minimum amount of sum you need to play the game

function validateName(name) {
    if (name === '') {
        document.getElementById('invalid-name').innerText = '';
        return false;
    }

    let pattern = /^([A-Z][a-z]+ *){2,}$/
    if (pattern.test(name)) {
        document.getElementById('invalid-name').innerText = '';
        return true;
    }
    document.getElementById('invalid-name').innerText = 'Invalid name format';
    return false;
}

function getCurrentDate() {
    let currDate = new Date()
    let day = currDate.getDate();
    let month = currDate.getMonth() + 1;
    let year = currDate.getFullYear();
    return [year, month, day];
}

function valideateAge(birthday) {
    if (birthday === '') {
        document.getElementById('invalid-birthday').innerText = '';
        return false;
    }

    let birthDate = String(birthday).split("-").map(Number);
    let currDate = getCurrentDate();
    age = currDate[0] - birthDate[0];

    if (currDate[1] < birthDate[1]) {
        age--;
    } else if (currDate[1] == birthDate[1] && currDate[2] < birthDate[2]){
        age--;
    }
    console.log(age)

    if (age >= 18) {
        document.getElementById('invalid-birthday').innerText = '';
        return true;
    } 
    document.getElementById('invalid-birthday').innerText = 'You must be at least 18 years old';
    return false;
}

function validateEmail(email) {
    if (email === '') {
        document.getElementById('invalid-email').innerText = '';
        return false;
    }

    let pattern = /^[a-z0-9._]{6,}@(gmail|yahoo).com$/
    if (pattern.test(email)) {
        document.getElementById('invalid-email').innerText = '';
        return true;
    }
    document.getElementById('invalid-email').innerText = 'Invalid email address';
    return false;
}

function validateURL(url) {
    if (url === '') {
        document.getElementById('invalid-url').innerText = '';
        return false;
    }

    let pattern = /^https?:\/{2}(\w\.)*[\w-]+\.[\w-]+\.[\w-.]*\.[a-z]+$/
    if (pattern.test(url)) {
        document.getElementById('invalid-url').innerText = '';
        return true;
    }
    document.getElementById('invalid-url').innerText = 'Invalid URL';
    return false;
}

function validateBettingAmount(sum) {
    if (sum === '') {
        document.getElementById('invalid-bet').innerText = '';
        return false;
    }

    let currency = String(document.getElementById('currency').value).toUpperCase();
    if (sum >= minSum) {
        document.getElementById('invalid-bet').innerText = '';
        return true;
    }
    document.getElementById('invalid-bet').innerText = `You must bet over ${minSum} ${currency}`;
    return false;
}

function validation() {
    let name = document.getElementById('name').value;
    let birthday = document.getElementById('birthday').value;
    let email = document.getElementById('email').value;
    let url = document.getElementById('website-url').value;
    let sum = document.getElementById('bet').value;

    let valid = [];
    valid.push(validateName(name));
    valid.push(valideateAge(birthday));
    valid.push(validateEmail(email));
    valid.push(validateURL(url));
    valid.push(validateBettingAmount(sum));

    for (let elem of valid) { 
        if(!elem) {
            document.getElementById('start-btn').style.visibility = 'hidden';
            return false;
        }
    }
    document.getElementById('start-btn').style.visibility = 'visible';
    return true;
}

function lastModification() {
    document.getElementById('modified-date').innerText = document.lastModified;
}

function startGame() {
    let name = document.getElementById('name').value;
    let money = document.getElementById('bet').value;
    let currency = String(document.getElementById('currency').value).toUpperCase();
    document.getElementById('player-name').innerText = `Name: ${name}`;
    document.getElementById('player-money').innerText = `Money: ${money} ${currency}`;
    document.getElementById('start-btn').style.visibility = 'hidden';
    document.getElementById('end-btn').style.visibility = 'visible';
    document.getElementById('game-window').style.visibility = 'visible';
    document.getElementById('game-end').innerText = '';
    document.getElementById('game-result').style.visibility = 'hidden';
}

function endGame() {
    if(validation()) {
        document.getElementById('start-btn').style.visibility = 'visible';
    }
    document.getElementById('end-btn').style.visibility = 'hidden';
    document.getElementById('game-window').style.visibility = 'hidden';
}

function rotateCardBack(cardId, cards) {
    console.log(true)
    document.getElementById('game-result').style.visibility = 'hidden';
    document.getElementById(cardId).src = 'images/back.png';
    for (elem of cards) {
        elem.style.pointerEvents = 'auto';
    }
}

function chooseCard(cardIndex) {
    let money = parseInt(document.getElementById('player-money').innerText.split(" ")[1]);
    let currency = String(document.getElementById('currency').value).toUpperCase();
    if (money < minSum) { 
        document.getElementById('game-end').innerText = `You must have at least ${minSum} ${currency} to play`;
        document.getElementById('start-btn').style.visibility = 'visible';
        document.getElementById('end-btn').style.visibility = 'hidden';
        return false;
    }

    let prize;
    switch (currency) {
        case 'EUR': 
            cost = 5;
            prize = 12;
            break;
        case 'USD':
            cost = 8;
            prize = 18;
            break;
        case 'CHF':
            cost = 6;
            prize = 14;
            break;
        case 'LEI':
            cost = 14;
            prize = 30;
            break;
    }

    let redCardIndex = Math.floor(Math.random() * 3) + 1;    //random integer from 1 to 3
    let imgPath;
    if (redCardIndex === cardIndex) {
        imgPath = 'images/red.png';
        document.getElementById('player-money').innerText = `Money: ${money+prize} ${currency}`;
    } else {
        imgPath = 'images/black.png';
        document.getElementById('player-money').innerText = `Money: ${money-(2*prize)} ${currency}`;
    }
    
    let cardId;
    if (cardIndex == 1) {
        cardId = 'first-card';
    } else if (cardIndex == 2) {
        cardId = 'second-card';
    } else {
        cardId = 'third-card';
    }
    document.getElementById(cardId).src = imgPath;
    
    document.getElementById('game-result').style.visibility = 'visible';
    if (redCardIndex === cardIndex) {
        document.getElementById('game-result').src = "images/win.png";
    } else {
        document.getElementById('game-result').src = 'images/lose.png';
    }
    

    const cards = document.getElementsByClassName('card');
    for (elem of cards) {
        elem.style.pointerEvents = 'none';
    }

    setTimeout(rotateCardBack, 700, cardId, cards);
    return true;
}