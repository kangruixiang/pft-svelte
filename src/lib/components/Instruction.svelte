<script>
  import example from "$lib/example.png";
  import { InstructionItem } from "$lib/components/index";
</script>

<div class="flex flex-col space-y-2 mb-4">
  <InstructionItem>
    <svelte:fragment slot="title">How to copy PFT data</svelte:fragment>
    <svelte:fragment slot="body">
      <p>
        Click on the first row and first column ("Variable") and drag across to
        the last column ("%Pred-Pre"). This will select all of the rows for the
        selected columns. Then use Ctrl+C to copy the data.
      </p>
      <img src={example} alt="" /></svelte:fragment
    >
  </InstructionItem>

  <InstructionItem>
    <svelte:fragment slot="title">Caveats</svelte:fragment>
    <svelte:fragment slot="body">
      <ul class="list-disc ml-4">
        <li>
          The Effort and Flow Volume Loop are not being read. You have to use
          the drop down to select the right one.
        </li>
        <li>
          FRC/TLC data is not available and does not help differentiate between
          simple and complex restriction.
        </li>
        <li>There is no FVC data from Breeze.</li>
      </ul>
    </svelte:fragment>
  </InstructionItem>
</div>
