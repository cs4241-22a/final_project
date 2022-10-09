import * as d3 from 'd3'

export default class GymMap
{
    constructor(parentDivID)
    {
        //Selecting the parent div
        this.svgContainer = d3.select(document.getElementById(parentDivID))

        this._loadSvg()

    }

    _loadSvg()
    {
        //clearing all child elements
        this.svgContainer.selectAll("*").remove()

        //load svg data
        d3.svg("./gym_map.svg")
        .then(data => {
            d3.select("#gymMap").node().append(data.documentElement)
            //d3.select("#gymMap").select("#zone2").style("fill", "red")
        })
    }
}




