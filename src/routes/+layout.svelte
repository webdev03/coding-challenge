<script>
  import "$lib/tailwind.css";
  import Navbar from "$lib/Navbar.svelte";
  import Toastbox from "$lib/Toastbox.svelte";
</script>

<Navbar />
<Toastbox />
<div class="p-2">
  <slot />
</div>
