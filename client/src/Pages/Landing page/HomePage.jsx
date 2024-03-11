import Navbar from "../../components/Navbar"
import Header from "../../components/Header"
import Service from "../../components/Service"
import Footer from "../../components/Footer"
import Faq from "./Faq"


const HomePage = () => {
    return (
        <>
            <Navbar />
            <Service />
            <Header />
            <Faq />
            <Footer />
        </>
    )
}

export default HomePage