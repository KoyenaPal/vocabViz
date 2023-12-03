import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */export async function load({ fetch, params }) {	
	const res = await fetch("/example.json");
	const newItems = await res.json();
	let items = newItems;

	// let items = [
	// 	{
	// 	  "id": 1,
	// 	  "entry": "Star Wars",
	// 	  "tokens": ["Star", "Wars"],
	// 	  "confidence": 0.788,
	// 	  "vector": [0.762, 1.2],
	// 	  "examples": [
	// 		{ "doc": 341, "example": "The Star Wars franchise has grossed over 46 billion dollars..." },
	// 		{ "doc": 222, "example": "The Star Wars prequels are absolute fire!!!!" },
	// 		{ "doc": 13, "example": "I watched Star Wars for the first time and its mid" }
	// 	  ],
	// 	  "close": [
	// 		{ "id": 3, "distance": 341, "entry": "Indiana Jones" },
	// 		{ "id": 18, "distance": 222, "entry": "Star Trek" }
	// 	  ],
	// 	  "distant": [
	// 		{ "id": 145, "distance": 341, "entry": "Banff National Park" },
	// 		{ "id": 21, "distance": 222, "entry": "Cuban Sandwiches" }
	// 	  ]
	// 	},
	// 	{
	// 	  "id": 2,
	// 	  "entry": "Village Vanguard",
	// 	  "tokens": ["Village", "Vanguard"],
	// 	  "confidence": 0.64,
	// 	  "vector": [0.8, -0.2],
	// 	  "examples": [
	// 		{ "doc": 309, "example": "The Village Vanguard is a jazz club at Seventh Avenue South in Greenwich Village, New York City." },
	// 		{ "doc": 213, "example": "Coltrane's version of Softly at the Village Vanguard is my fav recording of my fav standard" },
	// 		{ "doc": 66, "example": "Bill Evans live at the Village Vanguard is THE greatest album of all time." }
	// 	  ],
	// 	  "close": [
	// 		{ "id": 1, "distance": 10, "entry": "Birdland" },
	// 		{ "id": 7, "distance": 341, "entry": "Blue Note" }
	// 	  ],
	// 	  "distant": [
	// 		{ "id": 19, "distance": 421, "entry": "McDonald's" },
	// 		{ "id": 210, "distance": 420, "entry": "Signal Hill Centre" }
	// 	  ]
	// 	},
	// 	{			
	// 		"id": 3,
	// 		"entry": "Indiana Jones",			
	// 		"tokens": ["Indiana", "Jones"],
	// 		"confidence": 0.80,
	// 		"vector": [0.7,1.1],
	// 		"examples": [
	// 			{"doc": 91, "example": "You look like Indiana Jones napping like that."},
	// 			{"doc": 89, "example": "The second Indiana Jones is kinda racist"},
	// 		],
	// 		"close": [
	// 			{ "id": 1, "distance": 10, "entry": "Star Wars" },
	// 			{ "id": 7, "distance": 341, "entry": "Harrison Ford" }
	// 		  ],
	// 		  "distant": [
	// 			{ "id": 2, "distance": 301, "entry": "Village Vanguard" },
	// 			{ "id": 21, "distance": 341, "entry": "Cuban Sandwiches" }
	// 		]
	// 	}
	// ]

	if (typeof(items[+params.slug - 1]) !== 'undefined')  {
		return {'items': items, 'slug': items[+params.slug - 1], 'page_id': params.slug}
	} else {
		throw error(404, 'Not found');
	}
}