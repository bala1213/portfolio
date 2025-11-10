
import React, { useState, useEffect, useRef } from 'react';
import type { Project, Skill } from './types';
import { MetaAdsIcon, GoogleAdsIcon, SeoIcon, SmmIcon, VideoEditingIcon, ReactIcon, ViteIcon, HtmlIcon, CssIcon, JsIcon } from './components/Icons';

// --- MOCK DATA ---
const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Growth Campaign",
    description: "Managed a $50k/month budget on Google & Meta Ads, increasing ROAS by 35% and driving a 50% YoY growth in sales for a fashion retailer.",
    imageUrl: "https://picsum.photos/seed/ecom/600/400",
    tags: ["Google Ads", "Meta Ads", "SEO"],
    liveUrl: "#",
  },
  {
    id: 2,
    title: "SaaS Lead Generation",
    description: "Developed and executed an SMM strategy on LinkedIn and Twitter, resulting in a 200% increase in qualified leads and a 30% reduction in CPL.",
    imageUrl: "https://picsum.photos/seed/saas/600/400",
    tags: ["SMM", "SEO"],
    liveUrl: "#",
  },
  {
    id: 3,
    title: "Brand Awareness Video Series",
    description: "Produced and edited a series of short, engaging videos for a tech startup, achieving over 2 million organic views on TikTok and Instagram.",
    imageUrl: "https://picsum.photos/seed/video/600/400",
    tags: ["Video Editing", "SMM"],
    liveUrl: "#",
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Designed and built this personal portfolio using modern web technologies to showcase my skills and projects in a clean, responsive interface.",
    imageUrl: "https://picsum.photos/seed/portfolio/600/400",
    tags: ["React", "Vite", "TailwindCSS"],
    codeUrl: "#",
  },
];

const skillsData: { category: string, skills: Skill[] }[] = [
    {
        category: "Digital Marketing",
        skills: [
            { name: "Meta Ads", icon: <MetaAdsIcon /> },
            { name: "Google Ads", icon: <GoogleAdsIcon /> },
            { name: "SEO", icon: <SeoIcon /> },
            { name: "SMM", icon: <SmmIcon /> },
        ]
    },
    {
        category: "Web Development",
        skills: [
            { name: "React", icon: <ReactIcon /> },
            { name: "Vite", icon: <ViteIcon /> },
            { name: "HTML5", icon: <HtmlIcon /> },
            { name: "CSS3", icon: <CssIcon /> },
            { name: "JavaScript", icon: <JsIcon /> },
        ]
    },
    {
        category: "Creative",
        skills: [
            { name: "Video Editing", icon: <VideoEditingIcon /> },
        ]
    }
];

// --- HELPER HOOK ---
const useOnScreen = (options: IntersectionObserverInit) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);

    return [ref, isVisible] as const;
};


// --- SECTION COMPONENTS ---

