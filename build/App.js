import React from "./_snowpack/pkg/react.js";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      passiveDamage: 0,
      clickDamage: 1,
      lunchCost: 15,
      hayCost: 30,
      mashCost: 200,
      textbookCost: 250,
      grassCost: 1e3,
      officehoursCost: 1500,
      studyCost: 12500,
      meditateCost: 25e3,
      dunkinCost: 137500,
      reviewCost: 5e5
    };
    window.appState = this;
    this.startTimer();
  }
  render() {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement("h1", null, "Gompei Clicker"), /* @__PURE__ */ React.createElement("p", null, "Score: ", /* @__PURE__ */ React.createElement("span", {
      id: "score"
    }, this.state.score), " Click Damage: ", /* @__PURE__ */ React.createElement("span", {
      id: "click-damage"
    }, this.state.clickDamage), " Passive Damage: ", /* @__PURE__ */ React.createElement("span", {
      id: "passive-damage"
    }, this.state.passiveDamage), " "), /* @__PURE__ */ React.createElement("img", {
      src: "/gompei.png",
      height: "256px",
      width: "256px",
      alt: "Gompei",
      onClick: (e) => this.addToScore()
    }), /* @__PURE__ */ React.createElement("button", {
      onClick: (e) => this.buyLunch()
    }, " Buy Campus Center Lunch [", /* @__PURE__ */ React.createElement("span", {
      id: "lunch-cost"
    }, this.state.lunchCost), "]"), /* @__PURE__ */ React.createElement("button", {
      onClick: (e) => this.buyHay()
    }, " Buy Hay [", /* @__PURE__ */ React.createElement("span", {
      id: "hay-cost"
    }, this.state.hayCost), "]"), /* @__PURE__ */ React.createElement("button", {
      onClick: (e) => this.buyMash()
    }, " Buy MASH [", /* @__PURE__ */ React.createElement("span", {
      id: "mash-cost"
    }, this.state.mashCost), "]"), /* @__PURE__ */ React.createElement("button", {
      onClick: (e) => this.buyTextbook()
    }, " Buy Textbook [", /* @__PURE__ */ React.createElement("span", {
      id: "textbook-cost"
    }, this.state.textbookCost), "]"), /* @__PURE__ */ React.createElement("button", {
      onClick: (e) => this.buyGrass()
    }, " Buy Grass [", /* @__PURE__ */ React.createElement("span", {
      id: "grass-cost"
    }, this.state.grassCost), "] "), /* @__PURE__ */ React.createElement("button", {
      onClick: (e) => this.buyOfficeHours()
    }, " Buy Office Hours [", /* @__PURE__ */ React.createElement("span", {
      id: "office-hours-cost"
    }, this.state.officehoursCost), "]"), /* @__PURE__ */ React.createElement("button", {
      onClick: (e) => this.buyStudy()
    }, " Buy Study [", /* @__PURE__ */ React.createElement("span", {
      id: "study-cost"
    }, this.state.studyCost), "]"), /* @__PURE__ */ React.createElement("button", {
      onClick: (e) => this.buyMeditate()
    }, " Buy Meditate [", /* @__PURE__ */ React.createElement("span", {
      id: "meditate-cost"
    }, this.state.meditateCost), "]"), /* @__PURE__ */ React.createElement("button", {
      onClick: (e) => this.buyDunkin()
    }, " Buy Dunkin [", /* @__PURE__ */ React.createElement("span", {
      id: "dunkin-cost"
    }, this.state.dunkinCost), "] "), /* @__PURE__ */ React.createElement("button", {
      onClick: (e) => this.buyReview()
    }, " Buy Review [", /* @__PURE__ */ React.createElement("span", {
      id: "review-cost"
    }, this.state.reviewCost), "]"), /* @__PURE__ */ React.createElement("p", null, "Will use these descriptions later:", /* @__PURE__ */ React.createElement("br", null), "Buy Campus Center Lunch - Gompei will go to the Campus Center and grab a bite to eat, increasing his click strength by 1.", /* @__PURE__ */ React.createElement("br", null), "Buy Hay - Gompei will go to his hay dealer and buy some hay, increasing his passive click strength by 1.", /* @__PURE__ */ React.createElement("br", null), "Buy MASH - Gompei will attend a MASH session, teaching him how to do his Calc IV homework, increasing his click strength by 25.", /* @__PURE__ */ React.createElement("br", null), "Buy Textbook - Gompei will *buy* his course textbook, increasing his passive click strength by 10.", /* @__PURE__ */ React.createElement("br", null), "Buy Grass - Gompei eats some of the grass on the Quad, increasing his click strength by 75.", /* @__PURE__ */ React.createElement("br", null), "Buy Office Hours - Gompei will attend Noelle's and Kyle's office hour and they help him fix his bug, increasing his passive click strength by 35", /* @__PURE__ */ React.createElement("br", null), "Buy Study - Gompei takes some time to study for his next Physics Exam, increasing his click strength by 500.", /* @__PURE__ */ React.createElement("br", null), "Buy Meditate - Gompei meditates reducing his stress, increasing his passive click strength by 300.", /* @__PURE__ */ React.createElement("br", null), "Buy Dukin - Gompei buys Dunkin Donuts through the mobile app, increasing his click strength by 15000.", /* @__PURE__ */ React.createElement("br", null), "Buy Review - Gompei makes a review guide for his history exam, incrasing his passive click strength by 10000.")));
  }
  addToScore(e) {
    this.setState({score: this.state.score + this.state.clickDamage});
  }
  startTimer() {
    setInterval(() => {
      this.setState({score: this.state.score + this.state.passiveDamage});
    }, 500);
  }
  buyLunch(e) {
    if (this.state.score >= this.state.lunchCost) {
      this.setState({score: this.state.score - this.state.lunchCost});
      this.setState({lunchCost: Math.round(this.state.lunchCost * 1.1)});
      this.setState({clickDamage: this.state.clickDamage + 1});
    }
  }
  buyHay(e) {
    if (this.state.score >= this.state.hayCost) {
      this.setState({score: this.state.score - this.state.hayCost});
      this.setState({hayCost: Math.round(this.state.hayCost * 1.3)});
      this.setState({passiveDamage: this.state.passiveDamage + 1});
    }
  }
  buyMash(e) {
    if (this.state.score >= this.state.mashCost) {
      this.setState({score: this.state.score - this.state.mashCost});
      this.setState({mashCost: Math.round(this.state.mashCost * 1.75)});
      this.setState({clickDamage: this.state.clickDamage + 25});
    }
  }
  buyTextbook(e) {
    if (this.state.score >= this.state.textbookCost) {
      this.setState({score: this.state.score - this.state.textbookCost});
      this.setState({textbookCost: Math.round(this.state.textbookCost * 2)});
      this.setState({passiveDamage: this.state.passiveDamage + 10});
    }
  }
  buyGrass(e) {
    if (this.state.score >= this.state.grassCost) {
      this.setState({score: this.state.score - this.state.grassCost});
      this.setState({grassCost: Math.round(this.state.grassCost * 2.25)});
      this.setState({clickDamage: this.state.clickDamage + 75});
    }
  }
  buyOfficeHours(e) {
    if (this.state.score >= this.state.officehoursCost) {
      this.setState({score: this.state.score - this.state.officehoursCost});
      this.setState({officehoursCost: Math.round(this.state.officehoursCost * 2.5)});
      this.setState({passiveDamage: this.state.passiveDamage + 35});
    }
  }
  buyStudy(e) {
    if (this.state.score >= this.state.studyCost) {
      this.setState({score: this.state.score - this.state.studyCost});
      this.setState({studyCost: Math.round(this.state.studyCost * 4)});
      this.setState({clickDamage: this.state.clickDamage + 500});
    }
  }
  buyMeditate(e) {
    if (this.state.score >= this.state.meditateCost) {
      this.setState({score: this.state.score - this.state.meditateCost});
      this.setState({meditateCost: Math.round(this.state.meditateCost * 5)});
      this.setState({passiveDamage: this.state.passiveDamage + 300});
    }
  }
  buyDunkin(e) {
    if (this.state.score >= this.state.dunkinCost) {
      this.setState({score: this.state.score - this.state.dunkinCost});
      this.setState({dunkinCost: Math.round(this.state.dunkinCost * 10)});
      this.setState({clickDamage: this.state.clickDamage + 15e3});
    }
  }
  buyReview(e) {
    if (this.state.score >= this.state.reviewCost) {
      this.setState({score: this.state.score - this.state.reviewCost});
      this.setState({reviewCost: Math.round(this.state.reviewCost * 10)});
      this.setState({passiveDamage: this.state.passiveDamage + 1e4});
    }
  }
}
export default App;
