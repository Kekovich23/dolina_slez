const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const selectedCardKey = 'selectedCard';

document.querySelector('.burger-menu').addEventListener('click', function (e) {
    let navLinks = document.querySelector('.main-nav-links');
    if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    } else {
        navLinks.classList.add('active');
    }
});

document.querySelectorAll('nav a, #empty-nav-links').forEach(el => el.addEventListener('click', function (e) {
    document.querySelector('.main-nav-links').classList.remove('active');
}));

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
}, {
    rootMargin: '-100px'
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

function createTears() {
    const tear = document.createElement('img');
    tear.classList.add('tear-drop');
    tear.src = 'images/tear.svg';
    tear.style.left = Math.random() * 100 + 'vw';
    tear.style.top = '-50px';
    tear.style.width = Math.random() * 20 + 20 + 'px';
    tear.style.animationDuration = Math.random() * 3 + 2 + 's';
    tear.style.zIndex = Math.random() > 0.5 ? 3 : 1;
    document.querySelector('.start-section').appendChild(tear);

    setTimeout(() => {
        tear.remove();
    }, 5000);
}

setInterval(createTears, 200);