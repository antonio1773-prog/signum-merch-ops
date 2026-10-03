const storeKey = "signum-merch-ops-v3";
const today = new Date();
const uid = () =>
  window.crypto?.randomUUID?.() || `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
const iso = (offset = 0) => {
  const date = new Date(today);
  date.setDate(today.getDate() + offset);
  return date.toISOString().slice(0, 10);
};

const defaultUsers = [
  { id: "mica", name: "Mica Alvarez", username: "mica", password: "1234", role: "vendedor", active: true },
  { id: "tomas", name: "Tomas Ruiz", username: "tomas", password: "1234", role: "vendedor", active: true },
  { id: "sofia", name: "Sofia Pena", username: "sofia", password: "1234", role: "vendedor", active: true },
  { id: "planeamiento", name: "Planeamiento Comercial", username: "planeamiento", password: "1234", role: "planeamiento", active: true },
  { id: "taller", name: "Taller Propio", username: "taller", password: "1234", role: "taller", active: true },
  { id: "fabrica", name: "Fabrica", username: "fabrica", password: "1234", role: "fabrica", active: true },
  { id: "logistica", name: "Logistica", username: "logistica", password: "1234", role: "logistica", active: true },
  { id: "direccion", name: "Direccion", username: "direccion", password: "admin", role: "direccion", active: true }
];

const seedState = {
  users: defaultUsers,
  clients: [
    { id: uid(), name: "Norte Labs", phone: "+54 11 4555-2010", email: "compras@nortelabs.com", active: true },
    { id: uid(), name: "Grupo Marea", phone: "+54 11 4890-7781", email: "marketing@grupomarea.com", active: true },
    { id: uid(), name: "Hotel Acacia", phone: "+54 223 512-9044", email: "eventos@hotelacacia.com", active: true }
  ],
  products: [
    { id: uid(), name: "Remera premium bordada", price: 14800, minimum: 25, source: "taller", leadTime: 6, active: true },
    { id: uid(), name: "Gorra trucker personalizada", price: 9700, minimum: 50, source: "fabrica", leadTime: 10, active: true },
    { id: uid(), name: "Kit bienvenida corporativo", price: 42500, minimum: 20, source: "taller", leadTime: 8, active: true }
  ],
  dynamics: [
    { id: uid(), title: "Prioridad onboarding Q4", description: "Kits bienvenida con cupo preferencial hasta agotar 300 unidades.", priority: "alta", expires: iso(2), active: true },
    { id: uid(), title: "Bonificacion volumen", description: "10% off en remeras desde 150 unidades. No acumulable.", priority: "media", expires: iso(1), active: true }
  ],
  quoteConfig: {
    costs: {
      paper: 92.26, ink: 93.85, tape: 25.11, labor: 320, printerDepreciation: 45.52,
      pressDepreciation: 41.43, electricity: 10, laborHourValue: 8000, unitsPerBatch: 100,
      hoursPerBatch: 4, inkMlPerUnit: 1.5, tapeCmPerUnit: 20
    },
    policy: { wasteRate: 3, taxRate: 2, commissionRate: 20, targetMarginRate: 10, roundingMultiple: 50 },
    products: [{
      id: "friselina-sublimada", name: "Bolsas de friselina sublimadas", material: "Friselina 80 g",
      colors: ["Blanco", "Beige", "Negro"], active: true,
      printOptions: [
        { id: "standard-one-side", name: "Sublimada - estampa estandar una cara", includeProduction: true },
        { id: "plain", name: "Sin sublimar", includeProduction: false }
      ],
      variants: [
        ["BOL-302010", "30x20x10", 30, 20, 10, 137.41, 2500], ["BOL-303010", "30x30x10", 30, 30, 10, 221.41, 1000],
        ["BOL-392010", "39x20x10", 39, 20, 10, 156.94, 2500], ["BOL-403010", "40x30x10", 40, 30, 10, 262.10, 1000],
        ["BOL-403510", "40x35x10", 40, 35, 10, 313.88, 1000], ["BOL-404010", "40x40x10", 40, 40, 10, 338.29, 1000],
        ["BOL-404510", "40x45x10", 40, 45, 10, 362.70, 1000], ["BOL-405010", "40x50x10", 40, 50, 10, 387.11, 1000],
        ["BOL-405510", "40x55x10", 40, 55, 10, 411.53, 1000], ["BOL-505010", "50x50x10", 50, 50, 10, 440.82, 4000],
        ["BOL-606010", "60x60x10", 60, 60, 10, 562.88, 3200], ["BOL-607010", "60x70x10", 60, 70, 10, 631.24, 3200],
        ["BOL-609010", "60x90x10", 60, 90, 10, 767.95, 3200]
      ].map(([sku, name, width, height, gusset, purchaseCost, supplierMinimum]) => ({ sku, id: sku, name, width, height, gusset, grammage: 80, purchaseCost, supplierMinimum, active: true }))
    }]
  },
  quotes: [],
  finance: {
    initialCapital: 1500000,
    transactions: [
      { id: uid(), type: "compra", amount: 420000, quantity: 100, productCode: "REM-001", productDescription: "Remera blanca base", invoiceImage: "", date: iso(-5), reference: "Stock inicial textiles", description: "Compra de remeras, gorras y avios.", createdAt: Date.now() - 432000000 },
      { id: uid(), type: "gasto", amount: 95000, date: iso(-3), reference: "Taller", description: "Insumos y mantenimiento.", createdAt: Date.now() - 259200000 },
      { id: uid(), type: "venta", amount: 850000, date: iso(-1), reference: "S-1043", description: "Cobro parcial Grupo Marea.", createdAt: Date.now() - 86400000 }
    ],
    pricing: [
      {
        id: uid(),
        productCode: "REM-001",
        productName: "Remera sublimada",
        description: "Remera blanca con sublimacion frente",
        manualCost: 0,
        purchaseCost: 4200,
        productionCost: 1200,
        sublimationSheet: 550,
        machineWear: 180,
        labor: 900,
        design: 450,
        electricity: 120,
        seller1: 700,
        seller2: 0,
        iva: true,
        total: 10043,
        createdAt: Date.now() - 86400000
      }
    ]
  },
  orders: [
    {
      id: "S-1042",
      sellerId: "mica",
      seller: "Mica Alvarez",
      client: "Norte Labs",
      clientPhone: "+54 11 4555-2010",
      clientEmail: "compras@nortelabs.com",
      deliveryAddress: "Av. Corrientes 1520, CABA",
      product: "Kit bienvenida corporativo",
      quantity: 60,
      source: "taller",
      requestedDate: iso(7),
      committedDate: "",
      requestType: "pedido",
      referenceImage: "",
      payment50: false,
      status: "esperando_senia",
      notes: "Logo a dos colores. Packaging individual.",
      comment: "Aprobado por planeamiento. Falta acreditar sena del 50%.",
      createdAt: Date.now() - 86400000
    },
    {
      id: "S-1043",
      sellerId: "tomas",
      seller: "Tomas Ruiz",
      client: "Grupo Marea",
      clientPhone: "+54 11 4890-7781",
      clientEmail: "marketing@grupomarea.com",
      deliveryAddress: "Ruta Panamericana km 42, Pilar",
      product: "Gorra trucker personalizada",
      quantity: 120,
      source: "fabrica",
      requestedDate: iso(12),
      committedDate: iso(14),
      requestType: "pedido",
      referenceImage: "",
      payment50: true,
      status: "fecha_confirmada",
      notes: "Tres variantes de color.",
      comment: "Fecha respondida por planeamiento segun fabrica.",
      createdAt: Date.now() - 3600000
    },
    {
      id: "S-1044",
      sellerId: "sofia",
      seller: "Sofia Pena",
      client: "Hotel Acacia",
      clientPhone: "+54 223 512-9044",
      clientEmail: "eventos@hotelacacia.com",
      deliveryAddress: "Alberti 2140, Mar del Plata",
      product: "Remera premium bordada",
      quantity: 80,
      source: "taller",
      requestedDate: iso(5),
      committedDate: "",
      requestType: "presupuesto",
      referenceImage: "",
      payment50: false,
      status: "presupuesto_planeamiento",
      notes: "Bordado frente corazon.",
      comment: "",
      createdAt: Date.now() - 7200000
    }
  ]
};

let state = loadState();
let activeUserId = sessionStorage.getItem("signum-active-user") || "";
let activeView = "new-order";

const roleLabels = {
  vendedor: "Vendedor",
  planeamiento: "Planeamiento comercial",
  taller: "Taller propio",
  fabrica: "Fabrica",
  logistica: "Logistica",
  direccion: "Direccion"
};

const viewTitles = {
  "new-order": "Carga rapida de pedido",
  "my-orders": "Pedidos realizados",
  workflow: "Gestion de pedidos",
  planning: "Productos y dinamicas",
  quotes: "Cotizador de trabajos",
  capacity: "Agenda de produccion",
  metrics: "Indicadores",
  business: "Seguimiento del negocio",
  crm: "CRM de clientes",
  users: "Accesos"
};

const tabs = {
  workflow: "Gestion",
  planning: "Planeamiento",
  quotes: "Cotizador",
  capacity: "Agenda",
  metrics: "Indicadores",
  business: "Negocio",
  crm: "CRM",
  users: "Accesos"
};

const statusLabels = {
  presupuesto_planeamiento: "Presupuesto en planeamiento",
  presupuesto_respondido: "Presupuesto respondido",
  pedido_planeamiento: "Pedido en planeamiento",
  esperando_senia: "Esperando sena 50%",
  taller_fecha: "Taller define fecha",
  fabrica_fecha_planeamiento: "Planeamiento define fecha",
  fecha_confirmada: "Fecha confirmada",
  produccion: "En produccion",
  logistica: "En logistica",
  entregado: "Entregado",
  cancelado: "Cancelado por vendedor",
  rechazado: "Rechazado"
};

const statusOptions = [
  ["todos", "Todos los estados"],
  ["presupuesto_planeamiento", "Presupuestos en planeamiento"],
  ["presupuesto_respondido", "Presupuestos respondidos"],
  ["pedido_planeamiento", "Pedidos en planeamiento"],
  ["esperando_senia", "Esperando sena 50%"],
  ["taller_fecha", "Taller define fecha"],
  ["fabrica_fecha_planeamiento", "Planeamiento define fecha"],
  ["fecha_confirmada", "Fecha confirmada"],
  ["produccion", "En produccion"],
  ["logistica", "En logistica"],
  ["entregado", "Entregado"],
  ["cancelado", "Cancelados"],
  ["rechazado", "Rechazado"]
];

const channel = "BroadcastChannel" in window ? new BroadcastChannel("signum-merch") : null;
const supabaseSettings = window.SIGNUM_SUPABASE || {};
const hasRemoteStore = Boolean(supabaseSettings.url && supabaseSettings.anonKey && window.supabase);
const remoteStateId = supabaseSettings.stateId || "signum-merch-ops";
const supabaseClient = hasRemoteStore ? window.supabase.createClient(supabaseSettings.url, supabaseSettings.anonKey) : null;
let remoteReady = false;
let remoteSaveTimer = null;
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function loadState() {
  const stored = localStorage.getItem(storeKey);
  if (!stored) return structuredClone(seedState);
  try {
    return normalizeState(JSON.parse(stored));
  } catch {
    return structuredClone(seedState);
  }
}

function normalizeState(rawState) {
  const parsed = rawState || {};
  parsed.users ||= [];
  defaultUsers.forEach((defaultUser) => {
    if (!parsed.users.some((user) => user.id === defaultUser.id || user.username === defaultUser.username)) {
      parsed.users.push(structuredClone(defaultUser));
    }
  });
  parsed.clients ||= [];
  parsed.quoteConfig ||= structuredClone(seedState.quoteConfig);
  parsed.quoteConfig.costs = { ...structuredClone(seedState.quoteConfig.costs), ...(parsed.quoteConfig.costs || {}) };
  parsed.quoteConfig.policy = { ...structuredClone(seedState.quoteConfig.policy), ...(parsed.quoteConfig.policy || {}) };
  parsed.quoteConfig.products ||= structuredClone(seedState.quoteConfig.products);
  parsed.quoteConfig.products.forEach((product) => {
    const defaultProduct = seedState.quoteConfig.products.find((item) => item.id === product.id);
    product.printOptions ||= [];
    (defaultProduct?.printOptions || []).forEach((option) => {
      const existing = product.printOptions.find((item) => item.id === option.id);
      if (existing) Object.assign(existing, { ...option, ...existing });
      else product.printOptions.push(structuredClone(option));
    });
  });
  parsed.quotes ||= [];
  parsed.products ||= structuredClone(seedState.products);
  parsed.dynamics ||= structuredClone(seedState.dynamics);
  parsed.finance ||= structuredClone(seedState.finance);
  parsed.finance.initialCapital = Number(parsed.finance.initialCapital || 0);
  parsed.finance.transactions ||= [];
  parsed.finance.transactions = parsed.finance.transactions.map((item) => ({
    quantity: 0,
    productCode: "",
    productDescription: "",
    invoiceImage: "",
    ...item
  }));
  parsed.finance.pricing ||= [];
  parsed.orders ||= [];
  parsed.orders = parsed.orders.map((order) => ({
    clientPhone: "",
    clientEmail: "",
    deliveryAddress: "",
    referenceImage: "",
    referenceFileName: "",
    referenceFileType: "",
    ...order,
    status: order.status === "listo" ? "logistica" : order.status
  }));
  return parsed;
}

function saveState() {
  localStorage.setItem(storeKey, JSON.stringify(state));
  queueRemoteSave();
  channel?.postMessage({ type: "state-change" });
  render();
}

function queueRemoteSave() {
  if (!supabaseClient) return;
  window.clearTimeout(remoteSaveTimer);
  remoteSaveTimer = window.setTimeout(saveRemoteState, 220);
}

async function saveRemoteState() {
  if (!supabaseClient) return;
  try {
    const { error } = await supabaseClient.from("app_state").upsert({
      id: remoteStateId,
      data: state,
      updated_at: new Date().toISOString()
    });
    if (error) throw error;
    remoteReady = true;
    renderSyncStatus();
  } catch {
    remoteReady = false;
    renderSyncStatus("No se pudo guardar en la nube.");
  }
}

async function initializeRemoteState() {
  renderSyncStatus();
  if (!supabaseClient) return;
  try {
    const { data, error } = await supabaseClient.from("app_state").select("data").eq("id", remoteStateId).maybeSingle();
    if (error) throw error;
    if (data?.data) {
      state = normalizeState(data.data);
      localStorage.setItem(storeKey, JSON.stringify(state));
    } else {
      const { error: insertError } = await supabaseClient.from("app_state").insert({ id: remoteStateId, data: state });
      if (insertError) throw insertError;
    }
    remoteReady = true;
    renderSyncStatus();
    render();
    subscribeRemoteState();
  } catch {
    remoteReady = false;
    renderSyncStatus("Configura Supabase para activar varios dispositivos.");
  }
}

function subscribeRemoteState() {
  if (!supabaseClient) return;
  supabaseClient
    .channel("signum-merch-ops-state")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "app_state", filter: `id=eq.${remoteStateId}` },
      (payload) => {
        if (!payload.new?.data) return;
        state = normalizeState(payload.new.data);
        localStorage.setItem(storeKey, JSON.stringify(state));
        remoteReady = true;
        renderSyncStatus();
        render();
      }
    )
    .subscribe();
}

function renderSyncStatus(extraCopy = "") {
  if (!$("#syncTitle")) return;
  const mode = supabaseClient && remoteReady ? "remote" : supabaseClient ? "offline" : "local";
  const copyByMode = {
    remote: "Los cambios se comparten entre celulares y computadoras.",
    local: "Los cambios se reflejan solo en este dispositivo.",
    offline: extraCopy || "No se pudo conectar con la base compartida."
  };
  const titleByMode = {
    remote: "Datos en vivo",
    local: "Datos locales",
    offline: "Desconectado"
  };
  const topTitleByMode = {
    remote: "Verde: datos compartidos entre dispositivos",
    local: "Amarillo: datos solo en este dispositivo",
    offline: "Rojo: desconectado"
  };

  $("#syncTitle").textContent = titleByMode[mode];
  $("#syncCopy").textContent = copyByMode[mode];
  $("#syncCard")?.classList.toggle("is-remote", mode === "remote");
  $("#syncCard")?.classList.toggle("is-local", mode === "local");
  $("#syncCard")?.classList.toggle("is-offline", mode === "offline");
  $("#topSyncIndicator")?.classList.toggle("is-remote", mode === "remote");
  $("#topSyncIndicator")?.classList.toggle("is-local", mode === "local");
  $("#topSyncIndicator")?.classList.toggle("is-offline", mode === "offline");
  $("#topSyncIndicator")?.setAttribute("title", topTitleByMode[mode]);
}

function currentUser() {
  return state.users.find((user) => user.id === activeUserId) || state.users[0];
}

function money(value) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 2 }).format(value);
}

function formatDate(value) {
  if (!value) return "Sin fecha";
  return new Intl.DateTimeFormat("es-AR", { day: "2-digit", month: "short" }).format(new Date(`${value}T12:00:00`));
}

function nextOrderId() {
  const max = state.orders.reduce((highest, order) => {
    const number = Number(String(order.id).replace(/\D/g, ""));
    return Number.isFinite(number) ? Math.max(highest, number) : highest;
  }, 1044);
  return `S-${max + 1}`;
}

function readImage(file) {
  return new Promise((resolve) => {
    if (!file) {
      resolve("");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function attachmentTemplate(order) {
  if (!order.referenceImage) return "";
  const fileName = escapeHtml(order.referenceFileName || "referencia");
  const fileType = order.referenceFileType || (order.referenceImage.startsWith("data:image/") ? "image/legacy" : "");
  if (fileType.startsWith("image/")) {
    return `
      <div class="reference-file">
        <img class="reference-thumb" src="${order.referenceImage}" alt="Logo o referencia de ${escapeHtml(order.client)}" />
        <a class="attachment-link" href="${order.referenceImage}" download="${fileName}">Descargar ${fileName}</a>
      </div>`;
  }
  return `<a class="attachment-link attachment-document" href="${order.referenceImage}" download="${fileName}">Archivo adjunto: ${fileName}</a>`;
}

function setup() {
  renderLoginUsers();
  [$("#statusFilter"), $("#workflowFilter")].forEach((select) => {
    select.innerHTML = statusOptions.map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
  });

  $("#loginForm").addEventListener("submit", login);
  $("#logoutButton").addEventListener("click", logout);

  $("#userSelect").addEventListener("change", (event) => {
    event.target.value = activeUserId;
  });

  $("#sellerViewSelect").addEventListener("change", (event) => {
    activeView = event.target.value;
    render();
  });

  $("#clientInput").addEventListener("change", fillClientFromCrm);
  $("#orderSearch").addEventListener("input", renderOrders);
  $("#statusFilter").addEventListener("change", renderOrders);
  $("#workflowSearch").addEventListener("input", renderWorkflow);
  $("#workflowFilter").addEventListener("change", renderWorkflow);
  $("#orderForm").addEventListener("submit", createOrder);
  $("#productForm").addEventListener("submit", createProduct);
  $("#dynamicForm").addEventListener("submit", createDynamic);
  $("#clientForm").addEventListener("submit", createClient);
  $("#userForm").addEventListener("submit", createUser);
  $("#capitalForm").addEventListener("submit", updateCapital);
  $("#financeForm").addEventListener("submit", createFinanceTransaction);
  $("#pricingForm").addEventListener("submit", createPricing);
  $("#pricingForm").addEventListener("input", updatePricingPreview);
  $("#quoteForm").addEventListener("input", updateQuotePreview);
  $("#quoteForm").addEventListener("submit", saveQuote);
  $("#quoteProductSelect").addEventListener("change", () => {
    renderQuoteSelectors();
    updateQuotePreview();
  });
  $("#quoteConfigForm").addEventListener("submit", saveQuoteConfig);
  $("#clearQuoteButton").addEventListener("click", clearQuoteForm);
  $("#planningDecisionForm").addEventListener("submit", resolvePlanningDecision);
  $("#dateForm").addEventListener("submit", resolveDate);

  window.addEventListener("storage", (event) => {
    if (event.key === storeKey) {
      state = loadState();
      render();
    }
  });
  channel?.addEventListener("message", () => {
    state = loadState();
    render();
  });

  $("#orderForm input[name='requestedDate']").value = iso(7);
  $("#dynamicForm input[name='expires']").value = iso(1);
  $("#financeForm input[name='date']").value = iso(0);
  render();
  initializeRemoteState();
}

function login(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  const user = state.users.find((item) => item.id === data.userId && item.active);
  if (!user || user.password !== data.password) {
    $("#loginError").textContent = "Usuario o contrasena incorrectos.";
    return;
  }
  $("#loginError").textContent = "";
  activeUserId = user.id;
  sessionStorage.setItem("signum-active-user", activeUserId);
  activeView = user.role === "vendedor" ? "new-order" : "workflow";
  $("#sellerViewSelect").value = activeView;
  event.currentTarget.reset();
  render();
}

function logout() {
  activeUserId = "";
  sessionStorage.removeItem("signum-active-user");
  render();
}

function renderLoginUsers() {
  $("#loginUserSelect").innerHTML = state.users
    .filter((user) => user.active)
    .map((user) => `<option value="${user.id}">${user.username} - ${roleLabels[user.role]}</option>`)
    .join("");
}

function render() {
  renderLoginUsers();
  const loggedUser = state.users.find((user) => user.id === activeUserId && user.active);
  if (!loggedUser) {
    $("#loginScreen").classList.remove("is-hidden");
    $("#appShell").classList.add("is-hidden");
    return;
  }
  $("#loginScreen").classList.add("is-hidden");
  $("#appShell").classList.remove("is-hidden");
  renderUserSelect();
  const user = currentUser();
  if (user.role === "vendedor" && !["new-order", "my-orders", "planning", "quotes", "capacity", "metrics"].includes(activeView)) activeView = "new-order";
  if (user.role !== "vendedor" && ["new-order", "my-orders"].includes(activeView)) activeView = "workflow";
  if (user.role !== "direccion" && ["crm", "users", "business"].includes(activeView)) activeView = "workflow";

  $("#roleEyebrow").textContent = `${user.name} · ${roleLabels[user.role]}`;
  $("#pageTitle").textContent = viewTitles[activeView];
  $("#sellerBadge").textContent = user.name;
  $("#sellerMenuWrap").classList.toggle("is-hidden", user.role !== "vendedor");
  $("#navTabs").classList.toggle("is-hidden", user.role === "vendedor");
  $("#planningForms").classList.toggle("is-hidden", !canEditPlanning());
  $("#crmForms").classList.toggle("is-hidden", user.role !== "direccion");

  renderNav();
  $$(".view").forEach((view) => view.classList.remove("active"));
  $(`#view-${activeView}`).classList.add("active");
  renderProducts();
  renderDynamics();
  renderClients();
  renderUsers();
  renderOrders();
  renderWorkflow();
  renderCalendar();
  renderMetrics();
  renderBusiness();
  renderQuotes();
}

