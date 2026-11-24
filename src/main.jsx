import React, {useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import '@fontsource-variable/inter/wght.css';

import i18n from './content';

import './style.scss';

gsap.registerPlugin(ScrollTrigger);
const stars=[['React',595,170],['JavaScript',810,91],['SCSS',1040,145],['Figma',1230,260],['Laravel',1003,321],['MySQL',753,310],['SQLite',610,445],['Python',849,477],['aiogram',1145,478]];
const art=file=>import.meta.env.BASE_URL+'art/'+file;
function Art({file,className='',alt='',eager=false}){return <img className={className} alt={alt} src={art(file)} loading={eager?'eager':'lazy'} draggable="false"/>}
function Link({href,arrow,children,className=''}){return <a className={'action '+className} href={href}><span>{children}</span><Art file={'arrow-'+arrow+'.svg'}/></a>}
function App(){
 const [lang,setLang]=useState(i18n.language),[star,setStar]=useState(null);
 const t=i18n.t.bind(i18n), main=useRef(null);
 async function language(next){await i18n.changeLanguage(next);setLang(next);try{localStorage.setItem('kitied-language',next)}catch{}}
 useEffect(()=>{document.documentElement.lang=lang;document.querySelector('meta[name=description]').content=t('role').replace('\n',' ');ScrollTrigger.refresh()},[lang]);
 useEffect(()=>{const media=gsap.matchMedia(); media.add('(prefers-reduced-motion: no-preference)',()=>{
   for(const section of main.current.querySelectorAll('section:not(.hero)')){
    gsap.from(section.querySelectorAll('h2,.shot,.features'),{y:22,duration:.7,stagger:.08,ease:'power2.out',scrollTrigger:{trigger:section,start:'top 93%',once:true}});
   }

 });return ()=>media.revert()},[]);
 return <main ref={main}>
 <a className="skip" href="#about">{t('skip')}</a>
 <header><a className="brand" href="#top">kitied</a><nav aria-label={t('nav')}>{[['projects','projects'],['stack','stack'],['experience','experience'],['contact','contacts']].map(([id,key])=><a key={id} href={'#'+id}>{t(key)}</a>)}</nav><div className="langs" aria-label="Language">{['ru','en'].map(l=><button key={l} lang={l} aria-pressed={lang===l} onClick={()=>language(l)}>{l.toUpperCase()}</button>)}</div></header>
 <section id="top" className="hero"><Art className="optic" file="optic-hero.svg" eager/><div className="knot"><Art file="knot.webp" eager/></div>

 <small className="stamp">{t('portfolio')}　 /　 2026</small><h1><span>ROMAN</span><span>KYTIN</span></h1><p className="role">{t('role')}</p><Link className="explore" href="#projects" arrow="hero">{t('explore')}</Link></section>
 <section id="about" className="about light"><div><small>{t('about')}</small><h2>{t('name')}</h2></div><div className="bio"><p>{t('bio')}</p><small>{t('studying')}</small><strong>Unreal Engine 4.27　/　C++</strong></div></section>
 <section id="projects" className="neon"><Art className="optic" file="optic-neon.svg"/><div className="eyeline"><small>{t('selected')}</small><small>{t('placement')}</small></div><h2>NeonBro</h2><div className="neon-copy"><h3>{t('signs')}</h3><p>{t('neonText')}</p></div><Art className="shot" file="neonbro.jpg" alt={t('neonAlt')}/><div className="neon-links"><small>HTML　/　SCSS　/　JavaScript</small><Link href="https://kitied.github.io/neonbro/index.html" arrow="neon">{t('open')}</Link></div></section>
 <section className="shift light"><div className="eyeline"><small>{t('systems')}</small><small>{t('live')}</small></div><h2>Shiftly</h2><div className="shift-body"><Art className="shot" file="shiftly.jpg" alt={t('shiftAlt')}/><div><h3>{t('shiftTitle')}</h3><p>{t('shiftText')}</p><Link href="https://shiftly.kitied.ru/" arrow="shiftly">shiftly.kitied.ru</Link></div></div></section>
 <section className="rat"><div><small>{t('automation')}</small><h2>Chat Rat</h2><p>{t('ratText')}</p><Link href="https://t.me/chat_rat683_bot" arrow="hero">{t('bot')}</Link></div><div className="features">{['reply','tasks','reminders'].map(key=><div key={key}><h3>{t(key)}</h3><p>{t(key+'Text')}</p></div>)}</div></section>
 <section id="stack" className="tech"><small>{t('tools')}</small><h2>{t('constellation')}</h2><p>{t('techText')}</p><div className="sky"><Art className="lines" file="constellation.svg"/>{stars.map(([name,x,y],i)=><button key={name} aria-pressed={i===star} style={{'--x':(x/14.4*1.8-71),'--y':((y/1440*1.8*(1-40/390)/.69)*100-2),left:x/14.4+'%',top:y/6.2+'%'}} onClick={()=>setStar(i===star?null:i)}>{name}</button>)}</div><output aria-live="polite">{star!==null&&stars[star][0]+' · '+t('techDetails',{returnObjects:true})[star]}</output></section>
 <section id="experience" className="experience light"><small>{t('practice')}</small><div className="placement"><b>2024</b><div><h2>NeonBro</h2><h3>{t('industrial')}</h3><p>{t('practiceText')}</p></div></div><div className="timeline">{[['2023','college','degree'],['11.2026','KIBERone','teacher']].map(([date,title,desc])=><div key={date}><time>{date} — {t('now')}</time><h3>{t(title)}</h3><p>{t(desc)}</p></div>)}</div></section>
 <section className="game"><Art file="study.svg" className="study"/><small>{t('game')}</small><h2>{t('beyond')}</h2><p>{t('unreal')}</p></section>
 <section id="contact" className="contact"><Art file="optic-contact.svg" className="optic"/><Art file="knot.webp" className="end-knot"/><small>{t('contacts')}</small><h2>{t('hello')}</h2><address>{[['GitHub / kitied','https://github.com/kitied'],['Telegram / @kitied1','https://t.me/kitied1'],['romankytin683@gmail.com','mailto:romankytin683@gmail.com']].map(([s,url])=><Link key={url} href={url} arrow="contact">{s}</Link>)}</address><footer><small>Roman Kytin</small><a href="#top">KITIED　/　2026</a></footer></section>
 </main>
}
createRoot(document.getElementById('root')).render(<App/>);
