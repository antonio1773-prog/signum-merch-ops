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
    { id: uid(), productCode: "REM-001", name: "Remera premium bordada", category: "remera", variant: "Talle a definir", color: "Blanco", price: 14800, minimum: 25, source: "taller", leadTime: 6, active: true },
    { id: uid(), productCode: "GOR-001", name: "Gorra trucker personalizada", category: "gorra", variant: "Trucker", color: "Negro", price: 9700, minimum: 50, source: "fabrica", leadTime: 10, active: true },
    { id: uid(), productCode: "KIT-001", name: "Kit bienvenida corporativo", category: "otro", variant: "Estandar", color: "", price: 42500, minimum: 20, source: "taller", leadTime: 8, active: true }
  ],
  dynamics: [
    { id: uid(), title: "Prioridad onboarding Q4", description: "Kits bienvenida con cupo preferencial hasta agotar 300 unidades.", priority: "alta", expires: iso(2), active: true },
    { id: uid(), title: "Bonificacion volumen", description: "10% off en remeras desde 150 unidades. No acumulable.", priority: "media", expires: iso(1), active: true }
  ],
  discountScales: [],
  printMethods: [
    { id: "sublimacion", name: "Sublimacion", unitCost: 710, breakdown: { material: 0, paperFilm: 92.26, ink: 93.85, adhesive: 25.11, printerWear: 45.52, pressWear: 41.43, labor: 320, design: 0, electricity: 10, other: 81.83 }, categories: ["bolsa", "remera", "taza", "termo"], lightOnly: true, active: true },
    { id: "dtf", name: "DTF", unitCost: 650, breakdown: { material: 0, paperFilm: 200, ink: 120, adhesive: 50, printerWear: 80, pressWear: 0, labor: 150, design: 0, electricity: 20, other: 30 }, categories: ["bolsa", "remera", "gorra", "cuaderno", "termo"], lightOnly: false, active: true },
    { id: "grabado", name: "Grabado / marcado", unitCost: 450, breakdown: { material: 40, paperFilm: 0, ink: 0, adhesive: 0, printerWear: 120, pressWear: 0, labor: 220, design: 40, electricity: 20, other: 10 }, categories: ["bolsa", "lapicera", "cuaderno", "termo"], lightOnly: false, active: true },
    { id: "sin-impresion", name: "Sin impresion", unitCost: 0, breakdown: { material: 0, paperFilm: 0, ink: 0, adhesive: 0, printerWear: 0, pressWear: 0, labor: 0, design: 0, electricity: 0, other: 0 }, categories: ["bolsa", "remera", "gorra", "lapicera", "taza", "cuaderno", "termo", "otro"], lightOnly: false, active: true }
  ],
  quoteConfig: {
    costs: {
      paper: 92.26, ink: 93.85, tape: 25.11, labor: 320, printerDepreciation: 45.52,
      pressDepreciation: 41.43, electricity: 10, laborHourValue: 8000, unitsPerBatch: 100,
      hoursPerBatch: 4, inkMlPerUnit: 1.5, tapeCmPerUnit: 20
    },
    policy: { wasteRate: 3, taxRate: 2, commissionRate: 20, secondSellerCommissionRate: 0, suggestedMarkupRate: 30, targetMarginRate: 10, roundingMultiple: 50 },
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
let activeProductCategory = "";
let purchaseCostMode = "total";

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
  stock: "Compras y stock",
  quotes: "Cotizador de trabajos",
  capacity: "Agenda de produccion",
  metrics: "Indicadores",
  business: "Seguimiento del negocio",
  pricing: "Pricing",
  crm: "CRM de clientes",
  users: "Accesos"
};

const tabs = {
  workflow: "Gestion",
  planning: "Planeamiento",
  stock: "Compras y stock",
  quotes: "Cotizador",
  capacity: "Agenda",
  metrics: "Indicadores",
  business: "Negocio",
  pricing: "Pricing",
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
  devolucion: "Devolucion",
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
  ["devolucion", "Devoluciones"],
  ["rechazado", "Rechazado"]
];

const channel = "BroadcastChannel" in window ? new BroadcastChannel("signum-merch") : null;
const supabaseSettings = window.SIGNUM_SUPABASE || {};
const hasRemoteStore = Boolean(supabaseSettings.url && supabaseSettings.anonKey && window.supabase);
const remoteStateId = supabaseSettings.stateId || "signum-merch-ops";
const supabaseClient = hasRemoteStore ? window.supabase.createClient(supabaseSettings.url, supabaseSettings.anonKey) : null;
let remoteReady = false;
let remoteSaveTimer = null;
let remoteUpdatedAt = "";
let remoteWritePending = false;
let remotePollTimer = null;
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
  parsed.printMethods ||= structuredClone(seedState.printMethods);
  parsed.printMethods = parsed.printMethods.map((method) => {
    const defaults = seedState.printMethods.find((item) => item.id === method.id);
    const emptyBreakdown = { material: 0, paperFilm: 0, ink: 0, adhesive: 0, printerWear: 0, pressWear: 0, labor: 0, design: 0, electricity: 0, other: 0 };
    const breakdown = method.breakdown || { ...emptyBreakdown, material: Number(method.unitCost || 0) };
    return { ...defaults, ...method, categories: [...new Set([...(defaults?.categories || []), ...(method.categories || [])])], breakdown: { ...emptyBreakdown, ...breakdown } };
  });
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
  parsed.products = parsed.products.map((product) => ({
    productCode: "",
    variant: "",
    ...product,
    category: !product.category || product.category === "otro" ? inferProductCategory(product.name) : product.category,
    color: product.color || inferProductColor(product.name),
    pressUnitsPerPass: Math.max(1, Number(product.pressUnitsPerPass || inferPressUnitsPerPass(`${product.name} ${product.variant || ""}`)))
  }));
  parsed.dynamics ||= structuredClone(seedState.dynamics);
  parsed.discountScales ||= [];
  parsed.discountScales = parsed.discountScales.map((scale) => ({ discountType: "scale", starts: iso(), ...scale }));
  parsed.finance ||= structuredClone(seedState.finance);
  parsed.finance.initialCapital = Number(parsed.finance.initialCapital || 0);
  parsed.finance.transactions ||= [];
  parsed.finance.transactions = parsed.finance.transactions.map((item) => ({
    quantity: 0,
    productCode: "",
    productDescription: "",
    invoiceImage: "",
    variant: "",
    color: "",
    source: "taller",
    ...item,
    category: !item.category || item.category === "otro" ? inferProductCategory(item.productDescription) : item.category
  }));
  parsed.finance.pricing ||= [];
  const purchaseGroups = new Map();
  parsed.finance.transactions
    .filter((item) => item.type === "compra" && item.productCode && Number(item.quantity || 0) > 0)
    .forEach((item) => {
      const code = cleanProductCode(item.productCode);
      const group = purchaseGroups.get(code) || { amount: 0, quantity: 0, name: "", category: item.category, variant: item.variant, color: item.color, source: item.source };
      group.amount += Number(item.amount || 0);
      group.quantity += Number(item.quantity || 0);
      group.name ||= item.productDescription || code;
      purchaseGroups.set(code, group);
    });
  purchaseGroups.forEach((group, code) => {
    const purchaseCost = group.quantity ? group.amount / group.quantity : 0;
    let product = parsed.products.find((item) => cleanProductCode(item.productCode) === code);
    if (!product) {
      product = { id: uid(), productCode: code, name: group.name, category: group.category || inferProductCategory(group.name), variant: group.variant || "", color: group.color || "", price: purchaseCost, minimum: 1, source: group.source || "taller", leadTime: 7, active: true };
      parsed.products.push(product);
    }
    let pricing = [...parsed.finance.pricing]
      .filter((item) => cleanProductCode(item.productCode) === code)
      .sort((a, b) => b.createdAt - a.createdAt)[0];
    if (!pricing) {
      const defaults = commercialCostDefaults(parsed);
      pricing = {
        id: uid(), productCode: code, productName: product.name || group.name, description: "Generado desde compras",
        manualCost: 0, ...defaults, seller1: 0, seller2: 0, iva: false, createdAt: Date.now()
      };
      parsed.finance.pricing.push(pricing);
    }
    const defaults = commercialCostDefaults(parsed);
    const costFields = ["productionCost", "sublimationSheet", "machineWear", "labor", "design", "electricity"];
    if (!pricing.costsCustomized && costFields.every((field) => !Number(pricing[field] || 0))) {
      Object.assign(pricing, defaults);
    }
    pricing.purchaseCost = purchaseCost;
    const baseCost = Number(pricing.manualCost || 0) || purchaseCost;
    pricing.subtotal = baseCost;
    pricing.ivaAmount = pricing.iva ? pricing.subtotal * 0.21 : 0;
    pricing.total = pricing.subtotal + pricing.ivaAmount;
    product.price = pricing.total;
  });
  parsed.orders ||= [];
  parsed.orders = parsed.orders.map((order) => ({
    clientPhone: "",
    clientEmail: "",
    deliveryAddress: "",
    referenceImage: "",
    referenceFileName: "",
    referenceFileType: "",
    stockCode: "",
    inventoryState: "",
    saleUnitPrice: 0,
    saleTotal: 0,
    sellerUnitCost: 0,
    saleMarkup: 0,
    commissionRate: 0,
    commissionAmount: 0,
    productCategory: "",
    productVariant: "",
    productColor: "",
    printMethodId: "sin-impresion",
    printMethod: "Sin impresion",
    quoteMeasures: "",
    quoteBaseColors: "",
    quoteHandleColor: "",
    quoteHandleSize: "",
    quoteShape: "",
    baseUnitCost: 0,
    printUnitCost: 0,
    discountScaleId: "",
    discountRate: 0,
    ...order,
    status: order.status === "listo" ? "logistica" : order.status
  }));
  return parsed;
}

