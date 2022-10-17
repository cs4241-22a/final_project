<!--
    TODO: 
    - actually get this functioning lmao

	NOTE: containers and divs will be wonky for the time being
-->
<script>
	// import Navbar from "./navbar.svelte";
	import Form from "./form.svelte";
	//import Carousel from "./carousel.svelte";
	import Footer from "./footer.svelte";
	import Card from "./card.svelte";

	var cyberChef ={
            title: 'CyberChef', 
            desc: 'CyberChef is a simple, intuitive web app for carrying out all manner of \"cyber\" operations within a web browser.',
            link: 'https://gchq.github.io/CyberChef/',
            tag: 'cybersecurity'
    };
    
    const sqlZoo ={
        title: 'SQLZoo', 
        desc: 'Wiki-based interactive tutorials to learn SQL.',
        link: 'https://sqlzoo.net/wiki/SQL_Tutorial',
        tag: 'fullstack'
    };
    
    const discreteMath ={
        title: 'DiscreteMath.org', 
        desc: 'An open content source to learn discrete math. ',
        link: 'https://discretemath.org/',
        tag: 'theory'
    };

    const hciBibs ={
        title: 'HCI Bib', 
        desc: 'A webpage of useful HCI resources (albeit a bit outdated). ',
        link: 'http://hcibib.org/',
        tag: 'fullstack'
    };
    
    const cyberAwareness ={
        title: 'Cyber Awareness Challenge', 
        desc: 'Training used by Department of Defense workers to be aware of common cyber security threats.',
        link: 'https://public.cyber.mil/training/cyber-awareness-challenge/',
        tag: 'cybersecurity'
    };
    
    const teachYourself ={
        title: 'Teach Yourself CS', 
        desc: 'Massive guide to learn lots of underlying knowlegdge of Computer Science.',
        link: 'https://teachyourselfcs.com/',
        tag: 'theory'
    };
	
</script>

<svelte:head>
	<meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>How to Survive CS@WPI</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
        <link rel="icon" type="image/x-icon" href="https://cdn-icons-png.flaticon.com/512/5766/5766858.png">
</svelte:head>

<!-- <Navbar /> triple check -->
<br>
<br>
<!--<Carousel />--> <!--triple check-->
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
<!--Columns of cards and the form-->
<div class="container" id="home_cards">
	<div class="columns is-vcentered is desktop">
		<div class="column" id="latest_cards">
			<h1 class="title is-2 has-text-centered">Latest</h1>
			<Card {...cyberChef}/>
			<Card {...sqlZoo}/>
			<Card {...discreteMath}/>
		</div>
		<div class="column" id="top_cards">
			<h1 class="title is-2 has-text-centered">Top</h1>
			<Card {...hciBibs} />
			<Card {...cyberAwareness} />
			<Card {...teachYourself} />
		</div>
		<div class="column has-background-primary" id="submit_resource">
			<Form /> <!--triple check, will probably double column-->
		</div>
	</div>
</div>
<br>
<br>
<Footer /> <!--triple check-->