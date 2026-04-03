// Mohammed Akif - C241091


// 1. NUMBER GUESSING GAME
let secretNumber = Math.floor(Math.random() * 100) + 1;
let tries = 0;

document.getElementById('guess-btn').addEventListener('click', () => {
    const guess = parseInt(document.getElementById('guess-input').value);
    const result = document.getElementById('guess-result');
    const tryCount = document.getElementById('try-count');

    if (isNaN(guess) || guess < 1 || guess > 100) {
        result.textContent = "❌ Please enter number between 1-100";
        result.style.color = "#fca5a5";
        return;
    }

    tries++;
    tryCount.textContent = tries;

    if (guess === secretNumber) {
        result.textContent = `🎉 Congratulations! You guessed it in ${tries} attempts`;
        result.style.color = "#86efac";
        document.getElementById('guess-btn').disabled = true;
    } else if (guess > secretNumber) {
        result.textContent = "📈 Too High! Try smaller number";
        result.style.color = "#fca5a5";
    } else {
        result.textContent = "📉 Too Low! Try bigger number";
        result.style.color = "#fca5a5";
    }

    document.getElementById('guess-input').value = '';
});

document.getElementById('reset-btn').addEventListener('click', () => {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    tries = 0;
    document.getElementById('try-count').textContent = 0;
    document.getElementById('guess-result').textContent = '';
    document.getElementById('guess-btn').disabled = false;
});


// 2. UNIT CONVERTER
function convertUnits() {
    const value = parseFloat(document.getElementById('value-input').value);
    if (isNaN(value) || value < 0) {
        document.getElementById('converter-error').textContent = "❌ Enter a valid positive number";
        return;
    }
    document.getElementById('converter-error').textContent = "";

    let meters = 0;
    const unit = document.getElementById('from-unit').value;
    if (unit === 'km') meters = value * 1000;
    else if (unit === 'm') meters = value;
    else if (unit === 'cm') meters = value / 100;
    else if (unit === 'mm') meters = value / 1000;

    document.getElementById('km').textContent = (meters / 1000).toFixed(4);
    document.getElementById('m').textContent = meters.toFixed(2);
    document.getElementById('cm').textContent = (meters * 100).toFixed(2);
    document.getElementById('mm').textContent = (meters * 1000).toFixed(2);
}
document.getElementById('value-input').addEventListener('input', convertUnits);
document.getElementById('from-unit').addEventListener('change', convertUnits);


// 3. BANGLADESH DIGITAL CLOCK (12 Hour with AM/PM)
function updateBangladeshClock() {
    const options = { timeZone: 'Asia/Dhaka', hour12: true };
    const now = new Date().toLocaleString('en-US', options);
    
    const timeParts = now.split(', ')[1].split(':');
    let hours = parseInt(timeParts[0]);
    const minutes = timeParts[1];
    const secondsPart = timeParts[2];
    const seconds = secondsPart.split(' ')[0];
    const ampm = secondsPart.split(' ')[1];

    hours = hours < 10 ? '0' + hours : hours;

    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    document.getElementById('ampm').textContent = ampm;

    if (hours >= 5 && hours < 12) document.getElementById('greeting').textContent = "🌅 Good Morning, Bangladesh";
    else if (hours >= 12 && hours < 17) document.getElementById('greeting').textContent = "☀️ Good Afternoon";
    else if (hours >= 17 && hours < 21) document.getElementById('greeting').textContent = "🌆 Good Evening";
    else document.getElementById('greeting').textContent = "🌙 Good Night";
}
setInterval(updateBangladeshClock, 1000);
updateBangladeshClock();


// 4. FORM VALIDATOR
document.getElementById('submit-btn').addEventListener('click', () => {
    let isValid = true;
    document.querySelectorAll('.error').forEach(el => el.textContent = '');

    const name = document.getElementById('name').value.trim();
    if (name.length < 3) {
        document.getElementById('name-error').textContent = "❌ Name must be at least 3 letters";
        isValid = false;
    }

    const email = document.getElementById('email').value.trim();
    if (!email.includes('@')) {
        document.getElementById('email-error').textContent = "❌ Email must contain @";
        isValid = false;
    }

    const age = parseInt(document.getElementById('age').value);
    if (isNaN(age) || age < 18 || age > 60) {
        document.getElementById('age-error').textContent = "❌ Age must be between 18-60";
        isValid = false;
    }

    if (!document.getElementById('terms').checked) {
        document.getElementById('terms-error').textContent = "❌ You must agree to the terms";
        isValid = false;
    }

    if (isValid) {
        const successBox = document.getElementById('form-success');
        successBox.textContent = "✅ Form Submitted Successfully! Well Done!";
        setTimeout(() => {
            document.getElementById('validation-form').reset();
            successBox.textContent = '';
        }, 3000);
    }
});
