<script>  
  /** @type {import('./$types').PageData} */
  export let data;

  // search for pages functionality
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch, Card } from 'flowbite-svelte';
  let searchTerm = '';
  let items = data.items;
  $: filteredItems = items.filter((item) => item.entry.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);


  // https://layercake.graphics/example/ScatterWebgl
  import { LayerCake, Svg, WebGL, Html } from 'layercake';

  import ScatterWebGL from './_components/Scatter.webgl.svelte';
  import AxisX from './_components/AxisX.svelte';
  import AxisY from './_components/AxisY.svelte';
  import QuadTree from './_components/QuadTree.html.svelte';

  const xKey = 'pca_x';
  const yKey = 'pca_y';

  const r = 3;
  const padding = 6;

  let plotData = []
  items.forEach(i => {
    plotData.push({'entry': i.entry, 'pca_x': i.vector[0], 'pca_y': i.vector[1]})
  });

</script>


<center>
<div class="pt-5 pl-10 pb-10 pr-10">
  <h1>What Concepts Does Llama 2 Know?</h1>
  <p class="home-text">Large Language Models (LLMs) like Llama 2 seem to store a lot of information about the world, 
    but nobody knows exactly <i>what</i> information they store, and <i>how</i> that information is represented. One problem
    is that when LLMs process input text, everything is represented as sequences of independent <b>tokens.</b> This means that,

    
    What concepts do language models "know?" 
    Many important concepts are processed by large language models (LLMs) 
    as sequences of disconnected words. How can we know which sequences of 
    words a model might see as one concept (``Star'' and ``Wars'') versus words 
    a model might view as unrelated (e.g. ``Sun'' and ``Battle'')? In parallel 
    with our work on identifying these phrases, we designed this visualization tool.</p>
  


</div>
</center>



<div class="parent">
  <center><i><h2>Examples of Llama-2 Concepts</h2></i></center>
  {#each items.slice(0,4) as item}
  <div class="child"><Card href="/vocab/{item.id}">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.entry}</h5>
    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">Confidence: {item.confidence}</p>
  </Card></div>
  {/each}
</div>

<!-- TODO: zooming in automatically for vocab page. -->
<!-- TODO tooltip https://layercake.graphics/example/MultiLine -->
<center>
<h2><i>Explore Llama-2-7b's Vocabulary Space</i></h2>
<div class="chart-container">
  <LayerCake
    padding={{ top: 25, right: 25, bottom: 20, left: 25 }}
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
        let:e
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
</center>

<div class="home-search">
  <TableSearch class="search-bar" placeholder="Search for a concept..." hoverable={true} bind:inputValue={searchTerm}>
    <TableHead>
      <TableHeadCell>ID</TableHeadCell>
      <TableHeadCell>Entry</TableHeadCell>
      <TableHeadCell>Confidence</TableHeadCell>
      <TableHeadCell>Top Example</TableHeadCell>
    </TableHead>
  
    <TableBody>
      {#each filteredItems as item}
        <TableBodyRow>
          <TableBodyCell>{item.id}</TableBodyCell>
          <TableBodyCell><a href="/vocab/{item.id}"><u>{item.entry}</u></a></TableBodyCell>
          <TableBodyCell>{item.confidence}</TableBodyCell>
          <TableBodyCell>{item.examples[0].sentence}</TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </TableSearch>
  </div>
