<script lang="ts">
  import { cn } from "$lib/utils";

 let { children, variant = "primary", ...others } = $props()

  const base = "w-full lg:order-3 order-3 px-6 py-3 rounded border-2 border-black  active:scale-[0.99] h-14 tracking-wider font-semibold"
  const variants = {
  primary: "bg-amber-300 active:bg-[#ffce2e] shadow-[0px_2px_0px_0px_black,inset_0px_1px_0px_0px_#f9f5ea] active:shadow-[inset_0px_1px_0px_0px_black]",
  dark: "border-0 bg-zinc-900 text-zinc-50 hover:bg-zinc-800 hover:text-white active:bg-zinc-800",
  blue: "w-1/2 bg-[#82b6ba] active:bg-[#77b2b6] shadow-[0px_2px_0px_0px_black,inset_0px_1px_0px_0px_#abcacd] active:shadow-[inset_0px_1px_0px_0px_black]",
  clear: "w-1/2 shadow-[0px_2px_0px_0px_black,inset_0px_1px_0px_0px_#abcacd] active:shadow-[inset_0px_1px_0px_0px_black]"
 }

</script>

<button {...others} class={cn(base, variants[variant])}>
  {#if children}
  {@render children()}
  {/if}
</button>
