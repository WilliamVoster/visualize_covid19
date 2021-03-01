import useLocalStorage from "../hooks/useLocalStorage"

let queryCountries = async () => {
    const res = await fetch("https://api.covid19api.com/countries")
    const json = await res.json()
    return json;
}

const countries = queryCountries().json

const action = e => {
    e.preventDefault()
    console.log("tester")
    console.log(countries)
}

export default function QueryDataForm(){


    const [countries, setCountries] = useLocalStorage("countries", [2])

    return (
        <form onSubmit={action}>
            <button onclick={setCountries = [2, 7]}>test</button>
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

