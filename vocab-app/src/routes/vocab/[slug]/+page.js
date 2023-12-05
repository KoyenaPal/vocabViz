import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */export async function load({ fetch, params }) {	
	const res = await fetch("/small.json");
	const newItems = await res.json();
	let items = newItems;

	// TODO +params.slug - 1 error?
	if (typeof(items[+params.slug]) !== 'undefined')  {
		return {'items': items, 'slug': items[+params.slug], 'page_id': params.slug}
	} else {
		throw error(404, 'Not found');
	}
}