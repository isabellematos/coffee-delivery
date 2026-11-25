// Leitura/escrita segura no localStorage: JSON quebrado ou storage indisponível não derrubam o app.
export function readJSON(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? undefined : JSON.parse(raw);
  } catch {
    return undefined;
  }
}

export function writeJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage cheio ou bloqueado: ignora
  }
}
