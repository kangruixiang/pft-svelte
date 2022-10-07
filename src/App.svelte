<script>
  import Button from "./Button.svelte";
  import Input from "./Input.svelte";
  import Select from "./Select.svelte";
  import Pft from "./Pft.svelte";
  import Test from "./Test.svelte";
</script>

<main>
  <div
    class="container max-w-4xl p-12 my-12 rounded-lg lg:p-24 lg:border-2 lg:border-solid lg:border-zinc-900 xl:max-w-6xl"
  >
    <Test />
  </div>
</main>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @font-face {
    font-family: "Concourse";
    src: url("fonts/concourse_3_regular.woff2") format("woff2");
    font-style: normal;
  }
  @font-face {
    font-family: "Equity";
    src: url("fonts/equity_a_regular.woff2") format("woff2");
    font-style: normal;
  }
  @layer components {
    h1 {
      @apply text-xl font-bold uppercase mb-4;
    }
    h2 {
      @apply text-lg font-bold uppercase mb-2;
    }
    p {
      @apply text-zinc-800 pb-4 font-serif;
    }
    ::selection {
      @apply bg-slate-200;
    }
    .btn {
      @apply btn-disabled p-3 shadow font-semibold rounded-lg border-2 border-solid border-zinc-800 bg-zinc-50
		font-sans hover:bg-white text-zinc-800 hover:text-black;
    }
    .btn-dark {
      @apply btn border-0 bg-zinc-800 text-zinc-50 hover:bg-zinc-900 hover:text-white transition duration-300;
    }
    .btn-disabled {
      @apply disabled:text-zinc-500 disabled:hover:text-zinc-500 disabled:bg-zinc-50 disabled:hover:bg-zinc-50 disabled:border-zinc-500 disabled:hover:border-zinc-500;
    }
    .select {
      @apply font-semibold focus:outline-none focus:bg-white focus:border-zinc-800 border-zinc-800 border-2 border-solid bg-zinc-50 text-zinc-800 rounded-md   outline-none focus:ring-0;
    }
    .label {
      @apply my-2 font-semibold;
    }
    .input-text {
      @apply px-2  focus:bg-white focus:ring-0 w-full  focus:border-zinc-800  py-2 rounded-md bg-zinc-50 border-2 border-solid border-zinc-800 font-semibold;
    }
    .input-checkbox {
      @apply rounded-sm border-2 border-solid w-4 h-4 focus:ring-0  text-zinc-800 border-zinc-800;
    }
  }
</style>
