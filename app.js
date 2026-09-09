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
  orders: [
    {
      id: "S-1042",
      sellerId: "mica",
      seller: "Mica Alvarez",
      client: "Norte Labs",
      clientPhone: "+54 11 4555-2010",
      clientEmail: "compras@nortelabs.com",
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
  capacity: "Agenda de produccion",
  metrics: "Indicadores",
  crm: "CRM de clientes",
  users: "Accesos"
};

const tabs = {
  workflow: "Gestion",
  planning: "Planeamiento",
  capacity: "Agenda",
  metrics: "Indicadores",
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
  ["rechazado", "Rechazado"]
];

const channel = "BroadcastChannel" in window ? new BroadcastChannel("signum-merch") : null;
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function loadState() {
  const stored = localStorage.getItem(storeKey);
  if (!stored) return structuredClone(seedState);
  try {
    const parsed = JSON.parse(stored);
    parsed.users ||= [];
    defaultUsers.forEach((defaultUser) => {
      if (!parsed.users.some((user) => user.id === defaultUser.id || user.username === defaultUser.username)) {
        parsed.users.push(structuredClone(defaultUser));
      }
    });
    parsed.clients ||= [];
    parsed.orders = parsed.orders.map((order) => ({
      clientPhone: "",
      clientEmail: "",
      referenceImage: "",
      ...order
    }));
    return parsed;
  } catch {
    return structuredClone(seedState);
  }
}

function saveState() {
  localStorage.setItem(storeKey, JSON.stringify(state));
  channel?.postMessage({ type: "state-change" });
  render();
}

function currentUser() {
  return state.users.find((user) => user.id === activeUserId) || state.users[0];
}

function money(value) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(value);
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

function setup() {
  renderLoginUsers();
  [$("#statusFilter"), $("#workflowFilter")].forEach((select) => {
    select.innerHTML = statusOptions.map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
  });

  $("#loginForm").addEventListener("submit", login);
  $("#logoutButton").addEventListener("click", logout);
  $("#logoutTopButton").addEventListener("click", logout);

  $("#userSelect").addEventListener("change", (event) => {
    event.target.value = activeUserId;
  });

  $("#sellerViewSelect").addEventListener("change", (event) => {
    activeView = event.target.value;
    render();
  });

  $("#seedButton").addEventListener("click", () => {
    state = structuredClone(seedState);
    renderLoginUsers();
    saveState();
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
  render();
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
  if (user.role === "vendedor" && !["new-order", "my-orders", "planning", "capacity", "metrics"].includes(activeView)) activeView = "new-order";
  if (user.role !== "vendedor" && ["new-order", "my-orders"].includes(activeView)) activeView = "workflow";
  if (user.role !== "direccion" && ["crm", "users"].includes(activeView)) activeView = "workflow";

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
      ? ["workflow", "planning", "capacity", "metrics", "crm", "users", "new-order"]
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
  $("#workflowTitle").textContent = user.role === "taller" ? "Pedidos para taller" : user.role === "fabrica" ? "Pedidos para fabrica" : user.role === "logistica" ? "Logistica" : "Gestion de pedidos";
  $("#workflowCopy").textContent =
    user.role === "planeamiento"
      ? "Planeamiento aprueba, deriva, confirma sena y responde fechas de fabrica."
      : user.role === "taller"
        ? "Taller asigna fecha solo cuando el pago del 50% ya esta confirmado."
        : user.role === "fabrica"
          ? "Fabrica ve pedidos con sena confirmada y avanza produccion."
          : user.role === "logistica"
            ? "Logistica recibe pedidos terminados y marca la entrega al cliente."
            : "Vista operativa con permisos de seguimiento y modificacion.";
  const filtered = filteredOrders(visibleOrders(), "#workflowSearch", "#workflowFilter");
  $("#workflowList").innerHTML = orderListTemplate(filtered, "workflow");
  attachOrderActions();
}

function orderListTemplate(orders, mode) {
  return orders.length
    ? orders.sort((a, b) => b.createdAt - a.createdAt).map((order) => orderTemplate(order, mode)).join("")
    : `<div class="empty-state panel">No hay pedidos para esta vista.</div>`;
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
      ${order.referenceImage ? `<img class="reference-thumb" src="${order.referenceImage}" alt="Logo o referencia de ${order.client}" />` : ""}
      ${order.notes ? `<p class="meta">${order.notes}</p>` : ""}
      ${order.comment ? `<p class="meta"><strong>Comentario:</strong> ${order.comment}</p>` : ""}
      ${user.role === "vendedor" && order.status === "presupuesto_respondido" ? `<button class="primary-button" type="button" data-convert="${order.id}">Convertir en pedido</button>` : ""}
      ${actions ? `<div class="card-actions">${actions}</div>` : ""}
    </article>
  `;
}

function badgeClass(status) {
  if (status === "rechazado") return "rechazado";
  if (["fecha_confirmada", "produccion", "logistica", "entregado", "presupuesto_respondido"].includes(status)) return "aprobado";
  if (status === "esperando_senia") return "payment";
  return "enviado";
}

function actionButtons(order, mode) {
  const role = currentUser().role;
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
    return `<button class="small-button" type="button" data-deliver="${order.id}">Marcar entregado</button>`;
  }
  return "";
}

function attachOrderActions() {
  $$("[data-planning]").forEach((button) => button.addEventListener("click", () => openPlanningDecision(button.dataset.planning)));
  $$("[data-pay]").forEach((button) => button.addEventListener("click", () => confirmPayment(button.dataset.pay)));
  $$("[data-date]").forEach((button) => button.addEventListener("click", () => openDate(button.dataset.date)));
  $$("[data-convert]").forEach((button) => button.addEventListener("click", () => convertQuote(button.dataset.convert)));
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
                        <span class="meta">${order.quantity} u · ${order.source}</span>
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

async function createOrder(event) {
  event.preventDefault();
  const user = currentUser();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  const product = state.products.find((item) => item.name === data.product);
  const referenceImage = await readImage(form.referenceImage.files[0]);
  upsertClient(data.client, data.clientPhone, data.clientEmail);
  state.orders.push({
    id: nextOrderId(),
    sellerId: user.id,
    seller: user.name,
    client: data.client,
    clientPhone: data.clientPhone,
    clientEmail: data.clientEmail,
    product: data.product,
    quantity: Number(data.quantity),
    source: product?.source || "taller",
    requestedDate: data.requestedDate,
    committedDate: "",
    requestType: data.requestType,
    referenceImage,
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

function openDate(orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  $("#dateTitle").textContent = order.source === "fabrica" ? `Fecha de fabrica ${order.id}` : `Fecha de taller ${order.id}`;
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
  order.comment = data.comment || "Fecha de entrega confirmada.";
  order.status = "fecha_confirmada";
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

setup();
