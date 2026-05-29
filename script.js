const translations = {
  pt: {
    brandName: "Finança",
    brandSubtitle: "controle mensal",
    navSummary: "Resumo",
    navAdd: "Adicionar",
    navSpending: "Gastos",
    navGoals: "Metas",
    navCategories: "Categorias",
    heroKicker: "Controle Financeiro",
    heroTitle: "Visão clara do seu dinheiro",
    heroCopy: "Cadastre entradas, saídas e metas para acompanhar seu mês em tempo real.",
    month: "Mês",
    language: "Idioma",
    reset: "Zerar",
    income: "Receitas",
    expenses: "Gastos",
    balance: "Saldo",
    goals: "Metas",
    avgProgress: "progresso médio",
    addKicker: "Adicionar valores",
    newEntry: "Novo lançamento",
    type: "Tipo",
    expenseOption: "Saída",
    incomeOption: "Entrada",
    description: "Descrição",
    category: "Categoria",
    amount: "Valor",
    addButton: "Adicionar",
    goalKicker: "Nova meta",
    financialGoal: "Objetivo financeiro",
    name: "Nome",
    current: "Atual",
    target: "Meta",
    createGoal: "Criar meta",
    chartKicker: "Gráfico de gastos",
    categoryDistribution: "Distribuição por categoria",
    total: "Total",
    goalsKicker: "Metas financeiras",
    activeGoals: "Objetivos em andamento",
    categoriesKicker: "Categorias",
    latestTransactions: "Últimas movimentações",
    all: "Tudo",
    incomePlural: "Entradas",
    expensePlural: "Saídas",
    saved: "guardado",
    vsPrevious: "vs mês anterior",
    categories: "categorias",
    ofMonthlyTotal: "do total mensal",
    noExpenses: "Nenhum gasto cadastrado neste mês.",
    noGoals: "Nenhuma meta cadastrada neste mês.",
    noTransactions: "Nenhum lançamento para este filtro.",
    resetConfirm: "Zerar todos os lançamentos e metas?",
    entryTitlePlaceholder: "Ex: Mercado",
    entryCategoryPlaceholder: "Ex: Alimentação",
    goalNamePlaceholder: "Ex: Notebook",
    completed: "concluído",
    from: "de",
    locale: "pt-BR",
    currency: "BRL",
    months: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro"
    ]
  },
  en: {
    brandName: "Finance",
    brandSubtitle: "monthly control",
    navSummary: "Summary",
    navAdd: "Add",
    navSpending: "Spending",
    navGoals: "Goals",
    navCategories: "Categories",
    heroKicker: "Finance Control",
    heroTitle: "A clear view of your money",
    heroCopy: "Add income, expenses, and goals to track your month in real time.",
    month: "Month",
    language: "Language",
    reset: "Reset",
    income: "Income",
    expenses: "Expenses",
    balance: "Balance",
    goals: "Goals",
    avgProgress: "average progress",
    addKicker: "Add values",
    newEntry: "New entry",
    type: "Type",
    expenseOption: "Expense",
    incomeOption: "Income",
    description: "Description",
    category: "Category",
    amount: "Amount",
    addButton: "Add",
    goalKicker: "New goal",
    financialGoal: "Financial goal",
    name: "Name",
    current: "Current",
    target: "Target",
    createGoal: "Create goal",
    chartKicker: "Spending chart",
    categoryDistribution: "Distribution by category",
    total: "Total",
    goalsKicker: "Financial goals",
    activeGoals: "Active goals",
    categoriesKicker: "Categories",
    latestTransactions: "Latest transactions",
    all: "All",
    incomePlural: "Income",
    expensePlural: "Expenses",
    saved: "saved",
    vsPrevious: "vs previous month",
    categories: "categories",
    ofMonthlyTotal: "of monthly total",
    noExpenses: "No expenses added for this month.",
    noGoals: "No goals added for this month.",
    noTransactions: "No entries for this filter.",
    resetConfirm: "Reset all entries and goals?",
    entryTitlePlaceholder: "Ex: Groceries",
    entryCategoryPlaceholder: "Ex: Food",
    goalNamePlaceholder: "Ex: Laptop",
    completed: "complete",
    from: "of",
    locale: "en-US",
    currency: "BRL",
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  }
};