function renderUserSelect() {
  const selected = activeUserId;
  $("#userSelect").innerHTML = state.users
    .filter((user) => user.active)
    .map((user) => `<option value="${user.id}">${user.username} - ${roleLabels[user.role]}</option>`)
    .join("");
  if (state.users.some((user) => user.id === selected && user.active)) {
    $("#userSelect").value = selected;
  } else {
    activeUserId = state.users.find((user) => user.active)?.id || state.users[0].id;
    $("#userSelect").value = activeUserId;
  }
  $("#userSelect").disabled = true;
}

function renderNav() {
  const user = currentUser();
  if (user.role === "vendedor") return;
  const roleTabs =
    user.role === "direccion"
      ? ["workflow", "quotes", "business", "planning", "capacity", "metrics", "crm", "users", "new-order"]
      : user.role === "planeamiento"
        ? ["workflow", "quotes", "planning", "capacity", "metrics"]
        : ["workflow", "planning", "capacity", "metrics"];
  $("#navTabs").innerHTML = roleTabs
    .map((tab) => `<button type="button" class="${tab === activeView ? "active" : ""}" data-tab="${tab}">${tab === "new-order" ? "Cargar pedido" : tabs[tab]}</button>`)
    .join("");
  $$("#navTabs button").forEach((button) => {
    button.addEventListener("click", () => {
      activeView = button.dataset.tab;
      $("#accountMenu").open = false;
      render();
    });
  });
}

