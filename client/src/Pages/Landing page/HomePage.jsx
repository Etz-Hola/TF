import Navbar from "../../components/Navbar"
import Header from "../../components/Header"
import Service from "../../components/Service"
import Footer from "../../components/Footer"
import Faq from "./components/Faq"
import Container from "./components/Container"


const HomePage = () => {
    return (
        <>
            <Navbar />
            <Header />

            <Service />
            <Container />           
            <Faq />
            <Footer />
        </>
    )
}

export default HomePage