let currentLanguage = localStorage.getItem("finance-language") || "pt";

function createEmptyYear(year = new Date().getFullYear()) {
  return translations.pt.months.reduce((months, name, index) => {
    const month = String(index + 1).padStart(2, "0");
    months[`${year}-${month}`] = {
      income: 0,
      expenses: [],
      goals: [],
      transactions: []
    };
    return months;
  }, {});
}

const storageKey = "finance-dashboard-data-v2";
const savedData = localStorage.getItem(storageKey);
let data = savedData ? JSON.parse(savedData) : createEmptyYear();

const monthTabs = document.querySelector("#monthTabs");
const yearLabel = document.querySelector("#yearLabel");
const prevYear = document.querySelector("#prevYear");
const nextYear = document.querySelector("#nextYear");
const languageToggle = document.querySelector("#languageToggle");
const themeToggle = document.querySelector("#themeToggle");
const resetData = document.querySelector("#resetData");
const typeButtons = document.querySelectorAll("[data-type]");
const navLinks = document.querySelectorAll(".nav-list a");
const viewSections = document.querySelectorAll(".view-section");
const transactionForm = document.querySelector("#transactionForm");
const goalForm = document.querySelector("#goalForm");
let selectedType = "all";
let currentView = "resumo";
let selectedMonthKey = "";
let selectedYear = new Date().getFullYear();

const colors = ["#9f4636", "#b64d63", "#a35b45", "#4b352d", "#a4672d", "#8c5361"];

function t(key) {
  return translations[currentLanguage][key];
}

function formatCurrency(value) {
  return new Intl.NumberFormat(t("locale"), {
    style: "currency",
    currency: t("currency"),
    maximumFractionDigits: 0
  }).format(value);
}

function monthLabel(key) {
  const [year, month] = key.split("-");
  return `${translations[currentLanguage].months[Number(month) - 1]} ${year}`;
}

