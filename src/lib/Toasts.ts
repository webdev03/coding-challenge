import { writable, get } from "svelte/store";
import type { Writable } from "svelte/store";
interface Toast {
  id: string;
  type: "info" | "warning" | "alert";
  title: string;
  body: string;
}
const toastStore: Writable<Toast[]> = writable([]);
const finished: Writable<number> = writable(0);
export const toasts: Writable<Toast[]> = toastStore;
export const bakeToast = (options: {
  type: "info" | "warning" | "alert";
  title: string;
  body: string;
}) => {
  let ot = get(toastStore);
  ot.push({
    id: String(get(finished)),
    type: options.type,
    title: options.title,
    body: options.body
  });
  toasts.set(ot);
  finished.set(get(finished) + 1);
};
export type { Toast };
