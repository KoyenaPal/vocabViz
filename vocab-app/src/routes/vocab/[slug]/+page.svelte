<script>
  /** @type {import('./$types').PageData} */
	export let data;
  import { Tabs, TabItem, Card } from 'flowbite-svelte';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch } from 'flowbite-svelte';

  let items = data.items;
  console.log(data.slug);

  // search bar stuff
  let exampleSearchTerm = '';
  $: exampleItems = data.slug.examples
  $: filteredExamples = exampleItems.filter((item) => item.sentence.toLowerCase().indexOf(exampleSearchTerm.toLowerCase()) !== -1);

  let closeSearchTerm = '';
  $: closeItems = data.slug.close
  $: filteredClose = closeItems.filter((item) => item.entry.toLowerCase().indexOf(closeSearchTerm.toLowerCase()) !== -1);

  let distantSearchTerm = '';
  $: distantItems = data.slug.distant
  $: filteredDistant = distantItems.filter((item) => item.entry.toLowerCase().indexOf(distantSearchTerm.toLowerCase()) !== -1);

  // https://layercake.graphics/example/ScatterWebgl
  import { LayerCake, Svg, WebGL, Html } from 'layercake';

  import ScatterWebGL from '../../_components/Scatter.webgl.svelte';
  import AxisX from '../../_components/AxisX.svelte';
  import AxisY from '../../_components/AxisY.svelte';
  import QuadTree from '../../_components/QuadTree.html.svelte';

  const xKey = 'pca_x';
  const yKey = 'pca_y';

  // TODO first plot the actual data on the home page, then come back here and highlight points.
  const highlight_id = data.page_id;
  const r = 3;
  const padding = 6;

  let plotData = [];
  items.forEach(i => {
    plotData.push({'id': i.id, 'entry': i.entry, 'pca_x': i.vector[0], 'pca_y': i.vector[1]})
  });

  let all_ids = [];
  items.forEach(i => {
    all_ids.push(i.id)
  });
</script>

<div class="help-button"><a href="/info"><img src="/help.png"></a></div>
<div class="home-button"><a href="/"><img src="/home.png"></a></div>

<div class="pt-5 pl-5 pagetitle">
  <center><h1><a href="/">Llama-2-7b Vocabulary</a></h1></center>
  <!-- <center><h1>{data.slug.entry}</h1></center>
  <center><p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">Confidence: {data.slug.confidence}</p></center> -->
</div>

<br>

<div class="parentl">
<div class="childl">
  <!-- <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.slug.entry}</h5>
  <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight"><i>Confidence: {data.slug.confidence}</i></p> -->
  <a href="/vocab/{data.slug.id}"><h1>{data.slug.entry}</h1></a> <h2>Confidence: {data.slug.confidence}</h2> 
  <h3>Location: [{Math.round(data.slug.vector[0] * 1000)/1000}, {Math.round(data.slug.vector[1]*1000)/1000}]</h3> 
  <p class="home-text">Explore <b>examples</b> of this phrase in context and search through a list of <b>closely-related</b> and <b>distant</b> entries 
  in the three tabs below. Click on the linked related entries to go to their respective pages and compare locations on the plot. 
  <i>{data.slug.entry}</i> appears in the right-hand plot highlighted in red. 
  <br><br>
  <i><h3><a href="/info" class="highlighted-link">Where does this plot come from?</a></h3></i>
   </p>
</div>
<div class="small-chart-container">
  <LayerCake
    padding={{ top: 0, right: 5, bottom: 20, left: 25 }}
    x={xKey}
    y={yKey}
    xPadding={[padding, padding]}
    yPadding={[padding, padding]}
    data={plotData}
  >
    <Svg>
      <AxisX ticks={4}/>
      <AxisY
        ticks={5}
      />
    </Svg>

    <WebGL>
      <ScatterWebGL
        {r}
        {highlight_id}
      />
    </WebGL>

    <Html>
      <QuadTree
        let:x
        let:y
        let:visible
        let:label
      >
        <div
          class="circle"
          style="top:{y}px;left:{x}px;display: { visible ? 'block' : 'none' };"
        ></div>
        <span
          class="tooltip"
          style="top:{y}px;left:{x}px;display: { visible ? 'block' : 'none' };"
        >{label}</span> 
      </QuadTree>
    </Html>
  </LayerCake>
</div>
</div>


<!-- TODO add in functionality for local visualiation of data.feature with plotly PCA PLOT -->
<!-- https://svelte.dev/repl/fd99eae453e84027ba244eb72cf4667e?version=3.15.0 -->


<!-- https://tailwindcss.com/docs/padding -->
<div class="vocab-tabs pt-5 pl-5">
  <Tabs style="pill">
    <TabItem open>
      <span slot="title">Examples</span>
      <TableSearch placeholder="Search within examples" hoverable={true} bind:inputValue={exampleSearchTerm}>
        <TableHead>
          <TableHeadCell>Document</TableHeadCell>
          <TableHeadCell>Entry</TableHeadCell>
        </TableHead>
        <TableBody>
          {#each filteredExamples as item}
            <TableBodyRow>
              <TableBodyCell>{item.doc}</TableBodyCell>
              <TableBodyCell>{item.sentence}</TableBodyCell>
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
                {#if item.id in all_ids}
                <TableBodyCell><a href="/vocab/{item.id}" class="highlighted-link" data-sveltekit-reload>{item.entry}</a></TableBodyCell>
                {:else}
                <TableBodyCell>{item.entry}</TableBodyCell>
                {/if} 
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
              {#if item.id in all_ids}
                <TableBodyCell><a href="/vocab/{item.id}" class="highlighted-link" data-sveltekit-reload>{item.entry}</a></TableBodyCell>
                {:else}
                <TableBodyCell>{item.entry}</TableBodyCell>
                {/if}
            </TableBodyRow>
          {/each}
        </TableBody>
      </TableSearch>
    </TabItem>
  </Tabs>
</div>

