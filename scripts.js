const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const modal = document.querySelector('.modal');
modal.querySelectorAll('button').forEach(el => el.addEventListener('click', (e) => {
    modal.style.display = 'none';
}));

const form = document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    let name = form.querySelector('#name');
    modal.querySelector('#input-name').textContent = name.value;

    let email = form.querySelector('#email').value;

    modal.querySelector('p').style.display = 'none';

    modal.querySelector(emailRegex.test(email) ? '#valid-email' : '#invalid-email').style.display = 'block';

    modal.style.display = 'block';
});