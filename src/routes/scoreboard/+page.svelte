<script lang="ts">
  import { onMount } from "svelte";
  import { base } from "$app/paths";
  import Loading from "$lib/Loading.svelte";
  let csvData: string[][];
  let loading = true;
  onMount(async () => {
    const dataFetch = await fetch(`${base}/scores.csv`);
    const res = await dataFetch.text();
    csvData = res
      .split("\n")
      .map((d) => d.split(","))
      .filter((e) => !(e.length <= 1 && e[0].length < 2));
    loading = false;
    console.log(csvData);
  });
</script>

{#if loading}
  <Loading />
{:else}
  <div class="rounded bg-slate-400 p-2">
    <table class="w-full table-fixed border-spacing-20">
      <thead class="p-6">
        <tr>
          {#each csvData[0] as cell}
            {#if cell.trim().length > 0}
              <th>{cell}</th>
            {/if}
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each csvData as row, i}
          {#if i != 0}
            <tr class="pl-6">
              {#each row as cell}
                {#if cell.trim().length > 0}
                  <td>{cell}</td>
                {/if}
              {/each}
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  </div>
{/if}
