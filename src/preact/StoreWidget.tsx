import { JSX } from "https://esm.sh/preact@10.11.0";

export interface StoreWidget_Props {
  app_id: number;
}

export function StoreWidget(props: JSX.HTMLAttributes<HTMLIFrameElement> & StoreWidget_Props) {
  return <iframe {...props} src={`https://store.steampowered.com/widget/${props.app_id}`} />
}
