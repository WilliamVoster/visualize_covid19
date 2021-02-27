import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

console.log("test")

let headers = new Headers();
headers.append("Content-type", "application/json")

let raw = JSON.stringify({
  "username":"test",
  "password":"testpass"
})

let reqOptions = {
  method: "POST",
  headers: headers,
  body: raw,
  redirect: "follow"
}

let reqToken = async () => {
  const res = await fetch("https://covid19.cloudeya.org/token",  reqOptions)
  console.log(res)
}

let a = async () => {
  // const res = await fetch("https://api.github.com/repos/vercel/next.js")
  const res = await fetch("https://covid19.cloudeya.org/time_series_confirmed_global")
  const json = await res.json()
  return json;
}

reqToken();
console.log(a());


export default MyApp
