import Logo from "../assets/images/logo.svg";
import xImage from "../assets/images/x.png";
import {useState, useEffect} from "react";

const userId = "user1"

const itemTypes = {
  CANNEDJARRED: "Canned / Jarred Goods",  // "canned-jarred"
  DAIRY: "Dairy",                         // "dairy"
  DRYBAKING: "Dry / Baking Goods",        // "dry-baking"
  FROZEN: "Frozen",                       // "frozen"
  GRAINS: "Grains",                       // "grains"
  MEAT: "Meat",                           // "meat"
  PRODUCE: "Produce",                     // "produce"
  OTHER: "Other",                         // "other"
}

const exampleData = [{
  title: "Eggs",
  quantity: 1
},
{
  title: "Milk",
  quantity: 1
},
{
  title: "Sugar",
  quantity: 1
},
{
  title: "Coffee",
  quantity: 2
}];

export default function HomePage() {

  return (
    <div className="home-page-container">
      <Topbar />
      <Sections />
    </div>
  )
}

/**
 * Topbar component for Go-Grocery HomePage
 */
function Topbar() {
  function addItem(item, list) {
    if(item.value === "" || list.value === "Select Item Type*") {
      // item not entered or item type not selected, give some user feedback
    }
    else {
      let body = JSON.stringify({ itemType: list.value, itemName: item.value.toLowerCase()})
      fetch( '/add-item', { 
        method:'POST',
        body: body,
        headers: { 'Content-Type': 'application/json' }
      })
      // response is error: true || false
      .then( response => response.json() )
      .then( json => console.log(json) )
    }
  }

  return (
    <div className="navbar navbar-light bg-light border">
      <img src={Logo} alt="Go Grocery" className="topbar-logo"/>
      <form className="form-inline">
        <input id="item"className="form-control mr-sm-2 bg-secondary input-text" type="search" placeholder="Enter Item Name*" aria-label="Search" />
        <select id="item-type-select" className="form-control bg-secondary input-text">
          <option selected>Select Item Type*</option>
          <option>Canned / Jarred Goods</option>
          <option>Dairy</option>
          <option>Dry / Baking Goods</option>
          <option>Frozen</option>
          <option>Grains</option>
          <option>Meat</option>
          <option>Produce</option>
          <option>Other</option>
        </select>
        <button type="submit" class="m-2 btn btn-primary" onClick={() => {addItem(document.getElementById("item"), document.getElementById("item-type-select"))}}>Add to List</button>
      </form>
    </div>
  )
}

function Sections() {

  const [cannedJarredData, setCannedJarredData] = useState(null);
  const [dairyData, setDairyData] = useState(null);
  const [dryBakingData, setDryBakingData] = useState(null);
  const [frozenData, setFrozenData] = useState(null);
  const [grainsData, setGrainsData] = useState(null);
  const [meatData, setMeatData] = useState(null);
  const [produceData, setProduceData] = useState(null);
  const [otherData, setOtherData] = useState(null);

  useEffect(() => {

    async function fetchUserData() {
      fetch( "/user-data", {
        method: 'GET'
      })
        .then( (response) => {
          if (response.statusCode === 200) {
            response.json().then( json => {
              setCannedJarredData(json.cannedJarredData);
              setDairyData(json.dairyData);
              setDryBakingData(json.dryBakingData);
              setFrozenData(json.frozenData);
              setGrainsData(json.grainsData);
              setMeatData(json.meatData);
              setProduceData(json.produceData);
              setOtherData(json.otherData);
            })
          } else {
            window.location = "/login";
          }
        } )

    }
    
    fetchUserData();
  }, []) 

  return (
    <div className="home-page-sections">
      <HomePageSection data={cannedJarredData} title="Canned / Jarred Goods" />
      <HomePageSection data={dairyData} title="Dairy" />
      <HomePageSection data={dryBakingData} title="Dry / Baking Goods" />
      <HomePageSection data={frozenData} title="Frozen" />
      <HomePageSection data={grainsData} title="Grains" />
      <HomePageSection data={meatData} title="Meat" />
      <HomePageSection data={produceData} title="Produce" />
      <HomePageSection data={otherData} title="Other" />
    </div>
  )
}

function HomePageSection({title, data}) {

  const [itemsDeployed, setItemsDeployed] = useState(false);

  function toggleItems() {
    setItemsDeployed(!itemsDeployed);
  }

  function renderGroceryItems() {
    if (!data) {
      return <div></div>
    }
    return data.map((item, index) => {
      return (
        <GroceryItem visible={itemsDeployed} title={item.title} index={index} group={title} />
      )
    })
  }

  return (
    <section>
      <button className={"m-2 btn section-header" + (itemsDeployed ? " btn-primary" : " btn-secondary")} onClick={() => {toggleItems()}}>
        {title}
      </button>
      <ul className="grocery-items">
        {renderGroceryItems()}
      </ul>
    </section>
  )
}

function GroceryItem({title, group, index, visible}) {

  function deleteItem() {
    console.log("Deleting item: " + title);
    let body = JSON.stringify({ itemType: group, itemName: title})
    fetch('remove-item', {
      method: 'POST',
      body: body
    })
    .then( response => response.json() )
    .then( json => console.log(json) )
  }

  return (
    <li key={index} className={"grocery-item-container " + (visible ? "" : "hidden")}>
      <div className="item-title">{title}</div>
      <button type="button" className="btn-delete" aria-label="delete" onClick={() => {deleteItem()}}>
        <img src={xImage} alt="x"/>
      </button>
    </li>
  )
}