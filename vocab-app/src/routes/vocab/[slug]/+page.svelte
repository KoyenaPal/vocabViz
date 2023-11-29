<script>
  /** @type {import('./$types').PageData} */
	export let data;
  import { Tabs, TabItem, Card } from 'flowbite-svelte';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch } from 'flowbite-svelte';

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

  // https://layercake.graphics/example/ScatterWebgl
  import { LayerCake, Svg, WebGL, Html } from 'layercake';

  import ScatterWebGL from '../../_components/Scatter.webgl.svelte';
  import AxisX from '../../_components/AxisX.svelte';
  import AxisY from '../../_components/AxisY.svelte';
  import QuadTree from '../../_components/QuadTree.html.svelte';

  const xKey = 'year';
  const yKey = 'value';

  const r = 3;
  const padding = 6;

  let plotData = [{'year':2001, 'value':10}, {'year':2002, 'value':20}, {'year':2003, 'value':30}, {'year':2004, 'value':100}];

  plotData.forEach(d => {
    d[yKey] = +d[yKey];
  });
  
</script>

<div class="pt-5 pl-5 pagetitle">
  <center><h1><a href="/">Llama-2-7b Vocabulary</a></h1></center>
  <!-- <center><h1>{data.entry}</h1></center>
  <center><p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">Confidence: {data.confidence}</p></center> -->
</div>

<br>

<div class="parentl">
<div class="childl">
  <!-- <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.entry}</h5>
  <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight"><i>Confidence: {data.confidence}</i></p> -->
  <a href="/vocab/{data.id}"><h1>{data.entry}</h1></a> <h2>Confidence: {data.confidence}</h2>
  <p class="home-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta ullamcorper mauris, ut vulputate risus facilisis quis. Proin id blandit odio. Nunc semper fringilla faucibus. Nulla nibh arcu, malesuada id lobortis ut, bibendum eget diam. Donec id magna sem. Nulla vestibulum ipsum sit amet ante aliquam, ac vehicula eros lacinia. Curabitur euismod scelerisque ligula nec scelerisque. Nulla malesuada mattis pellentesque. Sed fringilla ipsum eget tortor viverra porta. Nullam malesuada orci ut justo rutrum mollis. Mauris vel auctor massa, id malesuada urna. Integer felis elit, vestibulum condimentum nisl sit amet, euismod commodo augue.</p>
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
      />
    </WebGL>

    <Html>
      <QuadTree
        let:x
        let:y
        let:visible
      >
        <div
          class="circle"
          style="top:{y}px;left:{x}px;display: { visible ? 'block' : 'none' };"
        >todo</div>
      </QuadTree>
    </Html>
  </LayerCake>
</div>
</div>


<!-- TODO add in functionality for local visualiation of data.feature with plotly PCA PLOT -->
<!-- https://svelte.dev/repl/fd99eae453e84027ba244eb72cf4667e?version=3.15.0 -->


<!-- https://tailwindcss.com/docs/padding -->
<div class="pt-5 pl-5">
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

