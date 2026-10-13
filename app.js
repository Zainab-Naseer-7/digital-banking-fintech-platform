/**
 * NEXORA BANK - Core Banking & FinTech Platform Logic
 * Production-quality Vanilla JS Architecture with Reactive State & LocalStorage
 */

// Initial Seed Demo Data
const DEFAULT_STATE = {
  user: {
    name: 'Arif Khan',
    greeting: 'Good morning, Arif 👋',
    email: 'arif.khan@nexora.bank',
    phone: '+1 (555) 382-9421',
    country: 'United States',
    currency: 'USD',
    tier: 'Platinum Private Client',
    avatar: 'AK',
    securityScore: 96,
    twoFactor: true,
    loginAlerts: true
  },
  balances: {
    total: 24850.75,
    checking: 12450.80,
    savings: 8240.50,
    investment: 4159.45,
    monthlyGrowth: '+8.42%'
  },
  card: {
    type: 'physical',
    holder: 'ARIF KHAN',
    maskedNumber: '•••• •••• •••• 4829',
    fullNumber: '4532 8921 7842 4829',
    expiry: '09/29',
    cvv: '824',
    isFrozen: false,
    spendingLimit: 5000,
    currentSpent: 1840.50,
    status: 'Active'
  },
  transactions: [
    { id: 'TX-9021', name: 'Apple Store NYC', category: 'Shopping', date: '2026-09-05 14:22', amount: -899.00, status: 'Completed', type: 'debit', icon: '🛍️' },
    { id: 'TX-9020', name: 'Stripe Global Payout', category: 'Income', date: '2026-09-04 09:15', amount: 3450.00, status: 'Completed', type: 'credit', icon: '💼' },
    { id: 'TX-9019', name: 'Netflix Premium UHD', category: 'Entertainment', date: '2026-09-03 18:40', amount: -22.99, status: 'Completed', type: 'debit', icon: '🎬' },
    { id: 'TX-9018', name: 'Whole Foods Market', category: 'Food', date: '2026-09-03 12:30', amount: -142.50, status: 'Completed', type: 'debit', icon: '🥗' },
    { id: 'TX-9017', name: 'ConEdison Electric Bill', category: 'Bills', date: '2026-09-02 11:05', amount: -128.40, status: 'Completed', type: 'debit', icon: '⚡' },
    { id: 'TX-9016', name: 'Uber Technologies', category: 'Travel', date: '2026-09-01 22:18', amount: -45.20, status: 'Completed', type: 'debit', icon: '🚗' },
    { id: 'TX-9015', name: 'Stock Dividend (NVDA)', category: 'Income', date: '2026-08-30 16:00', amount: 620.00, status: 'Completed', type: 'credit', icon: '📈' },
    { id: 'TX-9014', name: 'Amazon Prime Order', category: 'Shopping', date: '2026-08-29 19:44', amount: -84.10, status: 'Pending', type: 'debit', icon: '📦' },
    { id: 'TX-9013', name: 'International Wire Return', category: 'Other', date: '2026-08-28 08:30', amount: -15.00, status: 'Failed', type: 'debit', icon: '⚠️' }
  ],
  goals: [
    { id: 'G-1', title: 'New MacBook Pro', target: 1500, current: 850, category: 'Tech', icon: '💻' },
    { id: 'G-2', title: 'Emergency Reserve Fund', target: 5000, current: 3200, category: 'Savings', icon: '🛡️' },
    { id: 'G-3', title: 'Swiss Alps Vacation', target: 3000, current: 1240, category: 'Travel', icon: '✈️' }
  ],
  bills: [
    { id: 'B-1', name: 'Electricity Service', provider: 'National Grid', due: 'Sep 15, 2026', amount: 128.50, isPaid: false, icon: '⚡' },
    { id: 'B-2', name: 'Gigabit High-Speed Internet', provider: 'Starlink / Fiber', due: 'Sep 18, 2026', amount: 79.99, isPaid: false, icon: '🌐' },
    { id: 'B-3', name: 'Unlimited 5G Mobile Plan', provider: 'Verizon FinTech', due: 'Sep 21, 2026', amount: 65.00, isPaid: true, icon: '📱' },
    { id: 'B-4', name: 'Municipal Water Utility', provider: 'City Water Dept', due: 'Sep 24, 2026', amount: 42.10, isPaid: false, icon: '💧' },
    { id: 'B-5', name: 'Cloud SaaS Infrastructure', provider: 'AWS / Nexora Pro', due: 'Sep 28, 2026', amount: 180.00, isPaid: false, icon: '☁️' }
  ],
  beneficiaries: [
    { id: 'BEN-1', name: 'Sarah Jenkins', account: '•••• 7721', bank: 'Chase Private', avatar: 'SJ' },
    { id: 'BEN-2', name: 'Elena Rostova', account: '•••• 9942', bank: 'Barclays UK', avatar: 'ER' },
    { id: 'BEN-3', name: 'Marcus Sterling', account: '•••• 3318', bank: 'UBS Zurich', avatar: 'MS' },
    { id: 'BEN-4', name: 'David Chen', account: '•••• 6401', bank: 'DBS Singapore', avatar: 'DC' }
  ],
  notifications: [
    { id: 'N-1', title: 'Transfer Completed', text: 'Wire of $3,450.00 from Stripe processed successfully.', time: '10m ago', unread: true },
    { id: 'N-2', title: 'New Login Detected', text: 'MacOS Safari in New York, USA. If not you, secure account.', time: '1h ago', unread: true },
    { id: 'N-3', title: 'Card Payment Approved', text: 'Apple Store purchase for $899.00 was authorized.', time: '1d ago', unread: false },
    { id: 'N-4', title: 'Monthly Statement Available', text: 'August 2026 encrypted statement is ready for download.', time: '2d ago', unread: false }
  ]
};

