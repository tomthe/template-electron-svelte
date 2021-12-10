<script>
	// export let name;
	import ImageLoad from './ImageLoad.svelte';
	import 'bulma/css/bulma.css';
	import { Tabs, Tab } from 'svelma'
	import Allpages from './Allpages.svelte';
	import ExportBook from './ExportBook.svelte'
</script>


<Tabs style="is-fullwidth">
  <Tab label="Load and select images" icon="users">
<!-- <div class="columns">
  <div class="column is-two-thirds"> -->
	<ImageLoad name='moo'></ImageLoad>
  <!-- </div>
  <div class="column"></div>
</div> -->
  </Tab>
  <Tab label="Order Pages" icon="map-marker-alt">
	a1.Hier kommen mehrere Sachen hin. 
	wenn es noch keine pages gibt: autogenerate pages + einstellungen
	sonst: eine vertikale liste aller selektierter Bilder
	und:  eine vertikale liste aller pages - inklusive einer horizontalen liste der entsprechenden Bilder, sowie einer voransicht und sonstige sachen
	<Allpages>
	</Allpages>
  </Tab>
  <Tab label="Export Book" icon="ellipsis-h">
  <ExportBook></ExportBook>
  </Tab>
</Tabs>
<main>
</main>
<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	@media (min-width: 940px) {
		main {
			max-width: none;
		}
	}
</style> 