<script>
  import { Instruction } from "$lib/components/index";
  import "../app.postcss";
</script>

<main class="flex items-center min-h-screen justify-center">
  <div
    class="container max-w-6xl mx-2 px-2 py-4 md:mx-4 md:p-12 md:my-12 rounded-lg lg:p-12 bg-zinc-100"
  >
    <h1>PFT Reader - Algorithmic Approach to Pulmonary Function Test</h1>
    <Instruction />
    <slot />
  </div>
</main>
