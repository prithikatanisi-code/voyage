import React,{useState} from "react";
import {createRoot} from "react-dom/client";
import {HashRouter,useNavigate,useLocation} from "react-router-dom";
import {MapPin,Compass,Globe2,BarChart3,Route,Users,IndianRupee,Search,ChevronRight,Navigation,Star,ShieldCheck,Hotel,Utensils,Store,ArrowRight,TrendingUp,Menu,X} from "lucide-react";
import {LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer,BarChart,Bar} from "recharts";
import "./styles.css";

const destinations=[
 {id:"charminar",name:"Charminar",place:"Hyderabad",crowd:92,rating:4.6,cost:50,time:"Open",img:"https://images.unsplash.com/photo-1602774896930-6f0b4a4f6b9d?auto=format&fit=crop&w=900&q=80",type:"Heritage"},
 {id:"paigah",name:"Paigah Tombs",place:"Hyderabad",crowd:28,rating:4.7,cost:50,time:"Open",img:"https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",type:"Heritage"},
 {id:"golconda",name:"Golconda Fort",place:"Hyderabad",crowd:64,rating:4.7,cost:40,time:"Open",img:"https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",type:"Heritage"},
 {id:"ananthagiri",name:"Ananthagiri Hills",place:"Telangana",crowd:22,rating:4.5,cost:100,time:"Open",img:"https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",type:"Nature"},
 {id:"hampi",name:"Hampi",place:"Karnataka",crowd:41,rating:4.8,cost:100,time:"Open",img:"https://images.unsplash.com/photo-1600100397608-f010b5c9c0d5?auto=format&fit=crop&w=900&q=80",type:"Heritage"},
 {id:"kerala",name:"Alleppey",place:"Kerala",crowd:35,rating:4.8,cost:300,type:"Nature",img:"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80"}
];
const states=["Telangana","Andhra Pradesh","Karnataka","Kerala","Rajasthan","Goa","Maharashtra","Tamil Nadu","Himachal Pradesh","Uttarakhand","West Bengal","Gujarat"];
const revenue=[{m:"Jan",v:62},{m:"Feb",v:70},{m:"Mar",v:66},{m:"Apr",v:79},{m:"May",v:74},{m:"Jun",v:88},{m:"Jul",v:96},{m:"Aug",v:108}];

function Crowd({value}){return <span className={"crowd "+(value>70?"red":value>40?"yellow":"green")}>{value}% crowd</span>}

function Layout({children,board=false}){
 const nav=useNavigate(), loc=useLocation(); const [open,setOpen]=useState(false);
 const links=board?[["/board","Overview",BarChart3],["/board/crowd","Crowd Intelligence",Users],["/board/redirections","Redirections",Route],["/board/destinations","Destinations",Compass],["/board/businesses","Local Businesses",Store],["/board/revenue","Revenue",IndianRupee]]:[["/tourist","Home",Compass],["/tourist/local","Explore",MapPin],["/tourist/planner","AI Planner",Route],["/tourist/trips","My Trips",Hotel]];
 return <div className="app">
  <header><div className="brand" onClick={()=>nav(board?"/board":"/tourist")}><div className="logo">B</div><div><b>BEYOND</b><small>INTELLIGENT TOURISM NETWORK</small></div></div>
  <button className="mobile" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
  <nav className={open?"show":""}>{links.map(([p,t,I])=><button key={p} className={loc.pathname===p?"active":""} onClick={()=>{nav(p);setOpen(false)}}><I size={17}/>{t}</button>)}</nav>
  <button className="role" onClick={()=>nav(board?"/tourist":"/board")}>{board?"Tourist View":"Tourism Board"} <ArrowRight size={16}/></button>
  </header>
  <main>{children}</main>
 </div>
}

function Home(){
 const nav=useNavigate();
 return <Layout><section className="hero"><div><p className="eyebrow">THE FUTURE OF SMART TRAVEL</p><h1>DON’T FOLLOW THE CROWD.<br/><span>DISCOVER WHAT’S BEYOND IT.</span></h1><p className="lead">An intelligent tourism network that detects overcrowding and redirects travellers toward extraordinary, less-crowded destinations.</p><div className="actions"><button className="primary" onClick={()=>nav("/tourist/local")}>Start Exploring <ArrowRight/></button><button className="secondary" onClick={()=>nav("/tourist/planner")}>Plan My Trip</button></div></div><div className="hero-card"><div className="pulse"></div><Navigation size={40}/><h3>Smart Redirection</h3><p>Charminar is busy right now.</p><div className="mini-route"><b>92%</b><ArrowRight/><b>28%</b></div><small>Charminar → Paigah Tombs</small></div></section>
 <section className="three"><Feature icon={MapPin} title="LOCAL" text="Discover hidden gems around you" go={()=>nav("/tourist/local")}/><Feature icon={Globe2} title="NATIONAL" text="Explore every corner of India" go={()=>nav("/tourist/local")}/><Feature icon={Globe2} title="INTERNATIONAL" text="Travel beyond the familiar" go={()=>nav("/tourist/local")}/></section>
 <section className="quote">“YOUR NEXT FAVOURITE DESTINATION MAY BE JUST 15 MINUTES AWAY.”</section>
 </Layout>
}
function Feature({icon:Icon,title,text,go}){return <div className="feature" onClick={go}><Icon/><h2>{title}</h2><p>{text}</p><ChevronRight/></div>}

