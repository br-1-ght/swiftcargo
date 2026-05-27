export type ShipmentStatus =
  | "Processing"
  | "In Transit"
  | "Customs Clearance"
  | "Arrived at Facility"
  | "Out for Delivery"
  | "Delivered";

export const STATUS_FLOW: ShipmentStatus[] = [
  "Processing",
  "In Transit",
  "Customs Clearance",
  "Arrived at Facility",
  "Out for Delivery",
  "Delivered",
];

export interface Shipment {
  trackingId: string;
  customerName: string;
  email: string;
  phone: string;
  origin: string;
  destination: string;
  weightKg: number;
  type: string;
  status: ShipmentStatus;
  createdAt: string;
  estimatedDelivery: string;
  history: { status: ShipmentStatus; at: string; location: string }[];
}

const KEY = "swiftcargo.shipments.v1";

const SEED: Shipment[] = [
  {
    trackingId: "SC-784512903",
    customerName: "Alex Morgan",
    email: "alex@example.com",
    phone: "+1 415 555 0142",
    origin: "Shanghai, CN",
    destination: "Hamburg, DE",
    weightKg: 18.4,
    type: "Sea Freight",
    status: "In Transit",
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    estimatedDelivery: new Date(Date.now() + 6 * 86400000).toISOString(),
    history: [
      { status: "Processing", at: new Date(Date.now() - 4 * 86400000).toISOString(), location: "Shanghai Hub" },
      { status: "In Transit", at: new Date(Date.now() - 2 * 86400000).toISOString(), location: "Pacific Ocean" },
    ],
  },
  {
    trackingId: "SC-220088471",
    customerName: "Sofia Lee",
    email: "sofia@example.com",
    phone: "+44 20 7946 0123",
    origin: "London, UK",
    destination: "New York, US",
    weightKg: 2.1,
    type: "Express Air",
    status: "Out for Delivery",
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    estimatedDelivery: new Date().toISOString(),
    history: [
      { status: "Processing", at: new Date(Date.now() - 3 * 86400000).toISOString(), location: "London Heathrow" },
      { status: "In Transit", at: new Date(Date.now() - 2 * 86400000).toISOString(), location: "Transatlantic" },
      { status: "Customs Clearance", at: new Date(Date.now() - 1 * 86400000).toISOString(), location: "JFK Customs" },
      { status: "Arrived at Facility", at: new Date(Date.now() - 12 * 3600000).toISOString(), location: "NY Hub" },
      { status: "Out for Delivery", at: new Date(Date.now() - 2 * 3600000).toISOString(), location: "Manhattan" },
    ],
  },
];

function ensureSeed(): Shipment[] {
  if (typeof window === "undefined") return SEED;
  const raw = localStorage.getItem(KEY);
  if (raw) {
    try { return JSON.parse(raw) as Shipment[]; } catch { /* fallthrough */ }
  }
  localStorage.setItem(KEY, JSON.stringify(SEED));
  return SEED;
}

export function listShipments(): Shipment[] {
  return ensureSeed();
}

export function getShipment(trackingId: string): Shipment | undefined {
  return listShipments().find(
    (s) => s.trackingId.toLowerCase() === trackingId.trim().toLowerCase(),
  );
}

export function saveShipments(items: Shipment[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function generateTrackingId() {
  const n = Math.floor(100000000 + Math.random() * 899999999);
  return `SC-${n}`;
}

export function createShipment(data: Omit<Shipment, "trackingId" | "status" | "createdAt" | "estimatedDelivery" | "history"> & { trackingId?: string }): Shipment {
  const items = listShipments();
  const trackingId = data.trackingId ?? generateTrackingId();
  const now = new Date().toISOString();
  const shipment: Shipment = {
    trackingId,
    customerName: data.customerName,
    email: data.email,
    phone: data.phone,
    origin: data.origin,
    destination: data.destination,
    weightKg: data.weightKg,
    type: data.type,
    status: "Processing",
    createdAt: now,
    estimatedDelivery: new Date(Date.now() + 5 * 86400000).toISOString(),
    history: [{ status: "Processing", at: now, location: data.origin }],
  };
  saveShipments([shipment, ...items]);
  return shipment;
}

export function advanceStatus(
  trackingId: string,
  status: ShipmentStatus,
  opts?: { location?: string; origin?: string; destination?: string },
): Shipment | undefined {
  const items = listShipments();
  const idx = items.findIndex((s) => s.trackingId === trackingId);
  if (idx === -1) return undefined;
  const item = { ...items[idx] };
  if (opts?.origin) item.origin = opts.origin;
  if (opts?.destination) item.destination = opts.destination;
  item.status = status;
  const location = opts?.location?.trim() || item.destination;
  item.history = [...item.history, { status, at: new Date().toISOString(), location }];
  items[idx] = item;
  saveShipments(items);
  return item;
}

export function progressPercent(status: ShipmentStatus) {
  const i = STATUS_FLOW.indexOf(status);
  return Math.round(((i + 1) / STATUS_FLOW.length) * 100);
}
