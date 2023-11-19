import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */export function load({ params }) {	
	if (params.slug == '1') {
		return {			
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
		};	
	}
	else if (params.slug === '2') {		
		return {			
			entry: 'Village Vanguard',			
			tokens: ['Village', 'Vanguard'],
			confidence: 0.64,
			vector: [.8,-0.2],
			examples: [
				'The Village Vanguard is a jazz club at Seventh Avenue South in Greenwich Village, New York City.',
				'Coltranes version of Softly at the Village Vanguard is my fav recording of my fav standard', 
				'Bill Evans live at the Village Vanguard is THE greatest album of all time.', 
			],
			close: ['Birdland', 'Blue Note'],
			distant: ['McDonalds', 'Signal Hill Centre']
		};	
	}
	throw error(404, 'Not found');
}