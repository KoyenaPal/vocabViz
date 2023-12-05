import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */export async function load({ fetch, params }) {	
    const res = await fetch("/small.json");
	const items = await res.json();

	try {
		return {items};
	} catch (err) {
		throw error(404, 'Not found');
	}
}