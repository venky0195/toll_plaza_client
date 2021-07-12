const serve = 'prod'
const dev = {
    API_URL: "http://localhost:3000/api",
}
const prod = {
    API_URL: "https://toll-plaza.herokuapp.com/api",
}

const config = serve === 'dev' ? dev : prod

export default config;
