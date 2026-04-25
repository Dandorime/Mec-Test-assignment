type EventListener = (event: unknown) => void;

class WsService {
  private ws: WebSocket | null = null;
  private listeners = new Set<EventListener>();
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private url: string | null = null;
  private shouldReconnect = false;
  private connectionCount = 0;
  private reconnectAttempts = 0;
  private readonly MAX_RECONNECT_DELAY = 30_000;

  connect(url: string) {
    this.connectionCount++;
    this.reconnectAttempts = 0;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.url = url;
    this.shouldReconnect = true;
    if (this.connectionCount === 1) {
      this._open();
    }
  }

  private _open() {
    if (!this.url) return;
    if (
      this.ws &&
      (this.ws.readyState === WebSocket.OPEN ||
        this.ws.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    if (this.ws) {
      this.ws.onmessage = null;
      this.ws.onclose = null;
      this.ws.onerror = null;
    }

    try {
      this.ws = new WebSocket(this.url);
    } catch {
      this._scheduleReconnect();
      return;
    }

    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (e) => {
      try {
        const event = JSON.parse(e.data as string) as unknown;
        this.listeners.forEach((l) => l(event));
      } catch {
        // ignore malformed messages
      }
    };

    this.ws.onclose = () => {
      if (this.shouldReconnect) {
        this._scheduleReconnect();
      }
    };

    this.ws.onerror = () => {
      this.ws?.close();
    };
  }

  private _scheduleReconnect() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    const delay = Math.min(1_000 * 2 ** this.reconnectAttempts, this.MAX_RECONNECT_DELAY);
    this.reconnectAttempts++;
    this.reconnectTimer = setTimeout(() => this._open(), delay);
  }

  subscribe(listener: EventListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  disconnect() {
    this.connectionCount = Math.max(0, this.connectionCount - 1);
    if (this.connectionCount > 0) return;

    this.shouldReconnect = false;
    this.reconnectAttempts = 0;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.ws) {
      this.ws.onmessage = null;
      this.ws.onclose = null;
      this.ws.onerror = null;
      this.ws.close();
      this.ws = null;
    }
  }
}

export const wsService = new WsService();

export function buildWsUrl(): string {
  const apiBase = process.env.EXPO_PUBLIC_API_BASE_URL ?? "";
  const token = process.env.EXPO_PUBLIC_API_TOKEN ?? "";
  const wsBase = apiBase.replace(/^https:\/\//, "wss://").replace(/^http:\/\//, "ws://");
  return `${wsBase}/ws?token=${token}`;
}
