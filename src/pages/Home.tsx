import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/sections/Hero'
import Experience from '@/sections/Experience'
import Education from '@/sections/Education'
import Projects from '@/sections/Projects'
import Websites from '@/sections/Websites'
import Skills from '@/sections/Skills'
import Contact from '@/sections/Contact'

export default function Home() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Experience />
                <Education />
                <Projects />
                <Websites />
                <Skills />
                <Contact />
            </main>
            <Footer />
        </>
    )
}
