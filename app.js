/* ======================================================
   RUPEES RADAR — Shared Application Logic
   ====================================================== */

// ── Data Store (localStorage) ─────────────────────────
const Store = {
  get(key, fallback = null) {
    try {
      const data = localStorage.getItem(`rr_${key}`);
      return data ? JSON.parse(data) : fallback;
    } catch { return fallback; }
  },
  set(key, value) {
    localStorage.setItem(`rr_${key}`, JSON.stringify(value));
  },
  remove(key) {
    localStorage.removeItem(`rr_${key}`);
  }
};

// ── Default Data ──────────────────────────────────────
function initDefaultData() {
  if (!Store.get('initialized')) {
    Store.set('user', {
      name: 'Arjun Mehta',
      email: 'arjun@rupeesradar.com',
      business: 'Central Academy',
      sector: 'Tutor',
      plan: 'Premium Plan',
      phone: '+91 98765 43210',
      twoFA: true
    });

    Store.set('students', [
      { id: 1, name: 'Aarav Sharma', class: 'Class 10', subject: 'Mathematics', fee: 3500, status: 'Paid', joinDate: '2025-06-15', phone: '+91 98765 11111' },
      { id: 2, name: 'Priya Patel', class: 'Class 12', subject: 'Physics', fee: 4000, status: 'Paid', joinDate: '2025-07-01', phone: '+91 98765 22222' },
      { id: 3, name: 'Rohan Kumar', class: 'Class 9', subject: 'Science', fee: 3000, status: 'Pending', joinDate: '2025-08-10', phone: '+91 98765 33333' },
      { id: 4, name: 'Sneha Gupta', class: 'Class 11', subject: 'Chemistry', fee: 3500, status: 'Paid', joinDate: '2025-05-20', phone: '+91 98765 44444' },
      { id: 5, name: 'Vikram Singh', class: 'Class 10', subject: 'English', fee: 2500, status: 'Overdue', joinDate: '2025-04-12', phone: '+91 98765 55555' },
      { id: 6, name: 'Ananya Desai', class: 'Class 8', subject: 'Mathematics', fee: 3000, status: 'Paid', joinDate: '2025-09-01', phone: '+91 98765 66666' },
      { id: 7, name: 'Karan Joshi', class: 'Class 12', subject: 'Biology', fee: 4000, status: 'Pending', joinDate: '2025-06-28', phone: '+91 98765 77777' },
      { id: 8, name: 'Meera Nair', class: 'Class 11', subject: 'Mathematics', fee: 3500, status: 'Paid', joinDate: '2025-03-15', phone: '+91 98765 88888' }
    ]);

    Store.set('teachers', [
      { id: 1, name: 'Dr. Amrita Singh', department: 'Mathematics', salary: 85000, qualification: 'Ph.D Mathematics', status: 'Active', joinDate: '2020-01-15' },
      { id: 2, name: 'Mr. Rajesh Khanna', department: 'Physical Education', salary: 45000, qualification: 'M.P.Ed', status: 'Active', joinDate: '2019-07-01' },
      { id: 3, name: 'Ms. Priya Verma', department: 'Computer Science', salary: 62000, qualification: 'M.Tech CS', status: 'Active', joinDate: '2021-03-10' },
      { id: 4, name: 'Prof. Samuel Isaac', department: 'History & Ethics', salary: 55000, qualification: 'M.A History', status: 'Active', joinDate: '2018-06-20' }
    ]);

    Store.set('expenses', [
      { id: 1, title: 'Classroom Supplies', category: 'Supplies', amount: 8500, date: '2025-12-10', status: 'Paid', vendor: 'Sharma Stationery' },
      { id: 2, title: 'Electricity Bill', category: 'Utilities', amount: 12000, date: '2025-12-15', status: 'Pending', vendor: 'MSEDCL' },
      { id: 3, title: 'Staff Transport', category: 'Transport', amount: 6350, date: '2025-12-18', status: 'Paid', vendor: 'City Cabs' },
      { id: 4, title: 'Software License', category: 'Technology', amount: 4200, date: '2025-12-20', status: 'Overdue', vendor: 'Adobe Inc.' },
      { id: 5, title: 'Building Maintenance', category: 'Maintenance', amount: 15000, date: '2025-12-22', status: 'Pending', vendor: 'BuildRight Services' },
      { id: 6, title: 'Internet Service', category: 'Utilities', amount: 2800, date: '2025-12-25', status: 'Paid', vendor: 'Jio Fiber' }
    ]);

    Store.set('settings', {
      businessName: 'Central Academy',
      email: 'arjun@rupeesradar.com',
      phone: '+91 98765 43210',
      currency: 'INR',
      language: 'English',
      notifications: true,
      twoFA: true,
      darkMode: false
    });

    Store.set('initialized', true);
  }
}

