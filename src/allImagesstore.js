import { writable } from 'svelte/store';


//allImages.
// id  - 1,2,3....
// worig,horig
// wsmall, hsmall
// rating
// fnsmall
// pathorig
export const allImages = writable([]);
export const bookdic = writable([]);
export const options = writable({});

 

// export function saveallImages(){
//     // Put the object into storage
//     localStorage.setItem('allImages', JSON.stringify(allImages.get()));
// }

// export function loadallImages(){
//     // Retrieve the object from storage

//     allImages.set(JSON.parse(localStorage.getItem('allImages')));
//     allImages.subscribe()
// }