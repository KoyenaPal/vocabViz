<svelte:head>
  <script src="https://cdn.plot.ly/plotly-latest.min.js" type="text/javascript"></script>
</svelte:head>

<script>
  /** @type {import('./$types').PageData} */
	export let data;
  import { Tabs, TabItem, Card } from 'flowbite-svelte';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch } from 'flowbite-svelte';

  import { onMount } from 'svelte';
	

	// TODO load in the whole overall PCA plot, and then zoom in to specific marker 
	export let trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    mode: 'markers',
    type: 'scatter'
  };

  export var plotData = [trace1];

  // https://plotly.com/javascript/plotlyjs-function-reference/
  onMount(() => {
    let plotDiv = document.getElementById('plotDiv');				
    let Plot = new Plotly.newPlot(plotDiv, plotData, {}, {showSendToCloud:true}); 
  });

  // search bar stuff 
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

<div class="pt-5 pl-5 pagetitle">
  <center><h1>Llama-2-7b Vocabulary</h1></center>
  <!-- <center><h1>{data.entry}</h1></center>
  <center><p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">Confidence: {data.confidence}</p></center> -->
</div>

<br>

<div class="vocabcard">
  <!-- <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.entry}</h5>
  <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight"><i>Confidence: {data.confidence}</i></p> -->
  <h1>{data.entry}</h1> <h2>Confidence: {data.confidence}</h2>
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

<!-- https://svelte.dev/repl/fd99eae453e84027ba244eb72cf4667e?version=4.2.7 -->
<div class="plotly">
<div id="plotDiv"><!-- Plotly chart will be drawn inside this DIV --></div>
</div>