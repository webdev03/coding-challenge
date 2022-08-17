<script lang="ts">
  let code: string = "";
  let files: FileList | undefined;
  let output: string = "Type something!";
  let encoder = new TextEncoder();
  async function sha256() {
    const hash = await crypto.subtle.digest("SHA-256", encoder.encode(code.replace("\r\n", "\n")));
    output = Array.from(new Uint8Array(hash))
      .map((d) => d.toString(16).padStart(2, "0"))
      .join("");
  }
  $: if(files) {
    (async() => {
      code = (await files[0].text()).replace("\r\n", "\n");
      files = undefined;
      sha256();
    })();
  }
</script>

<h1 class="text-3xl font-bold">SHA256 Hash</h1>
<textarea
  class="font-mono min-h-8 w-full p-2 border border-black"
  placeholder="Paste your code..."
  bind:value={code}
  on:input={sha256}
/>
<p>or</p>
<input type="file" bind:files={files}>
<p class="font-bold">Make sure that when you submit your code, it is EXACTLY THE SAME as what you put in the above box! Even an extra space or newline could cause problems. You can use the file selector to ensure that your code is exactly the same. </p>
<p class="font-bold">Output</p>
<div class="font-mono min-h-8 w-full p-2 border border-black">{output}</div>
