import React from "react";

class UpgradePanel extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		console.log("this handler will be replaced!");
	}

	render() {
		return (
			<>
				<div
					class="UpgradePanelBackground"
					style={{ display: "inline-block" }}
					onClick={this.props.onClick}
				>
					<img src={this.props.img} />
					<label>{this.props.text}</label>
					<label>{this.props.val}</label>
				</div>
			</>
		);
	}
}

class LeaderBoard extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
	}
	
	render(){
		const scores = this.props.scores;
				
		const rows = [];
		for (let i = 0; i < scores.length; i++) {
			rows.push(
			<tr>
				<th>{i + 1}</th>
				<td>{scores[i].User}</td>
				<td>{scores[i].Score}</td>
			</tr>
			);
		}
		for (let i = rows.length; i < 10; i++) {
			rows.push(
			<tr>
				<th>{i}</th>
				<td>{"-"}</td>
				<td>{"-"}</td>
			</tr>
			);
		}
		
		
		return (
			<>
				<table>
					<tr>
						<th>Rank</th><th>User Name</th><th>Score</th>
					</tr>
					<tbody id="LeaderBoard">{rows}</tbody>
				</table>
			</>
		);
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		
		fetch("/load", {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				const progress = data.Data;
				
				this.setState({ score: progress[0]});
				this.setState({ passiveDamage: progress[1]});
				this.setState({ clickDamage: progress[2]});
				this.setState({ lunchCost: progress[3]});
				this.setState({ hayCost: progress[4]});
				this.setState({ mashCost: progress[5]});
				this.setState({ textbookCost: progress[6]});
				this.setState({ grassCost: progress[7]});
				this.setState({ officehoursCost: progress[8]});
				this.setState({ studyCost: progress[9]});
				this.setState({ meditateCost: progress[10]});
				this.setState({ dunkinCost: progress[11]});
				this.setState({ reviewCost: progress[12]});
				this.setState({ leaderboard: []});
				
				this.setState({ ready: true});
				
				
				
				window.appState = this;
				this.reloadLeaderboard();
				this.startTimer();
			});
		
		
		this.state = {
			ready: false
		}

	}

	save() {
		let username = "test";
		let data = [
			this.state.score,
			this.state.passiveDamage,
			this.state.clickDamage,
			this.state.lunchCost,
			this.state.hayCost,
			this.state.mashCost,
			this.state.textbookCost,
			this.state.grassCost,
			this.state.officehoursCost,
			this.state.studyCost,
			this.state.meditateCost,
			this.state.dunkinCost,
			this.state.reviewCost,
		];
		const json = { user: username, data: data };
		const body = JSON.stringify(json);

		fetch("/save", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body,
		})
			.then((res) => res.json())
			.then((message) => {
				console.log(message);
			});
	}
	
	reloadLeaderboard() {
		fetch("/leaderboard", {
			method: "GET",
		})
			.then((res) => res.json())
			.then((leaderboard) => {
				this.setState({leaderboard: leaderboard.Leaderboard});
			});
	}

	render() {
		if(this.state.ready === true){
			return (
				<>
					<body>
						<h1>Gompei Clicker</h1>
						<p>
							Score: <span id="score">{this.state.score}</span> Click Damage:{" "}
							<span id="click-damage">{this.state.clickDamage}</span> Passive
							Damage: <span id="passive-damage">{this.state.passiveDamage}</span>{" "}
						</p>
						<img
							src="/gompei.png"
							height="256px"
							width="256px"
							alt="Gompei"
							onClick={(e) => this.addToScore()}
						/>

						<table>
							<tr>
								{" "}
								<UpgradePanel
									text="Buy Campus Center Lunch "
									val={this.state.lunchCost}
									onClick={(e) => this.buyLunch()}
									enabled={this.state.score >= this.state.lunchCost}
									img="https://cdn.discordapp.com/attachments/818541682018615347/1028724104213299340/Sandwich-Free-PNG-Image_1_54x54.png"
								/>
							</tr>
							<tr>
								{" "}
								<UpgradePanel
									text="Buy Hay "
									val={this.state.hayCost}
									onClick={(e) => this.buyHay()}
									enabled={this.state.score >= this.state.hayCost}
									img="https://cdn.discordapp.com/attachments/709559606082535474/1028474882415132763/unknown.png"
								/>
							</tr>
							<tr>
								{" "}
								<UpgradePanel
									text="Buy MASH "
									val={this.state.mashCost}
									onClick={(e) => this.buyMash()}
									enabled={this.state.score >= this.state.mashCost}
									img="https://cdn.discordapp.com/attachments/709559606082535474/1028474882415132763/unknown.png"
								/>
							</tr>
							<tr>
								{" "}
								<UpgradePanel
									text="Buy Textbook "
									val={this.state.textbookCost}
									onClick={(e) => this.buyTextbook()}
									enabled={this.state.score >= this.state.textbookCost}
									img="https://cdn.discordapp.com/attachments/709559606082535474/1028474882415132763/unknown.png"
								/>
							</tr>
							<tr>
								{" "}
								<UpgradePanel
									text="Buy Grass "
									val={this.state.grassCost}
									onClick={(e) => this.buyGrass()}
									enabled={this.state.score >= this.state.grassCost}
									img="https://cdn.discordapp.com/attachments/709559606082535474/1028474882415132763/unknown.png"
								/>
							</tr>
							<tr>
								{" "}
								<UpgradePanel
									text="Buy Office Hours "
									val={this.state.officehoursCost}
									onClick={(e) => this.buyOfficeHours()}
									enabled={this.state.score >= this.state.officehoursCost}
									img="https://cdn.discordapp.com/attachments/709559606082535474/1028474882415132763/unknown.png"
								/>
							</tr>
							<tr>
								{" "}
								<UpgradePanel
									text="Buy Study "
									val={this.state.studyCost}
									onClick={(e) => this.buyStudy()}
									enabled={this.state.score >= this.state.studyCost}
									img="https://cdn.discordapp.com/attachments/709559606082535474/1028474882415132763/unknown.png"
								/>
							</tr>
							<tr>
								{" "}
								<UpgradePanel
									text="Buy Meditate "
									val={this.state.meditateCost}
									onClick={(e) => this.buyMeditate()}
									enabled={this.state.score >= this.state.meditateCost}
									img="https://cdn.discordapp.com/attachments/709559606082535474/1028474882415132763/unknown.png"
								/>
							</tr>
							<tr>
								{" "}
								<UpgradePanel
									text="Buy Dunkin "
									val={this.state.dunkinCost}
									onClick={(e) => this.buyDunkin()}
									enabled={this.state.score >= this.state.dunkinCost}
									img="https://cdn.discordapp.com/attachments/709559606082535474/1028474882415132763/unknown.png"
								/>
							</tr>
							<tr>
								{" "}
								<UpgradePanel
									text="Buy Review "
									val={this.state.reviewCost}
									onClick={(e) => this.buyReview()}
									enabled={this.state.score >= this.state.reviewCost}
									img="https://cdn.discordapp.com/attachments/709559606082535474/1028474882415132763/unknown.png"
								/>
							</tr>
						</table>

						<button onClick={() => this.save()}>Save</button>
						<button onClick={() => this.reloadLeaderboard()}> Refresh Leaderboard </button>
						<LeaderBoard scores={this.state.leaderboard}/>

						<p>
							Will use these descriptions later:
							<br />
							Buy Campus Center Lunch - Gompei will go to the Campus Center and
							grab a bite to eat, increasing his click strength by 1.
							<br />
							Buy Hay - Gompei will go to his hay dealer and buy some hay,
							increasing his passive click strength by 1.
							<br />
							Buy MASH - Gompei will attend a MASH session, teaching him how to do
							his Calc IV homework, increasing his click strength by 25.
							<br />
							Buy Textbook - Gompei will *buy* his course textbook, increasing his
							passive click strength by 10.
							<br />
							Buy Grass - Gompei eats some of the grass on the Quad, increasing
							his click strength by 75.
							<br />
							Buy Office Hours - Gompei will attend Noelle's and Kyle's office
							hour and they help him fix his bug, increasing his passive click
							strength by 35
							<br />
							Buy Study - Gompei takes some time to study for his next Physics
							Exam, increasing his click strength by 500.
							<br />
							Buy Meditate - Gompei meditates reducing his stress, increasing his
							passive click strength by 300.
							<br />
							Buy Dukin - Gompei buys Dunkin Donuts through the mobile app,
							increasing his click strength by 15000.
							<br />
							Buy Review - Gompei makes a review guide for his history exam,
							incrasing his passive click strength by 10000.
						</p>
					</body>
				</>
			);
		}
		else{
			return (
                <>
                    <body>
                        <h1>Gompei Clicker</h1>
                        <br/>
                        <h2>Loading...</h2>
                    </body>
                </>
            );
		}
	}

	addToScore(e) {
		this.setState({ score: this.state.score + this.state.clickDamage });
	}

	startTimer() {
		setInterval(() => {
			this.setState({ score: this.state.score + this.state.passiveDamage });
		}, 500); // half second*/
	}

	buyLunch(e) {
		if (this.state.score >= this.state.lunchCost) {
			this.setState({ score: this.state.score - this.state.lunchCost });
			this.setState({ lunchCost: Math.round(this.state.lunchCost * 1.1) });
			this.setState({ clickDamage: this.state.clickDamage + 1 });
		}
	}

	buyHay(e) {
		if (this.state.score >= this.state.hayCost) {
			this.setState({ score: this.state.score - this.state.hayCost });
			this.setState({ hayCost: Math.round(this.state.hayCost * 1.3) });
			this.setState({ passiveDamage: this.state.passiveDamage + 1 });
		}
	}

	buyMash(e) {
		if (this.state.score >= this.state.mashCost) {
			this.setState({ score: this.state.score - this.state.mashCost });
			this.setState({ mashCost: Math.round(this.state.mashCost * 1.75) });
			this.setState({ clickDamage: this.state.clickDamage + 25 });
		}
	}

	buyTextbook(e) {
		if (this.state.score >= this.state.textbookCost) {
			this.setState({ score: this.state.score - this.state.textbookCost });
			this.setState({
				textbookCost: Math.round(this.state.textbookCost * 2.0),
			});
			this.setState({ passiveDamage: this.state.passiveDamage + 10 });
		}
	}

	buyGrass(e) {
		if (this.state.score >= this.state.grassCost) {
			this.setState({ score: this.state.score - this.state.grassCost });
			this.setState({ grassCost: Math.round(this.state.grassCost * 2.25) });
			this.setState({ clickDamage: this.state.clickDamage + 75 });
		}
	}

	buyOfficeHours(e) {
		if (this.state.score >= this.state.officehoursCost) {
			this.setState({ score: this.state.score - this.state.officehoursCost });
			this.setState({
				officehoursCost: Math.round(this.state.officehoursCost * 2.5),
			});
			this.setState({ passiveDamage: this.state.passiveDamage + 35 });
		}
	}

	buyStudy(e) {
		if (this.state.score >= this.state.studyCost) {
			this.setState({ score: this.state.score - this.state.studyCost });
			this.setState({ studyCost: Math.round(this.state.studyCost * 4.0) });
			this.setState({ clickDamage: this.state.clickDamage + 500 });
		}
	}

	buyMeditate(e) {
		if (this.state.score >= this.state.meditateCost) {
			this.setState({ score: this.state.score - this.state.meditateCost });
			this.setState({
				meditateCost: Math.round(this.state.meditateCost * 5.0),
			});
			this.setState({ passiveDamage: this.state.passiveDamage + 300 });
		}
	}

	buyDunkin(e) {
		if (this.state.score >= this.state.dunkinCost) {
			this.setState({ score: this.state.score - this.state.dunkinCost });
			this.setState({ dunkinCost: Math.round(this.state.dunkinCost * 10.0) });
			this.setState({ clickDamage: this.state.clickDamage + 15000 });
		}
	}

	buyReview(e) {
		if (this.state.score >= this.state.reviewCost) {
			this.setState({ score: this.state.score - this.state.reviewCost });
			this.setState({ reviewCost: Math.round(this.state.reviewCost * 10.0) });
			this.setState({ passiveDamage: this.state.passiveDamage + 10000 });
		}
	}
}

export default App;
