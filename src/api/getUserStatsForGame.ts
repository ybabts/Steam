import { apiKey, endpoint } from "../mod.ts";
import { StatusCodes } from "https://deno.land/x/https_status_codes@v1.2.0/mod.ts"
import { normalizeSteamID } from "../SteamIdentifier.ts";

export async function getUserStatsForGame(steamid: (string | number), appid: number) {
  const url = new URL(endpoint + 'ISteamUserStats/GetUserStatsForGame/v0002');
  url.searchParams.set('steamid', normalizeSteamID(steamid).id64);
  url.searchParams.set('appid', appid.toString());
  if(apiKey === null) throw new Error('cannot make api call: unauthorized');
  url.searchParams.set('key', apiKey);
  const req = await fetch(url);
  if(req.status !== StatusCodes.OK) throw new Error(await req.text());
  const res: { playerstats: getUserStatsForGame_Result } = await req.json().catch(e => { throw e; });
  return res.playerstats;
}

export interface getUserStatsForGame_Result {
  steamID: string,
  gameName: string,
  stats: getUserStatsForGame_Stat[],
  achievements: getUserStatsForGame_Achievement[]
}

export interface getUserStatsForGame_Stat {
  name: string,
  value: number
}

export interface getUserStatsForGame_Achievement {
  name: string;
  achieved: number;
}