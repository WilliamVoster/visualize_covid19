import useLocalStorage from "../hooks/useLocalStorage"

/*
How to fetch from API:
https://api.covid19api.com/country/south-africa/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z

*/

function compareStrings(a, b){
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
        
        if(a[i] == b[i]){
            // console.log(a[i], b[i], "continue")
            continue
        }else if(a[i] < b[i]){
            // console.log(a[i], b[i], "a < b => 1")
            return -1
        }else{
            // console.log(a[i], b[i], "b > a => -1")
            return 1
        }
    }
    // console.log(a, b, "same => 0")
    return 0
}

function is_server(){
    return typeof window == "undefined"
}

export default function QueryDataForm({setData}){
    
    const [countries, setCountries] = useLocalStorage("countries", [])

    const queryCountries = async () => {

        // cors needed for ports, e.g. localhost:3000 ?
        const res = await fetch("https://api.covid19api.com/countries", {mode: "cors"})

        if(!res.ok){
            console.log("Could not retrieve data from API")
            return
        }
        const json = await res.json()


        const sortedCountries = json.sort((a, b) => compareStrings(a.Slug, b.Slug))
        setCountries(sortedCountries)
    }

    const queryData = async (slug, status, month, year) => {

        let endMonth = month == 12 ? 1 : month + 1
        let endYear = month == 12 ? year + 1 : year

        month = month < 10 ? "0" + month : month
        endMonth = endMonth < 10 ? "0" + endMonth : endMonth

        // e.g. "https://api.covid19api.com/country/south-africa/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z"
        let url = 
            `https://api.covid19api.com/country/${slug}/status/${status}?from=${year}-${month}-01T00:00:00Z&to=${endYear}-${endMonth}-01T00:00:00Z`

        console.log(url)

        const res = await fetch(url)
        const json = await res.json()

        for (let i = 0; i < json.length; i++) {
            console.log(json[i].Cases)
            
        }

        console.log(json)

        return json
    }

    if(countries.length == 0 && !is_server()){
        console.log("Retrieving countries")
        queryCountries()
    }
    
    const action = e => {
        e.preventDefault()

        let selectedCountry = e.target.selectCountry.value

        console.log(selectedCountry)

        let data = queryData(selectedCountry, "confirmed", 1, 2021)
        data.then(val => console.log(data, val))

        console.log(data)

        // setData([...data])

    }

    const clearStorage = () => {
        setCountries([]);
        console.log("Cleared storage")
    }
    
    const displayStorage = () => {
        console.log(countries)
    }


    return (
        <div>
            <button type="button" onClick={clearStorage}>clear local storage</button>

            <button type="button" onClick={displayStorage}>display local storage</button>

            <form onSubmit={action}>
                <select name="selectCountry">
                    <option value="">Select a country</option>
                    {
                        countries.map((c, index) => {
                            return <option key={index} value={c.Slug}>{c.Country}</option>
                        // console.log(c.Country)
                        })
                    }
                    {
                        countries.length == 0 &&
                            <option value="">Could not retrieve countries from API</option>
                    }
                </select>

                <input type="submit" value="Query data" />
            </form>
        </div>
    )
}

