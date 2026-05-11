/* ============================================ */
/* Ordo Illuminati — Initiation logic           */
/* ============================================ */

(function () {
    'use strict';

    /* The sacred key: 3 sides × 3 degrees + 4 elements = 13 */
    const SACRED_KEY = '13';

    /* Accepted variants (numeric, English, Roman numerals) */
    const ACCEPTED = ['13', 'thirteen', 'xiii'];

    const form     = document.getElementById('enigma-form');
    const input    = document.getElementById('answer');
    const feedback = document.getElementById('feedback');
    const attempts = document.getElementById('attempts');
    const card     = document.querySelector('.enigma-card');
    const sanctum  = document.getElementById('sanctum');
    const flash    = document.querySelector('.reveal-flash');

    let tries = 0;

    /* ============================================ */
    /* Embers — animated particles                  */
    /* ============================================ */
    function spawnEmbers() {
        const layer = document.getElementById('embers');
        const COUNT = 30;
        for (let i = 0; i < COUNT; i++) {
            const e = document.createElement('span');
            e.className = 'ember';
            e.style.left = Math.random() * 100 + 'vw';
            e.style.animationDuration = (8 + Math.random() * 12) + 's';
            e.style.animationDelay = (Math.random() * 15) + 's';
            const size = 1 + Math.random() * 3;
            e.style.width = size + 'px';
            e.style.height = size + 'px';
            layer.appendChild(e);
        }
    }

    /* ============================================ */
    /* Enigma validation                            */
    /* ============================================ */
    function checkAnswer(raw) {
        const cleaned = raw.trim().toLowerCase();
        return ACCEPTED.includes(cleaned);
    }

    function showFeedback(message, type) {
        feedback.textContent = message;
        feedback.className = 'feedback ' + type;
    }

    function showHint() {
        if (tries === 1) {
            showFeedback('« The Eye watches. Think with the sacred numbers… »', 'hint');
        } else if (tries === 2) {
            showFeedback('« Three by three makes nine. Four are the elements. »', 'hint');
        } else if (tries >= 3) {
            showFeedback('« Look upon the Great Seal: the steps of the Pyramid… »', 'hint');
        }
        attempts.textContent = '✦  ATTEMPT  ' + tries + '  ✦';
    }

    /* ============================================ */
    /* Reveal the Sancta Sanctorum                  */
    /* ============================================ */
    function reveal() {
        showFeedback('✦  The Gate opens…  ✦', 'success');

        flash.classList.add('flash');

        /* Lock further submissions */
        input.disabled = true;
        form.querySelector('button').disabled = true;

        setTimeout(() => {
            sanctum.classList.add('revealed');
            sanctum.setAttribute('aria-hidden', 'false');

            /* Scroll to the inner sanctum */
            setTimeout(() => {
                sanctum.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 200);
        }, 900);

        /* Clear flash after animation */
        setTimeout(() => flash.classList.remove('flash'), 1300);
    }

    /* ============================================ */
    /* Wrong answer handling                        */
    /* ============================================ */
    function handleWrong() {
        tries++;
        card.classList.remove('shake');
        /* Trigger reflow to restart animation */
        void card.offsetWidth;
        card.classList.add('shake');

        showFeedback('✗  The key is wrong. The Eye remains closed.', 'error');
        setTimeout(() => showHint(), 1400);

        input.value = '';
        input.focus();
    }

    /* ============================================ */
    /* Init                                         */
    /* ============================================ */
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const value = input.value;

        if (!value.trim()) {
            input.focus();
            return;
        }

        if (checkAnswer(value)) {
            reveal();
        } else {
            handleWrong();
        }
    });

    /* Easter egg: clicking the eye in the SVG focuses input */
    const eyeGroup = document.querySelector('.eye-group');
    if (eyeGroup) {
        eyeGroup.style.cursor = 'pointer';
        eyeGroup.addEventListener('click', () => input.focus());
    }

    spawnEmbers();
})();