function Local(){
 const nav=useNavigate(); const [selected,setSelected]=useState(null);
 return <Layout><div className="pagehead"><div><p className="eyebrow">DISCOVER NEAR YOU</p><h1>Explore Local</h1><p>Smart recommendations based on location, crowd and your interests.</p></div><div className="search"><Search/><input placeholder="Search destinations, food, stays..."/></div></div>
 <div className="locationbar"><MapPin/> Hyderabad, Telangana <span>• GPS ready</span></div>
 <section className="content-grid"><div className="map"><div className="mapgrid"><div className="maplabel">LIVE DEMO MAP</div>{destinations.slice(0,5).map((d,i)=><button key={d.id} className={"marker m"+i} onClick={()=>setSelected(d)}>{d.crowd}%</button>)}</div><div className="maplegend"><i className="green-dot"/> Low <i className="yellow-dot"/> Moderate <i className="red-dot"/> High</div></div>
 <div className="cards"><h2>Recommended Nearby</h2>{destinations.slice(0,4).map(d=><DestinationCard key={d.id} d={d} click={()=>setSelected(d)}/>)}</div></section>
 {selected&&<RedirectModal d={selected} close={()=>setSelected(null)} nav={nav}/>}
 </Layout>
}
function DestinationCard({d,click}){return <div className="dest" onClick={click}><img src={d.img}/><div className="destbody"><div className="row"><h3>{d.name}</h3><Crowd value={d.crowd}/></div><p>{d.place} • {d.type}</p><div className="meta"><span><Star size={15}/> {d.rating}</span><span>₹{d.cost}</span><span>12 min</span></div><span className="verified"><ShieldCheck size={14}/> Government verified</span></div></div>}

function RedirectModal({d,close,nav}){const alt=d.id==="charminar"?destinations[1]:destinations[0]; return <div className="overlay"><div className="modal"><button className="close" onClick={close}>×</button><p className="eyebrow">SMART REDIRECTION</p><h2>LESS CROWD. MORE EXPERIENCE.</h2><div className="compare"><div><img src={d.img}/><b>{d.name}</b><Crowd value={d.crowd}/></div><div className="arrowbig"><ArrowRight/></div><div><img src={alt.img}/><b>{alt.name}</b><Crowd value={alt.crowd}/></div></div><div className="saving"><strong>{Math.max(0,d.crowd-alt.crowd)}% LESS CROWD</strong><span>18 min • ₹50 • 4.7 ★</span></div><p className="muted">A similar cultural experience with fewer people and more local businesses nearby.</p><div className="actions"><button className="primary" onClick={()=>{close();nav("/tourist/destination/"+alt.id)}}>EXPLORE THIS INSTEAD</button><button className="secondary" onClick={close}>KEEP MY ORIGINAL PLAN</button></div></div></div>}

function Planner(){const [days,setDays]=useState(3); const [done,setDone]=useState(false);return <Layout><div className="planner"><p className="eyebrow">DEMO AI PLANNER</p><h1>Build your perfect trip.</h1><p>Tell BEYOND what you want. Get a smart, crowd-aware itinerary.</p><div className="plannerbox"><label>Destination<input defaultValue="Hyderabad, India"/></label><label>Days<select value={days} onChange={e=>setDays(e.target.value)}><option>2</option><option>3</option><option>5</option><option>7</option></select></label><label>Budget<input defaultValue="₹10,000"/></label><label>Trip type<select><option>Heritage</option><option>Family</option><option>Nature</option><option>Food</option></select></label><button className="primary" onClick={()=>setDone(true)}>Generate itinerary <ArrowRight/></button></div>{done&&<div className="itinerary"><h2>Your {days}-day smart itinerary</h2>{["Charminar & Old City","Paigah Tombs + local cuisine","Golconda Fort & sunset"].slice(0,days).map((x,i)=><div className="day" key={x}><b>DAY {i+1}</b><div><h3>{x}</h3><p>09:00 Explore • 13:00 Local lunch • 16:00 Hidden gem • 19:00 Experience</p><Crowd value={i===0?92:28}/></div></div>)}</div>}</div></Layout>}

