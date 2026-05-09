    // Cursor
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });

    function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(animRing);
    }
    animRing();

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.classList.add('expand'); ring.classList.add('expand'); });
      el.addEventListener('mouseleave', () => { cursor.classList.remove('expand'); ring.classList.remove('expand'); });
    });

    // Scroll reveal
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          e.target.style.transitionDelay = (e.target.dataset.delay || 0) + 'ms';
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el, i) => {
      el.dataset.delay = (i % 4) * 80;
      obs.observe(el);
    });

    // Pedir
    function pedir(sabor) {
      const msg = encodeURIComponent(`Oi! Quero fazer uma encomenda do sabor: ${sabor}. Pode me passar mais informações?`);
      window.open(`https://wa.me/5571993762945?text=${msg}`, '_blank');
    }