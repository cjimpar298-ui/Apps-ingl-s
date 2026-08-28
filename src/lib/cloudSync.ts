import { VisualAgendaV4Data } from '../types';

export type SyncStatus = 'synced' | 'saving' | 'offline' | 'remote-update';

export interface CloudResponse {
  success: boolean;
  data?: VisualAgendaV4Data | null;
  updatedAt?: number;
  error?: string;
}

export async function fetchCloudAgenda(): Promise<{ data: VisualAgendaV4Data | null; updatedAt: number }> {
  try {
    const res = await fetch('/api/cloud-data', {
      headers: { 'Cache-Control': 'no-cache' }
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json: CloudResponse = await res.json();
    return {
      data: json.data || null,
      updatedAt: json.updatedAt || 0
    };
  } catch (error) {
    console.warn('Cloud sync fetch warning (running in offline mode):', error);
    return { data: null, updatedAt: 0 };
  }
}

export async function saveCloudAgenda(data: VisualAgendaV4Data): Promise<number> {
  try {
    const res = await fetch('/api/cloud-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return json.updatedAt || Date.now();
  } catch (error) {
    console.warn('Cloud sync save warning (saved locally):', error);
    return Date.now();
  }
}
