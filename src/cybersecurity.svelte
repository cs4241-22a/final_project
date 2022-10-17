<script>
	import Navbar from "./navbar.svelte";;
	import Footer from "./footer.svelte";
	import Card from "./card.svelte";
        
    var cyberChef ={
            title: 'CyberChef', 
            desc: 'CyberChef is a simple, intuitive web app for carrying out all manner of \"cyber\" operations within a web browser.',
            link: 'https://gchq.github.io/CyberChef/',
            tag: 'cybersecurity'
    };
    
    const cyberAwareness ={
            title: 'Cyber Awareness Challenge', 
            desc: 'Training used by Department of Defense workers to be aware of common cyber security threats.',
            link: 'https://public.cyber.mil/training/cyber-awareness-challenge/',
            tag: 'cybersecurity'
    };

    const nationalCyber ={
            title: "The National Cyber League",
            desc: "Join a community for immersive cyber challenges",
            link: "https://nationalcyberleague.org/", 
            tag: "cybersecurity"
    };

    const cyberGames ={
        title: "Cybersecurity Games",
        desc: "A set of games from the University of Texas at Austin focused on testing and sharpening cybersecurity skills.",
        link: "https://it.tamu.edu/security/cybersecurity-games/index.php", 
        tag: "cybersecurity"
    };

    const hacker101 ={
        title: "Hacker101",
        desc: "Free online classes covering web security.",
        link: "https://www.hacker101.com/", 
        tag: "cybersecurity"
    };

    const tryHackMe ={
        title: "TryHackMe",
        desc: "Learning cybersecurity in small, byte-sized, gamified lessons.",
        link: "https://tryhackme.com/", 
        tag: "cybersecurity"
    };
</script>

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
<br>
<!--Hero content-->
<section class="hero is-info" id="cyber_hero">
    <div class="hero-body">
        <h2 class="title is-2 has-text-centered">Cybersecurity</h2>
        <p>Cybersecurity is the study within Computer Science on how to keep personal data and other sensetive infomation safe. It is a specialization that is increasingly important in the changing world.</p>
        <p>WPI offers a number of courses focused on Cybersecurity. Some of the offerings include <a href="https://www.wpi.edu/academics/calendar-courses/course-descriptions/17851/computer-science#CS-4401">CS 4401</a> and <a href="https://www.wpi.edu/academics/calendar-courses/course-descriptions/17851/computer-science#CS-4801">CS 4801</a>.</p>
    </div>
</section>
<br>
<div class="container">
    <div class="columns is-vcentered is desktop">
        <div class="column" id="theory_col1">
			<Card {...cyberChef}/>
			<Card {...nationalCyber}/>
		</div>
		<div class="column" id="theory_col2">
			<Card {...cyberAwareness} />
			<Card {...cyberGames} />
		</div>
		<div class="column" id="theory_col3">
            <Card {...hacker101} />
			<Card {...tryHackMe} />
		</div>
	</div>
</div>
<br>
<br>
<Footer /> <!--triple check-->