// Global App State
let state = loadState();

function loadState() {
  const saved = localStorage.getItem('nexora_state');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not parse local state, loading default.');
    }
  }
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

function saveState() {
  localStorage.setItem('nexora_state', JSON.stringify(state));
}

// Currency Formatter
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// Smooth Number Counter
function animateValue(obj, start, end, duration = 800) {
  if (!obj) return;
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const current = start + (end - start) * easeProgress;
    obj.innerHTML = formatCurrency(current);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Toast Notification Engine
function showToast(title, message = '', type = 'success', duration = 4000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icons = {
    success: '✓',
    warning: '⚠',
    error: '✕',
    info: 'ℹ'
  };

  toast.innerHTML = `
    <div style="width:28px; height:28px; border-radius:50%; background:rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; font-weight:bold;">
      ${icons[type] || '•'}
    </div>
    <div style="flex:1;">
      <div style="font-weight:700; font-size:0.92rem;">${title}</div>
      ${message ? `<div style="font-size:0.8rem; color:var(--text-secondary); margin-top:2px;">${message}</div>` : ''}
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 350);
  }, duration);
}

// Theme Engine (Dark / Light Mode)
function initTheme() {
  const currentTheme = localStorage.getItem('nexora_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', active);
      localStorage.setItem('nexora_theme', active);
      updateThemeIcon(active);
      showToast('Theme Updated', `Switched to ${active.toUpperCase()} mode`, 'info');
      // Redraw charts if existing
      if (typeof drawCharts === 'function') drawCharts();
    });
  });
}

function updateThemeIcon(theme) {
  const icons = document.querySelectorAll('.theme-toggle-icon');
  icons.forEach(el => {
    el.textContent = theme === 'light' ? '🌙' : '☀️';
  });
}

// Generic Modal Controller
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function initModals() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
}

// Notification Drawer Toggle
function initNotifications() {
  const trigger = document.getElementById('notif-trigger');
  const dropdown = document.getElementById('notif-dropdown');
  const countBadge = document.getElementById('notif-count-badge');
  const listContainer = document.getElementById('notif-list-container');
  const markAllBtn = document.getElementById('mark-all-read-btn');

  if (!trigger || !dropdown) return;

  function renderNotifs() {
    const unreadCount = state.notifications.filter(n => n.unread).length;
    if (countBadge) {
      countBadge.style.display = unreadCount > 0 ? 'block' : 'none';
    }

    if (listContainer) {
      listContainer.innerHTML = state.notifications.map(n => `
        <div class="notif-item ${n.unread ? 'unread' : ''}" data-id="${n.id}">
          <div style="font-size:1.2rem;">🔔</div>
          <div style="flex:1;">
            <div style="font-size:0.88rem; font-weight:700;">${n.title}</div>
            <div style="font-size:0.78rem; color:var(--text-secondary); margin-top:2px;">${n.text}</div>
            <div style="font-size:0.7rem; color:var(--text-muted); margin-top:4px;">${n.time}</div>
          </div>
        </div>
      `).join('');
    }
  }

  renderNotifs();

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && e.target !== trigger) {
      dropdown.classList.remove('active');
    }
  });

  if (markAllBtn) {
    markAllBtn.addEventListener('click', () => {
      state.notifications.forEach(n => n.unread = false);
      saveState();
      renderNotifs();
      showToast('Notifications Cleared', 'All marked as read', 'info');
    });
  }
}

// Dashboard Navigation Tabs
function initDashboardNav() {
  const navItems = document.querySelectorAll('.sidebar-menu .nav-item, .mobile-nav-item');
  const panes = document.querySelectorAll('.tab-pane');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const targetTab = item.getAttribute('data-tab');
      if (!targetTab) return;

      e.preventDefault();

      // Update active nav
      document.querySelectorAll('.sidebar-menu .nav-item').forEach(i => i.classList.remove('active'));
      document.querySelectorAll('.mobile-nav-item').forEach(i => i.classList.remove('active'));

      document.querySelectorAll(`[data-tab="${targetTab}"]`).forEach(i => i.classList.add('active'));

      // Show target tab pane
      panes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === `tab-${targetTab}`) {
          pane.classList.add('active');
        }
      });

      // On mobile close sidebar
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) sidebar.classList.remove('mobile-open');

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Trigger chart resize or render if switching to overview or analytics
      if (targetTab === 'overview' || targetTab === 'analytics') {
        setTimeout(drawCharts, 50);
      }
    });
  });

  // Mobile drawer trigger
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const sidebar = document.querySelector('.sidebar');
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }
}

// Global Command Palette (Ctrl + K)
function initCommandPalette() {
  const paletteModal = document.getElementById('cmd-palette-modal');
  const cmdInput = document.getElementById('cmd-input');
  const cmdList = document.getElementById('cmd-results-list');
  const trigger = document.getElementById('search-trigger-btn');

  if (!paletteModal || !cmdInput || !cmdList) return;

  const commands = [
    { name: 'Send Money', cat: 'Action', tab: 'transfers', icon: '💸' },
    { name: 'Request Money', cat: 'Action', modal: 'modal-request-money', icon: '📥' },
    { name: 'Pay Electricity / Utilities', cat: 'Payments', tab: 'payments', icon: '⚡' },
    { name: 'Manage Virtual & Debit Cards', cat: 'Cards', tab: 'cards', icon: '💳' },
    { name: 'Freeze / Lock Debit Card', cat: 'Security', tab: 'cards', action: 'freeze', icon: '❄️' },
    { name: 'Checking Account ($12,450.80)', cat: 'Accounts', tab: 'accounts', icon: '🏦' },
    { name: 'Savings Account ($8,240.50)', cat: 'Accounts', tab: 'accounts', icon: '💰' },
    { name: 'Investment Account ($4,159.45)', cat: 'Accounts', tab: 'accounts', icon: '📈' },
    { name: 'Savings Goals (Laptop, Fund, Vacation)', cat: 'Savings', tab: 'savings', icon: '🎯' },
    { name: 'Security Score & 2FA Settings', cat: 'Security', tab: 'security', icon: '🛡️' },
    { name: 'Download Statements (CSV / PDF)', cat: 'Statements', tab: 'statements', icon: '📄' },
    { name: 'Beneficiaries & Contacts', cat: 'Transfers', tab: 'beneficiaries', icon: '👥' },
    { name: 'Personal Profile & Settings', cat: 'Settings', tab: 'settings', icon: '⚙️' }
  ];

  function openPalette() {
    paletteModal.classList.add('active');
    cmdInput.value = '';
    renderResults(commands);
    setTimeout(() => cmdInput.focus(), 100);
  }

  function renderResults(items) {
    if (items.length === 0) {
      cmdList.innerHTML = `<li style="padding:1.5rem; text-align:center; color:var(--text-muted);">No results found matching your search.</li>`;
      return;
    }
    cmdList.innerHTML = items.map((item, idx) => `
      <li class="cmd-item ${idx === 0 ? 'selected' : ''}" data-index="${idx}">
        <span style="font-size:1.25rem;">${item.icon}</span>
        <div style="flex:1;">
          <div style="font-weight:600; font-size:0.92rem; color:var(--text-primary);">${item.name}</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">${item.cat}</div>
        </div>
        <span style="font-size:0.75rem; color:var(--accent-cyan); font-weight:600;">Open →</span>
      </li>
    `).join('');

    cmdList.querySelectorAll('.cmd-item').forEach((li, i) => {
      li.addEventListener('click', () => {
        executeCommand(items[i]);
      });
    });
  }

  function executeCommand(cmd) {
    paletteModal.classList.remove('active');
    if (cmd.tab) {
      const tabBtn = document.querySelector(`[data-tab="${cmd.tab}"]`);
      if (tabBtn) tabBtn.click();
    }
    if (cmd.modal) {
      openModal(cmd.modal);
    }
    if (cmd.action === 'freeze') {
      toggleCardFreeze();
    }
  }

  if (trigger) trigger.addEventListener('click', openPalette);

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (paletteModal.classList.contains('active')) {
        paletteModal.classList.remove('active');
      } else {
        openPalette();
      }
    }
    if (e.key === 'Escape' && paletteModal.classList.contains('active')) {
      paletteModal.classList.remove('active');
    }
  });

  cmdInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    const filtered = commands.filter(c => c.name.toLowerCase().includes(q) || c.cat.toLowerCase().includes(q));
    renderResults(filtered);
  });
}

// Card Management Module
function initCardControls() {
  const freezeBtn = document.getElementById('card-freeze-toggle-btn');
  const revealBtn = document.getElementById('card-reveal-btn');
  const copyBtn = document.getElementById('card-copy-number-btn');
  const cardNumDisplay = document.getElementById('showcase-card-number');
  const cardStatusBadge = document.getElementById('card-status-badge');
  const cardElement = document.getElementById('interactive-bank-card');
  const limitSlider = document.getElementById('card-limit-slider');
  const limitDisplay = document.getElementById('card-limit-display');

  if (freezeBtn) {
    freezeBtn.addEventListener('click', toggleCardFreeze);
  }

  if (revealBtn && cardNumDisplay) {
    let revealed = false;
    revealBtn.addEventListener('click', () => {
      revealed = !revealed;
      cardNumDisplay.textContent = revealed ? state.card.fullNumber : state.card.maskedNumber;
      revealBtn.innerHTML = revealed ? '👁️ Hide Details' : '👁️ Reveal Details';
      showToast(revealed ? 'Card Number Revealed' : 'Card Number Masked', '', 'info');
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(state.card.fullNumber.replace(/\s+/g, ''));
      showToast('Card Number Copied', 'Copied to clipboard securely', 'success');
    });
  }

  if (limitSlider && limitDisplay) {
    limitSlider.addEventListener('input', (e) => {
      state.card.spendingLimit = parseInt(e.target.value, 10);
      limitDisplay.textContent = formatCurrency(state.card.spendingLimit);
      saveState();
    });
  }

  // Type Switcher (Physical vs Virtual)
  document.querySelectorAll('.card-type-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.card-type-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const type = tab.getAttribute('data-type');
      state.card.type = type;
      if (cardElement) {
        if (type === 'virtual') {
          cardElement.classList.add('card-virtual');
          cardElement.classList.remove('card-visa');
        } else {
          cardElement.classList.remove('card-virtual');
          cardElement.classList.add('card-visa');
        }
      }
      showToast('Active Card Switched', `Viewing ${type.toUpperCase()} Card`, 'info');
    });
  });
}

function toggleCardFreeze() {
  state.card.isFrozen = !state.card.isFrozen;
  saveState();

  const freezeBtn = document.getElementById('card-freeze-toggle-btn');
  const cardStatusBadge = document.getElementById('card-status-badge');
  const cardElement = document.getElementById('interactive-bank-card');

  if (state.card.isFrozen) {
    if (freezeBtn) freezeBtn.innerHTML = '❄️ Unfreeze Card';
    if (cardStatusBadge) {
      cardStatusBadge.className = 'badge badge-danger';
      cardStatusBadge.textContent = 'Frozen';
    }
    if (cardElement) cardElement.style.filter = 'grayscale(0.7) contrast(1.1)';
    showToast('Card Frozen', 'All purchases are currently blocked.', 'warning');
  } else {
    if (freezeBtn) freezeBtn.innerHTML = '❄️ Freeze Card';
    if (cardStatusBadge) {
      cardStatusBadge.className = 'badge badge-success';
      cardStatusBadge.textContent = 'Active';
    }
    if (cardElement) cardElement.style.filter = 'none';
    showToast('Card Unfrozen', 'Card is now active for transactions.', 'success');
  }
}

// Transfer Wizard Flow
function initTransferWizard() {
  const form = document.getElementById('transfer-form');
  if (!form) return;

  const step1 = document.getElementById('transfer-step-1');
  const step2 = document.getElementById('transfer-step-2');
  const nextBtn = document.getElementById('transfer-next-btn');
  const backBtn = document.getElementById('transfer-back-btn');
  const confirmBtn = document.getElementById('transfer-confirm-btn');

  const inputAmount = document.getElementById('transfer-amount');
  const inputRecipient = document.getElementById('transfer-recipient');
  const inputAccount = document.getElementById('transfer-from-account');
  const inputDesc = document.getElementById('transfer-description');

  // Review fields
  const revAmount = document.getElementById('review-amount');
  const revRecipient = document.getElementById('review-recipient');
  const revAccount = document.getElementById('review-from-account');
  const revFee = document.getElementById('review-fee');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const amount = parseFloat(inputAmount.value);
      const recipient = inputRecipient.value.trim();

      if (!recipient) {
        showToast('Missing Recipient', 'Please enter a recipient or account number.', 'error');
        return;
      }
      if (isNaN(amount) || amount <= 0) {
        showToast('Invalid Amount', 'Please enter a transfer amount greater than $0.', 'error');
        return;
      }

      const fromAcc = inputAccount.value;
      const available = state.balances[fromAcc];

      if (amount > available) {
        showToast('Insufficient Balance', `Available in ${fromAcc}: ${formatCurrency(available)}`, 'error');
        return;
      }

      // Populate review
      revAmount.textContent = formatCurrency(amount);
      revRecipient.textContent = recipient;
      revAccount.textContent = fromAcc.toUpperCase() + ` (${formatCurrency(available)})`;
      if (revFee) revFee.textContent = '$0.00 (Zero-Fee Platinum Transfer)';

      step1.style.display = 'none';
      step2.style.display = 'block';
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      step2.style.display = 'none';
      step1.style.display = 'block';
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      const amount = parseFloat(inputAmount.value);
      const recipient = inputRecipient.value.trim();
      const fromAcc = inputAccount.value;

      // Deduct balance
      state.balances[fromAcc] -= amount;
      state.balances.total -= amount;

      // Add to transactions
      const newTx = {
        id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
        name: `Transfer to ${recipient}`,
        category: 'Transfer',
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        amount: -amount,
        status: 'Completed',
        type: 'debit',
        icon: '💸'
      };

      state.transactions.unshift(newTx);
      saveState();

      // Update UI displays
      updateDashboardBalances();
      renderTransactionsTable();

      // Reset modal
      closeModal('modal-transfer');
      step2.style.display = 'none';
      step1.style.display = 'block';
      form.reset();

      showToast('Transfer Successful!', `${formatCurrency(amount)} sent to ${recipient}.`, 'success');

      // Add notification
      state.notifications.unshift({
        id: `N-${Date.now()}`,
        title: 'Transfer Completed',
        text: `Sent ${formatCurrency(amount)} to ${recipient}`,
        time: 'Just now',
        unread: true
      });
      initNotifications();
    });
  }
}

// Transactions Search, Filtering & Pagination
let currentTxPage = 1;
const TX_PER_PAGE = 5;

function renderTransactionsTable() {
  const tableBodies = [
    document.getElementById('transactions-table-body'),
    document.getElementById('full-transactions-table-body')
  ].filter(Boolean);

  if (tableBodies.length === 0) return;

  const searchInput = document.getElementById('tx-search-input');
  const catFilter = document.getElementById('tx-category-filter');
  const statusFilter = document.getElementById('tx-status-filter');

  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const category = catFilter ? catFilter.value : 'all';
  const status = statusFilter ? statusFilter.value : 'all';

  let list = state.transactions.filter(tx => {
    const matchQuery = tx.name.toLowerCase().includes(query) || tx.id.toLowerCase().includes(query);
    const matchCategory = category === 'all' || tx.category === category;
    const matchStatus = status === 'all' || tx.status === status;
    return matchQuery && matchCategory && matchStatus;
  });

  const totalPages = Math.ceil(list.length / TX_PER_PAGE) || 1;
  if (currentTxPage > totalPages) currentTxPage = totalPages;

  const start = (currentTxPage - 1) * TX_PER_PAGE;
  const paginated = list.slice(start, start + TX_PER_PAGE);

  const htmlContent = paginated.length === 0
    ? `<tr><td colspan="5" style="text-align:center; padding: 2.5rem; color:var(--text-muted);">No transactions match your search criteria.</td></tr>`
    : paginated.map(tx => {
        const isPos = tx.amount > 0;
        const statusBadge = tx.status === 'Completed' ? 'badge-success' : tx.status === 'Pending' ? 'badge-warning' : 'badge-danger';
        return `
          <tr onclick="viewTransactionDetail('${tx.id}')">
            <td>
              <div class="tx-merchant">
                <div class="tx-icon-box">${tx.icon}</div>
                <div>
                  <div class="tx-name">${tx.name}</div>
                  <div class="tx-category-sub">${tx.id} • ${tx.category}</div>
                </div>
              </div>
            </td>
            <td><span class="badge ${statusBadge}">${tx.status}</span></td>
            <td style="color:var(--text-secondary); font-size:0.85rem;">${tx.date}</td>
            <td class="${isPos ? 'tx-amount-positive' : 'tx-amount-negative'}">
              ${isPos ? '+' : ''}${formatCurrency(tx.amount)}
            </td>
            <td>
              <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation(); viewTransactionDetail('${tx.id}')">Details →</button>
            </td>
          </tr>
        `;
      }).join('');

  tableBodies.forEach(tb => {
    tb.innerHTML = htmlContent;
  });

  // Update pagination indicators
  const pageInfo = document.getElementById('tx-page-info');
  if (pageInfo) {
    pageInfo.textContent = `Page ${currentTxPage} of ${totalPages} (${list.length} total)`;
  }
}

function initTransactionFilters() {
  const searchInput = document.getElementById('tx-search-input');
  const catFilter = document.getElementById('tx-category-filter');
  const statusFilter = document.getElementById('tx-status-filter');
  const prevBtn = document.getElementById('tx-prev-page-btn');
  const nextBtn = document.getElementById('tx-next-page-btn');

  if (searchInput) searchInput.addEventListener('input', () => { currentTxPage = 1; renderTransactionsTable(); });
  if (catFilter) catFilter.addEventListener('change', () => { currentTxPage = 1; renderTransactionsTable(); });
  if (statusFilter) statusFilter.addEventListener('change', () => { currentTxPage = 1; renderTransactionsTable(); });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentTxPage > 1) {
        currentTxPage--;
        renderTransactionsTable();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentTxPage++;
      renderTransactionsTable();
    });
  }
}

// Transaction Detail Modal
window.viewTransactionDetail = function(id) {
  const tx = state.transactions.find(t => t.id === id);
  if (!tx) return;

  const content = document.getElementById('tx-detail-modal-body');
  if (content) {
    content.innerHTML = `
      <div style="text-align:center; margin-bottom:1.5rem;">
        <div style="font-size:3rem; margin-bottom:0.5rem;">${tx.icon}</div>
        <div style="font-size:1.4rem; font-weight:800;">${tx.name}</div>
        <div style="font-size:1.8rem; font-weight:800; font-family:var(--font-display); margin-top:0.4rem; color:${tx.amount > 0 ? 'var(--success)' : 'var(--text-primary)'};">
          ${tx.amount > 0 ? '+' : ''}${formatCurrency(tx.amount)}
        </div>
        <span class="badge ${tx.status === 'Completed' ? 'badge-success' : 'badge-warning'}" style="margin-top:0.5rem;">${tx.status}</span>
      </div>

      <div style="background:var(--surface); border:1px solid var(--glass-border); border-radius:var(--radius-md); padding:1.25rem; display:flex; flex-direction:column; gap:0.85rem; font-size:0.9rem;">
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">Transaction ID</span>
          <span style="font-family:var(--font-display); font-weight:600;">${tx.id}</span>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">Category</span>
          <span style="font-weight:600;">${tx.category}</span>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">Timestamp</span>
          <span>${tx.date}</span>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">Payment Channel</span>
          <span>NEXORA SwiftLink • Visa Infinite</span>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">Security Check</span>
          <span style="color:var(--success); font-weight:600;">Verified 256-bit Encrypted</span>
        </div>
      </div>

      <div style="margin-top:1.5rem; display:flex; gap:1rem;">
        <button class="btn btn-secondary btn-sm" style="flex:1;" onclick="downloadSingleReceipt('${tx.id}')">Download Receipt</button>
        <button class="btn btn-primary btn-sm" style="flex:1;" onclick="closeModal('modal-tx-detail')">Close</button>
      </div>
    `;
    openModal('modal-tx-detail');
  }
};

window.downloadSingleReceipt = function(id) {
  const tx = state.transactions.find(t => t.id === id);
  if (!tx) return;
  const data = `NEXORA BANK RECEIPT\nTransaction ID: ${tx.id}\nMerchant: ${tx.name}\nAmount: ${formatCurrency(tx.amount)}\nDate: ${tx.date}\nStatus: ${tx.status}\nAccount: Arif Khan (Checking)`;
  const blob = new Blob([data], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Nexora-Receipt-${tx.id}.txt`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Receipt Downloaded', `Saved receipt for ${tx.id}`, 'success');
};

// Savings Goals Logic
function renderSavingsGoals() {
  const container = document.getElementById('savings-goals-container');
  if (!container) return;

  container.innerHTML = state.goals.map(goal => {
    const pct = Math.min(Math.round((goal.current / goal.target) * 100), 100);
    return `
      <div class="goal-card">
        <div class="goal-header">
          <div style="display:flex; align-items:center; gap:0.85rem;">
            <div class="goal-icon">${goal.icon}</div>
            <div>
              <div style="font-weight:700; font-size:1.05rem;">${goal.title}</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">${goal.category}</div>
            </div>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="promptDeleteGoal('${goal.id}')" title="Delete Goal">✕</button>
        </div>

        <div>
          <div class="goal-stats" style="margin-bottom:0.5rem;">
            <span style="font-family:var(--font-display); font-weight:700; font-size:1.15rem;">${formatCurrency(goal.current)}</span>
            <span style="color:var(--text-muted); font-size:0.85rem;">Goal: ${formatCurrency(goal.target)}</span>
          </div>
          <div class="progress-track">
            <div class="progress-bar-fill ${pct >= 70 ? 'cyan' : ''}" style="width: ${pct}%;"></div>
          </div>
          <div style="text-align:right; font-size:0.75rem; color:var(--accent-cyan); font-weight:700; margin-top:4px;">${pct}% reached</div>
        </div>

        <button class="btn btn-secondary btn-sm" style="width:100%; margin-top:auto;" onclick="openDepositGoalModal('${goal.id}')">
          + Add Money
        </button>
      </div>
    `;
  }).join('');
}

window.openDepositGoalModal = function(id) {
  const goal = state.goals.find(g => g.id === id);
  if (!goal) return;
  const goalIdInput = document.getElementById('deposit-goal-id');
  const goalTitleDisplay = document.getElementById('deposit-goal-title');
  if (goalIdInput && goalTitleDisplay) {
    goalIdInput.value = goal.id;
    goalTitleDisplay.textContent = `${goal.icon} ${goal.title}`;
    openModal('modal-deposit-goal');
  }
};

window.promptDeleteGoal = function(id) {
  state.goals = state.goals.filter(g => g.id !== id);
  saveState();
  renderSavingsGoals();
  showToast('Savings Goal Removed', '', 'info');
};

function initSavingsGoalForm() {
  const createForm = document.getElementById('create-goal-form');
  if (createForm) {
    createForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('new-goal-title').value.trim();
      const target = parseFloat(document.getElementById('new-goal-target').value);
      const category = document.getElementById('new-goal-category').value;
      const icon = document.getElementById('new-goal-icon').value || '🎯';

      if (!title || isNaN(target) || target <= 0) {
        showToast('Invalid Goal', 'Please enter valid title and target amount.', 'error');
        return;
      }

      state.goals.push({
        id: `G-${Date.now()}`,
        title,
        target,
        current: 0,
        category,
        icon
      });
      saveState();
      renderSavingsGoals();
      closeModal('modal-create-goal');
      createForm.reset();
      showToast('Savings Goal Created!', `Aiming for ${formatCurrency(target)}`, 'success');
    });
  }

  const depositForm = document.getElementById('deposit-goal-form');
  if (depositForm) {
    depositForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('deposit-goal-id').value;
      const amount = parseFloat(document.getElementById('deposit-goal-amount').value);

      if (isNaN(amount) || amount <= 0) {
        showToast('Invalid Amount', 'Please enter amount > $0', 'error');
        return;
      }

      if (state.balances.checking < amount) {
        showToast('Insufficient Funds', 'Not enough balance in Checking.', 'error');
        return;
      }

      const goal = state.goals.find(g => g.id === id);
      if (goal) {
        goal.current += amount;
        state.balances.checking -= amount;
        state.balances.total -= amount;
        saveState();
        updateDashboardBalances();
        renderSavingsGoals();
        closeModal('modal-deposit-goal');
        depositForm.reset();
        showToast('Funds Deposited', `${formatCurrency(amount)} allocated to ${goal.title}`, 'success');
      }
    });
  }
}

