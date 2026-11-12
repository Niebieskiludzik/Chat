// Konfiguracja Supabase
const SUPABASE_URL = 'https://rlgjbvocrgeyhrrmxoan.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZ2pidm9jcmdleWhycm14b2FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ0MTg2NTMsImV4cCI6MjEwOTk5NDY1M30.HwE2ClWIqbA_aNSUuqhrvRZKbC6uHQ-cNgp3_Aso1v4';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function detectDeviceType() {
    const ua = navigator.userAgent;
    let device = 'PC';
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        device = 'Tablet';
    } else if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua)) {
        device = 'Telefon';
    }
    return device;
}

function getCurrentUser() {
    const userJson = localStorage.getItem('chat_current_user');
    return userJson ? JSON.parse(userJson) : null;
}

function setCurrentUser(user) {
    localStorage.setItem('chat_current_user', JSON.stringify(user));
    applyUserTheme(user);
}

function applyUserTheme(user) {
    if (!user) return;
    document.body.className = '';
    if (user.preferred_theme) {
        document.body.classList.add(`theme-${user.preferred_theme}`);
    } else {
        document.body.classList.add('theme-gold');
    }
    if (user.theme_mode === 'light') {
        document.body.classList.add('theme-light');
    }
}

function logout() {
    localStorage.removeItem('chat_current_user');
    window.location.href = 'index.html';
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

window.addEventListener('DOMContentLoaded', () => {
    const user = getCurrentUser();
    if (user) applyUserTheme(user);
});
