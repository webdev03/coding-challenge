<script lang="ts">
  import Loading from "$lib/Loading.svelte";
  import { bakeToast } from "$lib/Toasts";
  import { onMount, tick, onDestroy } from "svelte";
  let loading = true;
  let runBtn: HTMLButtonElement;
  let javascriptCm: HTMLScriptElement, cmJS: HTMLScriptElement, cmCSS: HTMLLinkElement;
  onMount(() => {
    async function main() {
      // CodeMirror ready to run!
      // @ts-expect-error
      let cm: any = CodeMirror;
      loading = false;
      // wait for update
      await tick();
      const codeEditor = cm.fromTextArea(document.getElementById("codeEditor"), {
        lineNumbers: true,
        mode: "javascript"
      });
      const inputEditor = cm.fromTextArea(document.getElementById("inputEditor"), {
        lineNumbers: true,
        mode: "null"
      });
      const stdoutEditor = cm.fromTextArea(document.getElementById("stdoutEditor"), {
        lineNumbers: true,
        readOnly: true,
        mode: "null"
      });
      const stderrEditor = cm.fromTextArea(document.getElementById("stderrEditor"), {
        lineNumbers: true,
        readOnly: true,
        mode: "null"
      });
      runBtn.addEventListener("click", async () => {
        bakeToast({ type: "info", title: "Running", body: "Sending your code to be run..." });
        try {
          const fetchReq = await fetch("https://coderuntest.god286.repl.co/run", {
            method: "POST",
            body: JSON.stringify({
              input: inputEditor.getValue(),
              source: codeEditor.getValue(),
              lang: "js-v8"
            })
          });
          if (!fetchReq.ok) {
            bakeToast({
              type: "alert",
              title: "Uh oh!",
              body: "Seems like an error has occurred."
            });
            return;
          }
          const fetchJSON = await fetchReq.json();
          stdoutEditor.getDoc().setValue(fetchJSON.stdout);
          stderrEditor.getDoc().setValue(fetchJSON.stderr);
          bakeToast({ type: "info", title: "Success!", body: "Your code has been run." });
        } catch {
          bakeToast({ type: "alert", title: "Uh oh!", body: "Seems like an error has occurred." });
          return;
        }
      });
    }
    // If running from page navigation
    let loaded = 0;
    [javascriptCm, cmJS].forEach((e) =>
      e.addEventListener("load", () => {
        loaded++;
        if (loaded == 2) main();
      })
    );
    // setTimeout for extra safety (also 100ms isn't that much)
    setTimeout(() => {
      // @ts-expect-error
      if (CodeMirror) main();
    }, 100);
  });
  /* onDestroy(() => {
    try {
      // @ts-ignore
      document.querySelectorAll(".CodeMirror").forEach((i) => {
        i.remove();
      })
      // @ts-expect-error
      [codeEditor, inputEditor, stdoutEditor, stderrEditor].forEach(i => {
          i.toTextArea();
        });
      
    } catch(e){console.error(e)}
      }) */
</script>

<svelte:head>
  <link
    bind:this={cmCSS}
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.min.css"
    integrity="sha512-uf06llspW44/LZpHzHT6qBOIVODjWtv4MxCricRxkzvopAlSWnTf6hpZTFxuuZcuNE9CBQhqE0Seu1CoRk84nQ=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
  <script
    bind:this={cmJS}
    src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.min.js"
    integrity="sha512-8RnEqURPUc5aqFEN04aQEiPlSAdE0jlFS/9iGgUyNtwFnSKCXhmB6ZTNl7LnDtDWKabJIASzXrzD0K+LYexU9g=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"></script>
  <script
    bind:this={javascriptCm}
    src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/mode/javascript/javascript.min.js"
    integrity="sha512-I6CdJdruzGtvDyvdO4YsiAq+pkWf2efgd1ZUSK2FnM/u2VuRASPC7GowWQrWyjxCZn6CT89s3ddGI+be0Ak9Fg=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"></script>
</svelte:head>
<h2 class="font-bold text-xl">IMPORTANT NOTE: Your SHA1 hashed IP is stored on the server in memory temporarily if you run code here. If you flood more than 9 requests per minute continuously, your SHA1 hashed IP address may be added to a configuration file permanently. If you have any enquiries, please contact either @god286 on Scratch or @webdev03 on GitHub. By running code using the code running tool on this page, you agree that your SHA1 hashed IP may be stored temporarily.</h2>
{#if loading}
  <Loading />
{:else}
  <h3 class="text-xl font-semibold mb-2">Code</h3>
  <textarea id="codeEditor" />
  <h3 class="text-xl font-semibold mt-2 mb-2">Input</h3>
  <textarea id="inputEditor" />
  <button
    bind:this={runBtn}
    class="mt-4 mb-4 bg-sky-500 w-full hover:bg-sky-600 transition p-3 text-white rounded pl-6 pr-6"
    >Run</button
  >
  <h3 class="text-xl font-semibold mb-2">STDOUT</h3>
  <textarea id="stdoutEditor" />
  <h3 class="text-xl font-semibold mt-2 mb-2">STDERR</h3>
  <textarea id="stderrEditor" />
{/if}
