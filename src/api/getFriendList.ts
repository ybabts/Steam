import { apiKey, endpoint } from "../mod.ts";
import { StatusCodes } from "https://deno.land/x/https_status_codes@v1.2.0/mod.ts"
import { normalizeSteamID } from "../SteamIdentifier.ts";

export type getFriendList_Relationship = 'all' | 'friend'

export async function getFriendList(steamid: (string | number), relationship: getFriendList_Relationship = 'friend') {
  const url = new URL(endpoint + 'ISteamUser/GetFriendList/v1');
  url.searchParams.set('steamid', normalizeSteamID(steamid).id64);
  url.searchParams.set('relationship', relationship);
  if(apiKey === null) throw new Error('cannot make api call: unauthorized');
  url.searchParams.set('key', apiKey);
  const req = await fetch(url);
  if(req.status !== StatusCodes.OK) throw new Error(await req.text());
  const res: { friendslist: { friends: getFriendList_Result[] }} = await req.json().catch(e => { throw e; });
  return res.friendslist.friends;
}

export interface getFriendList_Result {
  /** @description 64 bit Steam ID of the friend. */
  steamid: string;
  /** @description Relationship qualifier */
  relationship: getFriendList_Relationship
  /** @description Unix timestamp of the time when the relationship was created. */
  friend_since: number;
}