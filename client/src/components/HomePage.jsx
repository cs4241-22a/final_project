import Logo from "../assets/images/logo.svg";
import xImage from "../assets/images/x.png";
import arrowImg from "../assets/images/next-single-arrow.png";
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

  async function fetchCartData() {
    fetch( `/cart-data?cart=${window.location.hash.substring(1)}`, {
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
        }
      } )

  }

  useEffect(() => {
    fetchCartData();
  }, []) 

  return (
    <div className="home-page-container">
      <Topbar fetchCartData={fetchCartData}/>
      <Sections 
      cannedJarredData={cannedJarredData}
      dairyData={dairyData}
      dryBakingData={dryBakingData}
      frozenData={frozenData}
      grainsData={grainsData}
      meatData={meatData}
      produceData={produceData}
      otherData={otherData}
      fetchCartData={fetchCartData}/>
    </div>
  )
}

/**
 * Topbar component for Go-Grocery HomePage
 */
function Topbar({fetchCartData}) {
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
    let body = JSON.stringify({ itemType: list.value, itemName: item.value.toLowerCase(), cartCode: window.location.hash.substring(1)});
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
        fetchCartData();
        setTimeout(() => {    
          // Remove decoration in one second
          list.classList.remove("is-valid");
          item.classList.remove("is-valid");
        }, 1000);
      }
    } );
  }

  // Just used for updating placeholder text in cart code input
  const [cartCode, setCartCode] = useState(window.location.hash.substring(1));
  const [homeCart, setHomeCart] = useState(null);

  useEffect(() => {
    // Fetch user's home cart on load
    fetch("/home-cart").then((res) => {
      if (res.status === 200) {
        res.json().then(d => {
          setHomeCart(JSON.parse(d).homeCart);
        })
      } else {
        setHomeCart("ERROR!");
      }
    })
  }, [])

  function changeCart() {
    const input = document.getElementById("cart-code");
    if (input.value.length === 6) {
      setCartCode(input.value);
      window.location.hash = input.value;
      input.classList.remove("is-invalid");
      fetchCartData();
    } else {
      input.classList.add("is-invalid");
    }
  }

  return (
    <div className="navbar navbar-light bg-light border">
      <img src={Logo} alt="Go Grocery" className="topbar-logo"/>
      <p>Your home cart: {homeCart}</p>
      <div className="form-inline">
        <input id="cart-code" className="form-control mr-sm-2 bg-secondary input-text" type="search" placeholder={cartCode} aria-label="Search" />
        <button class="m-2 btn btn-secondary" onClick={() => changeCart()}>Change Cart</button>
        <input id="item" className="form-control mr-sm-2 bg-secondary input-text" type="search" placeholder="Enter Item Name*" aria-label="Search" />
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
      <HomePageSection fetchCartData={props.fetchCartData} data={props.cannedJarredData} title="Canned / Jarred Goods" />
      <HomePageSection fetchCartData={props.fetchCartData} data={props.dairyData} title="Dairy" />
      <HomePageSection fetchCartData={props.fetchCartData} data={props.dryBakingData} title="Dry / Baking Goods" />
      <HomePageSection fetchCartData={props.fetchCartData} data={props.frozenData} title="Frozen" />
      <HomePageSection fetchCartData={props.fetchCartData} data={props.grainsData} title="Grains" />
      <HomePageSection fetchCartData={props.fetchCartData} data={props.meatData} title="Meat" />
      <HomePageSection fetchCartData={props.fetchCartData} data={props.produceData} title="Produce" />
      <HomePageSection fetchCartData={props.fetchCartData} data={props.otherData} title="Other" />
    </div>
  )
}

function HomePageSection({fetchCartData, title, data}) {

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
        <GroceryItem fetchCartData={fetchCartData} visible={itemsDeployed} title={item} index={index} group={title} />
      )
    })
  }

  return (
    <section>
      <button className={"m-2 btn section-header" + (itemsDeployed ? " btn-primary" : " btn-secondary")} onClick={() => {toggleItems()}}>
        <div className="side">
          <img src={arrowImg} alt="arrow" className={(itemsDeployed ? "turned" : "")}/>
        </div>
        <div className="center">{title}</div>
        <div className="side"></div>
      </button>
      <ul className="grocery-items">
        {renderGroceryItems()}
      </ul>
    </section>
  )
}

function GroceryItem({title, group, index, visible, fetchCartData}) {

  function deleteItem() {
    console.log("Deleting item: " + title);
    let body = JSON.stringify({ itemType: group, itemName: title, cartCode: window.location.hash.substring(1)})
    fetch('/remove-item', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
    })
    .then( response => {
      if (response.status === 200) {
        fetchCartData();
      }
    } );
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