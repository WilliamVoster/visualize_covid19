import {useState} from "react"
import styles from "../styles/Home.module.css"
import Head from "next/head"
import QueryDataForm from "../components/QueryDataForm"


export default function Home(){

    const [data, setData] = useState([])


    return (
        <div className={styles.containter}>
            <Head>
                <title>Covid 19 data visualization</title>
            </Head>

            <h1>Program</h1>

            <QueryDataForm data={data} setData={setData} />

            <div>

                {data}

            </div>

        </div>
    )
}

