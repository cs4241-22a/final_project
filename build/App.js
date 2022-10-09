import React from "./_snowpack/pkg/react.js";
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
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
      class: "UpgradePanelBackground",
      style: {display: "inline-block"},
      onClick: this.props.onClick
    }, /* @__PURE__ */ React.createElement("img", {
      src: this.props.img
    }), /* @__PURE__ */ React.createElement("label", null, this.props.text), /* @__PURE__ */ React.createElement("label", null, this.props.val)));
  }
}
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
  save() {
    let username = "";
    let data = [
      this.state.score,
      this.state.passiveDamage,
      this.state.lunchCost,
      this.state.hayCost,
      this.state.mashCost,
      this.state.textbookCost,
      this.state.grassCost,
      this.state.officehoursCost,
      this.state.studyCost,
      this.state.meditateCost,
      this.state.dunkinCost,
      this.state.reviewCost
    ];
    const json = {user: username, data};
    const body = JSON.stringify(json);
    fetch("/new", {
      method: "POST",
      body
    }).then(function(response) {
      outerthis.updatedata();
      document.getElementById("EditForm").reset();
      outerthis.setState({m: "off"});
      outerthis.setState({t: "off"});
      outerthis.setState({w: "off"});
      outerthis.setState({r: "off"});
      outerthis.setState({f: "off"});
      outerthis.setState({s: "off"});
      outerthis.setState({u: "off"});
    });
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
    }), /* @__PURE__ */ React.createElement("table", null, /* @__PURE__ */ React.createElement("tr", null, " ", /* @__PURE__ */ React.createElement(UpgradePanel, {
      text: "Buy Campus Center Lunch",
      val: this.state.lunchCost,
      onClick: (e) => this.buyLunch(),
      enabled: this.state.score >= this.state.lunchCost,
      img: "https://cdn.discordapp.com/attachments/709559606082535474/1028474882415132763/unknown.png"
    })), /* @__PURE__ */ React.createElement("tr", null, " ", /* @__PURE__ */ React.createElement(UpgradePanel, {
      text: "Buy Hay",
      val: this.state.hayCost,
      onClick: (e) => this.buyLunch(),
      enabled: this.state.score >= this.state.hayCost,
      img: "https://cdn.discordapp.com/attachments/709559606082535474/1028474882415132763/unknown.png"
    })), /* @__PURE__ */ React.createElement("tr", null, " ", /* @__PURE__ */ React.createElement(UpgradePanel, {
      text: "Buy MASH",
      val: this.state.mashCost,
      onClick: (e) => this.buyLunch(),
      enabled: this.state.score >= this.state.mashCost,
      img: "https://cdn.discordapp.com/attachments/709559606082535474/1028474882415132763/unknown.png"
    })), /* @__PURE__ */ React.createElement("tr", null, " ", /* @__PURE__ */ React.createElement(UpgradePanel, {
      text: "Buy Textbook",
      val: this.state.textbookCost,
      onClick: (e) => this.buyLunch(),
      enabled: this.state.score >= this.state.textbookCost,
      img: "https://cdn.discordapp.com/attachments/709559606082535474/1028474882415132763/unknown.png"
    })), /* @__PURE__ */ React.createElement("tr", null, " ", /* @__PURE__ */ React.createElement(UpgradePanel, {
      text: "Buy Grass",
      val: this.state.grassCost,
      onClick: (e) => this.buyLunch(),
      enabled: this.state.score >= this.state.grassCost,
      img: "https://cdn.discordapp.com/attachments/709559606082535474/1028474882415132763/unknown.png"
    })), /* @__PURE__ */ React.createElement("tr", null, " ", /* @__PURE__ */ React.createElement(UpgradePanel, {
      text: "Buy Office Hours",
      val: this.state.officehoursCost,
      onClick: (e) => this.buyLunch(),
      enabled: this.state.score >= this.state.officehoursCost,
      img: "https://cdn.discordapp.com/attachments/709559606082535474/1028474882415132763/unknown.png"
    })), /* @__PURE__ */ React.createElement("tr", null, " ", /* @__PURE__ */ React.createElement(UpgradePanel, {
      text: "Buy Study",
      val: this.state.studyCost,
      onClick: (e) => this.buyLunch(),
      enabled: this.state.score >= this.state.studyCost,
      img: "https://cdn.discordapp.com/attachments/709559606082535474/1028474882415132763/unknown.png"
    })), /* @__PURE__ */ React.createElement("tr", null, " ", /* @__PURE__ */ React.createElement(UpgradePanel, {
      text: "Buy Meditate",
      val: this.state.meditateCost,
      onClick: (e) => this.buyLunch(),
      enabled: this.state.score >= this.state.meditateCost,
      img: "https://cdn.discordapp.com/attachments/709559606082535474/1028474882415132763/unknown.png"
    })), /* @__PURE__ */ React.createElement("tr", null, " ", /* @__PURE__ */ React.createElement(UpgradePanel, {
      text: "Buy Dunkin",
      val: this.state.dunkinCost,
      onClick: (e) => this.buyLunch(),
      enabled: this.state.score >= this.state.dunkinCost,
      img: "https://cdn.discordapp.com/attachments/709559606082535474/1028474882415132763/unknown.png"
    })), /* @__PURE__ */ React.createElement("tr", null, " ", /* @__PURE__ */ React.createElement(UpgradePanel, {
      text: "Buy Review",
      val: this.state.reviewCost,
      onClick: (e) => this.buyLunch(),
      enabled: this.state.score >= this.state.reviewCost,
      img: "https://cdn.discordapp.com/attachments/709559606082535474/1028474882415132763/unknown.png"
    }))), /* @__PURE__ */ React.createElement("p", null, "Will use these descriptions later:", /* @__PURE__ */ React.createElement("br", null), "Buy Campus Center Lunch - Gompei will go to the Campus Center and grab a bite to eat, increasing his click strength by 1.", /* @__PURE__ */ React.createElement("br", null), "Buy Hay - Gompei will go to his hay dealer and buy some hay, increasing his passive click strength by 1.", /* @__PURE__ */ React.createElement("br", null), "Buy MASH - Gompei will attend a MASH session, teaching him how to do his Calc IV homework, increasing his click strength by 25.", /* @__PURE__ */ React.createElement("br", null), "Buy Textbook - Gompei will *buy* his course textbook, increasing his passive click strength by 10.", /* @__PURE__ */ React.createElement("br", null), "Buy Grass - Gompei eats some of the grass on the Quad, increasing his click strength by 75.", /* @__PURE__ */ React.createElement("br", null), "Buy Office Hours - Gompei will attend Noelle's and Kyle's office hour and they help him fix his bug, increasing his passive click strength by 35", /* @__PURE__ */ React.createElement("br", null), "Buy Study - Gompei takes some time to study for his next Physics Exam, increasing his click strength by 500.", /* @__PURE__ */ React.createElement("br", null), "Buy Meditate - Gompei meditates reducing his stress, increasing his passive click strength by 300.", /* @__PURE__ */ React.createElement("br", null), "Buy Dukin - Gompei buys Dunkin Donuts through the mobile app, increasing his click strength by 15000.", /* @__PURE__ */ React.createElement("br", null), "Buy Review - Gompei makes a review guide for his history exam, incrasing his passive click strength by 10000.")));
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
