import Navbar        from '@/components/ui/Navbar'
import Hero          from '@/components/sections/Hero'
import About         from '@/components/sections/About'
import Studies       from '@/components/sections/Studies'
import Experience    from '@/components/sections/Experience'
import Skills        from '@/components/sections/Skills'
import Projects      from '@/components/sections/Projects'
import DesignSection from '@/components/sections/DesignSection'
import Contact       from '@/components/sections/Contact'
import Footer        from '@/components/ui/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Studies />
      <Experience />
      <Skills />
      <Projects />
      <DesignSection />
      <Contact />
      <Footer />
    </main>
  )
}