// Bill Payments Logic
function renderBillPayments() {
  const container = document.getElementById('bills-container');
  if (!container) return;

  container.innerHTML = state.bills.map(bill => `
    <div class="bill-card">
      <div class="bill-top">
        <div class="bill-icon">${bill.icon}</div>
        <div>
          <div style="font-weight:700; font-size:1.05rem;">${bill.name}</div>
          <div style="font-size:0.8rem; color:var(--text-muted);">${bill.provider}</div>
        </div>
      </div>

      <div style="display:flex; align-items:flex-end; justify-content:space-between; margin-top:0.5rem;">
        <div>
          <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Due Date</div>
          <div style="font-size:0.88rem; font-weight:600;">${bill.due}</div>
        </div>
        <div class="bill-amount">${formatCurrency(bill.amount)}</div>
      </div>

      <div style="margin-top:auto; padding-top:0.75rem; border-top:1px solid var(--glass-border);">
        ${bill.isPaid ? `
          <div class="badge badge-success" style="width:100%; justify-content:center; padding:0.6rem;">
            ✓ Paid Online
          </div>
        ` : `
          <button class="btn btn-primary btn-sm" style="width:100%;" onclick="openPayBillModal('${bill.id}')">
            Pay Now (${formatCurrency(bill.amount)})
          </button>
        `}
      </div>
    </div>
  `).join('');
}