function canEditPlanning() {
  return ["planeamiento", "direccion"].includes(currentUser().role);
}

function visibleOrders(scope = "list") {
  const user = currentUser();
  if (user.role === "vendedor") return state.orders.filter((order) => order.sellerId === user.id);
  if (user.role === "taller") return state.orders.filter((order) => order.source === "taller" && ["taller_fecha", "fecha_confirmada", "produccion", "logistica", "entregado"].includes(order.status));
  if (user.role === "fabrica") return state.orders.filter((order) => order.source === "fabrica" && order.payment50 && ["fabrica_fecha_planeamiento", "fecha_confirmada", "produccion", "logistica", "entregado"].includes(order.status));
  if (user.role === "logistica") return state.orders.filter((order) => ["logistica", "entregado"].includes(order.status));
  if (scope === "agenda") return state.orders.filter((order) => order.committedDate);
  return state.orders;
}

function renderProducts() {
  const activeProducts = state.products.filter((product) => product.active);
  $("#productSelect").innerHTML = activeProducts
    .map((product) => `<option value="${product.name}" data-source="${product.source}">${product.name} - ${money(product.price)}</option>`)
    .join("");

  $("#productList").innerHTML = activeProducts.length
    ? activeProducts
        .map(
          (product) => `
            <article class="list-card">
              <header>
                <strong>${product.name}</strong>
                <span class="badge neutral">${product.source === "taller" ? "Taller" : "Fabrica"}</span>
              </header>
              <p>${money(product.price)} · minimo ${product.minimum} · ${product.leadTime} dias</p>
              ${canEditPlanning() ? `<button class="small-button" type="button" data-remove-product="${product.id}">Pausar</button>` : ""}
            </article>
          `
        )
        .join("")
    : `<div class="empty-state panel">No hay productos activos.</div>`;

  $$("[data-remove-product]").forEach((button) => {
    button.addEventListener("click", () => {
      const product = state.products.find((item) => item.id === button.dataset.removeProduct);
      product.active = false;
      saveState();
    });
  });
}