// ── Sidebar Navigation ────────────────────────────────
function renderSidebar(activePage) {
  const pages = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', href: 'dashboard.html' },
    { id: 'students', icon: 'school', label: 'Students', href: 'students.html' },
    { id: 'teachers', icon: 'person_4', label: 'Teachers', href: 'teachers.html' },
    { id: 'expenses', icon: 'payments', label: 'Expenses', href: 'expenses.html' },
    { id: 'settings', icon: 'settings', label: 'Settings', href: 'settings.html' }
  ];

  const user = Store.get('user', { name: 'Arjun Mehta', plan: 'Premium Plan' });
  const initials = user.name.split(' ').map(n => n[0]).join('');

  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  sidebar.innerHTML = `
    <div class="sidebar-brand">
      <div class="sidebar-brand-icon">
        <span class="material-symbols-outlined">eco</span>
      </div>
      <div class="sidebar-brand-text">
        <span class="sidebar-brand-name">Rupees Radar</span>
        <span class="sidebar-brand-sub">The Organic Ledger</span>
      </div>
    </div>
    <nav class="sidebar-nav">
      ${pages.map(p => `
        <a href="${p.href}" class="sidebar-link ${p.id === activePage ? 'active' : ''}" data-page="${p.id}">
          <span class="material-symbols-outlined">${p.icon}</span>
          ${p.label}
        </a>
      `).join('')}
    </nav>
    <div class="sidebar-footer">
      <div class="sidebar-avatar">${initials}</div>
      <div class="sidebar-user-info">
        <span class="sidebar-user-name">${user.name}</span>
        <span class="sidebar-user-role">${user.plan}</span>
      </div>
    </div>
  `;

  // Mobile header
  const mobileHeader = document.getElementById('mobile-header');
  if (mobileHeader) {
    mobileHeader.innerHTML = `
      <button class="hamburger" onclick="toggleSidebar()">
        <span class="material-symbols-outlined">menu</span>
      </button>
      <span class="sidebar-brand-name" style="font-family:var(--font-headline);font-weight:700;color:var(--primary);">Rupees Radar</span>
      <div class="sidebar-avatar" style="width:32px;height:32px;font-size:0.75rem;">${initials}</div>
    `;
  }

  // Bottom nav
  const bottomNav = document.getElementById('bottom-nav');
  if (bottomNav) {
    const mobilePages = pages.slice(0, 4).concat([pages[4]]);
    bottomNav.innerHTML = `
      <div class="bottom-nav-inner">
        ${mobilePages.map(p => `
          <a href="${p.href}" class="bottom-nav-link ${p.id === activePage ? 'active' : ''}">
            <span class="material-symbols-outlined">${p.icon}</span>
            <span>${p.label}</span>
          </a>
        `).join('')}
      </div>
    `;
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
}

// ── Toast Notifications ───────────────────────────────
function showToast(message, icon = 'check_circle') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="material-symbols-outlined icon-sm">${icon}</span>${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-out');
    setTimeout(() => toast.remove(), 200);
  }, 3000);
}

