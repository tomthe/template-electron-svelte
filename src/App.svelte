<script>
	export let name;
	import ImageLoad from './ImageLoad.svelte';
	import 'bulma/css/bulma.css';

</script>

<main>
<div class="columns">
  <div class="column is-two-thirds">
	<ImageLoad name='moo'></ImageLoad>
  </div>
  <div class="column">Auto</div>
  <div class="column">Auto</div>
</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>