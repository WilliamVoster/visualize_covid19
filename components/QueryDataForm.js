import useLocalStorage from "../hooks/useLocalStorage"

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


export default function QueryDataForm(){
    
    const [countries, setCountries] = useLocalStorage("countries", [])

    let queryCountries = async () => {
        const res = await fetch("https://api.covid19api.com/countries")
        const json = await res.json()

        const sortedCountries = json.sort((a, b) => compareStrings(a.Slug, b.Slug))
        setCountries(sortedCountries)
    }

    if(countries.length == 0)
        queryCountries()
    
    const action = e => {
        e.preventDefault()

        console.log("submitted")

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
                <select name="selectCountry">
                    <option value="test">test</option>
                    <option value="test2">test2</option>
                    { 
                         countries.map((c) => {
                             return <option value={c.Slug}>{c.Country}</option>
                            // console.log(c.Country)
                         })
                    }
                </select>
                <input type="submit" value="Generate" />
            </form>
        </>
    )
}

