/* ═══════════════════════════════════════════════════════════
   USER ACCOUNTS — Login / Register against the Flask + Supabase backend.
   Shared by index.html and drawing.html: adds the nav buttons and the
   slide-in panel to any page that has a .site-nav and loads auth.css.

   Backend:  POST /register { username, email, password, gdpr_consent, gdpr_consent_version }
             POST /token    { email, password }  → { access_token }
             GET  /me       Authorization: Bearer <token> → { email, id, is_admin }
   Session is kept in localStorage as migue100_token + migue100_session.
═══════════════════════════════════════════════════════════ */
(function () {
    const BACKEND_URL  = 'https://web-production-47911.up.railway.app';
    const TOKEN_KEY    = 'migue100_token';
    const SESSION_KEY  = 'migue100_session';
    const GDPR_VERSION = 'v1.0-2026';

    /* ── Session helpers (localStorage can be blocked: always try/catch) ── */
    function getSession() {
        try {
            const token   = localStorage.getItem(TOKEN_KEY);
            const session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
            if (!token || !session) return null;
            const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
            if (payload.exp && payload.exp * 1000 < Date.now()) { clearSession(); return null; }
            return session;
        } catch (e) { return null; }
    }
    function saveSession(token, session) {
        try {
            localStorage.setItem(TOKEN_KEY, token);
            localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        } catch (e) {}
    }
    function clearSession() {
        try { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(SESSION_KEY); } catch (e) {}
    }

    /* ── Markup ── */
    const nav = document.querySelector('.site-nav');
    if (!nav) return;

    const navAuth = document.createElement('div');
    navAuth.className = 'nav-auth';
    navAuth.innerHTML =
        '<button type="button" class="nav-auth-btn" id="nav-login">Login</button>' +
        '<button type="button" class="nav-auth-btn primary" id="nav-register">Register</button>';
    nav.appendChild(navAuth);

    const root = document.createElement('div');
    root.innerHTML = `
        <div class="auth-overlay" id="auth-overlay"></div>
        <aside class="auth-panel" id="auth-panel" aria-hidden="true">
            <button type="button" class="auth-close" id="auth-close" aria-label="Close">&times;</button>

            <form class="auth-form" id="auth-login" hidden novalidate>
                <h2 class="auth-title">Login</h2>
                <div class="auth-field">
                    <label for="login-email">Email</label>
                    <input type="email" id="login-email" autocomplete="email" required>
                </div>
                <div class="auth-field">
                    <label for="login-password">Password</label>
                    <input type="password" id="login-password" autocomplete="current-password" required>
                </div>
                <p class="auth-msg" id="login-msg" role="alert"></p>
                <button type="submit" class="auth-submit" id="login-submit">Log in</button>
                <p class="auth-switch">No account? <button type="button" data-auth-show="register">Register here</button></p>
            </form>

            <form class="auth-form" id="auth-register" hidden novalidate>
                <h2 class="auth-title">Register</h2>
                <div class="auth-field">
                    <label for="reg-username">Username</label>
                    <input type="text" id="reg-username" autocomplete="username" required>
                </div>
                <div class="auth-field">
                    <label for="reg-email">Email</label>
                    <input type="email" id="reg-email" autocomplete="email" required>
                </div>
                <div class="auth-field">
                    <label for="reg-password">Password</label>
                    <input type="password" id="reg-password" autocomplete="new-password" minlength="6" required>
                </div>
                <div class="auth-field">
                    <label for="reg-confirm">Confirm password</label>
                    <input type="password" id="reg-confirm" autocomplete="new-password" required>
                </div>
                <label class="auth-consent">
                    <input type="checkbox" id="reg-gdpr" required>
                    <span>I have read and accept the <a href="privacy-policy.html" target="_blank" rel="noopener">Privacy Policy</a> and consent to the processing of my personal data under the GDPR.</span>
                </label>
                <p class="auth-msg" id="reg-msg" role="alert"></p>
                <button type="submit" class="auth-submit" id="reg-submit">Create account</button>
                <p class="auth-switch">Already have an account? <button type="button" data-auth-show="login">Log in here</button></p>
            </form>

            <div class="auth-user" id="auth-user" hidden>
                <h2 class="auth-title">Account</h2>
                <p class="auth-user-email" id="auth-user-email"></p>
                <button type="button" class="auth-submit" id="auth-logout">Log out</button>
            </div>
        </aside>`;
    document.body.append(...root.children);

    const $ = id => document.getElementById(id);
    const panel = $('auth-panel'), overlay = $('auth-overlay');
    const views = { login: $('auth-login'), register: $('auth-register'), user: $('auth-user') };
    let activeView = null;

    /* ── Panel open / close / view switching ── */
    function show(view) {
        if (getSession()) view = 'user';
        Object.entries(views).forEach(([name, el]) => { el.hidden = name !== view; });
        activeView = view;
        if (view === 'user') $('auth-user-email').textContent = getSession().email;
        $('login-msg').textContent = ''; $('reg-msg').textContent = '';
    }
    function open(view) {
        show(view);
        panel.classList.add('open'); overlay.classList.add('open');
        panel.setAttribute('aria-hidden', 'false');
        const first = views[activeView].querySelector('input');
        if (first) setTimeout(() => first.focus(), 300);
    }
    function close() {
        panel.classList.remove('open'); overlay.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
    }
    const isOpen = () => panel.classList.contains('open');

    function updateNav() {
        const s = getSession();
        $('nav-login').textContent    = s ? (s.username || s.email.split('@')[0]) : 'Login';
        $('nav-register').textContent = s ? 'Logout' : 'Register';
    }
    function logout() { clearSession(); updateNav(); close(); }

    $('nav-login').addEventListener('click', () => {
        const view = getSession() ? 'user' : 'login';
        if (isOpen() && activeView === view) close(); else open(view);
    });
    $('nav-register').addEventListener('click', () => {
        if (getSession()) { logout(); return; }
        if (isOpen() && activeView === 'register') close(); else open('register');
    });
    $('auth-close').addEventListener('click', close);
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen()) close(); });
    $('auth-logout').addEventListener('click', logout);
    panel.querySelectorAll('[data-auth-show]').forEach(btn =>
        btn.addEventListener('click', () => show(btn.dataset.authShow)));

    function setMsg(id, text, type) {
        const el = $(id);
        el.textContent = text;
        el.className = 'auth-msg' + (type ? ' ' + type : '');
    }
    async function postJSON(path, body) {
        const res  = await fetch(BACKEND_URL + path, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        let data = {};
        try { data = await res.json(); } catch (e) {}
        return { ok: res.ok, data };
    }

    /* ── Login ── */
    views.login.addEventListener('submit', async e => {
        e.preventDefault();
        const email    = $('login-email').value.trim();
        const password = $('login-password').value;
        if (!email || !password) { setMsg('login-msg', 'Enter your email and password.', 'error'); return; }

        const btn = $('login-submit');
        btn.disabled = true; btn.textContent = 'Connecting…'; setMsg('login-msg', '');
        try {
            const { ok, data } = await postJSON('/token', { email, password });
            if (!ok || !data.access_token) { setMsg('login-msg', data.error || 'Incorrect email or password.', 'error'); return; }

            let is_admin = false;
            try {
                const me = await fetch(BACKEND_URL + '/me', { headers: { Authorization: 'Bearer ' + data.access_token } });
                is_admin = (await me.json()).is_admin === true;
            } catch (err) {}

            saveSession(data.access_token, { email, is_admin });
            views.login.reset();
            updateNav();
            close();
        } catch (err) {
            setMsg('login-msg', 'Could not connect to the server. Try again in a moment.', 'error');
        } finally {
            btn.disabled = false; btn.textContent = 'Log in';
        }
    });

    /* ── Register ── */
    views.register.addEventListener('submit', async e => {
        e.preventDefault();
        const username = $('reg-username').value.trim();
        const email    = $('reg-email').value.trim();
        const password = $('reg-password').value;
        const confirm  = $('reg-confirm').value;

        if (!username || !email || !password) { setMsg('reg-msg', 'Fill in all the fields.', 'error'); return; }
        if (!$('reg-email').checkValidity())   { setMsg('reg-msg', 'Enter a valid email address.', 'error'); return; }
        if (password.length < 6)               { setMsg('reg-msg', 'Password must be at least 6 characters.', 'error'); return; }
        if (password !== confirm)              { setMsg('reg-msg', 'Passwords do not match.', 'error'); return; }
        if (!$('reg-gdpr').checked)            { setMsg('reg-msg', 'You must accept the Privacy Policy to register.', 'error'); return; }

        const btn = $('reg-submit');
        btn.disabled = true; btn.textContent = 'Creating…'; setMsg('reg-msg', '');
        try {
            const { ok, data } = await postJSON('/register', {
                username, email, password,
                gdpr_consent: true, gdpr_consent_version: GDPR_VERSION
            });
            if (!ok) { setMsg('reg-msg', data.error || 'Registration failed. Try again.', 'error'); return; }
            views.register.reset();
            show('login');
            $('login-email').value = email;
            setMsg('login-msg', 'Account created! Check your email if a confirmation is required, then log in.', 'ok');
        } catch (err) {
            setMsg('reg-msg', 'Could not connect to the server. Try again in a moment.', 'error');
        } finally {
            btn.disabled = false; btn.textContent = 'Create account';
        }
    });

    updateNav();
})();
