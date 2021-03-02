import styles from "../styles/Home.module.css"
import Head from "next/head"
import QueryDataForm from "../components/QueryDataForm"


export default function Home(){


    return (
        <div className={styles.containter}>
            <Head>
                <title>Covid 19 data visualization</title>
            </Head>

            <h1>Program</h1>

            <QueryDataForm />

        </div>
    )
}

