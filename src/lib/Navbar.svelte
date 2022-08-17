<script>
  import { base } from "$app/paths";
</script>

<nav class="top-0 z-50">
  <div
    class="text-gray-900 mx-auto relative flex justify-between align-middle w-full bg-sky-500 min-h-50 px-4 py-2"
  >
    <a href="{base}/" class="flex justify-start w-fit"
      ><h1 class="text-2xl font-bold">Coding Challenge</h1></a
    >
    <ul class="flex float-right items-center space-x-2">
      <a href="{base}/scoreboard"
        ><li class="ml-2 text-base hover:font-semibold transition-all">Scoreboard</li></a
      >
      <a href="{base}/run"
        ><li class="ml-2 text-base hover:font-semibold transition-all">Run JavaScript D8</li></a
      >
      <a href="{base}/hash"
        ><li class="ml-2 text-base hover:font-semibold transition-all">SHA256 Hash</li></a
      >
    </ul>
  </div>
</nav>
