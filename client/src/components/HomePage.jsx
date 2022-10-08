import Logo from "../assets/images/logo.svg";

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
  return (
    <div className="navbar navbar-light bg-light border">
      <img src={Logo} alt="Go Grocery" className="topbar-logo"/>
      <form className="form-inline">
        <input className="form-control mr-sm-2 bg-secondary input-text" type="search" placeholder="Enter Item Name*" aria-label="Search" />
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
        <button type="submit" class="m-2 btn btn-primary">Add to List</button>
      </form>
    </div>
  )
}

function Sections() {
  return (
    <div className="home-page-sections">

    </div>
  )
}