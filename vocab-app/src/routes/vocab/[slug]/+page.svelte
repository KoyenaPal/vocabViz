<script>
  /** @type {import('./$types').PageData} */
	export let data;
  import { Tabs, TabItem, Card } from 'flowbite-svelte';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch } from 'flowbite-svelte';

  let items = [{			
        id: 1,
        entry: 'Star Wars',			
        tokens: ['Star', 'Wars'],
        confidence: 0.788,
        vector: [.762,1.2],
        examples: [
            { doc: 341, example: 'The Star Wars franchise has grossed over 46 billion dollars...' },
            { doc: 222, example: 'The Star Wars prequels are absolute fire!!!!' },
            { doc: 13, example: 'I watched Star Wars for the first time and its mid'},
            ],
        close: [
            { id: 15, distance: 341, entry: 'Indiana Jones' },
            { id: 18, distance: 222, entry: 'Star Trek' },
            ],
        distant: [
            { id: 145, distance: 341, entry: 'Banff National Park' },
            { id: 21, distance: 222, entry: 'Cuban Sandwiches' },
            ],
        }, 
	    {			
        id: 2,
        entry: 'Village Vanguard',			
        tokens: ['Village', 'Vanguard'],
        confidence: 0.64,
        vector: [.8,-0.2],
        examples: [
            {doc: 309, example: 'The Village Vanguard is a jazz club at Seventh Avenue South in Greenwich Village, New York City.'},
            {doc: 213, example: 'Coltranes version of Softly at the Village Vanguard is my fav recording of my fav standard'},
            {doc: 66, example: 'Bill Evans live at the Village Vanguard is THE greatest album of all time.'}
        ],
        close: ['Birdland', 'Blue Note'],
        distant: ['McDonalds', 'Signal Hill Centre']
    },
    {			
        id: 3,
        entry: 'Indiana Jones',			
        tokens: ['Indiana', 'Jones'],
        confidence: 0.80,
        vector: [.7,1.1],
        examples: [
            {doc: 309, example: 'The Village Vanguard is a jazz club at Seventh Avenue South in Greenwich Village, New York City.'},
            {doc: 213, example: 'Coltranes version of Softly at the Village Vanguard is my fav recording of my fav standard'},
            {doc: 66, example: 'Bill Evans live at the Village Vanguard is THE greatest album of all time.'}
        ],
        close: ['Birdland', 'Blue Note'],
        distant: ['McDonalds', 'Signal Hill Centre']
    }]

  // search bar stuff
  let exampleSearchTerm = '';
  $: exampleItems = data.slug.examples
  $: filteredExamples = exampleItems.filter((item) => item.example.toLowerCase().indexOf(exampleSearchTerm.toLowerCase()) !== -1);

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
</script>

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
                <TableBodyCell><a href="/vocab/{item.id}"><u>{item.entry}</u></a></TableBodyCell>
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
              <TableBodyCell><a href="/vocab/{item.id}"><u>{item.entry}</u></a></TableBodyCell>
            </TableBodyRow>
          {/each}
        </TableBody>
      </TableSearch>
    </TabItem>
  </Tabs>
</div>

