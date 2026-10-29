// Поточна дата у підвалі сторінки
document.getElementById('today').textContent =
  new Date().toLocaleDateString('uk-UA');

// Перемикання світлої/темної теми
const btn = document.getElementById('theme-btn');

btn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  btn.textContent = isDark ? 'Світла тема' : 'Темна тема';
});