function Destination({id}){const d=destinations.find(x=>x.id===id)||destinations[0];return <Layout><div className="detailhero"><img src={d.img}/><div><p className="eyebrow">{d.type} • {d.place}</p><h1>{d.name}</h1><p>★ {d.rating} • Government verified • {d.time}</p><Crowd value={d.crowd}/><div className="actions"><button className="primary">Plan this destination</button><button className="secondary">Find less crowded alternative</button></div></div></div><section className="detailgrid"><div><h2>Why visit?</h2><p>Experience a memorable destination with heritage, culture and local experiences. BEYOND combines crowd intelligence, travel time, cost and ratings to help you make a smarter choice.</p></div><div className="statbox"><b>Best time</b><span>08:00 – 11:00</span><b>Entry</b><span>₹{d.cost}</span><b>Nearby businesses</b><span>17 local partners</span></div></section></Layout>}

function Board(){
 return <Layout board><div className="boardhead"><div><p className="eyebrow">TOURISM BOARD COMMAND CENTER</p><h1>India Tourism Intelligence</h1><p>Real-time strategic view of destinations, crowds and local economic impact.</p></div><span className="demo">DEMO DATA</span></div><div className="kpis"><K title="TOTAL TOURISTS" val="12.8M" up="18.4%" icon={Users}/><K title="TOURISM REVENUE" val="₹842 Cr" up="14.7%" icon={IndianRupee}/><K title="LOCAL BUSINESS REVENUE" val="₹128 Cr" up="22.8%" icon={Store}/><K title="SMART REDIRECTIONS" val="1.84M" up="31.5%" icon={Route}/></div><section className="dashboardgrid"><div className="panel chart"><div className="paneltitle"><h2>Tourism Revenue</h2><span>Monthly • Demo</span></div><ResponsiveContainer width="100%" height={280}><LineChart data={revenue}><XAxis dataKey="m"/><YAxis/><Tooltip/><Line type="monotone" dataKey="v" strokeWidth={3}/></LineChart></ResponsiveContainer></div><div className="panel"><div className="paneltitle"><h2>Crowd Intelligence</h2><span>LIVE DEMO</span></div><div className="crowdmap">{destinations.slice(0,5).map(d=><div className="crowdrow" key={d.id}><span>{d.name}</span><Crowd value={d.crowd}/><b>{d.crowd>70?"High alert":d.crowd>40?"Monitor":"Opportunity"}</b></div>)}</div></div></section><section className="impact"><div><p className="eyebrow">SIGNATURE METRIC</p><h2>Redirecting tourists creates local economic growth.</h2><p>Tourist → AI recommendation → hidden destination → local stay → restaurant → shopping → local revenue → economic growth.</p></div><div className="flow">{["Tourist","AI","Hidden Gem","Local Stay","Local Spend","Growth"].map((x,i)=><React.Fragment key={x}><span>{x}</span>{i<5&&<ArrowRight size={18}/>}</React.Fragment>)}</div></section></Layout>
}
function K({title,val,up,icon:Icon}){return <div className="kpi"><Icon/><small>{title}</small><strong>{val}</strong><span><TrendingUp size={14}/> {up}</span></div>}

function BoardPage({type}){return <Layout board><div className="boardhead"><div><p className="eyebrow">ANALYTICS MODULE</p><h1>{type}</h1><p>Strategic tourism intelligence • DEMO DATA</p></div></div><div className="kpis"><K title="VISITORS" val="4.82M" up="12.2%" icon={Users}/><K title="REVENUE" val="₹214 Cr" up="16.4%" icon={IndianRupee}/><K title="LOCAL SPEND" val="₹48 Cr" up="21.1%" icon={Store}/><K title="SATISFACTION" val="4.7/5" up="8.2%" icon={Star}/></div><div className="panel bigpanel"><h2>Performance overview</h2><ResponsiveContainer width="100%" height={340}><BarChart data={revenue}><XAxis dataKey="m"/><YAxis/><Tooltip/><Bar dataKey="v"/></BarChart></ResponsiveContainer></div></Layout>}

function App(){const p=window.location.pathname;if(p==="/")return <Home/>;if(p==="/tourist"||p==="/tourist/")return <Home/>;if(p==="/tourist/local")return <Local/>;if(p==="/tourist/planner")return <Planner/>;if(p.startsWith("/tourist/destination/"))return <Destination id={p.split("/").pop()}/>;if(p.startsWith("/board")){if(p==="/board")return <Board/>;return <BoardPage type={p.split("/")[2]?.replace("-"," ").toUpperCase()||"ANALYTICS"}/>};return <Home/>}
createRoot(document.getElementById("root")).render(<HashRouter><App/></HashRouter>);
