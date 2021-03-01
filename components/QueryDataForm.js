import useLocalStorage from "../hooks/useLocalStorage"




export default function QueryDataForm(){
    
    const [countries, setCountries] = useLocalStorage("countries", [2])

    let queryCountries = async () => {
        const res = await fetch("https://api.covid19api.com/countries")
        const json = await res.json()
        setCountries([...countries, "test1"])
        return json;
    }
    
    // const countries = queryCountries().json
    
    const action = e => {
        e.preventDefault()
        queryCountries()
        console.log("tester")
        console.log(countries)
    }
    


    return (
        <form onSubmit={action}>
            <button>test</button>
            <input type="text" placeholder="should be dropdown of e.g. countries" />
            <section>
                {/* for (let i = 0; i < countries.length; i++) {
                    const element = countries[i];
                    <option name="test" value="test"></option>
                } */}
            </section>
            <input type="submit" value="Generate" />
        </form>
    )
}

