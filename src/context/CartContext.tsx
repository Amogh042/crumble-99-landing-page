import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { cookies, Cookie } from "@/data/cookies";

export interface CartItem {
  id: string;
  qty: number;
}

export interface Order {
  id: string;
  createdAt: number;
  items: { id: string; qty: number; price: number; name: string; image: string }[];
  subtotal: number;
  delivery: number;
  tax: number;
  total: number;
  customer: { name: string; email: string; phone: string; address: string };
  status: "Processing" | "Baking" | "Out for Delivery" | "Delivered";
  estimatedAt: number;
}

interface Ctx {
  items: CartItem[];
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  delivery: number;
  tax: number;
  total: number;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  orders: Order[];
  placeOrder: (customer: Order["customer"], promo?: string) => Order;
}

const CartCtx = createContext<Ctx | null>(null);

const lookup = (id: string) => cookies.find((c) => c.id === id)!;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem("crumble.cart") || "[]"); } catch { return []; }
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    try { return JSON.parse(localStorage.getItem("crumble.orders") || "[]"); } catch { return []; }
  });
  const [drawerOpen, setDrawer] = useState(false);

  useEffect(() => { localStorage.setItem("crumble.cart", JSON.stringify(items)); }, [items]);
  useEffect(() => { localStorage.setItem("crumble.orders", JSON.stringify(orders)); }, [orders]);

  // Animate statuses forward over time
  useEffect(() => {
    const t = setInterval(() => {
      setOrders((prev) => prev.map((o) => {
        const age = Date.now() - o.createdAt;
        let status: Order["status"] = "Processing";
        if (age > 1000 * 60 * 60 * 24) status = "Delivered";
        else if (age > 1000 * 60 * 30) status = "Out for Delivery";
        else if (age > 1000 * 60 * 5) status = "Baking";
        return o.status === status ? o : { ...o, status };
      }));
    }, 15000);
    return () => clearInterval(t);
  }, []);

  const add = useCallback((id: string, qty = 1) => {
    setItems((prev) => {
      const ex = prev.find((i) => i.id === id);
      if (ex) return prev.map((i) => i.id === id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { id, qty }];
    });
    setDrawer(true);
  }, []);

  const remove = useCallback((id: string) => setItems((p) => p.filter((i) => i.id !== id)), []);
  const setQty = useCallback((id: string, qty: number) => {
    setItems((p) => qty <= 0 ? p.filter((i) => i.id !== id) : p.map((i) => i.id === id ? { ...i, qty } : i));
  }, []);
  const clear = useCallback(() => setItems([]), []);

  const subtotal = items.reduce((s, i) => s + lookup(i.id).price * i.qty, 0);
  const delivery = subtotal === 0 ? 0 : subtotal > 1500 ? 0 : 79;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + tax;
  const count = items.reduce((s, i) => s + i.qty, 0);

  const placeOrder = (customer: Order["customer"]): Order => {
    const order: Order = {
      id: "CR" + Date.now().toString(36).toUpperCase(),
      createdAt: Date.now(),
      items: items.map((i) => {
        const c = lookup(i.id);
        return { id: i.id, qty: i.qty, price: c.price, name: c.name, image: c.image };
      }),
      subtotal, delivery, tax, total,
      customer,
      status: "Processing",
      estimatedAt: Date.now() + 1000 * 60 * 60 * 2,
    };
    setOrders((p) => [order, ...p]);
    setItems([]);
    return order;
  };

  return (
    <CartCtx.Provider value={{
      items, add, remove, setQty, clear, count,
      subtotal, delivery, tax, total,
      drawerOpen, openDrawer: () => setDrawer(true), closeDrawer: () => setDrawer(false),
      orders, placeOrder,
    }}>
      {children}
    </CartCtx.Provider>
  );
};

export const useCart = () => {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart outside provider");
  return c;
};

export const findCookie = (id: string): Cookie | undefined => cookies.find((c) => c.id === id);