function renderDynamics() {
  const activeDynamics = state.dynamics.filter((dynamic) => dynamic.active);
  $("#dynamicList").innerHTML = activeDynamics.length
    ? activeDynamics
        .map(
          (dynamic) => `
            <article class="list-card">
              <header>
                <strong>${dynamic.title}</strong>
                <span class="badge ${dynamic.priority}">${dynamic.priority}</span>
              </header>
              <p>${dynamic.description}</p>
              <span class="meta">Vigente hasta ${formatDate(dynamic.expires)}</span>
              ${canEditPlanning() ? `<div class="card-actions"><button class="small-button" type="button" data-remove-dynamic="${dynamic.id}">Finalizar</button></div>` : ""}
            </article>
          `
        )
        .join("")
    : `<div class="empty-state panel">No hay dinamicas activas.</div>`;

  $$("[data-remove-dynamic]").forEach((button) => {
    button.addEventListener("click", () => {
      const dynamic = state.dynamics.find((item) => item.id === button.dataset.removeDynamic);
      dynamic.active = false;
      saveState();
    });
  });
}

function renderClients() {
  const clients = state.clients.filter((client) => client.active);
  $("#clientList").innerHTML = clients.map((client) => `<option value="${client.name}"></option>`).join("");
  $("#clientListPanel").innerHTML = clients.length
    ? clients
        .map(
          (client) => `
            <article class="list-card">
              <header>
                <strong>${client.name}</strong>
                <span class="badge neutral">CRM</span>
              </header>
              <p>${client.phone || "Sin telefono"} · ${client.email || "Sin mail"}</p>
              ${currentUser().role === "direccion" ? `<button class="small-button" type="button" data-remove-client="${client.id}">Desactivar</button>` : ""}
            </article>
          `
        )
        .join("")
    : `<div class="empty-state panel">No hay clientes registrados.</div>`;

  $$("[data-remove-client]").forEach((button) => {
    button.addEventListener("click", () => {
      const client = state.clients.find((item) => item.id === button.dataset.removeClient);
      client.active = false;
      saveState();
    });
  });
}

function renderUsers() {
  $("#userListPanel").innerHTML = state.users
    .filter((user) => user.active)
    .map(
      (user) => `
        <article class="list-card">
          <header>
            <strong>${user.name}</strong>
            <span class="badge neutral">${roleLabels[user.role]}</span>
          </header>
          <p>Usuario: ${user.username} · Contrasena: ${user.password}</p>
          ${user.role !== "direccion" ? `<button class="small-button" type="button" data-remove-user="${user.id}">Desactivar</button>` : ""}
        </article>
      `
    )
    .join("");

  $$("[data-remove-user]").forEach((button) => {
    button.addEventListener("click", () => {
      const user = state.users.find((item) => item.id === button.dataset.removeUser);
      user.active = false;
      saveState();
    });
  });
}

function fillClientFromCrm() {
  const clientName = $("#clientInput").value.trim().toLowerCase();
  const client = state.clients.find((item) => item.active && item.name.toLowerCase() === clientName);
  if (!client) return;
  $("#clientPhoneInput").value = client.phone || "";
  $("#clientEmailInput").value = client.email || "";
}

function filteredOrders(orders, searchSelector, filterSelector) {
  const query = $(searchSelector).value.trim().toLowerCase();
  const status = $(filterSelector).value;
  return orders.filter((order) => {
    const matchesStatus = status === "todos" || order.status === status;
    const haystack = `${order.id} ${order.seller} ${order.client} ${order.product}`.toLowerCase();
    return matchesStatus && haystack.includes(query);
  });
}

function renderOrders() {
  const filtered = filteredOrders(visibleOrders(), "#orderSearch", "#statusFilter");
  $("#ordersList").innerHTML = orderListTemplate(filtered, "seller");
  attachOrderActions();
}

function renderWorkflow() {
  const user = currentUser();
  const useMatrix = ["planeamiento", "direccion"].includes(user.role);
  $("#workflowTitle").textContent = user.role === "taller" ? "Pedidos para taller" : user.role === "fabrica" ? "Pedidos para fabrica" : user.role === "logistica" ? "Logistica" : "Gestion de pedidos";
  $("#workflowCopy").textContent =
    user.role === "planeamiento"
      ? "Matriz operativa para aprobar, derivar, confirmar sena y responder fechas de fabrica."
      : user.role === "taller"
        ? "Taller asigna fecha solo cuando el pago del 50% ya esta confirmado."
        : user.role === "fabrica"
          ? "Fabrica ve pedidos con sena confirmada y avanza produccion."
          : user.role === "logistica"
            ? "Logistica recibe pedidos terminados y marca la entrega al cliente."
            : "Vista operativa con permisos de seguimiento y modificacion.";
  const filtered = filteredOrders(visibleOrders(), "#workflowSearch", "#workflowFilter");
  $("#workflowList").classList.toggle("matrix-shell", useMatrix);
  $("#workflowList").innerHTML = useMatrix ? orderMatrixTemplate(filtered) : orderListTemplate(filtered, "workflow");
  attachOrderActions();
}

function orderListTemplate(orders, mode) {
  return orders.length
    ? orders.sort((a, b) => b.createdAt - a.createdAt).map((order) => orderTemplate(order, mode)).join("")
    : `<div class="empty-state panel">No hay pedidos para esta vista.</div>`;
}

