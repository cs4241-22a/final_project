import Logo from "../assets/images/logo.svg";
import xImage from "../assets/images/x.png";
import {useState, useEffect} from "react";

export default function HomePage() {

  const [cannedJarredData, setCannedJarredData] = useState(null);
  const [dairyData, setDairyData] = useState(null);
  const [dryBakingData, setDryBakingData] = useState(null);
  const [frozenData, setFrozenData] = useState(null);
  const [grainsData, setGrainsData] = useState(null);
  const [meatData, setMeatData] = useState(null);
  const [produceData, setProduceData] = useState(null);
  const [otherData, setOtherData] = useState(null);

  async function fetchUserData() {
    fetch( "/user-data", {
      method: 'GET'
    })
      .then( (response) => {
        if (response.status === 200) {
          response.json().then( json => {
            const data = JSON.parse(json);
            setCannedJarredData(data.cannedJarredData);
            setDairyData(data.dairyData);
            setDryBakingData(data.dryBakingData);
            setFrozenData(data.frozenData);
            setGrainsData(data.grainsData);
            setMeatData(data.meatData);
            setProduceData(data.produceData);
            setOtherData(data.otherData);
          })
        } else {
          window.location = "/login";
        }
      } )

  }

  useEffect(() => {
    fetchUserData();
  }, []) 

  return (
    <div className="home-page-container">
      <Topbar fetchUserData={fetchUserData}/>
      <Sections 
      cannedJarredData={cannedJarredData}
      dairyData={dairyData}
      dryBakingData={dryBakingData}
      frozenData={frozenData}
      grainsData={grainsData}
      meatData={meatData}
      produceData={produceData}
      otherData={otherData}/>
    </div>
  )
}

/**
 * Topbar component for Go-Grocery HomePage
 */
function Topbar({fetchUserData}) {
  function addItem(item, list) {
    let error = false;
    if(item.value === "") {
      // item not entered— give some user feedback
      item.classList.add("is-invalid");
      error = true;
    }
    if (list.value === "Select Item Type*") {
      // item type not selected— give some user feedback
      list.classList.add("is-invalid");
      error = true;
    }
    if (error) {
      return;
    }
    list.classList.remove("is-invalid");
    item.classList.remove("is-invalid");
    list.classList.add("is-valid");
    item.classList.add("is-valid");
    let body = JSON.stringify({ itemType: list.value, itemName: item.value.toLowerCase()});
    fetch( '/add-item', { 
      method:'POST',
      body: body,
      headers: { 'Content-Type': 'application/json' }
    })
    // response is error: true || false
    .then( response => {
      if (response.status === 200) {
        list.value = "Select Item Type*";
        item.value = "";
        fetchUserData();
        setTimeout(() => {    
          // Remove decoration in one second
          list.classList.remove("is-valid");
          item.classList.remove("is-valid");
        }, 1000);
      }
    } );
  }

  return (
    <div className="navbar navbar-light bg-light border">
      <img src={Logo} alt="Go Grocery" className="topbar-logo"/>
      <div className="form-inline">
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
        <button class="m-2 btn btn-primary" onClick={() => {addItem(document.getElementById("item"), document.getElementById("item-type-select"))}}>Add to List</button>
      </div>
    </div>
  )
}

function Sections(props) {

  return (
    <div className="home-page-sections">
      <HomePageSection data={props.cannedJarredData} title="Canned / Jarred Goods" />
      <HomePageSection data={props.dairyData} title="Dairy" />
      <HomePageSection data={props.dryBakingData} title="Dry / Baking Goods" />
      <HomePageSection data={props.frozenData} title="Frozen" />
      <HomePageSection data={props.grainsData} title="Grains" />
      <HomePageSection data={props.meatData} title="Meat" />
      <HomePageSection data={props.produceData} title="Produce" />
      <HomePageSection data={props.otherData} title="Other" />
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