import { useEffect, useState, useRef, useMemo, createElement, createContext} from "react"
import { createRoot } from "react-dom/client"
import { Grommet, Box, Button, Form, FormField, TextInput, Header, Layer, List, Main, NameValueList, NameValuePair, Page, PageContent, Text } from 'grommet'

function useAccelerometer() {
    const [acc, setAcc] = useState(0)

    useEffect(() => {
        function update({acceleration}) {
            const {x, y, z} = acceleration
            setAcc(Math.sqrt(x**2 + y**2 + z**2).toPrecision(3))
        }
        
        addEventListener ("devicemotion", update, true)
        return () => removeEventListener ("devicemotion", update)
    })
    return acc;
}


function useTimer() {
    const initial = Date.now();
    const [startTime, setStartTime] = useState(initial)
    const [started, setStarted] = useState(false)
    const [time, setTime] = useState(0)
    const updateTime = () => setTime(Date.now() - startTime)

    
    useEffect(() => {
        if (started)
            requestAnimationFrame(() => updateTime())
    }, [started, time])
    
    
    function toggle() {
        if (started) {
            updateTime
            setStarted(started => !started)
        } else if (0 === time) {
            updateTime()
            setStartTime(Date.now)
            setStarted(started => !started)
        }
        
    }
    
    return [time, started, toggle, () => setTime(0)]
}

function useAccelerometerThreshold(threshold, f) {
    const acc = useAccelerometer()
    
    useEffect (() => {
        if (acc >= threshold)
            f()
    }, [acc])
    
    return acc

}

function useDebounce(f, wait) {
    const lastTime = useRef(0)

    function update (...args) {
        if (wait <= Date.now() - lastTime.current) {
            lastTime.current = Date.now()
            f(...args)
        }
    }
    return update
}

function updateTimes (f) {
    fetch("/time")
        .then ((response) => response.json())
        .then(f)
}

function timeString (time) {
    return (time/1000).toFixed(2)
}

function TimerController() {
    const [time, started, toggleTimer, reset] = useTimer()
    const [times, setTimes] = useState([])
    const debouncedTimer = useDebounce(toggleTimer, 250)
    useAccelerometerThreshold (0.5, debouncedTimer);
    useEffect(() => updateTimes(({times}) => setTimes(times)), [])
    
    const submitButton = useMemo(() =>
        <Button primary
                onClick={() => fetch("/time",
                                     {method: "post",
                                      headers: {"Content-Type": "application/json"},
                                      body: JSON.stringify({time})})
                         .then(ensureOk)
                         .then(reset)
                         .then (updateTimes(({times}) => setTimes(times)))}
                size="large"
                label="Submit Time" />, [started])

    return <Box align="center" alignContent="around" gap="medium">
               <Text size="6xl">{timeString (time)}</Text>
               {(time === 0 || started) ?
                <Button primary
                        onClick={debouncedTimer}
                        size="large"
                        label={started ? "Stop" : "Start"} /> :
                <Button primary
                        onClick={reset}
                        size="large"
                        label="Reset" />}
               {!started && time !=0 && submitButton}
               <List itemKey="_id" data={times}
                     primaryKey={(item) => <Text>{timeString (item?.time ?? 0)}</Text>}
                     onClickItem={({item: {_id}}) => fetch(`/time/${_id}`,
                                                           {method: "delete"})
                                  .then(updateTimes(({times}) => setTimes(times)))}/>
           </Box>
}

const theme = {
    global: {
        font: {
            family: 'Roboto',
            size: '18px',
            height: '20px',
        },
    },
};

function ensureOk({ok}) {
    if (!ok)
        throw new Error("Error")
    
}

function Login({loggedIn, setLoggedIn}) {
    const [showLogin, setShowLogin] = useState()
    return (
        <>
            <Button primary label={loggedIn ? "View Leaderboards" : "Submit Time"}
                    onClick={() => {
                        if (!loggedIn)
                            setShowLogin(true)
                        else
                            fetch("/logout", {method: "post"})
                            .then(() => setLoggedIn(false))
                    }}/>
            {showLogin &&
             <Layer 
                 onEsc={() => setShowLogin(false)}>
                 <Box pad="medium">
                     <Form onSubmit={({value}) => {
                               fetch("login",
                                     {method: "post",
                                      headers: {"Content-Type": "application/json"},
                                      body: JSON.stringify(value)})
                                   .then(ensureOk)
                                   .then(() => setShowLogin(false))
                                   .then(() => setLoggedIn(true))
                           }}>
                         <FormField name="username"
                                    htmlFor="username"
                                    label="Username">
                             <TextInput id="username" name="username"/>
                         </FormField>
                         <FormField name="password"
                                    htmlFor="password"
                                    label="Password">
                             <TextInput id="password" type="password" name="password" />
                         </FormField>
                         <Button type="submit" label="Submit" />
                     </Form>
                 </Box>
             </Layer>
            }
        </>
    )
    
}

function Leaderboards() {
    const [records, setRecords] = useState([])

    useEffect(() => {
        fetch("/leaderboard")
            .then (r => r.json())
            .then (({leaderboard}) => setRecords(leaderboard))
    }, [])
    
    return (
        <NameValueList layout="grid">
            {records.map(({time, name}, i) =>
                <NameValuePair key={name} name={timeString(time)}>
                    <Text>{i+1}. {name}</Text>
                </NameValuePair>)}
        </NameValueList>
    )
    
}


function Root() {
    const [loggedIn, setLoggedIn] = useState()
    return (
        <>
            <Grommet theme={theme} cssVars={true} themeMode="dark">
                <Main>
                    <Header flex background="brand" pad="medium">
                        <Text size="xlarge" weight="bold">Timer</Text>
                        <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
                    </Header>
                    <Page>
                        <PageContent>
                            {loggedIn &&
                             <TimerController /> ||
                             <Leaderboards />}
                        </PageContent>
                    </Page>
                </Main>
            </Grommet>
        </>
    )
}


const domContainer = document.getElementById('app');
const root = createRoot(domContainer)
root.render(createElement(Root));
