import { apiKey, endpoint } from "../mod.ts";
import { StatusCodes } from "https://deno.land/x/https_status_codes@v1.2.0/mod.ts"
import { normalizeSteamID } from "../SteamIdentifier.ts";

export async function getPlayerAchievements(steamid: (string | number), appid: number) {
  const url = new URL(endpoint + 'ISteamUserStats/GetPlayerAchievements/v0001');
  url.searchParams.set('steamid', normalizeSteamID(steamid).id64);
  url.searchParams.set('appid', appid.toString());
  if(apiKey === null) throw new Error('cannot make api call: unauthorized');
  url.searchParams.set('key', apiKey);
  const req = await fetch(url);
  if(req.status !== StatusCodes.OK) throw new Error(await req.text());
  const res: { playerstats: getPlayerAchievements_Result } = await req.json().catch(e => { throw e; });
  return res.playerstats;
}

export interface getPlayerAchievements_Result {
  steamID: string,
  gameName: string,
  achievements: getPlayerAchievements_Achievement[],
  success: boolean
}

export interface getPlayerAchievements_Achievement {
  /** @description The API name of the achievement */
  apiname: string;
  /** @description Whether or not the achievement has been completed. */
  achieved: number;
  /** @description Date when the achievement was unlocked. */
  unlocktime: number;
  /** @description Localized achievement name */
  name?: string;
  /** @description Localized description of the achievement */
  description?: string;
}