window.openPayBillModal = function(id) {
  const bill = state.bills.find(b => b.id === id);
  if (!bill) return;

  const content = document.getElementById('pay-bill-modal-body');
  if (content) {
    content.innerHTML = `
      <div style="text-align:center; margin-bottom:1.5rem;">
        <div style="font-size:3rem;">${bill.icon}</div>
        <div style="font-size:1.35rem; font-weight:800; margin-top:0.5rem;">${bill.name}</div>
        <div style="font-size:0.9rem; color:var(--text-muted);">${bill.provider}</div>
        <div style="font-size:2.2rem; font-family:var(--font-display); font-weight:800; margin:0.8rem 0; color:var(--accent-cyan);">
          ${formatCurrency(bill.amount)}
        </div>
      </div>

      <div style="background:var(--surface); border:1px solid var(--glass-border); border-radius:var(--radius-md); padding:1rem; margin-bottom:1.5rem;">
        <div style="display:flex; justify-content:space-between; font-size:0.9rem;">
          <span style="color:var(--text-muted);">Payment Source:</span>
          <span style="font-weight:700;">Checking Account ($${state.balances.checking.toFixed(2)})</span>
        </div>
      </div>

      <button class="btn btn-primary" style="width:100%;" onclick="confirmPayBill('${bill.id}')">
        Confirm & Pay Bill
      </button>
    `;
    openModal('modal-pay-bill');
  }
};

