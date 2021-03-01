import styles from "../styles/Home.module.css"
import Head from "next/head"
import QueryDataForm from "../components/QueryDataForm"


export default function Home(){


    return (
        <div className={styles.containter}>
            <Head>
                <title>Test</title>
            </Head>

            <h1>test</h1>

            <p>session data</p>

            <QueryDataForm />

        </div>
    )
}

