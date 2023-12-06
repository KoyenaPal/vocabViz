<script lang="ts">  
  /** @type {import('./$types').PageData} */
  export let data;

  // search for pages functionality
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch, Card } from 'flowbite-svelte';
  import {onMount} from 'svelte';
  import papa from 'papaparse';
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
  // function handleChange(event: any) {
  //     let files = event.target.files;
  //     console.log(files)
  //     for (let f of files) {
  //         papa.parse(f, {
  //             header: true,
  //             complete: function (results: any) {
  //                 console.log(results);
  //             }
  //         });
  //     }
  // }

</script>

<div class="help-button"><a href="/info"><img src="/help.png"></a></div>
<div class="home-button"><a href="/"><img src="/home.png"></a></div>


<center>
<div class="pt-5 pl-20 pb-10 pr-20">
  <h1>What Concepts Does Llama-2 Know?</h1>
  <p class="home-text"> Large Language Models (LLMs) can implicitly store 
    a lot of information about the world. Llama-2, Meta AI's latest open-source model, is able to correctly
    complete sentences like <i>"Thelonious Monk plays the ___"</i> (piano), presumably due to having seen 
    this information somewhere before during training. <b>But how is this knowledge organized?</b> Below, we display {plotData.length} 
    concept representations that Llama-2 is able to correctly answer questions about, organized based on ongoing research
    into how LLMs represent multi-token concepts (things that take several words to express). </p>
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

<!-- This may be better to use than layercake https://github.com/flekschas/regl-scatterplot -->
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
          <TableBodyCell><a href="/vocab/{item.id}" class="highlighted-link">{item.entry}</a></TableBodyCell>
          <TableBodyCell>{item.confidence}</TableBodyCell>
          <TableBodyCell>{item.examples[0].sentence}</TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </TableSearch>
  </div>