window.confirmPayBill = function(id) {
  const bill = state.bills.find(b => b.id === id);
  if (!bill) return;

  if (state.balances.checking < bill.amount) {
    showToast('Insufficient Funds', 'Checking balance cannot cover this bill.', 'error');
    return;
  }

  state.balances.checking -= bill.amount;
  state.balances.total -= bill.amount;
  bill.isPaid = true;

  state.transactions.unshift({
    id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
    name: `${bill.name} Payment`,
    category: 'Bills',
    date: new Date().toISOString().replace('T', ' ').slice(0, 16),
    amount: -bill.amount,
    status: 'Completed',
    type: 'debit',
    icon: bill.icon
  });

  saveState();
  updateDashboardBalances();
  renderBillPayments();
  renderTransactionsTable();
  closeModal('modal-pay-bill');

  showToast('Bill Paid Successfully', `${formatCurrency(bill.amount)} paid to ${bill.provider}`, 'success');
};

// Beneficiaries Section
function renderBeneficiaries() {
  const container = document.getElementById('beneficiaries-list-container');
  if (!container) return;

  container.innerHTML = state.beneficiaries.map(ben => `
    <div class="beneficiary-card">
      <div class="beneficiary-avatar">${ben.avatar}</div>
      <div>
        <div style="font-weight:700; font-size:0.95rem;">${ben.name}</div>
        <div style="font-size:0.75rem; color:var(--text-muted);">${ben.bank} • ${ben.account}</div>
      </div>
      <button class="btn btn-secondary btn-sm" style="width:100%;" onclick="quickSendToBeneficiary('${ben.name}')">
        Send Funds
      </button>
    </div>
  `).join('');
}

