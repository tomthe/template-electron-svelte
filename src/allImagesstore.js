import { writable } from 'svelte/store';

export const allImages = writable([]);

// export function saveallImages(){
//     // Put the object into storage
//     localStorage.setItem('allImages', JSON.stringify(allImages.get()));
// }

// export function loadallImages(){
//     // Retrieve the object from storage

//     allImages.set(JSON.parse(localStorage.getItem('allImages')));
//     allImages.subscribe()
// }