export * from './SteamIdentifier.ts';
export * from './types.ts';
export * from './api/mod.ts';

export let apiKey: string | null = null;

export function setAPIKey(key: string): void {
  apiKey = key;
}

export let endpoint = 'https://api.steampowered.com/';

export function setEndpoint(url: string): void {
  endpoint = url;
}

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';
