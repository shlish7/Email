
import { HashRouter as Router, Route, Routes } from "react-router-dom"

import { AboutUs } from './pages/AboutUs'
import { EmailIndex } from './pages/EmailIndex'
import { Home } from './pages/Home'
import { AppHeader } from "./cmps/AppHeader"
import { AppFooter } from "./cmps/AppFooter"
import EmailDetails from "./cmps/EmailDetails"
import EmailPreview from "./cmps/EmailPreview"



export function App() {

    return (
        <Router>

        <section className='main-app'>
        <AppHeader/>
                <main className='grid-main-container'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/aboutUs" element={<AboutUs />} />
                        <Route path="/emailIndex" element={<EmailIndex />} />
                        <Route path="/emailDetails/:id" element={<EmailDetails />} />

                    </Routes>
                </main>
            <AppFooter/>
        </section>
        </Router >



    )
}