function orderMatrixTemplate(orders) {
  const rows = orders.sort((a, b) => b.createdAt - a.createdAt);
  if (!rows.length) return `<div class="empty-state panel">No hay pedidos para esta vista.</div>`;
  return `
    <div class="matrix-table-wrap" role="region" aria-label="Matriz de pedidos" tabindex="0">
      <table class="orders-matrix">
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Estado</th>
            <th>Tipo</th>
            <th>Vendedor</th>
            <th>Cliente</th>
            <th>Contacto</th>
            <th>Direccion entrega</th>
            <th>Producto</th>
            <th>Cant.</th>
            <th>Origen</th>
            <th>Sena</th>
            <th>Fecha ideal</th>
            <th>Entrega</th>
            <th>Notas</th>
            <th>Archivo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((order) => matrixRowTemplate(order)).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function matrixRowTemplate(order) {
  const contact = [order.clientPhone, order.clientEmail].filter(Boolean).join(" / ") || "Sin contacto";
  const actions = actionButtons(order, "workflow");
  return `
    <tr>
      <td><strong>${order.id}</strong></td>
      <td><span class="badge ${badgeClass(order.status)}">${statusLabels[order.status]}</span></td>
      <td>${order.requestType === "pedido" ? "Pedido" : "Presupuesto"}</td>
      <td>${order.seller}</td>
      <td>${order.client}</td>
      <td>${contact}</td>
      <td>${order.deliveryAddress || "Sin direccion"}</td>
      <td>${order.product}</td>
      <td class="number-cell">${order.quantity}</td>
      <td>${order.source === "taller" ? "Taller" : "Fabrica"}</td>
      <td>${order.payment50 ? "Confirmada" : "Pendiente"}</td>
      <td>${formatDate(order.requestedDate)}</td>
      <td>${formatDate(order.committedDate)}</td>
      <td class="notes-cell">${order.notes || order.comment || "-"}</td>
      <td>${attachmentTemplate(order) || `<span class="meta">Sin archivo</span>`}</td>
      <td><div class="matrix-actions">${actions || `<span class="meta">Sin accion</span>`}</div></td>
    </tr>
  `;
}

function orderTemplate(order, mode) {
  const user = currentUser();
  const actions = actionButtons(order, mode);
  const contact = [order.clientPhone, order.clientEmail].filter(Boolean).join(" · ") || "Sin contacto cargado";
  return `
    <article class="order-card">
      <div class="order-head">
        <div>
          <strong>${order.id} · ${order.client}</strong>
          <span>${order.seller} · ${order.product}</span>
        </div>
        <span class="badge ${badgeClass(order.status)}">${statusLabels[order.status]}</span>
      </div>
      <div class="order-meta">
        <div class="meta-box"><span>Tipo</span><strong>${order.requestType === "pedido" ? "Pedido" : "Presupuesto"}</strong></div>
        <div class="meta-box"><span>Cantidad</span><strong>${order.quantity}</strong></div>
        <div class="meta-box"><span>Destino</span><strong>${order.source === "taller" ? "Taller" : "Fabrica"}</strong></div>
        <div class="meta-box"><span>Sena 50%</span><strong>${order.payment50 ? "Confirmada" : "Pendiente"}</strong></div>
        <div class="meta-box"><span>Fecha ideal</span><strong>${formatDate(order.requestedDate)}</strong></div>
        <div class="meta-box"><span>Entrega</span><strong>${formatDate(order.committedDate)}</strong></div>
      </div>
      <p class="meta"><strong>Contacto:</strong> ${contact}</p>
      <p class="meta"><strong>Direccion entrega:</strong> ${order.deliveryAddress || "Sin direccion cargada"}</p>
      ${attachmentTemplate(order)}
      ${order.notes ? `<p class="meta">${order.notes}</p>` : ""}
      ${order.comment ? `<p class="meta"><strong>Comentario:</strong> ${order.comment}</p>` : ""}
      ${user.role === "vendedor" && order.status === "presupuesto_respondido" ? `<button class="primary-button" type="button" data-convert="${order.id}">Convertir en pedido</button>` : ""}
      ${actions ? `<div class="card-actions">${actions}</div>` : ""}
    </article>
  `;
}

function badgeClass(status) {
  if (["rechazado", "cancelado"].includes(status)) return "rechazado";
  if (["fecha_confirmada", "produccion", "logistica", "entregado", "presupuesto_respondido"].includes(status)) return "aprobado";
  if (status === "esperando_senia") return "payment";
  return "enviado";
}

function actionButtons(order, mode) {
  const role = currentUser().role;
  if (role === "vendedor" && mode === "seller" && canSellerCancel(order)) {
    return `<button class="small-button danger-inline" type="button" data-cancel-order="${order.id}">Cancelar pedido</button>`;
  }
  if (mode !== "workflow" && role !== "direccion") return "";
  if (["planeamiento", "direccion"].includes(role)) {
    if (["pedido_planeamiento", "presupuesto_planeamiento"].includes(order.status)) {
      return `<button class="small-button" type="button" data-planning="${order.id}">Resolver en planeamiento</button>`;
    }
    if (order.status === "esperando_senia") {
      return `<button class="small-button" type="button" data-pay="${order.id}">Confirmar sena 50%</button>`;
    }
    if (order.status === "fabrica_fecha_planeamiento") {
      return `<button class="small-button" type="button" data-date="${order.id}">Responder fecha fabrica</button>`;
    }
  }
  if (["taller", "direccion"].includes(role) && order.status === "taller_fecha") {
    return `<button class="small-button" type="button" data-date="${order.id}">Asignar fecha taller</button>`;
  }
  if (["taller", "fabrica", "direccion"].includes(role) && ["fecha_confirmada", "produccion"].includes(order.status)) {
    const nextStatus = order.status === "fecha_confirmada" ? "produccion" : "logistica";
    return `<button class="small-button" type="button" data-progress="${order.id}" data-next-status="${nextStatus}">${nextStatus === "produccion" ? "Pasar a produccion" : "Enviar a logistica"}</button>`;
  }
  if (["logistica", "direccion"].includes(role) && order.status === "logistica") {
    return `
      <button class="small-button" type="button" data-date="${order.id}">Asignar fecha entrega</button>
      <button class="small-button" type="button" data-deliver="${order.id}">Marcar entregado</button>
    `;
  }
  return "";
}

function canSellerCancel(order) {
  const blockedStatuses = ["produccion", "logistica", "entregado", "rechazado", "cancelado"];
  return order.sellerId === currentUser().id && !blockedStatuses.includes(order.status);
}

function attachOrderActions() {
  $$("[data-planning]").forEach((button) => button.addEventListener("click", () => openPlanningDecision(button.dataset.planning)));
  $$("[data-pay]").forEach((button) => button.addEventListener("click", () => confirmPayment(button.dataset.pay)));
  $$("[data-date]").forEach((button) => button.addEventListener("click", () => openDate(button.dataset.date)));
  $$("[data-convert]").forEach((button) => button.addEventListener("click", () => convertQuote(button.dataset.convert)));
  $$("[data-cancel-order]").forEach((button) => {
    button.addEventListener("click", () => cancelOrder(button.dataset.cancelOrder));
  });
  $$("[data-deliver]").forEach((button) => {
    button.addEventListener("click", () => {
      const order = state.orders.find((item) => item.id === button.dataset.deliver);
      order.status = "entregado";
      order.comment = "Pedido entregado al cliente por logistica.";
      saveState();
    });
  });
  $$("[data-progress]").forEach((button) => {
    button.addEventListener("click", () => {
      const order = state.orders.find((item) => item.id === button.dataset.progress);
      order.status = button.dataset.nextStatus;
      order.comment = order.status === "produccion" ? "Produccion iniciada." : "Pedido terminado. Logistica debe coordinar la entrega.";
      saveState();
    });
  });
}

function renderCalendar() {
  const days = Array.from({ length: 14 }, (_, index) => iso(index));
  $("#calendarGrid").innerHTML = days
    .map((day) => {
      const items = visibleOrders("agenda").filter((order) => order.committedDate === day);
      return `
        <article class="day-card">
          <time>${formatDate(day)}</time>
          ${
            items.length
              ? items
                  .map(
                    (order) => `
                      <div class="calendar-item">
                        <strong>${order.id}</strong><br />
                        ${order.product}<br />
                        <span class="meta">${order.quantity} u · ${order.source}<br />${order.deliveryAddress || "Sin direccion"}</span>
                      </div>
                    `
                  )
                  .join("")
              : `<p class="empty-state">Sin asignaciones</p>`
          }
        </article>
      `;
    })
    .join("");
}

function renderMetrics() {
  const orders = visibleOrders();
  const totalUnits = orders.reduce((sum, order) => sum + Number(order.quantity), 0);
  const pending = orders.filter((order) => !["fecha_confirmada", "produccion", "logistica", "entregado", "rechazado"].includes(order.status)).length;
  const approved = orders.filter((order) => ["fecha_confirmada", "produccion", "logistica", "entregado"].includes(order.status)).length;
  $("#metrics").innerHTML = [
    ["Pedidos visibles", orders.length],
    ["Pendientes", pending],
    ["Aprobados", approved],
    ["Unidades", totalUnits]
  ]
    .map(([label, value]) => `<article class="metric"><span>${label}</span><strong>${value}</strong></article>`)
    .join("");
}

function productPrice(productName) {
  return Number(state.products.find((product) => product.name === productName)?.price || 0);
}

function orderRevenue(order) {
  return productPrice(order.product) * Number(order.quantity || 0);
}

function financeTotals() {
  const transactions = state.finance?.transactions || [];
  const purchases = transactions.filter((item) => item.type === "compra").reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const expenses = transactions.filter((item) => item.type === "gasto").reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const paidSales = transactions.filter((item) => item.type === "venta").reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const extraIncome = transactions.filter((item) => item.type === "ingreso").reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const approvedOrders = state.orders.filter((order) => ["esperando_senia", "taller_fecha", "fabrica_fecha_planeamiento", "fecha_confirmada", "produccion", "logistica", "entregado"].includes(order.status));
  const deliveredOrders = state.orders.filter((order) => order.status === "entregado");
  const projectedSales = approvedOrders.reduce((sum, order) => sum + orderRevenue(order), 0);
  const deliveredSales = deliveredOrders.reduce((sum, order) => sum + orderRevenue(order), 0);
  const initialCapital = Number(state.finance?.initialCapital || 0);
  const cash = initialCapital + paidSales + extraIncome - purchases - expenses;
  const result = paidSales + extraIncome - purchases - expenses;
  return { initialCapital, purchases, expenses, paidSales, extraIncome, projectedSales, deliveredSales, cash, result };
}

function purchaseCodes() {
  const map = new Map();
  (state.finance?.transactions || [])
    .filter((item) => item.type === "compra" && item.productCode)
    .forEach((item) => {
      const code = item.productCode.trim().toUpperCase();
      if (!map.has(code)) {
        map.set(code, item.productDescription || item.description || "");
      }
    });
  return [...map.entries()].map(([code, description]) => ({ code, description }));
}

function purchaseUnitCost(productCode) {
  const code = String(productCode || "").trim().toUpperCase();
  if (!code) return 0;
  const purchases = (state.finance?.transactions || []).filter((item) => item.type === "compra" && String(item.productCode || "").trim().toUpperCase() === code);
  const totalAmount = purchases.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const totalQuantity = purchases.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  return totalQuantity > 0 ? totalAmount / totalQuantity : totalAmount;
}

function pricingFromForm(form) {
  const data = Object.fromEntries(new FormData(form));
  const productCode = String(data.productCode || "").trim().toUpperCase();
  const purchaseCost = purchaseUnitCost(productCode);
  const manualCost = Number(data.manualCost || 0);
  const baseCost = manualCost || purchaseCost;
  const productionCost = Number(data.productionCost || 0);
  const sublimationSheet = Number(data.sublimationSheet || 0);
  const machineWear = Number(data.machineWear || 0);
  const labor = Number(data.labor || 0);
  const design = Number(data.design || 0);
  const electricity = Number(data.electricity || 0);
  const seller1 = Number(data.seller1 || 0);
  const seller2 = Number(data.seller2 || 0);
  const subtotal = baseCost + productionCost + sublimationSheet + machineWear + labor + design + electricity + seller1 + seller2;
  const ivaAmount = data.iva ? subtotal * 0.21 : 0;
  return {
    productCode,
    productName: data.productName,
    description: data.description,
    manualCost,
    purchaseCost,
    productionCost,
    sublimationSheet,
    machineWear,
    labor,
    design,
    electricity,
    seller1,
    seller2,
    iva: Boolean(data.iva),
    subtotal,
    ivaAmount,
    total: subtotal + ivaAmount
  };
}

function renderBusiness() {
  if (!$("#businessMetrics")) return;
  const totals = financeTotals();
  $("#capitalForm").initialCapital.value = totals.initialCapital || "";
  $("#purchaseCodeList").innerHTML = purchaseCodes()
    .map((item) => `<option value="${item.code}">${item.description}</option>`)
    .join("");
  $("#businessMetrics").innerHTML = [
    ["Capital inicial", money(totals.initialCapital), ""],
    ["Caja estimada", money(totals.cash), totals.cash >= 0 ? "positive" : "negative"],
    ["Ventas cobradas", money(totals.paidSales), "positive"],
    ["Compras + gastos", money(totals.purchases + totals.expenses), "negative"],
    ["Resultado", money(totals.result), totals.result >= 0 ? "positive" : "negative"],
    ["Ventas proyectadas", money(totals.projectedSales), ""],
    ["Pedidos entregados", money(totals.deliveredSales), ""],
    ["Ingresos extra", money(totals.extraIncome), "positive"]
  ]
    .map(([label, value, tone]) => `<article class="metric ${tone}"><span>${label}</span><strong>${value}</strong></article>`)
    .join("");

  $("#businessSummary").innerHTML = `
    <div class="summary-row"><span>Capital inicial</span><strong>${money(totals.initialCapital)}</strong></div>
    <div class="summary-row"><span>Ventas cobradas manuales</span><strong>${money(totals.paidSales)}</strong></div>
    <div class="summary-row"><span>Ingresos extra</span><strong>${money(totals.extraIncome)}</strong></div>
    <div class="summary-row"><span>Compras</span><strong>${money(totals.purchases)}</strong></div>
    <div class="summary-row"><span>Gastos operativos</span><strong>${money(totals.expenses)}</strong></div>
    <div class="summary-row total"><span>Caja estimada</span><strong>${money(totals.cash)}</strong></div>
    <div class="summary-row"><span>Ventas proyectadas por pedidos aprobados</span><strong>${money(totals.projectedSales)}</strong></div>
  `;

  const transactions = [...(state.finance?.transactions || [])].sort((a, b) => String(b.date).localeCompare(String(a.date)) || b.createdAt - a.createdAt);
  $("#financeTable").innerHTML = transactions.length
    ? `
      <table class="finance-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Codigo</th>
            <th>Producto comprado</th>
            <th>Cant.</th>
            <th>Referencia</th>
            <th>Detalle</th>
            <th>Factura</th>
            <th>Monto</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${transactions
            .map(
              (item) => `
                <tr>
                  <td>${formatDate(item.date)}</td>
                  <td><span class="badge neutral">${financeTypeLabel(item.type)}</span></td>
                  <td>${item.productCode || "-"}</td>
                  <td>${item.productDescription || "-"}</td>
                  <td class="number-cell">${item.quantity || "-"}</td>
                  <td>${item.reference || "-"}</td>
                  <td>${item.description || "-"}</td>
                  <td>${item.invoiceImage ? `<a class="invoice-link" href="${item.invoiceImage}" target="_blank" rel="noreferrer">Ver factura</a>` : "-"}</td>
                  <td class="number-cell">${money(item.amount)}</td>
                  <td><button class="small-button danger-inline" type="button" data-remove-finance="${item.id}">Eliminar</button></td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    `
    : `<div class="empty-state">No hay movimientos cargados.</div>`;

  $$("[data-remove-finance]").forEach((button) => {
    button.addEventListener("click", () => {
      state.finance.transactions = state.finance.transactions.filter((item) => item.id !== button.dataset.removeFinance);
      saveState();
    });
  });
  renderPricing();
  updatePricingPreview();
}

function financeTypeLabel(type) {
  return {
    compra: "Compra",
    gasto: "Gasto",
    venta: "Venta cobrada",
    ingreso: "Ingreso"
  }[type] || type;
}

function renderPricing() {
  const rows = [...(state.finance?.pricing || [])].sort((a, b) => b.createdAt - a.createdAt);
  $("#pricingTable").innerHTML = rows.length
    ? `
      <table class="finance-table pricing-table">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Producto</th>
            <th>Costo compra</th>
            <th>Produccion</th>
            <th>Sublimacion</th>
            <th>Vendedores</th>
            <th>IVA</th>
            <th>Precio final</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (item) => `
                <tr>
                  <td><strong>${item.productCode}</strong></td>
                  <td>${item.productName}<br /><span class="meta">${item.description || "-"}</span></td>
                  <td class="number-cell">${money(item.manualCost || item.purchaseCost || 0)}</td>
                  <td class="number-cell">${money(Number(item.productionCost || 0) + Number(item.labor || 0) + Number(item.design || 0) + Number(item.electricity || 0))}</td>
                  <td class="number-cell">${money(Number(item.sublimationSheet || 0) + Number(item.machineWear || 0))}</td>
                  <td class="number-cell">${money(Number(item.seller1 || 0) + Number(item.seller2 || 0))}</td>
                  <td>${item.iva ? "Si" : "No"}</td>
                  <td class="number-cell"><strong>${money(item.total || 0)}</strong></td>
                  <td><button class="small-button danger-inline" type="button" data-remove-pricing="${item.id}">Eliminar</button></td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    `
    : `<div class="empty-state">No hay precios armados.</div>`;

  $$("[data-remove-pricing]").forEach((button) => {
    button.addEventListener("click", () => {
      state.finance.pricing = state.finance.pricing.filter((item) => item.id !== button.dataset.removePricing);
      saveState();
    });
  });
}

function updatePricingPreview() {
  if (!$("#pricingPreview")) return;
  const form = $("#pricingForm");
  const pricing = pricingFromForm(form);
  $("#pricingPreview").innerHTML = `
    <div><span>Costo desde compras</span><strong>${money(pricing.purchaseCost)}</strong></div>
    <div><span>Subtotal sin IVA</span><strong>${money(pricing.subtotal)}</strong></div>
    <div><span>IVA 21%</span><strong>${money(pricing.ivaAmount)}</strong></div>
    <div><span>Precio final</span><strong>${money(pricing.total)}</strong></div>
  `;
}

async function createOrder(event) {
  event.preventDefault();
  const user = currentUser();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  const product = state.products.find((item) => item.name === data.product);
  const referenceFile = form.referenceImage.files[0];
  const referenceImage = await readImage(referenceFile);
  upsertClient(data.client, data.clientPhone, data.clientEmail);
  state.orders.push({
    id: nextOrderId(),
    sellerId: user.id,
    seller: user.name,
    client: data.client,
    clientPhone: data.clientPhone,
    clientEmail: data.clientEmail,
    deliveryAddress: data.deliveryAddress,
    product: data.product,
    quantity: Number(data.quantity),
    source: product?.source || "taller",
    requestedDate: data.requestedDate,
    committedDate: "",
    requestType: data.requestType,
    referenceImage,
    referenceFileName: referenceFile?.name || "",
    referenceFileType: referenceFile?.type || "",
    payment50: false,
    status: data.requestType === "pedido" ? "pedido_planeamiento" : "presupuesto_planeamiento",
    notes: data.notes,
    comment: "",
    createdAt: Date.now()
  });
  form.reset();
  form.requestType.value = "pedido";
  form.requestedDate.value = iso(7);
  activeView = currentUser().role === "vendedor" ? "my-orders" : "workflow";
  $("#sellerViewSelect").value = "my-orders";
  saveState();
}

function upsertClient(name, phone, email) {
  const cleanName = String(name || "").trim();
  if (!cleanName) return;
  const existing = state.clients.find((client) => client.name.toLowerCase() === cleanName.toLowerCase());
  if (existing) {
    existing.phone = phone || existing.phone || "";
    existing.email = email || existing.email || "";
    existing.active = true;
  } else {
    state.clients.push({ id: uid(), name: cleanName, phone: phone || "", email: email || "", active: true });
  }
}

function createProduct(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  state.products.push({
    id: uid(),
    name: data.name,
    price: Number(data.price),
    minimum: Number(data.minimum),
    source: data.source,
    leadTime: Number(data.leadTime),
    active: true
  });
  event.currentTarget.reset();
  saveState();
}

function createDynamic(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  state.dynamics.push({
    id: uid(),
    title: data.title,
    description: data.description,
    priority: data.priority,
    expires: data.expires,
    active: true
  });
  event.currentTarget.reset();
  event.currentTarget.expires.value = iso(1);
  saveState();
}

function createClient(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  upsertClient(data.name, data.phone, data.email);
  event.currentTarget.reset();
  saveState();
}

function createUser(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  const username = String(data.username).trim().toLowerCase();
  if (state.users.some((user) => user.username.toLowerCase() === username && user.active)) {
    alert("Ese usuario ya existe.");
    return;
  }
  state.users.push({
    id: uid(),
    name: data.name,
    username,
    password: data.password,
    role: data.role,
    active: true
  });
  renderLoginUsers();
  event.currentTarget.reset();
  saveState();
}

function updateCapital(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  state.finance.initialCapital = Number(data.initialCapital || 0);
  saveState();
}

async function createFinanceTransaction(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  const invoiceImage = await readImage(form.invoiceImage.files[0]);
  state.finance.transactions.push({
    id: uid(),
    type: data.type,
    amount: Number(data.amount || 0),
    quantity: Number(data.quantity || 0),
    productCode: String(data.productCode || "").trim().toUpperCase(),
    productDescription: data.productDescription,
    date: data.date,
    reference: data.reference,
    description: data.description,
    invoiceImage,
    createdAt: Date.now()
  });
  form.reset();
  form.date.value = iso(0);
  saveState();
}

function createPricing(event) {
  event.preventDefault();
  const pricing = pricingFromForm(event.currentTarget);
  state.finance.pricing.push({
    id: uid(),
    ...pricing,
    createdAt: Date.now()
  });
  event.currentTarget.reset();
  ["productionCost", "sublimationSheet", "machineWear", "labor", "design", "electricity", "seller1", "seller2"].forEach((name) => {
    event.currentTarget[name].value = 0;
  });
  updatePricingPreview();
  saveState();
}

function openPlanningDecision(orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  $("#planningDecisionTitle").textContent = `Resolver ${order.id}`;
  $("#planningDecisionForm").orderId.value = orderId;
  $("#planningDecisionForm").source.value = order.source;
  $("#planningDecisionForm").comment.value = order.comment || "";
  $("#planningDialog").showModal();
}

function resolvePlanningDecision(event) {
  const action = event.submitter?.value;
  if (action === "cancel") return;
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  const order = state.orders.find((item) => item.id === data.orderId);
  order.source = data.source;
  order.comment = data.comment;
  if (action === "reject") {
    order.status = "rechazado";
  } else if (order.requestType === "presupuesto") {
    order.status = "presupuesto_respondido";
  } else {
    order.status = "esperando_senia";
    order.comment = data.comment || "Aprobado por planeamiento. Pendiente sena del 50%.";
  }
  $("#planningDialog").close();
  saveState();
}

function confirmPayment(orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  order.payment50 = true;
  order.status = order.source === "taller" ? "taller_fecha" : "fabrica_fecha_planeamiento";
  order.comment = order.source === "taller" ? "Sena confirmada. Taller debe asignar fecha." : "Sena confirmada. Planeamiento debe responder fecha de fabrica.";
  saveState();
}

function cancelOrder(orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order || !canSellerCancel(order)) return;
  const confirmed = window.confirm(`Cancelar ${order.id}?`);
  if (!confirmed) return;
  order.status = "cancelado";
  order.comment = "Cancelado por el vendedor.";
  saveState();
}

function openDate(orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  $("#dateTitle").textContent = order.status === "logistica" ? `Fecha de entrega ${order.id}` : order.source === "fabrica" ? `Fecha de fabrica ${order.id}` : `Fecha de taller ${order.id}`;
  $("#dateForm").orderId.value = orderId;
  $("#dateForm").committedDate.value = order.committedDate || order.requestedDate;
  $("#dateForm").comment.value = order.comment || "";
  $("#dateDialog").showModal();
}

function resolveDate(event) {
  const action = event.submitter?.value;
  if (action === "cancel") return;
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  const order = state.orders.find((item) => item.id === data.orderId);
  order.committedDate = data.committedDate;
  if (order.status === "logistica") {
    order.comment = data.comment || "Fecha de entrega asignada por logistica.";
  } else {
    order.comment = data.comment || "Fecha de entrega confirmada.";
    order.status = "fecha_confirmada";
  }
  $("#dateDialog").close();
  saveState();
}

function convertQuote(orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  order.requestType = "pedido";
  order.status = "pedido_planeamiento";
  order.comment = "Presupuesto aceptado por el cliente. Vuelve a planeamiento para aprobacion de pedido.";
  saveState();
}

function activeQuoteProduct() {
  return state.quoteConfig.products.find((product) => product.id === $("#quoteProductSelect").value) || state.quoteConfig.products.find((product) => product.active);
}

function activeQuoteVariant() {
  const product = activeQuoteProduct();
  return product?.variants.find((variant) => variant.id === $("#quoteVariantSelect").value) || product?.variants.find((variant) => variant.active);
}

function visibleQuotes() {
  const user = currentUser();
  return user.role === "vendedor" ? state.quotes.filter((quote) => quote.sellerId === user.id) : state.quotes;
}

function nextQuoteId() {
  const max = state.quotes.reduce((highest, quote) => Math.max(highest, Number(String(quote.id).replace(/\D/g, "")) || 0), 0);
  return `COT-${String(max + 1).padStart(4, "0")}`;
}

function renderQuoteSelectors() {
  const form = $("#quoteForm");
  const selectedProduct = form.productId.value;
  const selectedVariant = form.variantId.value;
  const products = state.quoteConfig.products.filter((product) => product.active);
  form.productId.innerHTML = products.map((product) => `<option value="${product.id}">${product.name}</option>`).join("");
  if (products.some((product) => product.id === selectedProduct)) form.productId.value = selectedProduct;
  const product = activeQuoteProduct();
  const variants = product?.variants.filter((variant) => variant.active) || [];
  form.variantId.innerHTML = variants.map((variant) => `<option value="${variant.id}">${variant.name}</option>`).join("");
  if (variants.some((variant) => variant.id === selectedVariant)) form.variantId.value = selectedVariant;
  form.color.innerHTML = (product?.colors || []).map((color) => `<option value="${color}">${color}</option>`).join("");
  form.printOption.innerHTML = (product?.printOptions || []).map((option) => `<option value="${option.id}">${option.name}</option>`).join("");
}

function quoteCalculationFromForm() {
  const form = $("#quoteForm");
  const product = activeQuoteProduct();
  const variant = activeQuoteVariant();
  if (!variant) return null;
  const printOption = product?.printOptions.find((option) => option.id === form.printOption.value) || {};
  return SignumPricing.calculateQuote(variant, state.quoteConfig, form.quantity.value, form.offeredUnitPrice.value, printOption);
}

function updateQuotePreview() {
  if (!$("#quoteResult")) return;
  const calculation = quoteCalculationFromForm();
  const variant = activeQuoteVariant();
  const costs = calculation?.appliedCosts;
  if (!calculation || !variant) return;
  const trafficLabel = calculation.profitability === "green" ? "Rentabilidad saludable" : calculation.profitability === "yellow" ? "Rentabilidad a revisar" : calculation.profitability === "loss" ? "OPERACION CON PERDIDA" : "Rentabilidad baja";
  $("#quoteResult").className = `quote-result ${calculation.profitability}`;
  $("#quoteResult").innerHTML = `
    <div class="quote-total"><span>Precio unitario</span><strong>${money(calculation.unitPrice)}</strong></div>
    <div><span>Cantidad</span><strong>${calculation.quantity}</strong></div>
    <div><span>Total cotizacion</span><strong>${money(calculation.saleTotal)}</strong></div>
    <div><span>Comision estimada</span><strong>${money(calculation.commission)}</strong></div>
    <div class="profit-signal"><span></span><strong>${trafficLabel}</strong><small>${calculation.marginRate}% margen Signum</small></div>`;
  const admin = currentUser().role === "direccion";
  $("#quoteBreakdown").classList.toggle("is-hidden", !admin);
  $("#quoteBreakdown").innerHTML = admin ? `
    <h3>Detalle interno</h3>
    <div class="business-summary">
      <div class="summary-row"><span>Bolsa virgen</span><strong>${money(variant.purchaseCost)}</strong></div>
      <div class="summary-row"><span>Papel</span><strong>${money(costs.paper)}</strong></div>
      <div class="summary-row"><span>Tinta</span><strong>${money(costs.ink)}</strong></div>
      <div class="summary-row"><span>Cinta</span><strong>${money(costs.tape)}</strong></div>
      <div class="summary-row"><span>Mano de obra</span><strong>${money(costs.labor)}</strong></div>
      <div class="summary-row"><span>Amortizaciones</span><strong>${money(costs.printerDepreciation + costs.pressDepreciation)}</strong></div>
      <div class="summary-row"><span>Merma</span><strong>${money(calculation.wasteAmount)}</strong></div>
      <div class="summary-row"><span>Electricidad</span><strong>${money(costs.electricity)}</strong></div>
      <div class="summary-row total"><span>Costo unitario</span><strong>${money(calculation.unitCost)}</strong></div>
      <div class="summary-row"><span>Precio tecnico</span><strong>${money(calculation.technicalPrice)}</strong></div>
      <div class="summary-row"><span>Impuestos</span><strong>${money(calculation.taxes)}</strong></div>
      <div class="summary-row"><span>Comision</span><strong>${money(calculation.commission)}</strong></div>
      <div class="summary-row total"><span>Resultado Signum</span><strong>${money(calculation.signumResult)} (${calculation.marginRate}%)</strong></div>
    </div>` : "";
}

function renderQuotes() {
  if (!$("#quoteForm")) return;
  renderQuoteSelectors();
  $("#quoteAdminPanel").classList.toggle("is-hidden", currentUser().role !== "direccion");
  renderQuoteConfig();
  updateQuotePreview();
  const statusNames = { draft: "Borrador", sent: "Enviada", accepted: "Aceptada", rejected: "Rechazada", converted: "Convertida en venta" };
  const rows = [...visibleQuotes()].sort((a, b) => b.createdAt - a.createdAt);
  $("#quoteHistory").innerHTML = rows.length ? `
    <table class="finance-table quote-table"><thead><tr><th>Cotizacion</th><th>Cliente</th><th>Producto</th><th>Cant.</th><th>Unitario</th><th>Total</th><th>Margen</th><th>Estado</th><th>Acciones</th></tr></thead>
    <tbody>${rows.map((quote) => `<tr>
      <td><strong>${quote.id}</strong><br><span class="meta">${quote.seller}</span></td><td>${quote.client}</td><td>${quote.productName}<br><span class="meta">${quote.variantName} · ${quote.color}</span></td>
      <td>${quote.calculation.quantity}</td><td>${money(quote.calculation.unitPrice)}</td><td>${money(quote.calculation.saleTotal)}</td>
      <td><span class="rent-dot ${quote.calculation.profitability}"></span>${quote.calculation.marginRate}%</td><td>${statusNames[quote.status]}</td>
      <td><div class="matrix-actions">${quoteActionButtons(quote)}</div></td></tr>`).join("")}</tbody></table>` : `<div class="empty-state">Todavia no hay cotizaciones guardadas.</div>`;
  attachQuoteActions();
}

function quoteActionButtons(quote) {
  const manager = ["planeamiento", "direccion"].includes(currentUser().role);
  const actions = [`<button class="small-button" type="button" data-duplicate-quote="${quote.id}">Duplicar</button>`];
  if (quote.status === "draft") actions.push(`<button class="small-button" type="button" data-quote-status="${quote.id}" data-status="sent">Marcar enviada</button>`);
  if (manager && quote.status === "sent") {
    actions.push(`<button class="small-button" type="button" data-quote-status="${quote.id}" data-status="accepted">Aceptar</button>`);
    actions.push(`<button class="small-button danger-inline" type="button" data-quote-status="${quote.id}" data-status="rejected">Rechazar</button>`);
  }
  if (manager && quote.status === "accepted") actions.push(`<button class="small-button" type="button" data-convert-quote="${quote.id}">Convertir en venta</button>`);
  return actions.join("");
}

function attachQuoteActions() {
  $$('[data-quote-status]').forEach((button) => button.addEventListener("click", () => {
    const quote = state.quotes.find((item) => item.id === button.dataset.quoteStatus);
    if (!quote) return;
    quote.status = button.dataset.status;
    quote.updatedAt = Date.now();
    saveState();
  }));
  $$('[data-duplicate-quote]').forEach((button) => button.addEventListener("click", () => loadQuoteIntoForm(button.dataset.duplicateQuote)));
  $$('[data-convert-quote]').forEach((button) => button.addEventListener("click", () => convertSavedQuote(button.dataset.convertQuote)));
  $$('[data-variant-cost]').forEach((input) => input.addEventListener("change", () => {
    const product = state.quoteConfig.products.find((item) => item.id === input.dataset.productId);
    const variant = product?.variants.find((item) => item.id === input.dataset.variantCost);
    if (!variant) return;
    variant.purchaseCost = Number(input.value || 0);
    saveState();
  }));
}

function saveQuote(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  const product = activeQuoteProduct();
  const variant = activeQuoteVariant();
  const printOption = product.printOptions.find((option) => option.id === data.printOption);
  const calculation = quoteCalculationFromForm();
  const existing = state.quotes.find((quote) => quote.id === data.quoteId);
  const quote = {
    id: existing?.id || nextQuoteId(), sellerId: currentUser().id, seller: currentUser().name,
    client: data.client.trim(), productId: product.id, productName: product.name, variantId: variant.id,
    variantName: variant.name, color: data.color, printOption: printOption?.name || "Estampa estandar",
    notes: data.notes || "", status: existing?.status || "draft", calculation,
    snapshot: { config: structuredClone(state.quoteConfig), variant: structuredClone(variant) },
    createdAt: existing?.createdAt || Date.now(), updatedAt: Date.now(), orderId: existing?.orderId || ""
  };
  if (existing) Object.assign(existing, quote); else state.quotes.push(quote);
  upsertClient(quote.client, "", "");
  clearQuoteForm(false);
  saveState();
}

function loadQuoteIntoForm(quoteId) {
  const source = state.quotes.find((quote) => quote.id === quoteId);
  if (!source) return;
  const form = $("#quoteForm");
  form.reset();
  form.quoteId.value = "";
  form.client.value = source.client;
  form.productId.value = source.productId;
  renderQuoteSelectors();
  form.variantId.value = source.variantId;
  form.color.value = source.color;
  form.quantity.value = source.calculation.quantity;
  form.offeredUnitPrice.value = source.calculation.unitPrice;
  form.notes.value = source.notes;
  updateQuotePreview();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function clearQuoteForm(update = true) {
  const form = $("#quoteForm");
  form.reset();
  form.quoteId.value = "";
  form.quantity.value = 100;
  renderQuoteSelectors();
  if (update) updateQuotePreview();
}

function convertSavedQuote(quoteId) {
  const quote = state.quotes.find((item) => item.id === quoteId);
  if (!quote || quote.status !== "accepted") return;
  const orderId = nextOrderId();
  state.orders.push({
    id: orderId, sellerId: quote.sellerId, seller: quote.seller, client: quote.client,
    clientPhone: "", clientEmail: "", deliveryAddress: "", product: `${quote.productName} ${quote.variantName}`,
    quantity: quote.calculation.quantity, source: "taller", requestedDate: iso(7), committedDate: "",
    requestType: "pedido", referenceImage: "", payment50: false, status: "pedido_planeamiento",
    notes: `${quote.color}. ${quote.printOption}. ${quote.notes}`.trim(), comment: `Creado desde ${quote.id}. Precio ${money(quote.calculation.unitPrice)} por unidad.`,
    quoteId: quote.id, quotedUnitPrice: quote.calculation.unitPrice, createdAt: Date.now()
  });
  quote.status = "converted";
  quote.orderId = orderId;
  quote.updatedAt = Date.now();
  saveState();
}

function renderQuoteConfig() {
  const form = $("#quoteConfigForm");
  if (!form || currentUser().role !== "direccion") return;
  Object.entries(state.quoteConfig.costs).forEach(([key, value]) => { if (form.elements[key]) form.elements[key].value = value; });
  Object.entries(state.quoteConfig.policy).forEach(([key, value]) => { if (form.elements[key]) form.elements[key].value = value; });
  $("#quoteVariantsTable").innerHTML = `<h3>Productos y variantes</h3><table class="finance-table"><thead><tr><th>SKU</th><th>Producto</th><th>Medida</th><th>Gramaje</th><th>Costo bolsa</th><th>Minimo proveedor</th></tr></thead><tbody>${state.quoteConfig.products.flatMap((product) => product.variants.map((variant) => `<tr><td>${variant.sku}</td><td>${product.name}</td><td>${variant.name}</td><td>${variant.grammage} g</td><td><input class="table-input" type="number" min="0" step="0.01" value="${variant.purchaseCost}" data-variant-cost="${variant.id}" data-product-id="${product.id}"></td><td>${variant.supplierMinimum}</td></tr>`)).join("")}</tbody></table>`;
}

function saveQuoteConfig(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  Object.keys(state.quoteConfig.costs).forEach((key) => { state.quoteConfig.costs[key] = Number(data[key] || 0); });
  Object.keys(state.quoteConfig.policy).forEach((key) => { state.quoteConfig.policy[key] = Number(data[key] || 0); });
  const totalRate = state.quoteConfig.policy.taxRate + state.quoteConfig.policy.commissionRate + state.quoteConfig.policy.targetMarginRate;
  if (totalRate >= 100 || state.quoteConfig.policy.wasteRate >= 100) {
    window.alert("Los porcentajes combinados deben ser menores a 100%.");
    return;
  }
  saveState();
}

setup();
