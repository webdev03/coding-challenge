<script lang="ts">
  import { toasts } from "./Toasts";
  import { fly } from "svelte/transition";
  let knownIDs: string[] = [];
  toasts.subscribe((t) => {
    t.forEach((el) => {
      if (!knownIDs.includes(el.id)) {
        knownIDs.push(el.id);
        setTimeout(() => {
          $toasts.forEach((el2, i) => {
            if (el2.id == el.id) {
              let current = $toasts;
              current.splice(i, 1);
              toasts.set(current);
            }
          });
        }, 5000);
      }
    });
  });
</script>

<div class="flex space-y-4 flex-col top-0 right-0 m-6 h-full fixed z-[500]">
  {#each $toasts as toast}
    <div
      transition:fly={{ x: 200, duration: 500 }}
      class="{toast.type == 'info'
        ? 'bg-sky-500'
        : toast.type == 'warning'
        ? 'bg-yellow-500'
        : 'bg-red-400'} p-3 rounded w-52 h-fit border border-gray-800 border-solid"
    >
      <p class="font-bold">{toast.title}</p>
      <p>{toast.body}</p>
    </div>
  {/each}
</div>
