const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const selectedCardKey = 'selectedCard';

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            setInterval(() => {
                entry.target.classList.remove('reveal');
                entry.target.classList.remove('active')
            }, 1000);
        }
    });
});

const hiddenElements = document.querySelectorAll('.reveal');
hiddenElements.forEach((el) => observer.observe(el));

const modal = document.querySelector('.modal');
modal.querySelectorAll('button').forEach(el => el.addEventListener('click', (e) => {
    modal.style.display = 'none';
}));

const cards = document.querySelectorAll('.card');

cards.forEach(el => el.addEventListener('click', function (e) {
    cards.forEach(card => card.classList.remove('selected'));
    this.classList.add('selected');

    let data = {
        id: this.dataset.id,
        name: this.querySelector('h3').textContent,
        price: this.querySelector('span').textContent
    };

    localStorage.setItem(selectedCardKey, JSON.stringify(data));

    document.querySelector('#choose-course-form')?.remove();
    var courseName = document.querySelector('.form h3');
    courseName.style.display = 'block';
    courseName.textContent = data.name;
    document.querySelector('form').style.display = 'flex';
}))

let selectedCard = JSON.parse(localStorage.getItem(selectedCardKey));
if (selectedCard) {
    [...cards].find(el => el.dataset.id === selectedCard.id)?.click();
} else {
    localStorage.removeItem(selectedCardKey);
}

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    let name = this.querySelector('#name');
    modal.querySelector('#input-name').textContent = name.value;

    let email = this.querySelector('#email').value;

    modal.querySelector('p').style.display = 'none';

    modal.querySelector(emailRegex.test(email) ? '#valid-email' : '#invalid-email').style.display = 'block';

    modal.style.display = 'block';

    localStorage.removeItem(selectedCardKey);

    document.querySelector('#main-form').style.display = 'none';
    document.querySelector('#done-message').style.display = 'block';
});