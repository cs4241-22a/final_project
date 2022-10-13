<!--
    TODO: 
    - actually get this functioning lmao
    REMOVE ALL OLD COD

	NOTE: containers and divs will be wonky for the time being
-->
<script>
	import Navbar from "./navbar.svelte";
	import Form from "./form.svelte";
	import Carousel from "./carousel.svelte";
	import Footer from "./footer.svelte";
	//ALL PREViOUS CODE
	export let name;

	let count = 0;

	const proffessionArr = [
		{			
			'name': 'Daniel',
			'prof': 'Developer'
		},
		{			
			'name': 'Curry',
			'prof': 'Sunbather'
		}
	]

	function handleClick() {
		count += 1;
	}	
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<svelte:head>
	<meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>How to Survive CS@WPI</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
        <link rel="icon" type="image/x-icon" href="https://cdn-icons-png.flaticon.com/512/5766/5766858.png">
</svelte:head>

<Navbar /> <!--triple check-->
<br>
<br>
<Carousel /> <!--triple check-->
<br>
<br>
<!--Hero content-->
<section class="hero is-info" id="body_hero">
	<div class="hero-body has-text-centered">
		<h3 class="title is-3 has-text-centered">About Us</h3>
		<p>How to Survive CS@WPI is a set of resources for WPI students to enhance the courseload and work being done as a Computer Science Student.</p>
		<p>This information was crowd sourced from Computer Science Students from an array of the higher level CS Courses. </p>
		<p>Explore and see what there is to offer!</p>
		<p>If we are missing something, feel free to suggest your own resource below.</p>
	</div>
</section>
<br>
<!--empty until i can figure out how to make a single card element-->
<div class="container" id="home_cards">
	<div class="columns is-vcentered is desktop">
		<div class="column" id="latest_cards">
		</div>
		<div class="column" id="top_cards">
		</div>
		<div class="column has-background-primary" id="submit_resource">
			<Form /> <!--triple check, will probably double column-->
		</div>
	</div>
</div>
<br>
<br>
<Footer /> <!--triple check-->

<!--ALL PREVIOUS CODE-->
<h1>Hello {name}!</h1>

<button on:click={handleClick}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>

{#if count > 3} 
<h2>We are getting there</h2>
{/if}

<ul>
	{#each proffessionArr as prof}
		<li>{prof.name} ({prof.prof})</li>
	{/each}
</ul>