function setActiveToc(){
  const links = document.querySelectorAll('.toc a[href^="#"]');
  const sections = [...links].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const y = window.scrollY + 120;

  let current = null;
  for (const s of sections){
    if (s.offsetTop <= y) current = s;
  }
  links.forEach(a => a.classList.remove('active'));
  if (current){
    const active = document.querySelector('.toc a[href="#' + current.id + '"]');
    if (active) active.classList.add('active');
  }
}

function enableSearch(){
  const input = document.getElementById('q');
  if (!input) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    const blocks = document.querySelectorAll('[data-searchable="1"]');
    blocks.forEach(b => {
      const text = b.innerText.toLowerCase();
      b.style.display = (!q || text.includes(q)) ? '' : 'none';
    });
  });
}

window.addEventListener('scroll', setActiveToc);
window.addEventListener('load', () => { setActiveToc(); enableSearch(); });
