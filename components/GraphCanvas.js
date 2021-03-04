import {useEffect, useRef} from "react"
import styles from "../styles/Home.module.css"


export default function GraphCanvas({data}) {

    const canvasRef = useRef(null)

    useEffect(() => {
        
        const canvas = canvasRef.current
        const g = canvas.getContext("2d")
        const w = canvas.width
        const h = canvas.height
        const padding = 10
        const xOffset = 45

        // console.log(canvas.width, canvas.height, w, h)
        g.clearRect(0, 0, 1000, 10000)
        g.fillStyle = "#333333"
        g.font = "12px Arial"

        try{
            const startDate = new Date(data[0].Date)
            const endDate = new Date(data[data.length - 1].Date)
            const totalTime = endDate.getTime() - startDate.getTime()

            let confirmedHighest = 1
            let confirmedLowest = Infinity

            let deathsHighest = 1
            let deathsLowest = Infinity

            let recoveredHighest = 1
            let recoveredLowest = Infinity

            let activeHighest = 1
            let activeLowest = Infinity

            data.map(({Confirmed, Deaths, Recovered, Active}) => {

                if(Confirmed > confirmedHighest)
                    confirmedHighest = Confirmed
                if(Confirmed < confirmedLowest)
                    confirmedLowest = Confirmed

                if(Deaths > deathsHighest)
                    deathsHighest = Deaths
                if(Deaths < deathsLowest)
                    deathsLowest = Deaths

                if(Recovered > recoveredHighest)
                    recoveredHighest = Recovered
                if(Recovered < recoveredLowest)
                    recoveredLowest = Recovered

                if(Active > activeHighest)
                    activeHighest = Active
                if(Active < activeLowest)
                    activeLowest = Active
            })
            const ySpan = 
                    Math.max(confirmedHighest, deathsHighest, recoveredHighest) - 
                    Math.max(confirmedLowest, deathsLowest, recoveredLowest)

            const confirmedYSpan = confirmedHighest - confirmedLowest
            const deathsYSpan = deathsHighest - deathsLowest
            const recoveredYSpan = recoveredHighest - recoveredLowest
            const activeYSpan = activeHighest - activeLowest
    
            // console.log(startDate, endDate)
            console.log(ySpan, Math.max(confirmedHighest, deathsHighest, recoveredHighest), confirmedHighest, deathsHighest, recoveredHighest)

            const drawGraph = (dataDate, dataType, lowestValue, yAxisSpan) => {
                let date = new Date(dataDate)
                let timeDiff = date.getTime() - startDate.getTime()
                let percentageX = timeDiff / totalTime
                let percentageY = (dataType - lowestValue) / yAxisSpan
                // console.log(percentageX, percentageY)

                let x = (w - padding * 2 - xOffset) * percentageX + padding + xOffset
                let y = h - ((h - padding * 2) * percentageY) - padding

                return [x, y]
            }
            /*
                Graph for confirmed cases
            */
            g.strokeStyle ="#3cc"
            g.beginPath()
            data.map((obj) => {
                let [x, y] = drawGraph(obj.Date, obj.Confirmed, confirmedLowest, confirmedYSpan)

                g.lineTo(x, y)
            })
            g.stroke()

            /*
                Graph for deaths
            */
            g.strokeStyle ="#c33"
            g.beginPath()
            data.map((obj) => {
                let [x, y] = drawGraph(obj.Date, obj.Deaths, deathsLowest, deathsYSpan)

                g.lineTo(x, y)
            })
            g.stroke()

            /*
                Graph for recovered
            */
            g.strokeStyle ="#3c3"
            g.beginPath()
            data.map((obj) => {
                let [x, y] = drawGraph(obj.Date, obj.Recovered, recoveredLowest, recoveredYSpan)

                g.lineTo(x, y)})
            g.stroke()

            /*
                Graph for active cases
            */
            g.strokeStyle ="#333"
            g.beginPath()
            data.map((obj) => {
                let [x, y] = drawGraph(obj.Date, obj.Active, activeLowest, activeYSpan)

                g.lineTo(x, y)})
            g.stroke()

            // g.fillText(`${highestNumber}`, 2, 12)
            // g.fillText(`${lowestNumber}`, 2, h -2)


        }catch(error){
            console.log(error)
            g.fillText("Please query data to display a graph", w/2 - 100, h/2)
        }

    }, [data])

    return (
        <div className={styles.canvasContainer}>
            <canvas id="graphCanvas" ref={canvasRef}></canvas>
        </div>
    )



}




