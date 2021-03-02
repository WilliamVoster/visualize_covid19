import useLocalStorage from "../hooks/useLocalStorage"


export default function QueryDataForm(){
    
    const [countries, setCountries] = useLocalStorage("countries", [])

    let queryCountries = async () => {
        const res = await fetch("https://api.covid19api.com/countries")
        const json = await res.json()

        setCountries(json)
    }
    
    const action = e => {
        e.preventDefault()
        console.log("submitted")

        console.log(e)

        queryCountries()
        console.log(countries)
    }

    const clearStorage = () => {
        setCountries([]);
        console.log("Cleared storage")
    }
    
    const displayStorage = () => {
        console.log(countries)
    }


    return (
        <>
            <button type="button" onClick={clearStorage}>clear local storage</button>

            <button type="button" onClick={displayStorage}>display local storage</button>

            <form onSubmit={action}>
                <input type="text" placeholder="should be dropdown of e.g. countries" />
                <section>
                    {/* for (let i = 0; i < countries.length; i++) {
                        const element = countries[i];
                        <option name="test" value="test"></option>
                    } */}
                </section>
                <input type="submit" value="Generate" />
            </form>
        </>
    )
}

