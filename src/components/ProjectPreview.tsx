type ProjectPreviewProps = { slug: string; image?: string };

const titleBySlug: Record<string, string> = {
  "contact-hub": "Contact Hub",
  kanban: "Kanban Board",
  "space-dashboard": "Space Dashboard",
  "modern-developer-portfolio": "Developer Portfolio",
  "personalized-nutrition": "Meal Planner",
  "whats-for-dinner": "What's for dinner?",
  clarity: "Elite Homes",
};

const accentBySlug: Record<string, string> = {
  "contact-hub": "#4dd7bd",
  kanban: "#b49aff",
  "space-dashboard": "#73a9ff",
  "modern-developer-portfolio": "#ffc477",
  "personalized-nutrition": "#a4d875",
  "whats-for-dinner": "#ff8b72",
  clarity: "#e8c978",
};

const Scene = ({ slug, accent }: { slug: string; accent: string }) => {
  switch (slug) {
    case "contact-hub":
      return (
        <g>
          <rect x="44" y="83" width="148" height="283" rx="13" fill="#111b29" />
          <rect x="60" y="101" width="112" height="27" rx="8" fill="#1b2939" />
          <circle cx="75" cy="114" r="4" fill={accent} />
          <rect x="84" y="111" width="71" height="5" rx="3" fill="#617184" />
          {[0, 1, 2, 3].map((row) => (
            <g key={row}>
              <circle cx="76" cy={157 + row * 47} r="14" fill={row === 0 ? accent : "#304051"} opacity={row === 0 ? 0.9 : 0.85} />
              <rect x="99" y={150 + row * 47} width="65" height="6" rx="3" fill="#b5c2d1" opacity="0.8" />
              <rect x="99" y={162 + row * 47} width="44" height="5" rx="3" fill="#657487" />
            </g>
          ))}
          <rect x="212" y="83" width="544" height="283" rx="13" fill="#111b29" />
          <rect x="236" y="104" width="276" height="12" rx="6" fill="#e8eef5" />
          <circle cx="277" cy="178" r="32" fill={accent} opacity="0.85" />
          <rect x="326" y="159" width="156" height="8" rx="4" fill="#d7e0e9" />
          <rect x="326" y="178" width="112" height="6" rx="3" fill="#68798c" />
          {[0, 1, 2].map((col) => (
            <g key={col}>
              <rect x={236 + col * 164} y="234" width="146" height="91" rx="10" fill="#1b2939" />
              <rect x={252 + col * 164} y="253" width="78" height="6" rx="3" fill="#aebdcc" />
              <rect x={252 + col * 164} y="269" width="104" height="5" rx="3" fill="#647487" />
              <rect x={252 + col * 164} y="291" width="55" height="7" rx="4" fill={accent} opacity="0.8" />
            </g>
          ))}
        </g>
      );
    case "kanban":
      return (
        <g>
          <rect x="46" y="84" width="708" height="281" rx="14" fill="#111827" />
          <rect x="68" y="104" width="204" height="37" rx="9" fill="#1c293a" />
          <rect x="291" y="104" width="204" height="37" rx="9" fill="#1c293a" />
          <rect x="514" y="104" width="218" height="37" rx="9" fill="#1c293a" />
          {[0, 1, 2].map((col) => (
            <g key={col}>
              <circle cx={86 + col * 223} cy="122" r="5" fill={["#ff9d78", accent, "#6dd0b8"][col]} />
              <rect x={100 + col * 223} y="119" width="81" height="6" rx="3" fill="#b9c6d5" />
            </g>
          ))}
          {[0, 1, 2].map((col) =>
            [0, 1, 2].slice(0, col === 1 ? 3 : 2).map((row) => (
              <g key={`${col}-${row}`}>
                <rect x={68 + col * 223} y={155 + row * 91} width="204" height="76" rx="10" fill="#202d3e" />
                <rect x={84 + col * 223} y={171 + row * 91} width={row === 0 ? 116 : 91} height="7" rx="4" fill="#d9e2ec" opacity="0.88" />
                <rect x={84 + col * 223} y={188 + row * 91} width="142" height="5" rx="3" fill="#69798d" />
                <circle cx={91 + col * 223} cy={215 + row * 91} r="7" fill={["#ff9d78", accent, "#6dd0b8"][col]} />
                <rect x={106 + col * 223} y={212 + row * 91} width="42" height="5" rx="3" fill="#8998a9" />
              </g>
            ))
          )}
        </g>
      );
    case "space-dashboard":
      return (
        <g>
          <rect x="45" y="84" width="708" height="281" rx="14" fill="#101827" />
          <rect x="66" y="103" width="182" height="240" rx="11" fill="#172438" />
          {[0, 1, 2, 3].map((row) => (
            <g key={row}>
              <circle cx="88" cy={132 + row * 45} r="6" fill={row === 0 ? accent : "#50647e"} />
              <rect x="104" y={129 + row * 45} width={row === 1 ? 93 : 72} height="6" rx="3" fill={row === 0 ? "#e0e9f3" : "#798ba2"} />
            </g>
          ))}
          <rect x="270" y="103" width="216" height="122" rx="11" fill="#172438" />
          <text x="290" y="129" fill="#92a4bb" fontSize="11" fontFamily="Arial, sans-serif">ORBITAL STATUS</text>
          <circle cx="378" cy="175" r="35" fill="#1e3150" stroke={accent} strokeWidth="1.5" />
          <circle cx="378" cy="175" r="23" fill="#4772b4" opacity="0.75" />
          <path d="M340 175c17-21 57-22 76-1" fill="none" stroke="#b9d2ff" strokeWidth="1.4" opacity="0.7" />
          <circle cx="423" cy="156" r="3.5" fill={accent} />
          <rect x="503" y="103" width="228" height="122" rx="11" fill="#172438" />
          <text x="523" y="129" fill="#92a4bb" fontSize="11" fontFamily="Arial, sans-serif">MISSION DATA</text>
          <rect x="523" y="150" width="151" height="7" rx="4" fill="#d3dfed" opacity="0.8" />
          <rect x="523" y="168" width="181" height="7" rx="4" fill="#425a78" />
          <rect x="523" y="168" width="134" height="7" rx="4" fill={accent} />
          <rect x="270" y="242" width="461" height="101" rx="11" fill="#172438" />
          <path d="M291 314l53-27 49 14 61-48 55 22 61-34 52 20 39-28" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M291 314l53-27 49 14 61-48 55 22 61-34 52 20 39-28v63H291z" fill={accent} opacity="0.1" />
        </g>
      );
    case "modern-developer-portfolio":
      return (
        <g>
          <rect x="45" y="84" width="708" height="281" rx="14" fill="#111a26" />
          <rect x="70" y="105" width="95" height="8" rx="4" fill="#e8edf4" />
          <rect x="552" y="105" width="38" height="6" rx="3" fill="#77889b" />
          <rect x="605" y="105" width="42" height="6" rx="3" fill="#77889b" />
          <rect x="662" y="101" width="64" height="17" rx="8" fill={accent} opacity="0.9" />
          <text x="75" y="163" fill="#8292a5" fontSize="10" fontFamily="Arial, sans-serif">FRONTEND DEVELOPER</text>
          <rect x="72" y="180" width="314" height="16" rx="8" fill="#f0f4f8" />
          <rect x="72" y="205" width="258" height="16" rx="8" fill="#f0f4f8" />
          <rect x="72" y="240" width="270" height="7" rx="4" fill="#76879a" />
          <rect x="72" y="256" width="241" height="7" rx="4" fill="#76879a" />
          <rect x="72" y="281" width="101" height="27" rx="13" fill={accent} />
          <rect x="183" y="281" width="93" height="27" rx="13" fill="#1d2a39" stroke="#526174" />
          <rect x="485" y="139" width="211" height="176" rx="19" fill="#202e3d" />
          <circle cx="591" cy="199" r="42" fill={accent} opacity="0.68" />
          <path d="M548 205c12-27 30-43 47-43 27 0 44 23 48 50-14 22-34 32-56 29-19-2-32-14-39-36z" fill="#d8b08b" opacity="0.8" />
          <rect x="516" y="269" width="148" height="7" rx="4" fill="#dce5ee" opacity="0.8" />
          <rect x="545" y="286" width="91" height="5" rx="3" fill="#8b9bae" />
          <circle cx="478" cy="168" r="6" fill={accent} />
          <circle cx="710" cy="289" r="5" fill="#81b4ff" />
        </g>
      );
    case "personalized-nutrition":
      return (
        <g>
          <rect x="45" y="84" width="708" height="281" rx="14" fill="#111b25" />
          <rect x="66" y="105" width="664" height="33" rx="9" fill="#1c2a35" />
          <circle cx="84" cy="121" r="6" fill={accent} />
          <rect x="99" y="118" width="105" height="6" rx="3" fill="#cad5dc" />
          <rect x="66" y="158" width="290" height="181" rx="12" fill="#1a2934" />
          <rect x="82" y="174" width="153" height="8" rx="4" fill="#e1e9eb" />
          <rect x="82" y="191" width="118" height="6" rx="3" fill="#8798a0" />
          <circle cx="209" cy="264" r="57" fill="#2d4635" />
          <circle cx="209" cy="264" r="43" fill="#c78042" />
          <circle cx="209" cy="264" r="32" fill="#e5bd74" />
          <circle cx="194" cy="250" r="5" fill="#648252" />
          <circle cx="222" cy="268" r="6" fill="#73965d" />
          <circle cx="198" cy="279" r="4" fill="#f5e7c3" />
          <rect x="374" y="158" width="356" height="181" rx="12" fill="#1a2934" />
          <text x="394" y="184" fill="#a9b9bb" fontSize="10" fontFamily="Arial, sans-serif">TODAY'S NUTRITION</text>
          {[0, 1, 2].map((row) => (
            <g key={row}>
              <rect x="394" y={202 + row * 37} width="314" height="25" rx="7" fill="#243541" />
              <rect x="406" y={211 + row * 37} width={[115, 88, 137][row]} height="6" rx="3" fill={accent} opacity="0.82" />
              <rect x="660" y={211 + row * 37} width="32" height="6" rx="3" fill="#d5dfdf" opacity="0.7" />
            </g>
          ))}
        </g>
      );
    case "whats-for-dinner":
      return (
        <g>
          <rect x="45" y="84" width="708" height="281" rx="14" fill="#191817" />
          <rect x="69" y="108" width="100" height="8" rx="4" fill="#f4eee8" />
          <rect x="600" y="103" width="121" height="21" rx="10" fill="#302720" />
          <circle cx="616" cy="113" r="4" fill={accent} />
          <rect x="630" y="110" width="74" height="6" rx="3" fill="#c5b6a9" />
          <rect x="69" y="145" width="662" height="183" rx="13" fill="#27231f" />
          <circle cx="218" cy="236" r="69" fill="#59402f" />
          <circle cx="218" cy="236" r="52" fill="#dba568" />
          <circle cx="218" cy="236" r="40" fill="#f1d39c" />
          <path d="M188 221c13-20 47-23 61-3 14 19-3 42-24 48-26 8-50-19-37-45z" fill="#bd6544" />
          <circle cx="202" cy="221" r="5" fill="#6d8e4a" />
          <circle cx="236" cy="251" r="4" fill="#6d8e4a" />
          <text x="324" y="181" fill="#bcaaa0" fontSize="10" fontFamily="Arial, sans-serif">TONIGHT'S PICK</text>
          <rect x="324" y="197" width="253" height="13" rx="6" fill="#f4eee8" />
          <rect x="324" y="223" width="306" height="7" rx="4" fill="#a79689" />
          <rect x="324" y="240" width="267" height="7" rx="4" fill="#a79689" />
          <rect x="324" y="272" width="152" height="29" rx="14" fill={accent} />
          <rect x="487" y="272" width="120" height="29" rx="14" fill="#39302a" stroke="#62544a" />
        </g>
      );
    case "clarity":
    default:
      return (
        <g>
          <rect x="45" y="84" width="708" height="281" rx="14" fill="#15191a" />
          <rect x="70" y="105" width="70" height="8" rx="4" fill="#e7e8e3" />
          <rect x="526" y="105" width="37" height="6" rx="3" fill="#89928e" />
          <rect x="580" y="105" width="43" height="6" rx="3" fill="#89928e" />
          <rect x="641" y="100" width="84" height="18" rx="9" fill={accent} />
          <text x="73" y="155" fill={accent} fontSize="10" fontFamily="Arial, sans-serif">FIND YOUR PLACE</text>
          <rect x="72" y="174" width="280" height="15" rx="7" fill="#f0f2ee" />
          <rect x="72" y="199" width="239" height="15" rx="7" fill="#f0f2ee" />
          <rect x="72" y="231" width="287" height="7" rx="4" fill="#8b9690" />
          <rect x="72" y="247" width="259" height="7" rx="4" fill="#8b9690" />
          <rect x="72" y="277" width="116" height="29" rx="14" fill={accent} />
          <rect x="413" y="146" width="301" height="169" rx="14" fill="#202827" />
          <rect x="430" y="162" width="268" height="137" rx="9" fill="#354640" />
          <path d="M439 250l48-39 34 25 50-53 60 46 41-30 26 19v81H439z" fill="#687e6d" />
          <path d="M438 229l60-49 52 42 37-31 48 41 43-33 20 16" fill="none" stroke="#c9d8bd" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="441" y="270" width="108" height="6" rx="3" fill="#e7ece5" opacity="0.85" />
          <circle cx="670" cy="183" r="11" fill={accent} opacity="0.92" />
        </g>
      );
  }
};