// ── Modal System ──────────────────────────────────────
function openModal(id) {
  document.getElementById(id).classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
  document.body.style.overflow = '';
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ── Chart Helpers (Canvas Drawing) ────────────────────
class SimpleChart {
  constructor(canvas, options = {}) {
    this.canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.options = options;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width * 2;
    this.canvas.height = rect.height * 2;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
    this.ctx.scale(2, 2);
    this.w = rect.width;
    this.h = rect.height;
    if (this.lastDraw) this.lastDraw();
  }

  drawBarChart(data) {
    this.lastDraw = () => this.drawBarChart(data);
    const ctx = this.ctx;
    const { w, h } = this;
    ctx.clearRect(0, 0, w, h);

    const padding = { top: 30, right: 20, bottom: 50, left: 60 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;
    const maxVal = Math.max(...data.flatMap(d => d.values)) * 1.15;

    // Grid lines
    ctx.strokeStyle = 'rgba(193, 200, 194, 0.3)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();

      ctx.fillStyle = '#717973';
      ctx.font = '11px Inter';
      ctx.textAlign = 'right';
      const val = Math.round(maxVal - (maxVal / 4) * i);
      ctx.fillText(val >= 1000 ? (val / 1000).toFixed(0) + 'k' : val, padding.left - 8, y + 4);
    }

    const barGroupWidth = chartW / data.length;
    const barWidth = Math.min(barGroupWidth * 0.25, 24);
    const colors = ['#1b4332', '#588157'];

    data.forEach((item, i) => {
      const x = padding.left + barGroupWidth * i + barGroupWidth / 2;

      item.values.forEach((val, vi) => {
        const barH = (val / maxVal) * chartH;
        const bx = x - barWidth + vi * (barWidth + 4);
        const by = padding.top + chartH - barH;

        // Bar with rounded top
        const radius = 4;
        ctx.fillStyle = colors[vi];
        ctx.beginPath();
        ctx.moveTo(bx, by + radius);
        ctx.arcTo(bx, by, bx + barWidth, by, radius);
        ctx.arcTo(bx + barWidth, by, bx + barWidth, by + barH, radius);
        ctx.lineTo(bx + barWidth, padding.top + chartH);
        ctx.lineTo(bx, padding.top + chartH);
        ctx.closePath();
        ctx.fill();
      });

      // Label
      ctx.fillStyle = '#717973';
      ctx.font = '11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(item.label, x, h - padding.bottom + 18);
    });

    // Legend
    colors.forEach((c, i) => {
      const lx = w - padding.right - (colors.length - i) * 90;
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(lx, 14, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#414844';
      ctx.font = '11px Inter';
      ctx.textAlign = 'left';
      ctx.fillText(i === 0 ? 'Income' : 'Expenses', lx + 10, 18);
    });
  }

  drawDonutChart(data) {
    this.lastDraw = () => this.drawDonutChart(data);
    const ctx = this.ctx;
    const { w, h } = this;
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.35;
    const innerRadius = radius * 0.65;
    const total = data.reduce((s, d) => s + d.value, 0);

    let startAngle = -Math.PI / 2;
    data.forEach((item) => {
      const sliceAngle = (item.value / total) * Math.PI * 2;

      ctx.beginPath();
      ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle);
      ctx.arc(cx, cy, innerRadius, startAngle + sliceAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();

      startAngle += sliceAngle;
    });

    // Center text
    ctx.fillStyle = '#191c1b';
    ctx.font = 'bold 18px Manrope';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('₹' + (total / 1000).toFixed(0) + 'k', cx, cy - 6);
    ctx.font = '11px Inter';
    ctx.fillStyle = '#717973';
    ctx.fillText('Total', cx, cy + 14);

    // Legend below
    const legendY = cy + radius + 20;
    data.forEach((item, i) => {
      const lx = (w / (data.length + 1)) * (i + 1);
      ctx.fillStyle = item.color;
      ctx.beginPath();
      ctx.arc(lx - 20, legendY, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#414844';
      ctx.font = '10px Inter';
      ctx.textAlign = 'left';
      ctx.fillText(item.label, lx - 12, legendY + 3);
    });
  }

  drawLineChart(data) {
    this.lastDraw = () => this.drawLineChart(data);
    const ctx = this.ctx;
    const { w, h } = this;
    ctx.clearRect(0, 0, w, h);

    const padding = { top: 20, right: 20, bottom: 40, left: 50 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;
    const maxVal = Math.max(...data.values) * 1.15;

    // Grid
    ctx.strokeStyle = 'rgba(193, 200, 194, 0.3)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();
    }

    // Line
    ctx.strokeStyle = '#1b4332';
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();

    const points = [];
    data.values.forEach((val, i) => {
      const x = padding.left + (chartW / (data.values.length - 1)) * i;
      const y = padding.top + chartH - (val / maxVal) * chartH;
      points.push({ x, y });
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
    gradient.addColorStop(0, 'rgba(27, 67, 50, 0.15)');
    gradient.addColorStop(1, 'rgba(27, 67, 50, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(points[points.length - 1].x, padding.top + chartH);
    ctx.lineTo(points[0].x, padding.top + chartH);
    ctx.closePath();
    ctx.fill();

    // Dots
    points.forEach(p => {
      ctx.fillStyle = '#1b4332';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
    });

    // Labels
    ctx.fillStyle = '#717973';
    ctx.font = '11px Inter';
    ctx.textAlign = 'center';
    data.labels.forEach((label, i) => {
      const x = padding.left + (chartW / (data.labels.length - 1)) * i;
      ctx.fillText(label, x, h - padding.bottom + 18);
    });
  }
}

// ── Format Currency ───────────────────────────────────
function formatCurrency(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

function formatCurrencyShort(amount) {
  if (amount >= 100000) return '₹' + (amount / 100000).toFixed(1) + 'L';
  if (amount >= 1000) return '₹' + (amount / 1000).toFixed(1) + 'k';
  return '₹' + amount;
}

// ── Init ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initDefaultData();
});
