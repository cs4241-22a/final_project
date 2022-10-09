import * as d3 from 'd3'

export default class GymMap
{
    constructor(parentDivID)
    {
        //Selecting the parent div
        this.svgContainer = d3.select(document.getElementById(parentDivID))

        this._loadSvg()
        this._TOTAL_ZONES = 6

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

    updateHighlightedSections(sectionsSelected)
    {
        //Reset colors
        let sectionColors = []
        for(let i = 0; i < totalSections; section++)
            sectionColors[i] = "white"

        for(section in sectionsSelected)
            sectionColors[sectionColors] = "red"

        for(let section = 0; section < totalSections; section++){
            d3.select("#gymMap").select(`section${section}`).style("fill", "white")
        }
    }
}