function saveState() {
  localStorage.setItem(storeKey, JSON.stringify(state));
  remoteWritePending = true;
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
    const updatedAt = new Date().toISOString();
    const { error } = await supabaseClient.from("app_state").upsert({
      id: remoteStateId,
      data: state,
      updated_at: updatedAt
    });
    if (error) throw error;
    remoteUpdatedAt = updatedAt;
    remoteWritePending = false;
    remoteReady = true;
    renderSyncStatus();
  } catch {
    remoteWritePending = false;
    remoteReady = false;
    renderSyncStatus("No se pudo guardar en la nube.");
  }
}

async function initializeRemoteState() {
  renderSyncStatus();
  if (!supabaseClient) return;
  startRemotePolling();
  try {
    const { data, error } = await supabaseClient.from("app_state").select("data,updated_at").eq("id", remoteStateId).maybeSingle();
    if (error) throw error;
    if (data?.data) {
      state = normalizeState(data.data);
      remoteUpdatedAt = data.updated_at || "";
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

function startRemotePolling() {
  if (!supabaseClient || remotePollTimer) return;
  remotePollTimer = window.setInterval(pullRemoteState, 4000);
}

async function pullRemoteState() {
  if (!supabaseClient || remoteWritePending) return;
  try {
    const { data, error } = await supabaseClient.from("app_state").select("data,updated_at").eq("id", remoteStateId).maybeSingle();
    if (error) throw error;
    if (!data?.data || !data.updated_at || data.updated_at === remoteUpdatedAt) return;
    remoteUpdatedAt = data.updated_at;
    state = normalizeState(data.data);
    localStorage.setItem(storeKey, JSON.stringify(state));
    remoteReady = true;
    renderSyncStatus();
    render();
  } catch {
    remoteReady = false;
    renderSyncStatus("No se pudo actualizar desde la nube.");
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
        remoteUpdatedAt = payload.new.updated_at || remoteUpdatedAt;
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

  $("#clientInput").addEventListener("change", fillClientFromCrm);
  $("#orderSearch").addEventListener("input", renderOrders);
  $("#statusFilter").addEventListener("change", renderOrders);
  $("#workflowSearch").addEventListener("input", renderWorkflow);
  $("#workflowFilter").addEventListener("change", renderWorkflow);
  $("#orderForm").addEventListener("submit", createOrder);
  $("#productSelect").addEventListener("change", () => updateProductConfiguration(true));
  $("#printMethodSelect").addEventListener("change", () => updateSalePreview(true));
  $("#saleMarkup").addEventListener("input", () => updateSalePreview(false, "markup"));
  $("#saleUnitPrice").addEventListener("input", () => updateSalePreview(false, "price"));
  $("#orderForm input[name='quantity']").addEventListener("input", () => updateSalePreview(false, "quantity"));
  $$("#orderForm input[name='requestType']").forEach((input) => input.addEventListener("change", updateLargeSalePanel));
  $("#productForm").addEventListener("submit", createProduct);
  $("#dynamicForm").addEventListener("submit", createDynamic);
  $("#discountScaleForm").addEventListener("submit", createDiscountScale);
  $("#discountScaleForm select[name='discountType']").addEventListener("change", (event) => {
    const form = event.currentTarget.form;
    const direct = event.currentTarget.value === "direct";
    form.elements.minQuantity.disabled = direct;
    form.elements.maxQuantity.disabled = direct;
    if (direct) form.elements.minQuantity.value = 1;
  });
  $("#clientForm").addEventListener("submit", createClient);
  $("#userForm").addEventListener("submit", createUser);
  $("#capitalForm").addEventListener("submit", updateCapital);
  $("#financeForm").addEventListener("submit", createFinanceTransaction);
  $("#purchaseForm").addEventListener("submit", createPurchase);
  $("#purchaseForm input[name='unitCost']").addEventListener("input", () => { purchaseCostMode = "unit"; updatePurchaseCostFields(); });
  $("#purchaseForm input[name='amount']").addEventListener("input", () => { purchaseCostMode = "total"; updatePurchaseCostFields(); });
  $("#purchaseForm input[name='quantity']").addEventListener("input", updatePurchaseCostFields);
  $("#cancelPurchaseEdit").addEventListener("click", resetPurchaseForm);
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
  $("#editOrderForm").addEventListener("submit", saveEditedOrder);
  $$('[data-close-edit-order]').forEach((button) => button.addEventListener('click', () => $("#editOrderDialog").close()));

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
  $("#discountScaleForm input[name='expires']").value = iso(7);
  $("#discountScaleForm input[name='starts']").value = iso();
  $("#discountScaleForm select[name='discountType']").dispatchEvent(new Event("change"));
  $("#financeForm input[name='date']").value = iso(0);
  $("#purchaseForm input[name='date']").value = iso(0);
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
  if (!["direccion", "planeamiento"].includes(user.role) && activeView === "pricing") activeView = "workflow";
  if (user.role !== "direccion" && ["crm", "users", "business", "stock"].includes(activeView)) activeView = "workflow";

  $("#roleEyebrow").textContent = `${user.name} · ${roleLabels[user.role]}`;
  $("#pageTitle").textContent = activeView === "planning" && !canEditPlanning() ? "Promociones y dinamicas" : viewTitles[activeView];
  $("#sellerBadge").textContent = user.name;
  $("#sellerMenuWrap").classList.toggle("is-hidden", user.role !== "vendedor");
  $("#internalSellerCostField").classList.toggle("is-hidden", user.role === "vendedor");
  $("#navTabs").classList.toggle("is-hidden", user.role === "vendedor");
  $("#planningForms").classList.toggle("is-hidden", !canEditPlanning());
  $("#commercialCostPanel").classList.toggle("is-hidden", !canEditPlanning());
  $("#productCatalogPanel").classList.add("is-hidden");
  $("#legacyDynamicsPanel").classList.add("is-hidden");
  $("#planningCatalogGrid").classList.add("promotions-only");
  $("#planningPageTitle").textContent = "Dinamicas comerciales";
  $("#planningPageCopy").textContent = canEditPlanning()
    ? "Aplica descuentos sobre los productos disponibles en stock, con vigencia y cupo."
    : "Promociones, condiciones y novedades comerciales vigentes.";
  $("#crmForms").classList.toggle("is-hidden", user.role !== "direccion");

  renderNav();
  $$(".view").forEach((view) => view.classList.remove("active"));
  $(`#view-${activeView}`).classList.add("active");
  renderProducts();
  renderCommercialCosts();
  renderDynamics();
  renderDiscountScales();
  renderClients();
  renderUsers();
  renderOrders();
  renderWorkflow();
  renderCalendar();
  renderMetrics();
  renderBusiness();
  renderStock();
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
  const sellerTabs = ["new-order", "my-orders", "planning", "quotes", "capacity", "metrics"];
  if (user.role === "vendedor") {
    $("#sellerMenuWrap").innerHTML = sellerTabs
      .map((tab) => `<button type="button" class="${tab === activeView ? "active" : ""}" data-tab="${tab}">${tab === "new-order" ? "Cargar pedido" : tab === "my-orders" ? "Mis pedidos" : tabs[tab]}</button>`)
      .join("");
    $$("#sellerMenuWrap button").forEach((button) => {
      button.addEventListener("click", () => {
        activeView = button.dataset.tab;
        render();
      });
    });
    return;
  }
  const roleTabs =
    user.role === "direccion"
      ? ["workflow", "quotes", "stock", "business", "pricing", "planning", "capacity", "metrics", "crm", "users", "new-order"]
      : user.role === "planeamiento"
        ? ["workflow", "quotes", "pricing", "planning", "capacity", "metrics"]
        : ["workflow", "planning", "capacity", "metrics"];
  $("#navTabs").innerHTML = roleTabs
    .map((tab) => `<button type="button" class="${tab === activeView ? "active" : ""}" data-tab="${tab}">${tab === "new-order" ? "Cargar pedido" : tabs[tab]}</button>`)
    .join("");
  $$("#navTabs button").forEach((button) => {
    button.addEventListener("click", () => {
      activeView = button.dataset.tab;
      render();
    });
  });
}

function canEditPlanning() {
  return ["planeamiento", "direccion"].includes(currentUser().role);
}

function cleanProductCode(value) {
  return String(value || "").trim().toUpperCase();
}

function inferProductCategory(value = "") {
  const text = String(value).toLowerCase();
  if (text.includes("bols") || text.includes("friselina")) return "bolsa";
  if (text.includes("remera") || text.includes("camiseta")) return "remera";
  if (text.includes("gorra")) return "gorra";
  if (text.includes("lapic") || text.includes("boligraf")) return "lapicera";
  if (text.includes("taza") || text.includes("mug")) return "taza";
  if (text.includes("cuaderno") || text.includes("cuadreno") || text.includes("anotador")) return "cuaderno";
  if (text.includes("termo") || text.includes("botella term")) return "termo";
  return "otro";
}

function inferProductColor(value = "") {
  const text = String(value).toLowerCase();
  if (text.includes("negro") || text.includes("negra")) return "Negro";
  if (text.includes("blanco") || text.includes("blanca")) return "Blanco";
  if (text.includes("beige") || text.includes("natural")) return "Beige";
  if (text.includes("azul marino")) return "Azul marino";
  return "";
}

function inferPressUnitsPerPass(value = "") {
  const text = String(value).toLowerCase().replace(/\s/g, "");
  if (text.includes("30x30")) return 3;
  if (text.includes("40x45") || text.includes("45x40")) return 1;
  const dimensions = text.match(/(\d+(?:[.,]\d+)?)x(\d+(?:[.,]\d+)?)/);
  if (dimensions) {
    const width = Number(dimensions[1].replace(",", "."));
    const height = Number(dimensions[2].replace(",", "."));
    const normal = Math.floor(60 / width) * Math.floor(50 / height);
    const rotated = Math.floor(60 / height) * Math.floor(50 / width);
    return Math.max(1, normal, rotated);
  }
  return 1;
}

const categoryLabels = { bolsa: "Bolsas", remera: "Remeras", gorra: "Gorras", lapicera: "Lapiceras", taza: "Tazas", cuaderno: "Cuadernos", termo: "Termos", otro: "Otros" };

function categoryIcon(category) {
  const paths = {
    bolsa: '<path d="M7 9h10l1 11H6L7 9Z"/><path d="M9 10V7a3 3 0 0 1 6 0v3"/>',
    remera: '<path d="m8 4-5 3 2 4 3-1v10h8V10l3 1 2-4-5-3c-1 2-7 2-8 0Z"/>',
    gorra: '<path d="M5 14c0-6 3-9 7-9s7 3 7 9H5Z"/><path d="M12 14c3 0 7 1 9 3-4 1-8 1-11-1"/>',
    lapicera: '<path d="m6 18 2-5L17 4l3 3-9 9-5 2Z"/><path d="m15 6 3 3M8 13l3 3"/>',
    taza: '<path d="M5 6h11v12H7a2 2 0 0 1-2-2V6Z"/><path d="M16 9h2a3 3 0 0 1 0 6h-2"/>',
    cuaderno: '<path d="M6 4h13v16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="M8 4v16M11 8h5M11 12h5"/>',
    termo: '<path d="M9 3h6v3l1 2v12H8V8l1-2V3Z"/><path d="M9 6h6M8 11h8"/>',
    otro: '<path d="M4 7h16v13H4V7Z"/><path d="M9 7V4h6v3M4 12h16"/>'
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths[category] || paths.otro}</svg>`;
}

function isLightColor(color = "") {
  const value = color.toLowerCase();
  return !["negro", "negra", "azul marino", "oscuro", "oscura"].some((term) => value.includes(term));
}

function orderProducts() {
  return state.products.filter((product) => {
    if (!product.active) return false;
    return product.source === "fabrica" || inventoryFor(product.productCode).available > 0;
  });
}

function availablePrintMethods(product) {
  const category = product?.category || inferProductCategory(product?.name);
  return state.printMethods.filter((method) => method.active && method.categories.includes(category) && (!method.lightOnly || isLightColor(product?.color)));
}

function printMethodCostForProduct(method, product) {
  if (!method) return 0;
  if (method.id === "sin-impresion" || (product?.category || inferProductCategory(product?.name)) !== "bolsa") return Number(method.unitCost || 0);
  const unitsPerPass = Math.max(1, Number(product?.pressUnitsPerPass || inferPressUnitsPerPass(`${product?.name || ""} ${product?.variant || ""}`)));
  return Number(method.unitCost || 0) / unitsPerPass;
}

function commercialCostDefaults(sourceState = state) {
  const costs = sourceState.quoteConfig?.costs || {};
  return {
    productionCost: Number(costs.ink || 0) + Number(costs.tape || 0),
    sublimationSheet: Number(costs.paper || 0),
    machineWear: Number(costs.printerDepreciation || 0) + Number(costs.pressDepreciation || 0),
    labor: Number(costs.labor || 0),
    design: 0,
    electricity: Number(costs.electricity || 0)
  };
}

function inventoryFor(productCode) {
  const code = cleanProductCode(productCode);
  const purchases = (state.finance?.transactions || []).filter((item) => item.type === "compra" && item.source !== "fabrica" && cleanProductCode(item.productCode) === code);
  const purchased = purchases.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const reserved = state.orders
    .filter((order) => cleanProductCode(order.stockCode) === code && order.inventoryState === "reserved")
    .reduce((sum, order) => sum + Number(order.quantity || 0), 0);
  const consumed = state.orders
    .filter((order) => cleanProductCode(order.stockCode) === code && order.inventoryState === "consumed")
    .reduce((sum, order) => sum + Number(order.quantity || 0), 0);
  return { purchased, reserved, consumed, available: Math.max(0, purchased - reserved - consumed) };
}

function releaseOrderStock(order) {
  if (order.inventoryState === "reserved") order.inventoryState = "released";
}

function consumeOrderStock(order) {
  if (order.inventoryState === "reserved") order.inventoryState = "consumed";
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
  const selectable = orderProducts();
  const availableCategories = [...new Set(selectable.map((product) => product.category || inferProductCategory(product.name)))];
  const requestedCategories = ["bolsa", "taza", "cuaderno", "lapicera", "termo"];
  const categories = [...new Set([...requestedCategories, ...availableCategories])];
  if (!availableCategories.includes(activeProductCategory)) activeProductCategory = availableCategories.includes("bolsa") ? "bolsa" : availableCategories[0] || "";
  $("#productCategoryGrid").innerHTML = categories.map((category) => `
    <button class="product-category-card ${category === activeProductCategory ? "active" : ""}" type="button" data-product-category="${category}" ${availableCategories.includes(category) ? "" : "disabled"}>
      <span class="category-icon">${categoryIcon(category)}</span>
      <strong>${categoryLabels[category] || "Otros"}</strong>
      ${availableCategories.includes(category) ? "" : '<small>Sin stock</small>'}
    </button>`).join("");
  $$('[data-product-category]').forEach((button) => button.addEventListener("click", () => {
    activeProductCategory = button.dataset.productCategory;
    renderProducts();
  }));
  const categoryProducts = selectable.filter((product) => (product.category || inferProductCategory(product.name)) === activeProductCategory);
  $("#productVariantLabel").textContent = activeProductCategory === "bolsa" ? "Medida y color" : activeProductCategory === "remera" ? "Talle y color" : activeProductCategory === "gorra" ? "Modelo y color" : activeProductCategory === "taza" ? "Capacidad y color" : activeProductCategory === "cuaderno" ? "Medida y modelo" : activeProductCategory === "termo" ? "Capacidad y color" : activeProductCategory === "lapicera" ? "Modelo" : "Variante";
  $("#productSelect").innerHTML = categoryProducts
    .map((product) => `<option value="${product.name}" data-source="${product.source}" data-price="${Number(product.price || 0)}">${product.variant || product.name}${product.color ? ` · ${product.color}` : ""}${product.source === "fabrica" ? " · A cotizar fabrica" : ` · ${inventoryFor(product.productCode).available} disponibles`}</option>`)
    .join("");
  updateProductConfiguration(true);

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
              <p class="meta">Codigo ${product.productCode || "sin vincular"} · stock disponible ${inventoryFor(product.productCode).available}</p>
              ${canEditPlanning() ? `<div class="card-actions">
                <input class="table-input product-code-input" value="${escapeHtml(product.productCode)}" list="purchaseCodeList" placeholder="Codigo stock" data-product-code="${product.id}" />
                <button class="small-button" type="button" data-link-product="${product.id}">Vincular stock</button>
                <button class="small-button" type="button" data-remove-product="${product.id}">Pausar</button>
              </div>` : ""}
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
  $$("[data-link-product]").forEach((button) => {
    button.addEventListener("click", () => {
      const product = state.products.find((item) => item.id === button.dataset.linkProduct);
      const input = $(`[data-product-code="${button.dataset.linkProduct}"]`);
      product.productCode = cleanProductCode(input.value);
      recalculatePricingForCode(product.productCode);
      saveState();
    });
  });
}

function updateProductConfiguration(resetPrice = true) {
  const form = $("#orderForm");
  const product = state.products.find((item) => item.name === form.product.value);
  const methods = availablePrintMethods(product);
  const recommended = methods.find((method) => method.id === "sublimacion") || methods.find((method) => method.id === "dtf") || methods.find((method) => method.id === "grabado") || methods[0];
  $("#printMethodSelect").innerHTML = methods.map((method) => `<option value="${method.id}" ${method.id === recommended?.id ? "selected" : ""}>${method.name} · ${money(printMethodCostForProduct(method, product))}</option>`).join("");
  const factory = product?.source === "fabrica";
  const orderRadio = form.querySelector('[name="requestType"][value="pedido"]');
  if (factory) {
    orderRadio.disabled = true;
    form.querySelector('[name="requestType"][value="presupuesto"]').checked = true;
  } else {
    orderRadio.disabled = false;
    orderRadio.checked = true;
  }
  $("#printRecommendation").innerHTML = product ? `<span class="badge ${factory ? "payment" : "neutral"}">${factory ? "Fabrica: solo presupuesto, sin reservar stock" : `Sugerido: ${recommended?.name || "Sin impresion"}`}</span><p>${product.color ? `Base ${product.color}. ` : ""}${recommended?.id === "sublimacion" ? "Apta para sublimacion por ser una base clara." : product.color && !isLightColor(product.color) ? "La sublimacion no esta disponible en bases oscuras." : "Tecnicas compatibles filtradas para este producto."}</p>` : "";
  updateLargeSalePanel();
  updateSalePreview(resetPrice);
}

function updateLargeSalePanel() {
  const form = $("#orderForm");
  const product = state.products.find((item) => item.name === form.product.value);
  const isQuote = form.querySelector('[name="requestType"][value="presupuesto"]')?.checked || product?.source === "fabrica";
  $("#largeSalePanel").classList.toggle("is-hidden", !isQuote);
  if (isQuote && product) {
    if (!form.elements.quoteMeasures.value) form.elements.quoteMeasures.value = product.variant || "";
    if (!form.elements.quoteBaseColors.value) form.elements.quoteBaseColors.value = product.color || "";
  }
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

function renderDiscountScales() {
  const select = $("#discountProductSelect");
  if (!select) return;
  const products = state.products.filter((product) => product.active && (product.source === "fabrica" || inventoryFor(product.productCode).available > 0));
  select.innerHTML = products.map((product) => `<option value="${product.id}">${escapeHtml(product.name)}</option>`).join("");
  const scales = state.discountScales.filter((scale) => scale.active).filter((scale) => {
    if (canEditPlanning()) return true;
    return (scale.starts || iso()) <= iso() && scale.expires >= iso() && (!Number(scale.stockLimit || 0) || discountScaleUsage(scale.id) < Number(scale.stockLimit));
  });
  $("#discountScaleList").innerHTML = scales.length ? scales.map((scale) => {
    const product = state.products.find((item) => item.id === scale.productId);
    const used = discountScaleUsage(scale.id);
    const upcoming = (scale.starts || iso()) > iso();
    const expired = scale.expires < iso();
    const exhausted = Number(scale.stockLimit || 0) > 0 && used >= Number(scale.stockLimit);
    const status = upcoming ? "Programada" : expired ? "Vencida" : exhausted ? "Cupo agotado" : "Activa";
    const remaining = Number(scale.stockLimit || 0) ? `${Math.max(0, Number(scale.stockLimit) - used)} unidades disponibles` : "Sin limite de cupo";
    const range = scale.discountType === "direct" ? "descuento directo" : `entre ${Number(scale.minQuantity)} y ${Number(scale.maxQuantity)} unidades`;
    const margin = estimatedMarginForDiscount(product, scale.discountRate);
    return `<article class="list-card">
      <header><strong>${escapeHtml(product?.name || "Producto")}</strong><span class="badge ${expired || exhausted ? "payment" : "alta"}">${status}</span></header>
      <p><strong>${Number(scale.discountRate).toLocaleString("es-AR")}% de descuento</strong> · ${range}.</p>
      <span class="meta">Del ${formatDate(scale.starts)} al ${formatDate(scale.expires)} · ${remaining} · margen estimado ${margin.toLocaleString("es-AR", { maximumFractionDigits: 2 })}%</span>
      ${canEditPlanning() ? `<div class="card-actions"><button class="small-button" type="button" data-remove-discount-scale="${scale.id}">Finalizar</button></div>` : ""}
    </article>`;
  }).join("") : '<div class="empty-state panel">No hay dinamicas comerciales vigentes.</div>';
  $$('[data-remove-discount-scale]').forEach((button) => button.addEventListener('click', () => {
    const scale = state.discountScales.find((item) => item.id === button.dataset.removeDiscountScale);
    if (scale) scale.active = false;
    saveState();
  }));
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
            <th>Precio venta</th>
            <th>Total</th>
            <th>Comision</th>
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
  const quoteDetails = orderQuoteDetails(order);
  return `
    <tr>
      <td><strong>${order.id}</strong></td>
      <td><span class="badge ${badgeClass(order.status)}">${statusLabels[order.status]}</span></td>
      <td>${order.requestType === "pedido" ? "Pedido" : "Presupuesto"}</td>
      <td>${order.seller}</td>
      <td>${order.client}</td>
      <td>${contact}</td>
      <td>${order.deliveryAddress || "Sin direccion"}</td>
      <td>${order.product}<br><span class="meta">${[order.productVariant, order.productColor, order.printMethod].filter(Boolean).join(" · ")}</span>${quoteDetails ? `<br><span class="meta"><strong>Presupuesto:</strong> ${quoteDetails}</span>` : ""}</td>
      <td class="number-cell">${order.quantity}</td>
      <td class="number-cell">${money(order.saleUnitPrice || productPrice(order.product))}</td>
      <td class="number-cell"><strong>${money(order.saleTotal || orderRevenue(order))}</strong></td>
      <td class="number-cell">${money(order.commissionAmount || 0)}${order.commissionRate ? `<br><span class="meta">${order.commissionRate}%</span>` : ""}</td>
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
        <div class="meta-box"><span>Precio venta</span><strong>${money(order.saleUnitPrice || productPrice(order.product))}</strong></div>
        <div class="meta-box"><span>Total venta</span><strong>${money(order.saleTotal || orderRevenue(order))}</strong></div>
        <div class="meta-box"><span>Comision</span><strong>${money(order.commissionAmount || 0)}</strong></div>
        <div class="meta-box"><span>Destino</span><strong>${order.source === "taller" ? "Taller" : "Fabrica"}</strong></div>
        <div class="meta-box"><span>Sena 50%</span><strong>${order.payment50 ? "Confirmada" : "Pendiente"}</strong></div>
        <div class="meta-box"><span>Fecha ideal</span><strong>${formatDate(order.requestedDate)}</strong></div>
        <div class="meta-box"><span>Entrega</span><strong>${formatDate(order.committedDate)}</strong></div>
      </div>
      <p class="meta"><strong>Contacto:</strong> ${contact}</p>
      <p class="meta"><strong>Direccion entrega:</strong> ${order.deliveryAddress || "Sin direccion cargada"}</p>
      <p class="meta"><strong>Configuracion:</strong> ${[order.productVariant, order.productColor, order.printMethod].filter(Boolean).join(" · ") || "Sin detalle"}</p>
      ${orderQuoteDetails(order) ? `<p class="meta"><strong>Detalle presupuesto grande:</strong> ${orderQuoteDetails(order)}</p>` : ""}
      ${attachmentTemplate(order)}
      ${order.notes ? `<p class="meta">${order.notes}</p>` : ""}
      ${order.comment ? `<p class="meta"><strong>Comentario:</strong> ${order.comment}</p>` : ""}
      ${user.role === "vendedor" && order.status === "presupuesto_respondido" ? `<button class="primary-button" type="button" data-convert="${order.id}">Convertir en pedido</button>` : ""}
      ${actions ? `<div class="card-actions">${actions}</div>` : ""}
    </article>
  `;
}

function orderQuoteDetails(order) {
  return [
    order.quoteMeasures ? `Medidas: ${escapeHtml(order.quoteMeasures)}` : "",
    order.quoteBaseColors ? `Bases: ${escapeHtml(order.quoteBaseColors)}` : "",
    order.quoteHandleColor ? `Manija: ${escapeHtml(order.quoteHandleColor)}` : "",
    order.quoteHandleSize ? `Tamaño manija: ${escapeHtml(order.quoteHandleSize)}` : "",
    order.quoteShape ? `Forma: ${escapeHtml(order.quoteShape)}` : ""
  ].filter(Boolean).join(" · ");
}

function badgeClass(status) {
  if (["rechazado", "cancelado", "devolucion"].includes(status)) return "rechazado";
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
  let action = "";
  if (["planeamiento", "direccion"].includes(role)) {
    if (["pedido_planeamiento", "presupuesto_planeamiento"].includes(order.status)) {
      action = `<button class="small-button" type="button" data-planning="${order.id}">Resolver en planeamiento</button>`;
    }
    if (!action && order.status === "esperando_senia") {
      action = `<button class="small-button" type="button" data-pay="${order.id}">Confirmar sena 50%</button>`;
    }
    if (!action && order.status === "fabrica_fecha_planeamiento") {
      action = `<button class="small-button" type="button" data-date="${order.id}">Responder fecha fabrica</button>`;
    }
  }
  if (!action && ["taller", "direccion"].includes(role) && order.status === "taller_fecha") {
    action = `<button class="small-button" type="button" data-date="${order.id}">Asignar fecha taller</button>`;
  }
  if (!action && ["taller", "fabrica", "direccion"].includes(role) && ["fecha_confirmada", "produccion"].includes(order.status)) {
    const nextStatus = order.status === "fecha_confirmada" ? "produccion" : "logistica";
    action = `<button class="small-button" type="button" data-progress="${order.id}" data-next-status="${nextStatus}">${nextStatus === "produccion" ? "Pasar a produccion" : "Enviar a logistica"}</button>`;
  }
  if (!action && ["logistica", "direccion"].includes(role) && order.status === "logistica") {
    action = `
      <button class="small-button" type="button" data-date="${order.id}">Asignar fecha entrega</button>
      <button class="small-button" type="button" data-deliver="${order.id}">Marcar entregado</button>
    `;
  }
  const canCancel = role === "direccion" && !["entregado", "rechazado", "cancelado", "devolucion"].includes(order.status);
  const directionTools = role === "direccion" ? `<button class="small-button" type="button" data-edit-order="${order.id}">Editar</button><button class="small-button danger-inline" type="button" data-delete-order="${order.id}">Borrar</button>` : "";
  return `${action}${canCancel ? `<button class="small-button danger-inline" type="button" data-direction-cancel="${order.id}">${["produccion", "logistica"].includes(order.status) ? "Registrar devolucion" : "Cancelar y liberar stock"}</button>` : ""}${directionTools}`;
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
  $$("[data-direction-cancel]").forEach((button) => {
    button.addEventListener("click", () => cancelOrderByDirection(button.dataset.directionCancel));
  });
  $$("[data-edit-order]").forEach((button) => button.addEventListener("click", () => openEditOrder(button.dataset.editOrder)));
  $$("[data-delete-order]").forEach((button) => button.addEventListener("click", () => deleteOrder(button.dataset.deleteOrder)));
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
      if (order.status === "produccion") consumeOrderStock(order);
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

function productBaseCost(product) {
  if (!product) return 0;
  const pricing = product.source === "fabrica" ? null : latestPricingForCode(product.productCode);
  const rawCost = Number(pricing?.total || purchaseUnitCost(product.productCode) || product.price || 0);
  const category = product.category || inferProductCategory(product.name);
  return category === "taza" ? rawCost / 0.67 : rawCost;
}

function discountScaleUsage(scaleId) {
  return state.orders
    .filter((order) => order.requestType === "pedido" && order.discountScaleId === scaleId && !["rechazado", "cancelado", "devolucion"].includes(order.status))
    .reduce((sum, order) => sum + Number(order.quantity || 0), 0);
}

function discountScaleForProduct(product, quantity) {
  if (!product) return null;
  return state.discountScales
    .filter((scale) => scale.active && scale.productId === product.id)
    .filter((scale) => (scale.starts || iso()) <= iso() && iso() <= scale.expires)
    .filter((scale) => quantity >= Number(scale.minQuantity || 1) && quantity <= Number(scale.maxQuantity || Infinity))
    .filter((scale) => !Number(scale.stockLimit || 0) || discountScaleUsage(scale.id) + quantity <= Number(scale.stockLimit))
    .sort((a, b) => Number(b.discountRate || 0) - Number(a.discountRate || 0))[0] || null;
}

function renderProductScaleInfo(product, quantity, appliedScale) {
  const container = $("#productScaleInfo");
  if (!container || !product) {
    if (container) container.innerHTML = "";
    return;
  }
  const currentScales = state.discountScales
    .filter((scale) => scale.active && scale.productId === product.id)
    .filter((scale) => (scale.starts || iso()) <= iso() && iso() <= scale.expires)
    .filter((scale) => !Number(scale.stockLimit || 0) || discountScaleUsage(scale.id) < Number(scale.stockLimit));
  container.innerHTML = currentScales.length ? `
    <div class="scale-info-head"><strong>Escalas y dinamicas vigentes</strong><span>${appliedScale ? "Aplicada a esta cantidad" : "Modifica la cantidad para aplicar una escala"}</span></div>
    <div class="scale-info-grid">${currentScales.map((scale) => {
      const used = discountScaleUsage(scale.id);
      const remaining = Number(scale.stockLimit || 0) ? Math.max(0, Number(scale.stockLimit) - used) : null;
      const range = scale.discountType === "direct" ? "Todas las cantidades" : `${Number(scale.minQuantity)} a ${Number(scale.maxQuantity)} unidades`;
      return `<div class="scale-info-item ${scale.id === appliedScale?.id ? "active" : ""}"><strong>${Number(scale.discountRate).toLocaleString("es-AR")}% OFF</strong><span>${range}</span><small>Hasta ${formatDate(scale.expires)}${remaining === null ? "" : ` · cupo ${remaining} u.`}</small></div>`;
    }).join("")}</div>` : '<div class="scale-info-empty">Este producto no tiene escalas comerciales vigentes.</div>';
}

function estimatedMarginForDiscount(product, discountRate) {
  if (!product) return 0;
  const methods = availablePrintMethods(product);
  const method = methods.find((item) => item.id === "sublimacion") || methods.find((item) => item.id === "dtf") || methods.find((item) => item.id === "grabado") || methods[0];
  const directCost = productBaseCost(product) + printMethodCostForProduct(method, product);
  const marginRate = signumMarginRate();
  const sellerCost = marginRate < 100 ? directCost / (1 - marginRate / 100) : directCost;
  const suggestedMarkup = Number(state.quoteConfig?.policy?.suggestedMarkupRate || 0);
  const finalPrice = sellerCost * (1 + suggestedMarkup / 100) * (1 - Number(discountRate || 0) / 100);
  const signumRevenue = Math.min(finalPrice, sellerCost);
  return signumRevenue ? ((signumRevenue - directCost) / signumRevenue) * 100 : -100;
}

function signumMarginRate() {
  return Number(state.quoteConfig?.policy?.commissionRate || 0);
}

function orderRevenue(order) {
  return Number(order.saleTotal || 0) || productPrice(order.product) * Number(order.quantity || 0);
}

function updateSalePreview(resetPrice = false, changedField = "") {
  const form = $("#orderForm");
  if (!form || !$("#salePreview")) return;
  const product = state.products.find((item) => item.name === form.product.value);
  const method = state.printMethods.find((item) => item.id === form.printMethod.value);
  const baseCost = productBaseCost(product);
  const printCost = printMethodCostForProduct(method, product);
  const commercialRate = signumMarginRate();
  const directCost = baseCost + printCost;
  const rawSuggested = commercialRate < 100 ? directCost / (1 - commercialRate / 100) : directCost;
  const sellerCost = Math.ceil(rawSuggested / 50) * 50;
  const quantity = Math.max(1, Number(form.quantity.value || 1));
  const discountScale = discountScaleForProduct(product, quantity);
  renderProductScaleInfo(product, quantity, discountScale);
  form.sellerUnitCost.value = sellerCost || "";
  if (resetPrice || changedField === "quantity" || (!form.saleUnitPrice.value && !form.saleMarkup.value)) {
    const suggestedMarkup = Number(state.quoteConfig?.policy?.suggestedMarkupRate || 0);
    const regularPrice = sellerCost * (1 + suggestedMarkup / 100);
    const suggestedPrice = discountScale ? regularPrice * (1 - Number(discountScale.discountRate || 0) / 100) : regularPrice;
    form.saleUnitPrice.value = Math.round(suggestedPrice * 100) / 100 || "";
    form.saleMarkup.value = sellerCost ? Math.round(((suggestedPrice / sellerCost) - 1) * 10000) / 100 : 0;
  } else if (changedField === "markup") {
    const markup = Number(form.saleMarkup.value || 0);
    form.saleUnitPrice.value = Math.round(sellerCost * (1 + markup / 100) * 100) / 100;
  } else if (changedField === "price") {
    const enteredPrice = Number(form.saleUnitPrice.value || 0);
    form.saleMarkup.value = sellerCost ? Math.round(((enteredPrice / sellerCost) - 1) * 10000) / 100 : 0;
  }
  const markup = Number(form.saleMarkup.value || 0);
  const unitPrice = Number(form.saleUnitPrice.value || sellerCost || 0);
  const total = unitPrice * quantity;
  const commission = (unitPrice - sellerCost) * quantity;
  $("#salePreview").classList.toggle("compact", !canEditPlanning());
  $("#salePreview").innerHTML = `
    ${canEditPlanning() ? `<div><span>Costo producto base</span><strong>${money(baseCost)}</strong></div><div><span>Costo impresion</span><strong>${money(printCost)}</strong></div>` : ""}
    <div><span>Precio final por unidad</span><strong>${money(unitPrice)}</strong></div>
    ${discountScale ? `<div><span>Descuento aplicado</span><strong>${Number(discountScale.discountRate).toLocaleString("es-AR")}% · ${Number(discountScale.minQuantity)} a ${Number(discountScale.maxQuantity)} u.</strong></div>` : ""}
    <div><span>Markup aplicado</span><strong>${markup.toLocaleString("es-AR", { maximumFractionDigits: 2 })}%</strong></div>
    <div><span>Total de venta</span><strong>${money(total)}</strong></div>
    <div><span>Comision vendedor (${markup.toLocaleString("es-AR", { maximumFractionDigits: 2 })}%)</span><strong>${money(commission)}</strong></div>`;
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

function latestPricingForCode(productCode) {
  const code = cleanProductCode(productCode);
  return [...(state.finance?.pricing || [])]
    .filter((item) => cleanProductCode(item.productCode) === code)
    .sort((a, b) => b.createdAt - a.createdAt)[0];
}

function ensurePricingForCode(productCode, productName = "") {
  const code = cleanProductCode(productCode);
  let pricing = latestPricingForCode(code);
  if (pricing) return pricing;
  const purchaseCost = purchaseUnitCost(code);
  const defaults = commercialCostDefaults();
  pricing = {
    id: uid(), productCode: code, productName: productName || code, description: "Generado desde compras",
    manualCost: 0, purchaseCost, ...defaults, seller1: 0, seller2: 0, iva: false,
    subtotal: purchaseCost, ivaAmount: 0, total: purchaseCost, createdAt: Date.now()
  };
  state.finance.pricing.push(pricing);
  recalculatePricingForCode(code);
  return pricing;
}

function ensureProductForPurchase(purchase) {
  const code = cleanProductCode(purchase.productCode);
  let product = state.products.find((item) => cleanProductCode(item.productCode) === code);
  if (!product) {
    product = {
      id: uid(), productCode: code, name: purchase.productDescription || code, price: purchaseUnitCost(code),
      category: purchase.category || inferProductCategory(purchase.productDescription), variant: purchase.variant || "",
      color: purchase.color || "", pressUnitsPerPass: inferPressUnitsPerPass(`${purchase.productDescription || ""} ${purchase.variant || ""}`), minimum: 1, source: purchase.source || "taller", leadTime: 7, active: true
    };
    state.products.push(product);
  } else {
    product.active = true;
    product.category = purchase.category || product.category || inferProductCategory(product.name);
    product.variant = purchase.variant || product.variant || "";
    product.color = purchase.color || product.color || "";
    product.source = purchase.source || product.source || "taller";
    if (purchase.productDescription) product.name = purchase.productDescription;
  }
}

function recalculatePricingForCode(productCode) {
  const code = cleanProductCode(productCode);
  const purchaseCost = purchaseUnitCost(code);
  const matching = (state.finance?.pricing || []).filter((item) => cleanProductCode(item.productCode) === code);
  matching.forEach((item) => {
    item.purchaseCost = purchaseCost;
    const baseCost = Number(item.manualCost || 0) || purchaseCost;
    item.subtotal = baseCost;
    item.ivaAmount = item.iva ? item.subtotal * 0.21 : 0;
    item.total = item.subtotal + item.ivaAmount;
  });
  const latest = [...matching].sort((a, b) => b.createdAt - a.createdAt)[0];
  if (latest) {
    state.products
      .filter((product) => cleanProductCode(product.productCode) === code)
      .forEach((product) => { product.price = latest.total; });
  }
}

function pricingFromForm(form) {
  const data = Object.fromEntries(new FormData(form));
  const productCode = String(data.productCode || "").trim().toUpperCase();
  const purchaseCost = purchaseUnitCost(productCode);
  const manualCost = Number(data.manualCost || 0);
  const baseCost = manualCost || purchaseCost;
  const subtotal = baseCost;
  const ivaAmount = data.iva ? subtotal * 0.21 : 0;
  return {
    productCode,
    productName: data.productName,
    description: data.description,
    manualCost,
    purchaseCost,
    iva: Boolean(data.iva),
    subtotal,
    ivaAmount,
    total: subtotal + ivaAmount
  };
}

function renderStock() {
  if (!$("#stockTable")) return;
  const purchases = [...(state.finance?.transactions || [])]
    .filter((item) => item.type === "compra" && item.productCode)
    .sort((a, b) => String(b.date).localeCompare(String(a.date)) || b.createdAt - a.createdAt);
  const codes = [...new Set([
    ...purchases.map((item) => cleanProductCode(item.productCode)),
    ...state.products.map((product) => cleanProductCode(product.productCode)).filter(Boolean)
  ])];
  const totals = codes.reduce((result, code) => {
    const stock = inventoryFor(code);
    result.purchased += stock.purchased;
    result.reserved += stock.reserved;
    result.consumed += stock.consumed;
    result.available += stock.available;
    return result;
  }, { purchased: 0, reserved: 0, consumed: 0, available: 0 });

  $("#stockSummary").innerHTML = `
    <div class="summary-row"><span>Unidades ingresadas</span><strong>${totals.purchased}</strong></div>
    <div class="summary-row"><span>Reservadas por pedidos</span><strong>${totals.reserved}</strong></div>
    <div class="summary-row"><span>Consumidas en produccion</span><strong>${totals.consumed}</strong></div>
    <div class="summary-row total"><span>Disponibles para vender</span><strong>${totals.available}</strong></div>`;

  $("#stockTable").innerHTML = codes.length ? `
    <table class="finance-table">
      <thead><tr><th>Codigo</th><th>Descripcion</th><th>Comprado</th><th>Reservado</th><th>Consumido</th><th>Disponible</th><th>Costo promedio</th><th>Costo + variables</th><th>Productos publicados</th></tr></thead>
      <tbody>${codes.map((code) => {
        const stock = inventoryFor(code);
        const purchase = purchases.find((item) => cleanProductCode(item.productCode) === code);
        const linked = state.products.filter((product) => cleanProductCode(product.productCode) === code && product.active);
        const pricing = [...(state.finance?.pricing || [])].filter((item) => cleanProductCode(item.productCode) === code).sort((a, b) => b.createdAt - a.createdAt)[0];
        return `<tr>
          <td><strong>${escapeHtml(code)}</strong></td>
          <td>${escapeHtml(purchase?.productDescription || linked[0]?.name || "-")}</td>
          <td class="number-cell">${stock.purchased}</td><td class="number-cell">${stock.reserved}</td><td class="number-cell">${stock.consumed}</td>
          <td class="number-cell ${stock.available > 0 ? "stock-positive" : "stock-zero"}">${stock.available}</td>
          <td class="number-cell">${money(purchaseUnitCost(code))}</td>
          <td class="number-cell">${pricing ? money(pricing.total) : "Sin pricing"}</td>
          <td>${linked.length ? linked.map((product) => escapeHtml(product.name)).join("<br>") : "Sin vincular"}</td>
        </tr>`;
      }).join("")}</tbody>
    </table>` : `<div class="empty-state">Todavia no hay compras con codigo y cantidad.</div>`;

  $("#purchaseTable").innerHTML = purchases.length ? `
    <table class="finance-table"><thead><tr><th>Fecha</th><th>Codigo</th><th>Descripcion</th><th>Cantidad</th><th>Costo unitario</th><th>Total</th><th>Proveedor</th><th>Factura</th><th></th></tr></thead>
    <tbody>${purchases.map((item) => `<tr><td>${formatDate(item.date)}</td><td><strong>${escapeHtml(item.productCode)}</strong></td><td>${escapeHtml(item.productDescription)}</td><td class="number-cell">${item.quantity}</td><td class="number-cell">${money(Number(item.amount || 0) / Math.max(1, Number(item.quantity || 0)))}</td><td class="number-cell">${money(item.amount)}</td><td>${escapeHtml(item.reference || "-")}</td><td>${item.invoiceImage ? `<a class="invoice-link" href="${item.invoiceImage}" target="_blank" rel="noreferrer">Ver factura</a>` : "-"}</td><td><button class="small-button" type="button" data-edit-purchase="${item.id}">Editar</button></td></tr>`).join("")}</tbody></table>`
    : `<div class="empty-state">No hay compras cargadas.</div>`;
  $$('[data-edit-purchase]').forEach((button) => button.addEventListener('click', () => openPurchaseEdit(button.dataset.editPurchase)));
}

function renderCommercialCosts() {
  const container = $("#commercialCostTable");
  if (!container) return;
  if (!canEditPlanning()) {
    container.innerHTML = "";
    $("#printMethodCostTable").innerHTML = "";
    return;
  }
  const printCostFields = [
    ["material", "Material / insumo"], ["paperFilm", "Hoja, film o transfer"], ["ink", "Tinta"],
    ["adhesive", "Cinta o adhesivo"], ["printerWear", "Desgaste impresora"], ["pressWear", "Desgaste plancha / maquina"],
    ["labor", "Mano de obra"], ["design", "Diseno"], ["electricity", "Electricidad"], ["other", "Otros"]
  ];
  const directionCanEdit = currentUser().role === "direccion";
  $("#printMethodCostTable").innerHTML = `
    <div class="method-cost-heading"><div><h4>Costo por sistema de impresion</h4><p>Cada total se forma con la suma de sus componentes.</p></div></div>
    <div class="print-system-grid">${state.printMethods.map((method) => `
      <details class="print-system-card" data-print-method="${method.id}">
        <summary class="print-system-head"><strong>${method.name}</strong><span>Total <b data-print-method-total>${money(method.unitCost || 0)}</b></span></summary>
        <div class="print-breakdown-grid">${printCostFields.map(([field, label]) => `
          <label class="field"><span>${label}</span>${directionCanEdit
            ? `<input type="number" min="0" step="0.01" value="${Number(method.breakdown?.[field] || 0)}" data-print-cost-line="${field}">`
            : `<strong>${money(method.breakdown?.[field] || 0)}</strong>`}</label>`).join("")}</div>
      </details>`).join("")}</div>
    <div class="commission-config">
      <div><h4>Margen y sugerencia comercial</h4><p>Define el margen de Signum y el markup inicial del vendedor.</p></div>
      <label class="field"><span>Margen Signum %</span>${directionCanEdit ? `<input type="number" min="0" max="99" step="0.01" value="${Number(state.quoteConfig.policy.commissionRate || 0)}" id="primaryCommissionRate">` : `<strong>${Number(state.quoteConfig.policy.commissionRate || 0)}%</strong>`}</label>
      <label class="field"><span>Markup sugerido al vendedor %</span>${directionCanEdit ? `<input type="number" min="0" step="0.01" value="${Number(state.quoteConfig.policy.suggestedMarkupRate || 0)}" id="suggestedMarkupRate">` : `<strong>${Number(state.quoteConfig.policy.suggestedMarkupRate || 0)}%</strong>`}</label>
    </div>
    ${directionCanEdit ? '<button class="small-button" type="button" id="savePrintMethodCosts">Guardar estructura de pricing</button>' : ""}`;
  $$('[data-print-cost-line]').forEach((input) => input.addEventListener("input", () => {
    const card = input.closest("[data-print-method]");
    const total = [...card.querySelectorAll("[data-print-cost-line]")].reduce((sum, field) => sum + Number(field.value || 0), 0);
    card.querySelector("[data-print-method-total]").textContent = money(total);
  }));
  $("#savePrintMethodCosts")?.addEventListener("click", () => {
    $$("[data-print-method]").forEach((card) => {
      const method = state.printMethods.find((item) => item.id === card.dataset.printMethod);
      if (!method) return;
      card.querySelectorAll("[data-print-cost-line]").forEach((input) => { method.breakdown[input.dataset.printCostLine] = Number(input.value || 0); });
      method.unitCost = Object.values(method.breakdown).reduce((sum, value) => sum + Number(value || 0), 0);
    });
    state.quoteConfig.policy.commissionRate = Number($("#primaryCommissionRate")?.value || 0);
    state.quoteConfig.policy.suggestedMarkupRate = Number($("#suggestedMarkupRate")?.value || 0);
    saveState();
  });
  const canEdit = canEditPlanning();
  $("#commercialCostHelp").textContent = canEdit
    ? directionCanEdit ? "Define producto base, procesos de impresion y comisiones. El vendedor recibe el precio final sugerido." : "Consulta la estructura de pricing definida por Direccion."
    : "Consulta el costo completo y el precio final de cada producto con stock.";
  const codes = purchaseCodes()
    .map((item) => item.code)
    .filter((code) => inventoryFor(code).available > 0);
  if (!codes.length) {
    container.innerHTML = `<div class="empty-state">No hay productos con stock disponible.</div>`;
    return;
  }
  container.innerHTML = `<table class="finance-table commercial-cost-table">
    <thead><tr><th>Codigo / producto base</th><th>Stock</th><th>Costo compra</th><th>Unidades por pasada</th><th>Sublimacion ajustada</th><th>Costo base manual</th><th>IVA</th><th>Total producto base</th>${directionCanEdit ? "<th></th>" : ""}</tr></thead>
    <tbody>${codes.map((code) => {
      const purchase = (state.finance.transactions || []).find((item) => item.type === "compra" && cleanProductCode(item.productCode) === code);
      const product = state.products.find((item) => cleanProductCode(item.productCode) === code);
      const pricing = latestPricingForCode(code) || ensurePricingForCode(code, product?.name || purchase?.productDescription);
      return `<tr data-cost-row="${escapeHtml(code)}">
        <td><strong>${escapeHtml(code)}</strong><br><span class="meta">${escapeHtml(product?.name || purchase?.productDescription || code)}</span></td>
        <td class="number-cell">${inventoryFor(code).available}</td>
        <td class="number-cell"><strong>${money(purchaseUnitCost(code))}</strong></td>
        <td>${directionCanEdit ? `<input class="table-input cost-input" type="number" min="1" step="1" value="${Math.max(1, Number(product?.pressUnitsPerPass || 1))}" data-press-units>` : Math.max(1, Number(product?.pressUnitsPerPass || 1))}</td>
        <td class="number-cell"><strong data-adjusted-print-cost>${money(printMethodCostForProduct(state.printMethods.find((method) => method.id === "sublimacion"), product))}</strong></td>
        <td>${directionCanEdit ? `<input class="table-input cost-input" type="number" min="0" step="0.01" value="${Number(pricing.manualCost || 0)}" data-cost-field="manualCost" placeholder="Usa compra">` : pricing.manualCost ? money(pricing.manualCost) : "Usa compra"}</td>
        <td>${directionCanEdit ? `<label class="compact-check"><input type="checkbox" data-cost-field="iva" ${pricing.iva ? "checked" : ""}><span>21%</span></label>` : pricing.iva ? "21%" : "No"}</td>
        <td class="number-cell"><strong data-cost-total>${money(pricing.total || purchaseUnitCost(code))}</strong></td>
        ${directionCanEdit ? `<td><button class="small-button" type="button" data-save-cost="${escapeHtml(code)}">Guardar base</button></td>` : ""}
      </tr>`;
    }).join("")}</tbody></table>`;

  $$('[data-save-cost]').forEach((button) => button.addEventListener("click", () => {
    const code = button.dataset.saveCost;
    const row = button.closest("tr");
    const pricing = ensurePricingForCode(code);
    const product = state.products.find((item) => cleanProductCode(item.productCode) === code);
    if (product) product.pressUnitsPerPass = Math.max(1, Number(row.querySelector("[data-press-units]")?.value || 1));
    row.querySelectorAll("[data-cost-field]").forEach((input) => {
      pricing[input.dataset.costField] = input.type === "checkbox" ? input.checked : Number(input.value || 0);
    });
    pricing.purchaseCost = purchaseUnitCost(code);
    const baseCost = Number(pricing.manualCost || 0) || pricing.purchaseCost;
    pricing.subtotal = baseCost;
    pricing.ivaAmount = pricing.iva ? pricing.subtotal * 0.21 : 0;
    pricing.total = pricing.subtotal + pricing.ivaAmount;
    pricing.createdAt = Date.now();
    pricing.costsCustomized = true;
    state.products.filter((product) => cleanProductCode(product.productCode) === code).forEach((product) => { product.price = pricing.total; });
    saveState();
  }));
  $$('#commercialCostTable [data-cost-field]').forEach((input) => input.addEventListener("input", () => {
    const row = input.closest("tr");
    const code = row.dataset.costRow;
    const manualCost = Number(row.querySelector('[data-cost-field="manualCost"]')?.value || 0);
    const subtotal = manualCost || purchaseUnitCost(code);
    const iva = row.querySelector('[data-cost-field="iva"]')?.checked ? subtotal * 0.21 : 0;
    row.querySelector('[data-cost-total]').textContent = money(subtotal + iva);
  }));
  $$('#commercialCostTable [data-cost-field="iva"]').forEach((input) => input.addEventListener("change", () => input.dispatchEvent(new Event("input"))));
  $$('#commercialCostTable [data-press-units]').forEach((input) => input.addEventListener("input", () => {
    const row = input.closest("tr");
    const code = row.dataset.costRow;
    const product = state.products.find((item) => cleanProductCode(item.productCode) === code);
    if (!product) return;
    const previewProduct = { ...product, pressUnitsPerPass: Math.max(1, Number(input.value || 1)) };
    row.querySelector("[data-adjusted-print-cost]").textContent = money(printMethodCostForProduct(state.printMethods.find((method) => method.id === "sublimacion"), previewProduct));
  }));
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
      const removed = state.finance.transactions.find((item) => item.id === button.dataset.removeFinance);
      state.finance.transactions = state.finance.transactions.filter((item) => item.id !== button.dataset.removeFinance);
      if (removed?.type === "compra") recalculatePricingForCode(removed.productCode);
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
            <th>Ajuste manual</th>
            <th>IVA</th>
            <th>Costo producto base</th>
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
                  <td class="number-cell">${money(item.purchaseCost || 0)}</td>
                  <td class="number-cell">${item.manualCost ? money(item.manualCost) : "Usa compra"}</td>
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
    <div><span>Costo base elegido</span><strong>${money(pricing.subtotal)}</strong></div>
    <div><span>IVA 21%</span><strong>${money(pricing.ivaAmount)}</strong></div>
    <div><span>Costo producto base</span><strong>${money(pricing.total)}</strong></div>
  `;
}

async function createOrder(event) {
  event.preventDefault();
  const user = currentUser();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  const product = state.products.find((item) => item.name === data.product);
  const printMethod = state.printMethods.find((item) => item.id === data.printMethod);
  const quantity = Number(data.quantity || 0);
  const saleUnitPrice = Number(data.saleUnitPrice || product?.price || 0);
  const sellerUnitCost = Number(data.sellerUnitCost || 0);
  const saleMarkup = Number(data.saleMarkup || 0);
  const discountScale = discountScaleForProduct(product, quantity);
  const commissionRate = saleMarkup;
  const isFactory = product?.source === "fabrica";
  const isOrder = data.requestType === "pedido" && !isFactory;
  if (!product) {
    alert("Selecciona un producto con stock disponible.");
    return;
  }
  if (isOrder && inventoryFor(product.productCode).available < quantity) {
    alert(`Stock insuficiente. Hay ${inventoryFor(product.productCode).available} unidades disponibles.`);
    renderProducts();
    return;
  }
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
    productCategory: product.category || inferProductCategory(product.name),
    productVariant: product.variant || "",
    productColor: product.color || "",
    printMethodId: printMethod?.id || "sin-impresion",
    printMethod: printMethod?.name || "Sin impresion",
    quoteMeasures: isOrder ? "" : data.quoteMeasures || "",
    quoteBaseColors: isOrder ? "" : data.quoteBaseColors || "",
    quoteHandleColor: isOrder ? "" : data.quoteHandleColor || "",
    quoteHandleSize: isOrder ? "" : data.quoteHandleSize || "",
    quoteShape: isOrder ? "" : data.quoteShape || "",
    baseUnitCost: productBaseCost(product),
    printUnitCost: printMethodCostForProduct(printMethod, product),
    quantity,
    sellerUnitCost,
    saleMarkup,
    saleUnitPrice,
    saleTotal: saleUnitPrice * quantity,
    discountScaleId: discountScale?.id || "",
    discountRate: Number(discountScale?.discountRate || 0),
    commissionRate,
    commissionAmount: (saleUnitPrice - sellerUnitCost) * quantity,
    source: product?.source || "taller",
    stockCode: cleanProductCode(product.productCode),
    inventoryState: isOrder ? "reserved" : "",
    requestedDate: data.requestedDate,
    committedDate: "",
    requestType: isFactory ? "presupuesto" : data.requestType,
    referenceImage,
    referenceFileName: referenceFile?.name || "",
    referenceFileType: referenceFile?.type || "",
    payment50: false,
    status: isOrder ? "pedido_planeamiento" : "presupuesto_planeamiento",
    notes: data.notes,
    comment: "",
    createdAt: Date.now()
  });
  form.reset();
  form.requestType.value = "pedido";
  form.requestedDate.value = iso(7);
  updateLargeSalePanel();
  updateSalePreview(true);
  activeView = currentUser().role === "vendedor" ? "my-orders" : "workflow";
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
    productCode: cleanProductCode(data.productCode),
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

function createDiscountScale(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  const direct = data.discountType === "direct";
  const minQuantity = direct ? 1 : Number(data.minQuantity || 1);
  const maxQuantity = direct ? Number.MAX_SAFE_INTEGER : Number(data.maxQuantity || 0);
  if (!direct && maxQuantity < minQuantity) {
    alert("La cantidad maxima debe ser igual o mayor que la cantidad minima.");
    return;
  }
  if (data.expires < data.starts) {
    alert("La fecha de finalizacion debe ser igual o posterior a la fecha de inicio.");
    return;
  }
  const product = state.products.find((item) => item.id === data.productId);
  const margin = estimatedMarginForDiscount(product, Number(data.discountRate || 0));
  if (margin < 10) alert(`Atencion: esta dinamica deja un margen estimado de ${margin.toLocaleString("es-AR", { maximumFractionDigits: 2 })}%, por debajo del minimo recomendado de 10%. Se publicara igualmente.`);
  state.discountScales.push({
    id: uid(),
    productId: data.productId,
    minQuantity,
    maxQuantity,
    discountType: data.discountType,
    discountRate: Number(data.discountRate || 0),
    starts: data.starts,
    expires: data.expires,
    stockLimit: Number(data.stockLimit || 0),
    active: true,
    createdAt: Date.now()
  });
  event.currentTarget.reset();
  event.currentTarget.minQuantity.value = 1;
  event.currentTarget.starts.value = iso();
  event.currentTarget.expires.value = iso(7);
  event.currentTarget.elements.discountType.dispatchEvent(new Event("change"));
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
  if (data.type === "compra") recalculatePricingForCode(data.productCode);
  form.reset();
  form.date.value = iso(0);
  saveState();
}

function updatePurchaseCostFields() {
  const form = $("#purchaseForm");
  const quantity = Number(form.elements.quantity.value || 0);
  if (quantity <= 0) return;
  if (purchaseCostMode === "unit") {
    const unitCost = Number(form.elements.unitCost.value || 0);
    form.elements.amount.value = unitCost ? Math.round(unitCost * quantity * 100) / 100 : "";
  } else {
    const amount = Number(form.elements.amount.value || 0);
    form.elements.unitCost.value = amount ? Math.round(amount / quantity * 100) / 100 : "";
  }
}

function resetPurchaseForm() {
  const form = $("#purchaseForm");
  form.reset();
  form.elements.purchaseId.value = "";
  form.elements.date.value = iso();
  $("#purchaseFormTitle").textContent = "Nueva compra";
  $("#purchaseSubmitButton").textContent = "Ingresar compra y stock";
  $("#cancelPurchaseEdit").classList.add("is-hidden");
  purchaseCostMode = "total";
}

function openPurchaseEdit(purchaseId) {
  const purchase = state.finance.transactions.find((item) => item.id === purchaseId && item.type === "compra");
  if (!purchase) return;
  const form = $("#purchaseForm");
  const values = {
    purchaseId: purchase.id,
    productCode: purchase.productCode,
    quantity: purchase.quantity,
    productDescription: purchase.productDescription,
    unitCost: Number(purchase.amount || 0) / Math.max(1, Number(purchase.quantity || 0)),
    amount: purchase.amount,
    date: purchase.date,
    reference: purchase.reference,
    description: purchase.description
  };
  Object.entries(values).forEach(([field, value]) => { if (form.elements[field]) form.elements[field].value = value ?? ""; });
  form.elements.invoiceImage.value = "";
  $("#purchaseFormTitle").textContent = "Editar compra";
  $("#purchaseSubmitButton").textContent = "Guardar correccion";
  $("#cancelPurchaseEdit").classList.remove("is-hidden");
  purchaseCostMode = "unit";
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function createPurchase(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  const quantity = Number(data.quantity || 0);
  const amount = Number(data.amount || 0) || Number(data.unitCost || 0) * quantity;
  if (quantity <= 0 || amount <= 0) {
    alert("Completa la cantidad y el costo unitario o el costo total.");
    return;
  }
  const existing = state.finance.transactions.find((item) => item.id === data.purchaseId && item.type === "compra");
  const previousCode = cleanProductCode(existing?.productCode);
  const invoiceFile = form.invoiceImage.files[0];
  const invoiceImage = invoiceFile ? await readImage(invoiceFile) : existing?.invoiceImage || "";
  const purchase = existing || { id: uid(), createdAt: Date.now() };
  Object.assign(purchase, {
    type: "compra",
    amount,
    quantity,
    productCode: cleanProductCode(data.productCode),
    productDescription: data.productDescription,
    category: data.category || existing?.category,
    variant: data.variant || existing?.variant,
    color: data.color || existing?.color,
    source: data.source || existing?.source || "taller",
    date: data.date,
    reference: data.reference,
    description: data.description,
    invoiceImage
  });
  if (!existing) state.finance.transactions.push(purchase);
  ensureProductForPurchase(purchase);
  ensurePricingForCode(data.productCode, data.productDescription);
  if (previousCode && previousCode !== purchase.productCode) recalculatePricingForCode(previousCode);
  recalculatePricingForCode(data.productCode);
  resetPurchaseForm();
  saveState();
}

function createPricing(event) {
  event.preventDefault();
  const pricing = pricingFromForm(event.currentTarget);
  state.finance.pricing.push({
    id: uid(),
    ...pricing,
    costsCustomized: true,
    createdAt: Date.now()
  });
  recalculatePricingForCode(pricing.productCode);
  event.currentTarget.reset();
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
    releaseOrderStock(order);
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
  releaseOrderStock(order);
  order.status = "cancelado";
  order.comment = "Cancelado por el vendedor.";
  saveState();
}

function cancelOrderByDirection(orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) return;
  const afterProduction = ["produccion", "logistica"].includes(order.status) || order.inventoryState === "consumed";
  const confirmed = window.confirm(afterProduction
    ? `Registrar ${order.id} como devolucion? El stock consumido no volvera a estar disponible.`
    : `Cancelar ${order.id} y liberar el stock reservado?`);
  if (!confirmed) return;
  if (afterProduction) {
    order.status = "devolucion";
    order.comment = "Cancelado despues de iniciar produccion. Registrado como devolucion sin reingreso de stock.";
  } else {
    releaseOrderStock(order);
    order.status = "cancelado";
    order.comment = "Cancelado por Direccion. Stock reservado liberado.";
  }
  saveState();
}

function deleteOrder(orderId) {
  if (currentUser().role !== "direccion") return;
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) return;
  if (!window.confirm(`Borrar definitivamente ${order.id} de ${order.client}? Esta accion no se puede deshacer.`)) return;
  state.orders = state.orders.filter((item) => item !== order);
  saveState();
}

function openEditOrder(orderId) {
  if (currentUser().role !== "direccion") return;
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) return;
  const form = $("#editOrderForm");
  form.elements.sellerId.innerHTML = state.users.filter((user) => user.role === "vendedor" && user.active).map((user) => `<option value="${user.id}">${escapeHtml(user.name)}</option>`).join("");
  form.elements.product.innerHTML = state.products.filter((product) => product.active).map((product) => `<option value="${escapeHtml(product.name)}">${escapeHtml(product.name)}</option>`).join("");
  form.elements.printMethodId.innerHTML = state.printMethods.filter((method) => method.active).map((method) => `<option value="${method.id}">${escapeHtml(method.name)}</option>`).join("");
  form.elements.status.innerHTML = statusOptions.filter(([value]) => value).map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
  const values = {
    originalId: order.id, id: order.id, sellerId: order.sellerId, requestType: order.requestType, status: order.status,
    client: order.client, clientPhone: order.clientPhone, clientEmail: order.clientEmail, deliveryAddress: order.deliveryAddress,
    product: order.product, printMethodId: order.printMethodId, quantity: order.quantity, source: order.source,
    baseUnitCost: order.baseUnitCost, printUnitCost: order.printUnitCost, sellerUnitCost: order.sellerUnitCost,
    saleMarkup: order.saleMarkup, saleUnitPrice: order.saleUnitPrice, commissionRate: order.commissionRate,
    requestedDate: order.requestedDate, committedDate: order.committedDate, payment50: String(Boolean(order.payment50)),
    inventoryState: order.inventoryState, quoteMeasures: order.quoteMeasures, quoteBaseColors: order.quoteBaseColors,
    quoteHandleColor: order.quoteHandleColor, quoteHandleSize: order.quoteHandleSize, quoteShape: order.quoteShape,
    notes: order.notes, comment: order.comment
  };
  Object.entries(values).forEach(([field, value]) => { if (form.elements[field]) form.elements[field].value = value ?? ""; });
  form.elements.referenceImage.value = "";
  $("#editOrderDialog").showModal();
}

async function saveEditedOrder(event) {
  event.preventDefault();
  if (currentUser().role !== "direccion") return;
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  const order = state.orders.find((item) => item.id === data.originalId);
  if (!order) return;
  if (data.id !== data.originalId && state.orders.some((item) => item.id === data.id)) {
    alert("Ya existe otro pedido con ese numero.");
    return;
  }
  const seller = state.users.find((user) => user.id === data.sellerId);
  const product = state.products.find((item) => item.name === data.product);
  const method = state.printMethods.find((item) => item.id === data.printMethodId);
  const quantity = Number(data.quantity || 0);
  const unitPrice = Number(data.saleUnitPrice || 0);
  const commissionRate = Number(data.saleMarkup || 0);
  Object.assign(order, {
    id: data.id.trim(), sellerId: data.sellerId, seller: seller?.name || order.seller,
    requestType: data.requestType, status: data.status, client: data.client.trim(), clientPhone: data.clientPhone,
    clientEmail: data.clientEmail, deliveryAddress: data.deliveryAddress, product: data.product,
    productCategory: product?.category || inferProductCategory(data.product), productVariant: product?.variant || "",
    productColor: product?.color || "", stockCode: cleanProductCode(product?.productCode), printMethodId: data.printMethodId,
    printMethod: method?.name || "Sin impresion", quantity, source: data.source,
    baseUnitCost: Number(data.baseUnitCost || 0), printUnitCost: Number(data.printUnitCost || 0),
    sellerUnitCost: Number(data.sellerUnitCost || 0), saleMarkup: Number(data.saleMarkup || 0), saleUnitPrice: unitPrice,
    saleTotal: unitPrice * quantity, commissionRate, commissionAmount: (unitPrice - Number(data.sellerUnitCost || 0)) * quantity,
    requestedDate: data.requestedDate, committedDate: data.committedDate, payment50: data.payment50 === "true",
    inventoryState: data.inventoryState, quoteMeasures: data.quoteMeasures, quoteBaseColors: data.quoteBaseColors,
    quoteHandleColor: data.quoteHandleColor, quoteHandleSize: data.quoteHandleSize, quoteShape: data.quoteShape,
    notes: data.notes, comment: data.comment
  });
  const referenceFile = form.elements.referenceImage.files[0];
  if (referenceFile) {
    order.referenceImage = await readImage(referenceFile);
    order.referenceFileName = referenceFile.name;
    order.referenceFileType = referenceFile.type;
  }
  upsertClient(order.client, order.clientPhone, order.clientEmail);
  $("#editOrderDialog").close();
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
  const product = state.products.find((item) => item.name === order.product);
  if (!product || (product.source !== "fabrica" && inventoryFor(product.productCode).available < Number(order.quantity || 0))) {
    alert("No hay stock suficiente para convertir este presupuesto en pedido.");
    return;
  }
  order.requestType = "pedido";
  order.stockCode = cleanProductCode(product.productCode);
  order.inventoryState = product.source === "fabrica" ? "external" : "reserved";
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
  const variant = state.quoteConfig.products.flatMap((product) => product.variants).find((item) => item.id === quote.variantId);
  const stockCode = cleanProductCode(variant?.sku);
  const quantity = Number(quote.calculation.quantity || 0);
  if (!stockCode || inventoryFor(stockCode).available < quantity) {
    alert(`No hay stock suficiente para ${stockCode || "la variante cotizada"}. Carga la compra antes de convertirla en venta.`);
    return;
  }
  const orderId = nextOrderId();
  state.orders.push({
    id: orderId, sellerId: quote.sellerId, seller: quote.seller, client: quote.client,
    clientPhone: "", clientEmail: "", deliveryAddress: "", product: `${quote.productName} ${quote.variantName}`,
    quantity, source: "taller", stockCode, inventoryState: "reserved", requestedDate: iso(7), committedDate: "",
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
  Object.keys(state.quoteConfig.policy).forEach((key) => { if (event.currentTarget.elements[key]) state.quoteConfig.policy[key] = Number(data[key] || 0); });
  const totalRate = state.quoteConfig.policy.taxRate + signumMarginRate() + state.quoteConfig.policy.targetMarginRate;
  if (totalRate >= 100 || state.quoteConfig.policy.wasteRate >= 100) {
    window.alert("Los porcentajes combinados deben ser menores a 100%.");
    return;
  }
  saveState();
}

setup();