function saveData() {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

function ensureYear(year) {
  const yearData = createEmptyYear(year);
  Object.entries(yearData).forEach(([key, value]) => {
    if (!data[key]) data[key] = value;
  });
  data = Object.keys(data)
    .sort()
    .reduce((sorted, key) => {
      sorted[key] = data[key];
      return sorted;
    }, {});
  saveData();
}

function totalExpenses(monthData) {
  return monthData.expenses.reduce((sum, item) => sum + item.value, 0);
}

function trend(currentKey, field) {
  const keys = Object.keys(data);
  const index = keys.indexOf(currentKey);
  if (index <= 0) return `+0% ${t("vsPrevious")}`;

  const previous = data[keys[index - 1]];
  const currentValue = field === "expenses" ? totalExpenses(data[currentKey]) : data[currentKey][field];
  const previousValue = field === "expenses" ? totalExpenses(previous) : previous[field];
  if (!previousValue) return `+0% ${t("vsPrevious")}`;

  const percent = Math.round(((currentValue - previousValue) / previousValue) * 100);
  const signal = percent >= 0 ? "+" : "";
  return `${signal}${percent}% ${t("vsPrevious")}`;
}

function renderMonth(key) {
  const monthData = data[key];
  const expenseTotal = totalExpenses(monthData);
  const balance = monthData.income - expenseTotal;
  const savingsRate = monthData.income ? Math.max(0, Math.round((balance / monthData.income) * 100)) : 0;
  const goalAverage = monthData.goals.length
    ? Math.round(
        (monthData.goals.reduce((sum, goal) => sum + Math.min(goal.current / goal.target, 1), 0) /
          monthData.goals.length) *
          100
      )
    : 0;

  document.querySelector("#incomeValue").textContent = formatCurrency(monthData.income);
  document.querySelector("#expenseValue").textContent = formatCurrency(expenseTotal);
  document.querySelector("#balanceValue").textContent = formatCurrency(balance);
  document.querySelector("#goalValue").textContent = `${goalAverage}%`;
  document.querySelector("#incomeTrend").textContent = trend(key, "income");
  document.querySelector("#expenseTrend").textContent = trend(key, "expenses");
  document.querySelector("#savingsRate").textContent = `${savingsRate}% ${t("saved")}`;
  document.querySelector("#donutTotal").textContent = formatCurrency(expenseTotal);
  document.querySelector("#totalCategories").textContent = `${monthData.expenses.length} ${t("categories")}`;

  renderDonut(monthData.expenses, expenseTotal);
  renderCategories(monthData.expenses, expenseTotal);
  renderGoals(monthData.goals);
  renderTransactions(monthData.transactions);
}

function renderDonut(expenses, total) {
  if (!total) {
    document.querySelector("#donutChart").style.background = "conic-gradient(var(--surface-soft) 0deg 360deg)";
    return;
  }

  let start = 0;
  const slices = expenses.map((item) => {
    const degrees = (item.value / total) * 360;
    const slice = `${item.color} ${start}deg ${start + degrees}deg`;
    start += degrees;
    return slice;
  });

  document.querySelector("#donutChart").style.background = `conic-gradient(${slices.join(", ")})`;
}

function renderCategories(expenses, total) {
  if (!expenses.length) {
    document.querySelector("#categoryList").innerHTML = `<div class="empty-state">${t("noExpenses")}</div>`;
    return;
  }

  document.querySelector("#categoryList").innerHTML = expenses
    .map((item) => {
      const percent = Math.round((item.value / total) * 100);
      return `
        <div class="category-row">
          <span class="swatch" style="background:${item.color}"></span>
          <div class="category-copy">
            <strong>${item.category}</strong>
            <span>${percent}% ${t("ofMonthlyTotal")}</span>
          </div>
          <span class="category-value">${formatCurrency(item.value)}</span>
        </div>
      `;
    })
    .join("");
}

function renderGoals(goals) {
  if (!goals.length) {
    document.querySelector("#goalsList").innerHTML = `<div class="empty-state">${t("noGoals")}</div>`;
    return;
  }

  document.querySelector("#goalsList").innerHTML = goals
    .map((goal) => {
      const percent = Math.min(Math.round((goal.current / goal.target) * 100), 100);
      return `
        <div class="goal-row">
          <div class="goal-title">
            <strong>${goal.name}</strong>
            <span>${percent}%</span>
          </div>
          <div class="progress" aria-label="${goal.name}: ${percent}% ${t("completed")}">
            <span style="width:${percent}%"></span>
          </div>
          <span>${formatCurrency(goal.current)} ${t("from")} ${formatCurrency(goal.target)}</span>
        </div>
      `;
    })
    .join("");
}

function renderTransactions(transactions) {
  const filtered = transactions.filter((item) => selectedType === "all" || item.type === selectedType);
  if (!filtered.length) {
    document.querySelector("#transactionList").innerHTML = `<div class="empty-state">${t("noTransactions")}</div>`;
    return;
  }

  document.querySelector("#transactionList").innerHTML = filtered
    .map((item) => {
      const icon = item.type === "income" ? "↑" : "↓";
      const signal = item.type === "income" ? "+" : "-";
      return `
        <div class="transaction">
          <div class="transaction-info">
            <span class="transaction-icon">${icon}</span>
            <div>
              <strong>${item.title}</strong>
              <span>${item.category}</span>
            </div>
          </div>
          <span class="transaction-value ${item.type}">${signal}${formatCurrency(item.value)}</span>
        </div>
      `;
    })
    .join("");
}

function renderMonthOptions() {
  monthTabs.innerHTML = "";
  yearLabel.textContent = selectedYear;

  Object.keys(data)
    .filter((key) => key.startsWith(`${selectedYear}-`))
    .forEach((key) => {
    const button = document.createElement("button");
    const monthNumber = Number(key.split("-")[1]) - 1;
    button.type = "button";
    button.dataset.month = key;
    button.textContent = translations[currentLanguage].months[monthNumber].slice(0, 3);
    button.title = monthLabel(key);
    button.classList.toggle("active", key === selectedMonthKey);
    button.addEventListener("click", () => {
      selectedMonthKey = key;
      renderMonthOptions();
      renderMonth(selectedMonthKey);
    });
      monthTabs.append(button);
    });
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage === "pt" ? "pt-BR" : "en";
  document.documentElement.dataset.language = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-placeholder-key]").forEach((element) => {
    element.placeholder = t(element.dataset.placeholderKey);
  });

  renderMonthOptions();
  renderMonth(selectedMonthKey);
}

