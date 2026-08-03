(() => {
  const $ = (selector) => document.querySelector(selector);
  const letterCopy = $('#letterCopy');
  CONFIG.letter.split(/\n\s*\n/).forEach((paragraph) => { const p = document.createElement('p'); p.textContent = paragraph; letterCopy.append(p); });
  $('#signature').textContent = `~ ${CONFIG.sender}`;
  const flowerField = $('#flowerField');
  for (let i = 0; i < 22; i += 1) {
    const flower = document.createElement('span');
    flower.className = 'bloom-flower';
    flower.style.setProperty('--x', `${(i * 47) % 103}%`);
    flower.style.setProperty('--y', `${(i * 71) % 105}%`);
    flower.style.setProperty('--size', `${20 + (i % 4) * 9}px`);
    flower.style.setProperty('--delay', `${(i % 7) * 0.12}s`);
    for (let petal = 0; petal < 5; petal += 1) {
      const petalEl = document.createElement('i');
      petalEl.style.setProperty('--angle', `${petal * 72}deg`);
      flower.append(petalEl);
    }
    const center = document.createElement('b');
    flower.append(center);
    flowerField.append(flower);
  }
  const spotify = document.createElement('iframe'); spotify.src = CONFIG.spotify; spotify.title = 'Spotify song'; spotify.loading = 'lazy'; spotify.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'; $('#spotifyWrap').append(spotify);
  const collage = $('#collage'); CONFIG.photos.forEach((src, i) => { const figure = document.createElement('figure'); figure.className = 'polaroid'; figure.style.setProperty('--rotation', `${[-3,2,-1,3,-2,1][i % 6]}deg`); const img = document.createElement('img'); img.src = src; img.alt = `Memory ${i + 1}`; img.loading = 'lazy'; figure.append(img); collage.append(figure); });
  const audio = $('#voiceAudio'); audio.src = CONFIG.voiceNote; const cassette = $('.cassette'); const playButton = $('#playButton'); const progress = $('#progress'); const current = $('#currentTime'); const total = $('#totalTime');
  const formatTime = (seconds) => { if (!Number.isFinite(seconds)) return '0:00'; return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`; };
  playButton.addEventListener('click', () => audio.paused ? audio.play() : audio.pause());
  audio.addEventListener('loadedmetadata', () => { total.textContent = formatTime(audio.duration); }); audio.addEventListener('timeupdate', () => { progress.value = audio.duration ? audio.currentTime / audio.duration * 100 : 0; current.textContent = formatTime(audio.currentTime); });
  progress.addEventListener('input', () => { if (audio.duration) audio.currentTime = progress.value / 100 * audio.duration; });
  audio.addEventListener('play', () => { playButton.innerHTML = '<span>Ⅱ</span>'; playButton.setAttribute('aria-label', 'Pause voice note'); playButton.setAttribute('aria-pressed', 'true'); cassette.classList.add('playing'); });
  audio.addEventListener('pause', () => { playButton.innerHTML = '<span class="play-icon">▶</span>'; playButton.setAttribute('aria-label', 'Play voice note'); playButton.setAttribute('aria-pressed', 'false'); cassette.classList.remove('playing'); });
  audio.addEventListener('ended', () => { audio.currentTime = 0; });
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .14 }); document.querySelectorAll('.reveal,.polaroid').forEach((el) => observer.observe(el));
})();
