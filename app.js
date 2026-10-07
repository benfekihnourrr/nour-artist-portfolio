const defaults = [
  {
    id: 'grace',
    title: 'Grace in Motion',
    date: '24 September 2026',
    medium: 'Acrylic paint',
    size: '80 × 90 cm',
    status: 'Available',
    image: '6c4e61f6-c1d3-4f79-b52b-99fc4e13367f.jpg',
    description: 'A study of elegance and movement, suspended against a deep blue atmosphere.'
  },
  {
    id: 'collision',
    title: 'Collision of Souls',
    date: '7 December 2022',
    medium: 'Acrylic',
    size: '28 × 18 cm',
    status: 'Available',
    image: 'dec4e442-aa46-474d-99bc-054e58bc382e.jpg',
    description: 'Two presences meet across a vivid field of color, tension and celestial blue.'
  },
  {
    id: 'fall',
    title: 'Fall from Grace',
    date: '29 March 2025',
    medium: 'Acrylic paint',
    size: '80 × 100 cm',
    status: 'Available',
    image: '9c98ad9f-9b1a-48ad-9946-e2c46e9ceffa.jpg',
    description: 'A dramatic figurative composition exploring descent, vulnerability and transcendence.'
  },
  {
    id: 'medina',
    title: 'Medina',
    date: '2 January 2025',
    medium: 'Acrylic',
    size: '80 × 90 cm',
    status: 'Available',
    image: 'e661e64e-5ebd-4f7f-a424-1f611b85a547.jpg',
    description: 'An expressive passage through color, architecture and the atmosphere of the medina.'
  },
  {
    id: 'spirit',
    title: 'Spirit of the Wind',
    date: '19 August 2023',
    medium: 'Acrylic',
    size: '70 × 80 cm',
    status: 'Available',
    image: '12464af2-6cde-4471-b650-0b76c44fda99.jpg',
    description: 'A portrait shaped by strength, motion and the quiet intensity of the horse.'
  },
  {
    id: 'azure',
    title: 'Azure Serenity',
    date: 'March 2018',
    medium: 'Acrylic',
    size: '50 × 60 cm',
    status: 'Available',
    image: '1082fb7b-c1f4-4019-920c-1b5c40f265ab.jpg',
    description: 'A calm Mediterranean scene of blue water, white architecture and unhurried light.'
  }
];

const $ = s => document.querySelector(s);
const gallery = $('#works');

function esc(s = '') {
  return String(s).replace(
    /[&<>'"]/g,
    c => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[c])
  );
}

function render() {
  gallery.innerHTML = defaults.map(w => `
    <article class="art-card" data-id="${w.id}">
      <div class="art-image">
        <img
          src="${w.image}"
          alt="${esc(w.title)} by Nour Ben Fekih Ahmed"
          loading="lazy"
        >
      </div>

      <div class="art-caption">
        <div>
          <h3>${esc(w.title)}</h3>
          <p>${esc(w.date)} · ${esc(w.medium)} · ${esc(w.size)}</p>
        </div>

        <span class="status">${esc(w.status)}</span>
      </div>
    </article>
  `).join('');

  gallery.querySelectorAll('.art-card').forEach(c => {
    c.onclick = () => openWork(c.dataset.id);
  });
}

function openWork(id) {
  const w = defaults.find(x => x.id === id);
  if (!w) return;

  $('#lightboxImg').src = w.image;
  $('#lightboxImg').alt = w.title;
  $('#lightboxTitle').textContent = w.title;
  $('#lightboxStatus').textContent = w.status;
  $('#lightboxMeta').textContent =
    `${w.date} · ${w.medium} · ${w.size}`;
  $('#lightboxDesc').textContent = w.description || '';

  $('#inquireLink').href =
    `mailto:benfekihnourrr@gmail.com?subject=${
      encodeURIComponent('Artwork inquiry — ' + w.title)
    }`;

  $('#lightbox').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  $('#lightbox').classList.add('hidden');
  document.body.style.overflow = '';
}

$('#lightboxClose').onclick = closeLightbox;

$('#lightbox').onclick = e => {
  if (e.target.id === 'lightbox') closeLightbox();
};

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

$('#year').textContent = new Date().getFullYear();

render();
