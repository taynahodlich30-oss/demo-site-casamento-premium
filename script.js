const $ = s => document.querySelector(s);
const c = WEDDING;

function setText(selector, value) { const el = $(selector); if (el && value != null) el.textContent = value; }
function safeURL(value) { return /^https?:\/\//i.test(value || '') ? value : '#'; }

setText('#brideName', c.bride);
setText('#groomName', c.groom);
setText('#weddingDateText', c.dateText);
setText('#storyText', c.story);
setText('#ceremonyTime', c.ceremonyTime);
setText('#ceremonyPlace', c.ceremonyPlace);
setText('#partyTime', c.partyTime);
setText('#dressCode', c.dressCode);
setText('#rsvpDeadline', c.rsvpDeadline);
setText('#childrenInfo', c.childrenInfo);
setText('#parkingInfo', c.parkingInfo);
setText('#footerDate', c.footerDate || c.dateText);

document.title = `${c.bride} & ${c.groom} | Nosso Casamento`;
$('.brand').textContent = `${c.bride[0]} & ${c.groom[0]}`;
$('.monogram').textContent = `${c.bride[0]} & ${c.groom[0]}`;
$('#mapLink').href = safeURL(c.mapURL);
$('#giftLink').href = safeURL(c.giftURL);
$('#whatsappLink').href = `https://wa.me/${String(c.whatsapp || '').replace(/\D/g,'')}`;

function applyPhoto(selector, src) {
  const el = $(selector);
  if (!el || !src) return;
  const img = new Image();
  img.onload = () => { el.style.backgroundImage = `linear-gradient(#0002,#0002),url("${src}")`; el.classList.add('hasPhoto'); el.querySelector('span')?.remove(); };
  img.src = src;
}
applyPhoto('.heroPhoto', c.photos?.couple);
applyPhoto('#gallery1', c.photos?.gallery1);
applyPhoto('#gallery2', c.photos?.gallery2);
applyPhoto('#gallery3', c.photos?.gallery3);
applyPhoto('#gallery4', c.photos?.gallery4);

function tick() {
  let d = new Date(c.dateISO) - new Date();
  const box = $('#countdown');
  if (d <= 0) { box.innerHTML = '<strong>Chegou o grande dia! ❤️</strong>'; return; }
  const els = box.children;
  const days = Math.floor(d / 864e5); d %= 864e5;
  const h = Math.floor(d / 36e5); d %= 36e5;
  const m = Math.floor(d / 6e4);
  const s = Math.floor((d % 6e4) / 1000);
  [days,h,m,s].forEach((v,i) => els[i].childNodes[0].nodeValue = String(v).padStart(2,'0'));
}
tick(); setInterval(tick,1000);

$('#menuBtn').onclick = () => $('#navLinks').classList.toggle('open');
document.querySelectorAll('#navLinks a').forEach(a => a.addEventListener('click', () => $('#navLinks').classList.remove('open')));

$('#rsvpForm').onsubmit = e => {
  e.preventDefault();
  const name = $('#guestName').value.trim();
  const att = $('#attendance').value;
  const count = $('#guestCount').value;
  if (!name) return;
  const text = encodeURIComponent(`Olá! Confirmação de presença - Casamento ${c.bride} & ${c.groom}\nNome: ${name}\nResposta: ${att}\nPessoas: ${count}`);
  window.open(`https://wa.me/${String(c.whatsapp || '').replace(/\D/g,'')}?text=${text}`, '_blank', 'noopener');
  $('#rsvpMsg').textContent = 'Pronto! Abrimos o WhatsApp com sua confirmação preenchida.';
};

if (c.musicFile) {
  $('#music').src = c.musicFile;
  $('#musicBtn').onclick = async () => {
    const a = $('#music');
    if (a.paused) { try { await a.play(); $('#musicBtn').textContent='❚❚'; } catch {} }
    else { a.pause(); $('#musicBtn').textContent='♫'; }
  };
} else $('#musicBtn').style.display = 'none';
