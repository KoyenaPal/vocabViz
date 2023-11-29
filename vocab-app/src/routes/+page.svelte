<script>  
  /** @type {import('./$types').PageData} */

  // search for pages functionality
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch } from 'flowbite-svelte';
  let searchTerm = '';
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
  
    ]
  $: filteredItems = items.filter((item) => item.entry.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);


  // https://layercake.graphics/example/ScatterWebgl
  import { LayerCake, Svg, WebGL, Html } from 'layercake';

  import ScatterWebGL from './_components/Scatter.webgl.svelte';
  import AxisX from './_components/AxisX.svelte';
  import AxisY from './_components/AxisY.svelte';
  import QuadTree from './_components/QuadTree.html.svelte';

  const xKey = 'year';
  const yKey = 'value';

  const r = 3;
  const padding = 6;

  let data = [{'year':2001, 'value':10}, {'year':2002, 'value':20}, {'year':2003, 'value':30}, {'year':2004, 'value':100}]
  data.forEach(d => {
    d[yKey] = +d[yKey];
  });

</script>


<center>
<div class="pt-5 pl-10 pb-10 pr-10">
  <h1>What Concepts Does Llama 2 Know?</h1>
  <p class="home-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
    It has survived not only five centuries, but also the leap into electronic typesetting, 
    remaining essentially unchanged. It was popularised in the 1960s with the release of 
    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop 
    publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
  


</div>
</center>


<div class="home-search">
<center><h2>Explore Llama-2-7b's Vocabulary Space</h2></center>

<TableSearch class="search-bar" placeholder="Search for a concept..." hoverable={true} bind:inputValue={searchTerm}>
  <TableHead>
    <TableHeadCell>ID</TableHeadCell>
    <TableHeadCell>Entry</TableHeadCell>
    <TableHeadCell>Confidence</TableHeadCell>
    <TableHeadCell>Top Example</TableHeadCell>
  </TableHead>

  <div class='overflow-auto'>
  <TableBody>
    {#each filteredItems as item}
      <TableBodyRow>
        <TableBodyCell>{item.id}</TableBodyCell>
        <TableBodyCell>{item.entry}</TableBodyCell>
        <TableBodyCell>{item.confidence}</TableBodyCell>
        <TableBodyCell>{item.examples[0].example}</TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
  </div>
  
</TableSearch>
</div>


<!-- TODO: zooming in automatically for vocab page, and showing term when you hover. -->
<center>

<div class="chart-container">
  <h2>Explore Word Distributions</h2>
  <p class="home-text">The enriched hidden state for every vocabulary entry is plotted below. Explore this, or individual words. </p>
  <LayerCake
    padding={{ top: 0, right: 5, bottom: 20, left: 25 }}
    x={xKey}
    y={yKey}
    xPadding={[padding, padding]}
    yPadding={[padding, padding]}
    data={data}
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
        ></div>
      </QuadTree>
    </Html>
  </LayerCake>
</div>
</center>