window.quickSendToBeneficiary = function(name) {
  openModal('modal-transfer');
  const recipientInput = document.getElementById('transfer-recipient');
  if (recipientInput) recipientInput.value = name;
};

// Statements Export (CSV & Print PDF)
function initStatements() {
  const csvBtn = document.getElementById('export-csv-btn');
  const printBtn = document.getElementById('export-pdf-btn');

  if (csvBtn) {
    csvBtn.addEventListener('click', () => {
      let csv = 'ID,Date,Merchant,Category,Amount,Status\n';
      state.transactions.forEach(t => {
        csv += `"${t.id}","${t.date}","${t.name}","${t.category}","${t.amount}","${t.status}"\n`;
      });
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `NEXORA-Statement-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('CSV Statement Exported', 'Downloaded complete transaction records.', 'success');
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

// Security Center Actions
function initSecurityCenter() {
  const twoFactorSwitch = document.getElementById('two-factor-toggle');
  const loginAlertSwitch = document.getElementById('login-alert-toggle');
  const scoreProgress = document.getElementById('security-score-circle');

  if (twoFactorSwitch) {
    twoFactorSwitch.checked = state.user.twoFactor;
    twoFactorSwitch.addEventListener('change', (e) => {
      state.user.twoFactor = e.target.checked;
      saveState();
      showToast('2FA Setting Updated', e.target.checked ? 'Two-Factor Authentication is Enabled' : 'Two-Factor Authentication Disabled', 'info');
    });
  }

  if (loginAlertSwitch) {
    loginAlertSwitch.checked = state.user.loginAlerts;
    loginAlertSwitch.addEventListener('change', (e) => {
      state.user.loginAlerts = e.target.checked;
      saveState();
      showToast('Alert Setting Updated', e.target.checked ? 'Login notifications active' : 'Login alerts turned off', 'info');
    });
  }
}

// Interactive Canvas Charts (Line, Donut, Bar)
function drawCharts() {
  drawLineChart();
  drawDonutChart();
  drawBarChart();
}

function drawLineChart() {
  const canvas = document.getElementById('balance-line-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;

  ctx.clearRect(0, 0, w, h);

  const points = [18200, 19400, 18900, 21500, 20800, 23400, 24850.75];
  const max = 26000;
  const min = 16000;

  const stepX = (w - 40) / (points.length - 1);

  // Gradient fill
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(37, 99, 235, 0.35)');
  grad.addColorStop(1, 'rgba(37, 99, 235, 0.0)');

  ctx.beginPath();
  points.forEach((val, i) => {
    const x = 20 + i * stepX;
    const y = h - 30 - ((val - min) / (max - min)) * (h - 60);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.lineTo(20 + (points.length - 1) * stepX, h - 10);
  ctx.lineTo(20, h - 10);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line stroke
  ctx.beginPath();
  points.forEach((val, i) => {
    const x = 20 + i * stepX;
    const y = h - 30 - ((val - min) / (max - min)) * (h - 60);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Dots
  points.forEach((val, i) => {
    const x = 20 + i * stepX;
    const y = h - 30 - ((val - min) / (max - min)) * (h - 60);
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#06b6d4';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  });
}

function drawDonutChart() {
  const canvas = document.getElementById('spending-donut-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const cx = rect.width / 2;
  const cy = rect.height / 2;
  const radius = Math.min(cx, cy) - 25;
  const innerRadius = radius * 0.65;

  const slices = [
    { label: 'Shopping', value: 35, color: '#3b82f6' },
    { label: 'Food & Dining', value: 20, color: '#06b6d4' },
    { label: 'Bills & Utilities', value: 18, color: '#7c3aed' },
    { label: 'Travel', value: 15, color: '#10b981' },
    { label: 'Entertainment', value: 12, color: '#f59e0b' }
  ];

  let currentAngle = -Math.PI / 2;
  slices.forEach(slice => {
    const sliceAngle = (slice.value / 100) * (Math.PI * 2);
    ctx.beginPath();
    ctx.arc(cx, cy, radius, currentAngle, currentAngle + sliceAngle);
    ctx.arc(cx, cy, innerRadius, currentAngle + sliceAngle, currentAngle, true);
    ctx.closePath();
    ctx.fillStyle = slice.color;
    ctx.fill();
    currentAngle += sliceAngle;
  });

  // Inner circle text
  ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'light' ? '#0f172a' : '#ffffff';
  ctx.font = 'bold 16px Plus Jakarta Sans, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Monthly', cx, cy - 8);
  ctx.font = '12px Plus Jakarta Sans, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('$2,840 Spent', cx, cy + 12);
}

function drawBarChart() {
  const canvas = document.getElementById('income-expense-bar-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;

  ctx.clearRect(0, 0, w, h);

  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  const income = [4200, 5100, 4800, 6200, 5800, 6800];
  const expense = [2800, 3100, 2900, 3400, 3150, 2840];
  const maxVal = 7500;

  const groupWidth = (w - 40) / months.length;
  const barWidth = groupWidth * 0.32;

  months.forEach((m, i) => {
    const gx = 20 + i * groupWidth;

    // Income Bar (Cyan/Blue)
    const ih = (income[i] / maxVal) * (h - 45);
    const iy = h - 25 - ih;
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.roundRect(gx, iy, barWidth, ih, [4, 4, 0, 0]);
    ctx.fill();

    // Expense Bar (Purple)
    const eh = (expense[i] / maxVal) * (h - 45);
    const ey = h - 25 - eh;
    ctx.fillStyle = '#8b5cf6';
    ctx.beginPath();
    ctx.roundRect(gx + barWidth + 4, ey, barWidth, eh, [4, 4, 0, 0]);
    ctx.fill();

    // Month label
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px Plus Jakarta Sans, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(m, gx + barWidth, h - 8);
  });
}

// Update Balances on Overview
function updateDashboardBalances() {
  const totalElem = document.getElementById('dash-total-balance');
  const checkingElem = document.getElementById('dash-checking-balance');
  const savingsElem = document.getElementById('dash-savings-balance');
  const investElem = document.getElementById('dash-investment-balance');

  if (totalElem) animateValue(totalElem, 0, state.balances.total, 600);
  if (checkingElem) checkingElem.textContent = formatCurrency(state.balances.checking);
  if (savingsElem) savingsElem.textContent = formatCurrency(state.balances.savings);
  if (investElem) investElem.textContent = formatCurrency(state.balances.investment);
}

// Landing Page Animations & Interactivity
function initLandingPage() {
  const nav = document.querySelector('.landing-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // Animate trust numbers on scroll
  const statElements = document.querySelectorAll('.trust-number[data-target]');
  if (statElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-target'));
          const suffix = el.getAttribute('data-suffix') || '';
          const prefix = el.getAttribute('data-prefix') || '';
          let count = 0;
          const inc = target / 40;
          const timer = setInterval(() => {
            count += inc;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            el.textContent = `${prefix}${count % 1 === 0 ? count : count.toFixed(2)}${suffix}`;
          }, 30);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    statElements.forEach(el => observer.observe(el));
  }
}

// Initial Bootstrapper
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initModals();
  initNotifications();
  initCommandPalette();
  initCardControls();
  initTransferWizard();
  initTransactionFilters();
  initSavingsGoalForm();
  initStatements();
  initSecurityCenter();
  initLandingPage();

  if (document.querySelector('.app-layout')) {
    initDashboardNav();
    updateDashboardBalances();
    renderTransactionsTable();
    renderSavingsGoals();
    renderBillPayments();
    renderBeneficiaries();
    setTimeout(drawCharts, 100);
    window.addEventListener('resize', drawCharts);
  }
});