function showView(view) {
  currentView = view;

  viewSections.forEach((section) => {
    const sectionView = section.dataset.view;
    const shouldShow =
      view === "resumo" ||
      sectionView === view ||
      (view === "metas" && section.querySelector("#metas"));

    section.classList.toggle("is-hidden", !shouldShow);
  });

  document.querySelector("#gastos").classList.toggle("is-hidden", view === "metas");
  document.querySelector("#metas").classList.toggle("is-hidden", view === "gastos");

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${view}`;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  window.history.replaceState(null, "", `#${view}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const now = new Date();
const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
selectedMonthKey = data[currentMonthKey] ? currentMonthKey : Object.keys(data).at(-1);
selectedYear = Number(selectedMonthKey.split("-")[0]);
ensureYear(selectedYear);
renderMonthOptions();
prevYear.addEventListener("click", () => {
  selectedYear -= 1;
  ensureYear(selectedYear);
  selectedMonthKey = `${selectedYear}-01`;
  renderMonthOptions();
  renderMonth(selectedMonthKey);
});

nextYear.addEventListener("click", () => {
  selectedYear += 1;
  ensureYear(selectedYear);
  selectedMonthKey = `${selectedYear}-01`;
  renderMonthOptions();
  renderMonth(selectedMonthKey);
});
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showView(link.getAttribute("href").replace("#", ""));
  });
});
languageToggle.addEventListener("click", () => {
  currentLanguage = currentLanguage === "pt" ? "en" : "pt";
  localStorage.setItem("finance-language", currentLanguage);
  applyLanguage();
});

transactionForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const monthData = data[selectedMonthKey];
  const type = document.querySelector("#entryType").value;
  const title = document.querySelector("#entryTitle").value.trim();
  const category = document.querySelector("#entryCategory").value.trim();
  const value = Number(document.querySelector("#entryValue").value);

  if (!title || !category || !value) return;

  monthData.transactions.unshift({ title, category, value, type });

  if (type === "income") {
    monthData.income += value;
  } else {
    const existingCategory = monthData.expenses.find(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );

    if (existingCategory) {
      existingCategory.value += value;
    } else {
      monthData.expenses.push({
        category,
        value,
        color: colors[monthData.expenses.length % colors.length]
      });
    }
  }

  saveData();
  transactionForm.reset();
  document.querySelector("#entryType").value = "expense";
  renderMonth(selectedMonthKey);
});

goalForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const monthData = data[selectedMonthKey];
  const name = document.querySelector("#goalName").value.trim();
  const current = Number(document.querySelector("#goalCurrent").value);
  const target = Number(document.querySelector("#goalTarget").value);

  if (!name || target <= 0) return;

  monthData.goals.push({ name, current, target });
  saveData();
  goalForm.reset();
  renderMonth(selectedMonthKey);
});

themeToggle.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("finance-theme", next);
});

resetData.addEventListener("click", () => {
  if (!confirm(t("resetConfirm"))) return;

  data = createEmptyYear();
  saveData();
  selectedYear = new Date().getFullYear();
  selectedMonthKey = currentMonthKey;
  renderMonthOptions();
  renderMonth(selectedMonthKey);
});

typeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    typeButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    selectedType = button.dataset.type;
    renderMonth(selectedMonthKey);
  });
});

const savedTheme = localStorage.getItem("finance-theme");
if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
}

applyLanguage();
const initialView = window.location.hash ? window.location.hash.replace("#", "") : "resumo";
showView(["resumo", "adicionar", "gastos", "metas", "categorias"].includes(initialView) ? initialView : "resumo");
