<script>
	/** @type {import('./$types').PageData} */
	export let data;
  import { Tabs, TabItem } from 'flowbite-svelte';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch } from 'flowbite-svelte';

  let exampleSearchTerm = '';
  $: exampleItems = data.examples
  $: filteredExamples = exampleItems.filter((item) => item.example.toLowerCase().indexOf(exampleSearchTerm.toLowerCase()) !== -1);

  let closeSearchTerm = '';
  $: closeItems = data.close
  $: filteredClose = closeItems.filter((item) => item.entry.toLowerCase().indexOf(closeSearchTerm.toLowerCase()) !== -1);

  let distantSearchTerm = '';
  $: distantItems = data.distant
  $: filteredDistant = distantItems.filter((item) => item.entry.toLowerCase().indexOf(distantSearchTerm.toLowerCase()) !== -1);
</script>

<div class="pt-5 pl-5">
  <center><h1>Llama-2-7b Vocabulary</h1></center>
</div>

<div class="pt-5 pl-5">
  <h2>{data.entry}</h2>
  <p><i>Confidence: {data.confidence}</i></p>
</div>

<!-- TODO add in functionality for local visualiation of data.feature with plotly PCA PLOT -->
<!-- https://svelte.dev/repl/fd99eae453e84027ba244eb72cf4667e?version=3.15.0 -->


<!-- https://tailwindcss.com/docs/padding -->
<div class="pt-10 pl-5">
  <Tabs style="pill">
    <TabItem open>
      <span slot="title">Examples</span>
      <TableSearch placeholder="Search within examples" hoverable={true} bind:inputValue={exampleSearchTerm}>
        <TableHead>
          <TableHeadCell>Document</TableHeadCell>
          <TableHeadCell>Entry</TableHeadCell>
        </TableHead>
        <TableBody class="divide-y">
          {#each filteredExamples as item}
            <TableBodyRow>
              <TableBodyCell>{item.doc}</TableBodyCell>
              <TableBodyCell>{item.example}</TableBodyCell>
            </TableBodyRow>
          {/each}
        </TableBody>
      </TableSearch>
    </TabItem>
    <TabItem>
      <span slot="title">Closely Related Entries</span>
        <TableSearch placeholder="Search by entry" hoverable={true} bind:inputValue={closeSearchTerm}>
          <TableHead>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Distance</TableHeadCell>
            <TableHeadCell>Entry</TableHeadCell>
          </TableHead>
          <TableBody class="divide-y">
            {#each filteredClose as item}
              <TableBodyRow>
                <TableBodyCell>{item.id}</TableBodyCell>
                <TableBodyCell>{item.distance}</TableBodyCell>
                <TableBodyCell>{item.entry}</TableBodyCell>
              </TableBodyRow>
            {/each}
          </TableBody>
        </TableSearch>
      </TabItem>
      <TabItem>
      <span slot="title">Most Distant Entries</span>
      <TableSearch placeholder="Search by entry" hoverable={true} bind:inputValue={distantSearchTerm}>
        <TableHead>
          <TableHeadCell>ID</TableHeadCell>
          <TableHeadCell>Distance</TableHeadCell>
          <TableHeadCell>Entry</TableHeadCell>
        </TableHead>
        <TableBody class="divide-y">
          {#each filteredDistant as item}
            <TableBodyRow>
              <TableBodyCell>{item.id}</TableBodyCell>
              <TableBodyCell>{item.distance}</TableBodyCell>
              <TableBodyCell>{item.entry}</TableBodyCell>
            </TableBodyRow>
          {/each}
        </TableBody>
      </TableSearch>
    </TabItem>
  </Tabs>
</div>

