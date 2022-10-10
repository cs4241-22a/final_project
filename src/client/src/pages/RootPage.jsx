import React from 'react'
import { useEffect } from 'react';
import Pet from '../components/Pet';
import Sidebar from '../components/Sidebar';

const RootPage = () => {
    const [xp, setXP] = React.useState(50);
    const [level, setLevel] = React.useState(1);
    const [xpToNextLevel, setXPToNextLevel] = React.useState(100);
    const [petName, setPetName] = React.useState("Pet Name");
    const [githubUsername, setGithubUsername] = React.useState("Github Username");
    const [hat, setHat] = React.useState("");
    const [color, setColor] = React.useState("");
    const [species, setSpecies] = React.useState("");

    useEffect(() => {
        fetch("/api/pet").then((response) => {
            //Parse the data from response, then update state
            response.json().then((data) => {
                console.log(data);
                setXP(data.xp);
                setLevel(data.level);
                setXPToNextLevel(data.xpToNextLevel);
                setPetName(data.name);
                setGithubUsername(data.githubUsername);
                setHat(data.hat);
                setColor(data.color);
                setSpecies(data.species);
            }).catch((error) => {
                //Mock data for now
                const mockData = {
                    name: "Richard",
                    level: 2,
                    xp: 103,
                    xpToNextLevel: 200,
                    hat: 1,
                    color: 3,
                }
                setPetName(mockData.name);
                setLevel(mockData.level);
                setXP(mockData.xp);
                setXPToNextLevel(mockData.xpToNextLevel);
            })
        })
    }, [])


    const handleResourceClick = ({resourceID, resourceType}) => {
        switch(resourceType){
            case "HAT":
                setHat(resourceID);
                break;
            case "COLOR":
                setColor(resourceID);
                break;
            case "SPECIES":
                setSpecies(resourceID);
                break;
            default:
                break;
        }
    }

    const handleClick = () => {
        fetch("/api/pet/click", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            response.json().then((data) => {
                setXP(data.xp);
                if(data.level != level){
                    setLevel(data.level);
                    setXPToNextLevel(data.xpToNextLevel);
                }
            }).catch((error) => {
                const mockData = {
                    name: "Richard",
                    level: 2,
                    xp: 103,
                    xpToNextLevel: 200,
                    hat: 1,
                    color: 3,
                }
                //Verify?
            })
        })
        
    }

    return (
        <div className="min-h-screen flex flex-row bg-gray-100">
            <Sidebar petName={petName} level={level} onResourceClick={handleResourceClick}/>
            <div className='flex justify-center items-center flex-col w-full gap-4 bg-gray-800'>
                <Pet hatID={hat} speciesID={species} colorID={color} onClick={handleClick} />
                <progress id="file" value={xp} max={xpToNextLevel}> {xp} </progress>
                <div className="my-4 text-center">
                    <p id="totalXP" className="text-2xl">Total XP: <span className="font-bold text-blue-600">{xp}</span></p>
                    <p id="nextLevelXP" className="text-2xl">To Next Level <span className="font-bold text-red-500">{xpToNextLevel}</span></p>
                </div>
            </div>
        </div>
    )
}

export default RootPage