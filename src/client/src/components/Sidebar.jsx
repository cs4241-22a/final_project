import React, { useEffect } from 'react'
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs'
import Resource from './Resource';

const Sidebar = ({ petName, level, onResourceClick }) => {

    const [hats, setHats] = React.useState([]);
    const [colors, setColors] = React.useState([]);
    const [species, setSpecies] = React.useState([]);

    //Request the available customizations from the server
    useEffect(() => {
        fetch(`/api/customization/${level}`).then((response) => {
            response.json().then((data) => {
                console.log(data);
                setHats(data.hats);
                setColors(data.colors);
                setSpecies(data.species);
            }).catch((error) => {
                console.log(error);
            })
        })
    }, [level])


    return (
        <div className="flex flex-col w-1/6 bg-gray-100 overflow-hidden">
            <div className="flex items-center justify-center h-20 shadow-md">
                <h1 className="text-3xl uppercase text-gray-700">Pet the JPEG</h1>
            </div>
            <div className="flex flex-col items-center h-full shadow-md">
                <h2 className='font-bold text-2xl'>{petName}</h2>
                <h3 className='text-xl'>Level: {level}</h3>
                <Tabs className="w-full mt-4 px-2">
                    <TabList className="flex flex-row justify-around border-b-2 mb-2">
                        <Tab className="flex-grow text-center py-2" selectedClassName='bg-white font-bold'>Hats</Tab>
                        <Tab className="flex-grow text-center py-2" selectedClassName='bg-white font-bold'>Colors</Tab>
                        <Tab className="flex-grow text-center py-2" selectedClassName='bg-white font-bold'>Species</Tab>
                    </TabList>
                    <TabPanel className="grid grid-cols-3 gap-2">
                        {hats.map((hat) => {
                            return (
                                <Resource key={hat.resourceID} onClick={() => onResourceClick({ resourceID: hat.resourceID, resourceType: hat.resourceType })} filePath={hat.filePath} />
                            )
                        })}
                    </TabPanel>
                    <TabPanel className="grid grid-cols-3 gap-2">
                        {colors.map((color) => {
                            return (
                                <Resource key={color.resourceID} onClick={() => onResourceClick({ resourceID: color.color, resourceType: color.resourceType })} filePath={color.filePath} />
                            )
                        })}
                    </TabPanel>
                    <TabPanel className="grid grid-cols-3 gap-2">
                        {species.map((species) => {
                            return (
                                <Resource key={species.resourceID} onClick={() => onResourceClick({ resourceID: species.resourceID, resourceType: species.resourceType })} filePath={species.filePath} />
                            )
                        })}
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}

export default Sidebar