const greetingElement = document.getElementById('greeting');
const currentHour = new Date().getHours();

if (currentHour < 12) {
    greetingElement.textContent = 'Welcome!';
} else if (currentHour < 18) {
    greetingElement.textContent = 'Welcome!';
} else {
    greetingElement.textContent = 'Welcome!';
}
