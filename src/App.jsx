
import React from "react";

class App extends React.Component {
	
	constructor(props) {
        super(props);
		this.state = {score: 0, 
			passiveDamage: 0, 
			clickDamage: 1,
			
			lunchCost: 15, 
			hayCost: 30, 
			mashCost: 200, 
			textbookCost: 250, 
			grassCost: 1000, 
			officehoursCost: 1500, 
			studyCost: 12500, 
			meditateCost: 25000, 
			dunkinCost: 137500, 
			reviewCost: 500000};
	
        window.appState = this;
		this.startTimer();
    }
	
	render() {
		return (
			<>
				<body>
					<h1>Gompei Clicker</h1>
					<p>Score: <span id="score">{this.state.score}</span> Click Damage: <span id="click-damage">{this.state.clickDamage}</span> Passive Damage: <span id="passive-damage">{this.state.passiveDamage}</span> </p>
					<img src="/gompei.png" height="256px" width="256px" alt="Gompei" onClick={(e) => this.addToScore()}/>
					<button onClick={(e) => this.buyLunch()}> Buy Campus Center Lunch [<span id="lunch-cost">{this.state.lunchCost}</span>]</button>
					<button onClick={(e) => this.buyHay()}> Buy Hay [<span id="hay-cost">{this.state.hayCost}</span>]</button>
					<button onClick={(e) => this.buyMash()}> Buy MASH [<span id="mash-cost">{this.state.mashCost}</span>]</button>
					<button onClick={(e) => this.buyTextbook()}> Buy Textbook [<span id="textbook-cost">{this.state.textbookCost}</span>]</button>
					<button onClick={(e) => this.buyGrass()}> Buy Grass [<span id="grass-cost">{this.state.grassCost}</span>] </button>
					<button onClick={(e) => this.buyOfficeHours()}> Buy Office Hours [<span id="office-hours-cost">{this.state.officehoursCost}</span>]</button>
					<button onClick={(e) => this.buyStudy()}> Buy Study [<span id="study-cost">{this.state.studyCost}</span>]</button>
					<button onClick={(e) => this.buyMeditate()}> Buy Meditate [<span id="meditate-cost">{this.state.meditateCost}</span>]</button>
					<button onClick={(e) => this.buyDunkin()}> Buy Dunkin [<span id="dunkin-cost">{this.state.dunkinCost}</span>] </button>
					<button onClick={(e) => this.buyReview()}> Buy Review [<span id="review-cost">{this.state.reviewCost}</span>]</button>
					<p>Will use these descriptions later:
						<br/>Buy Campus Center Lunch - Gompei will go to the Campus Center and grab a bite to eat, increasing his click strength by 1.
						<br/>Buy Hay - Gompei will go to his hay dealer and buy some hay, increasing his passive click strength by 1.
						<br/>Buy MASH - Gompei will attend a MASH session, teaching him how to do his Calc IV homework, increasing his click strength by 25.
						<br/>Buy Textbook - Gompei will *buy* his course textbook, increasing his passive click strength by 10.
						<br/>Buy Grass - Gompei eats some of the grass on the Quad, increasing his click strength by 75.
						<br/>Buy Office Hours - Gompei will attend Noelle's and Kyle's office hour and they help him fix his bug, increasing his passive click strength by 35
						<br/>Buy Study - Gompei takes some time to study for his next Physics Exam, increasing his click strength by 500.
						<br/>Buy Meditate - Gompei meditates reducing his stress, increasing his passive click strength by 300.
						<br/>Buy Dukin - Gompei buys Dunkin Donuts through the mobile app, increasing his click strength by 15000.
						<br/>Buy Review - Gompei makes a review guide for his history exam, incrasing his passive click strength by 10000.
					</p>
				</body>
			</>
		);
	}
  

	addToScore(e) {
		this.setState({score: this.state.score + this.state.clickDamage})
	}
	
	startTimer() {
		setInterval(() => {
			this.setState({score: this.state.score + this.state.passiveDamage});
		}, 500); // half second*/
	}
	
	buyLunch(e) {
		if (this.state.score >= this.state.lunchCost) {
			this.setState({score: 		this.state.score - this.state.lunchCost})
			this.setState({lunchCost: 	Math.round(this.state.lunchCost * 1.10)})
			this.setState({clickDamage: this.state.clickDamage + 1})
		}
	}
	
	buyHay(e) {
		if (this.state.score >= this.state.hayCost) {			
			this.setState({score: 		this.state.score - this.state.hayCost})
			this.setState({hayCost: 	Math.round(this.state.hayCost * 1.30)})
			this.setState({passiveDamage: this.state.passiveDamage + 1})
		}
	}

	buyMash(e) {
		if (this.state.score >= this.state.mashCost) {
			this.setState({score: 		this.state.score - this.state.mashCost})
			this.setState({mashCost: 	Math.round(this.state.mashCost * 1.75)})
			this.setState({clickDamage: this.state.clickDamage + 25})
		}
	}

	buyTextbook(e) {
		if (this.state.score >= this.state.textbookCost) {
			this.setState({score: 		this.state.score - this.state.textbookCost})
			this.setState({textbookCost: 	Math.round(this.state.textbookCost * 2.00)})
			this.setState({passiveDamage: this.state.passiveDamage + 10})
		}
	}

	buyGrass(e) {
		if (this.state.score >= this.state.grassCost) {
			this.setState({score: 		this.state.score - this.state.grassCost})
			this.setState({grassCost: 	Math.round(this.state.grassCost * 2.25)})
			this.setState({clickDamage: this.state.clickDamage + 75})
		}
	}

	buyOfficeHours(e) {
		if (this.state.score >= this.state.officehoursCost) {
			this.setState({score: 				this.state.score - this.state.officehoursCost})
			this.setState({officehoursCost: 	Math.round(this.state.officehoursCost * 2.50)})
			this.setState({passiveDamage: 		this.state.passiveDamage + 35})
		}
	}

	buyStudy(e) {
		if (this.state.score >= this.state.studyCost) {
			this.setState({score: 		this.state.score - this.state.studyCost})
			this.setState({studyCost: 	Math.round(this.state.studyCost * 4.00)})
			this.setState({clickDamage: this.state.clickDamage + 500})
		}
	}

	buyMeditate(e) {
		if (this.state.score >= this.state.meditateCost) {
			this.setState({score: 				this.state.score - this.state.meditateCost})
			this.setState({meditateCost: 		Math.round(this.state.meditateCost * 5.00)})
			this.setState({passiveDamage: 		this.state.passiveDamage + 300})
		}
	}

	buyDunkin(e) {
		if (this.state.score >= this.state.dunkinCost) {
			this.setState({score: 		this.state.score - this.state.dunkinCost})
			this.setState({dunkinCost: 	Math.round(this.state.dunkinCost * 10.00)})
			this.setState({clickDamage: this.state.clickDamage + 15000})
		}
	}

	buyReview(e) {
		if (this.state.score >= this.state.reviewCost) {
			this.setState({score: 				this.state.score - this.state.reviewCost})
			this.setState({reviewCost: 		Math.round(this.state.reviewCost * 10.00)})
			this.setState({passiveDamage: 		this.state.passiveDamage + 10000})
		}
	}



	
}

export default App;
