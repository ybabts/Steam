import { apiKey, endpoint } from "../mod.ts";
import { StatusCodes } from "https://deno.land/x/https_status_codes@v1.2.0/mod.ts"

export async function getAppList() {
  const url = new URL(endpoint + 'ISteamApps/GetAppList/v2');
  if(apiKey === null) throw new Error('cannot make api call: unauthorized');
  url.searchParams.set('key', apiKey);
  const req = await fetch(url);
  if(req.status !== StatusCodes.OK) throw new Error(await req.text());
  const res: { applist: { apps: getAppList_App[] } } = await req.json().catch(e => { throw e; });
  return res.applist.apps;
}

export interface getAppList_App {
  appid: number;
  name: string;
}