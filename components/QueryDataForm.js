import useLocalStorage from "../hooks/useLocalStorage"
import styles from "../styles/QueryForm.module.css"

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
            // `https://api.covid19api.com/country/${slug}/status/${status}?from=${year}-${month}-01T00:00:00Z&to=${endYear}-${endMonth}-01T00:00:00Z`
            `https://api.covid19api.com/country/${slug}?from=${year}-${month}-01T00:00:00Z&to=${endYear}-${endMonth}-01T00:00:00Z`
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
        let selectedMonth = parseInt(e.target.selectMonth.value)
        let selectedYear = parseInt(e.target.selectYear.value)

        let data = queryData(selectedCountry, "confirmed", selectedMonth, selectedYear)
        data.then(val => {console.log(data, val); setData([...val])})

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
        <div className={styles.queryFormContainer}>
            
            {/*
            <button type="button" onClick={clearStorage}>clear local storage</button>

            <button type="button" onClick={displayStorage}>display local storage</button> 
            */}

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

                <select name="selectMonth">
                    <option value="">Please select a month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>

                <select name="selectYear">
                    <option value="">Plese select a year</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022 (hopefully not)</option>
                </select>

                <input type="submit" value="Query data" />
            </form>
        </div>
    )
}

