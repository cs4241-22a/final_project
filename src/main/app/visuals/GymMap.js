import * as d3 from 'd3'
import App from '../App'

export default class GymMap
{
    constructor(parentDivID)
    {
        //Selecting the parent div
        this.app = new App()
        this.svgContainer = d3.select(document.getElementById(parentDivID))
        this.d3 = d3
        this._loadSvg()
        this._TOTAL_SECTIONS = 28
        this._HIGHLIGHT_COLOR = "rgba(152,255,152,0.8)"

    }

    _loadSvg()
    {
        //clearing all child elements
        this.svgContainer.selectAll("*").remove()
        this.data = null;
        //load svg data
        d3.svg("./gym_map.svg")
        .then(data => {
            this.data = data
            d3.select("#gymMap").node().append(data.documentElement)
        }).then(() => {
            d3.select("#gymMap").style("background", "#E0E0E0")
        }).then(() => {
            let toolTip = d3.select("body").append("div")
                .attr("class", "tooltip")				
                .style("opacity", 0);

            for(let section = 1; section <= this._TOTAL_SECTIONS; section++)
            {
                d3.select("#gymMap").select(`#section${section}`).on("mouseover", (d) => {
                     //console.log(d)
                     toolTip.transition(200).style("opacity", .9)
                     let climbsHTML = ""
                     this.app.filteredClimbManager.getClimbsInSection(section).forEach(climb => {
                        climbsHTML += `${climb.grade}, ${climb.color} </br>`
                     })

                     toolTip.html(climbsHTML).style("left", d.layerX + "px").style("top", (d.layerY-28) + "px")
                })
                .on("mouseout", (d) => {
                    toolTip.transition()
                        .duration(500)
                        .style("opacity", 0)
                })
            }

        }) 
    }

    /**
     * Updates the svg to highlight all the selected sections
     * @param {Array of sections} sectionsSelected 
     */
    updateHighlightedSections(sectionsSelected)
    {
        //Note: sections are not zero indexed

        //Reset colors
        let sectionColors = []
        for(let i = 1; i <= this._TOTAL_SECTIONS; i++)
            sectionColors[i] = "#BFBFBF"
        
        //Set selected section colors
        sectionsSelected.forEach(section => sectionColors[section] = this._HIGHLIGHT_COLOR)

        //update svg colors
        for(let section = 1; section <= this._TOTAL_SECTIONS; section++){
            d3.select("#gymMap").select(`#section${section}`).style("fill", sectionColors[section])
        }
    }
}