const Header: React.FC = () => {
    const [top, setTop] = useState(true);

    useEffect(() => {
        const scrollHandler = () => {
            window.pageYOffset > 10 ? setTop(false) : setTop(true)
        };
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, [top]);

    const navLinks = [
        { href: '#about', label: 'About' },
        { href: '#skills', label: 'Skills' },
        { href: '#projects', label: 'Projects' },
        { href: '#contact', label: 'Contact' },
    ];

    return (
        <header className={`fixed w-full z-30 transition duration-300 ease-in-out ${!top && 'bg-gray-900 bg-opacity-80 backdrop-blur-sm shadow-lg'}`}>
            <div className="max-w-6xl mx-auto px-5 sm:px-6">
                <div className="flex items-center justify-between h-16 md:h-20">
                    <div className="shrink-0 mr-4">
                        <a href="#home" className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-emerald-400">
                            Alex Doe
                        </a>
                    </div>
                    <nav className="flex flex-grow justify-end">
                        <ul className="flex flex-wrap items-center justify-end space-x-4 md:space-x-8">
                            {navLinks.map(link => (
                                <li key={link.href}>
                                    <a href={link.href} className="font-medium text-gray-300 hover:text-sky-400 px-3 py-2 flex items-center transition duration-150 ease-in-out">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

const Hero: React.FC = () => (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <div className="relative">
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-500 to-emerald-500 blur-3xl opacity-20"></div>
                <img src={`https://picsum.photos/seed/profile/200/200`} alt="Alex Doe" className="w-40 h-40 rounded-full mx-auto mb-8 border-4 border-gray-700 shadow-xl" />
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4 animate-fade-in-up">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-emerald-400">Digital Marketing</span> & Web Expert
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    I scale businesses with data-driven marketing strategies and build high-performance web experiences.
                </p>
                <div className="flex justify-center space-x-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <a href="#projects" className="px-8 py-3 text-lg font-semibold text-white bg-sky-600 rounded-full hover:bg-sky-700 transition duration-300 transform hover:scale-105 shadow-lg">
                        View My Work
                    </a>
                    <a href="#contact" className="px-8 py-3 text-lg font-semibold text-sky-300 bg-gray-800 rounded-full hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-lg">
                        Get In Touch
                    </a>
                </div>
            </div>
        </div>
    </section>
);

const Section: React.FC<{id: string, title: string, children: React.ReactNode}> = ({id, title, children}) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
    
    return (
        <section id={id} ref={ref} className="py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        {title}
                    </h2>
                    {children}
                </div>
            </div>
        </section>
    );
}

const About: React.FC = () => (
    <Section id="about" title="About Me">
        <div className="max-w-3xl mx-auto text-center text-lg text-gray-300 space-y-4">
            <p>
                With over 5 years of experience in the digital landscape, I bridge the gap between marketing and technology. My passion lies in creating holistic strategies that not only attract but also convert and retain customers. 
            </p>
            <p>
                From fine-tuning Meta & Google Ad campaigns for maximum ROI to developing sleek, user-friendly websites with React and Vite, I bring a versatile skill set to help businesses thrive online. I'm a lifelong learner, constantly adapting to the latest industry trends and technologies.
            </p>
        </div>
    </Section>
);

const Skills: React.FC = () => (
    <Section id="skills" title="My Expertise">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {skillsData.map(group => (
                <div key={group.category} className="bg-gray-800/50 p-6 rounded-lg shadow-xl border border-gray-700">
                    <h3 className="text-2xl font-bold text-sky-400 mb-6 text-center">{group.category}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {group.skills.map(skill => (
                            <div key={skill.name} className="flex flex-col items-center justify-center p-4 bg-gray-900 rounded-md space-y-2 transition-transform duration-300 hover:scale-110 hover:bg-gray-700">
                                <div className="text-emerald-400">{skill.icon}</div>
                                <span className="text-sm font-medium">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </Section>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 flex flex-col transition-transform duration-300 hover:-translate-y-2">
        <img className="w-full h-48 object-cover" src={project.imageUrl} alt={project.title} />
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold mb-2 text-sky-300">{project.title}</h3>
            <p className="text-gray-400 text-base flex-grow mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                    <span key={tag} className="bg-emerald-900 text-emerald-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                        {tag}
                    </span>
                ))}
            </div>
            <div className="mt-auto pt-4 border-t border-gray-700 flex space-x-4">
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-sky-400 transition">View Live</a>}
                {project.codeUrl && <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-sky-400 transition">View Code</a>}
            </div>
        </div>
    </div>
);

const Projects: React.FC = () => (
    <Section id="projects" title="Featured Work">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    </Section>
);

const Contact: React.FC = () => (
    <Section id="contact" title="Let's Connect">
        <div className="max-w-lg mx-auto text-center">
            <p className="text-lg text-gray-400 mb-8">
                I'm currently available for freelance projects and full-time opportunities. Feel free to reach out!
            </p>
            <a href="mailto:alex.doe@example.com" className="inline-block text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-emerald-400 hover:scale-105 transition-transform">
                alex.doe@example.com
            </a>
            <div className="flex justify-center space-x-6 mt-8">
                {/* Add social links here */}
                <a href="#" className="text-gray-400 hover:text-sky-400 transition"><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                <a href="#" className="text-gray-400 hover:text-sky-400 transition"><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
            </div>
        </div>
    </Section>
);

const Footer: React.FC = () => (
    <footer className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-center text-gray-500">
            &copy; {new Date().getFullYear()} Alex Doe. All rights reserved.
        </div>
    </footer>
);

// --- MAIN APP COMPONENT ---

function App() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        <main className="flex-grow">
            <Hero />
            <About />
            <div className="h-px bg-gradient-to-r from-transparent via-sky-600 to-transparent"></div>
            <Skills />
            <div className="h-px bg-gradient-to-r from-transparent via-sky-600 to-transparent"></div>
            <Projects />
            <div className="h-px bg-gradient-to-r from-transparent via-sky-600 to-transparent"></div>
            <Contact />
        </main>
        <Footer />
    </div>
  );
}

export default App;
