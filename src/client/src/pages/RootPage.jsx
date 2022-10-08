import React from 'react'
import { useEffect } from 'react';

const RootPage = () => {
    const [xp, setXP] = React.useState(50);
    const [level, setLevel] = React.useState(1);
    const [xpToNextLevel, setXPToNextLevel] = React.useState(100);
    const [petName, setPetName] = React.useState("Pet Name");
    const [githubUsername, setGithubUsername] = React.useState("Github Username");
    const [hat, setHat] = React.useState(0);
    const [color, setColor] = React.useState(0);
    const [species, setSpecies] = React.useState(0);

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
            <div className="flex flex-col w-1/6 bg-gray-100 overflow-hidden">
                <div className="flex items-center justify-center h-20 shadow-md">
                    <h1 className="text-3xl uppercase text-gray-700">Pet the JPEG</h1>
                </div>
                <div className="flex flex-col items-center h-full shadow-md">
                    <h2 className='font-bold text-2xl'>{petName}</h2>
                    <h3 className='text-xl'>Level: {level}</h3>
                </div>
            </div>
            <div className='flex justify-center items-center flex-col w-full gap-4 bg-gray-800'>
                <img onClick={() => handleClick()} src="https://clipartix.com/wp-content/uploads/2019/02/black-cat-clipart-2-2019-9.png" alt="Pet" width="200px" />
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