const ProjectPreview = ({ slug, image }: ProjectPreviewProps) => {
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, "-");
  const accent = accentBySlug[slug] ?? "#ffbd69";

  if (image) {
    return (
      <img
        className="work-artwork work-artwork--image"
        src={image}
        alt=""
        loading="lazy"
        decoding="async"
        aria-hidden="true"
      />
    );
  }

  return (
    <svg className="work-artwork" viewBox="0 0 800 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`preview-bg-${safeSlug}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#263243" />
          <stop offset="100%" stopColor="#111824" />
        </linearGradient>
        <radialGradient id={`preview-glow-${safeSlug}`} cx="80%" cy="8%" r="75%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.18" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="420" fill={`url(#preview-bg-${safeSlug})`} />
      <rect width="800" height="420" fill={`url(#preview-glow-${safeSlug})`} />
      <circle cx="30" cy="25" r="4" fill="#ff857b" />
      <circle cx="45" cy="25" r="4" fill="#f8c76e" />
      <circle cx="60" cy="25" r="4" fill="#75d5a2" />
      <text x="400" y="28" fill="#a7b4c3" fontSize="10" fontFamily="Arial, sans-serif" textAnchor="middle">
        {titleBySlug[slug] ?? "Selected Project"}
      </text>
      <Scene slug={slug} accent={accent} />
    </svg>
  );
};

export default ProjectPreview;
