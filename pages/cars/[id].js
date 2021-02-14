
import {useRouter} from "next/router"

export default function Car(){

    const router = useRouter()
    const {id} = router.query

    return <h2>bil med navn {id}</h2>


}




