type ServiceArtProps = { number: string };

const ServiceArt = ({ number }: ServiceArtProps) => {
  if (number === "01") {
    return (
      <svg viewBox="0 0 240 168" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="site-bg" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#142237" />
            <stop offset="1" stopColor="#233452" />
          </linearGradient>
          <linearGradient id="site-hero" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#fff7ed" />
            <stop offset="1" stopColor="#fde7c7" />
          </linearGradient>
        </defs>
        <rect width="240" height="168" rx="18" fill="url(#site-bg)" />
        <circle cx="205" cy="28" r="35" fill="#f59e0b" opacity=".12" />
        <rect x="24" y="19" width="192" height="130" rx="12" fill="#fff" />
        <path d="M24 31a12 12 0 0 1 12-12h168a12 12 0 0 1 12 12v13H24z" fill="#f1f5f9" />
        <circle cx="37" cy="31" r="3" fill="#f59e0b" />
        <circle cx="48" cy="31" r="3" fill="#cbd5e1" />
        <circle cx="59" cy="31" r="3" fill="#cbd5e1" />
        <rect x="74" y="28" width="76" height="6" rx="3" fill="#dbe2ea" />
        <rect x="37" y="55" width="98" height="66" rx="7" fill="url(#site-hero)" />
        <rect x="46" y="66" width="52" height="6" rx="3" fill="#1e293b" />
        <rect x="46" y="77" width="72" height="4" rx="2" fill="#94a3b8" />
        <rect x="46" y="85" width="63" height="4" rx="2" fill="#cbd5e1" />
        <rect x="46" y="100" width="34" height="12" rx="6" fill="#b45309" />
        <rect x="144" y="56" width="59" height="28" rx="6" fill="#e0f2fe" />
        <path d="M150 76l12-10 9 6 13-11 13 9" fill="none" stroke="#0ea5e9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <rect x="144" y="91" width="59" height="30" rx="6" fill="#f8fafc" />
        <circle cx="155" cy="102" r="4" fill="#f59e0b" />
        <rect x="164" y="100" width="29" height="4" rx="2" fill="#64748b" />
        <rect x="164" y="108" width="21" height="3" rx="1.5" fill="#cbd5e1" />
        <rect x="37" y="130" width="166" height="5" rx="2.5" fill="#e2e8f0" />
      </svg>
    );
  }

  if (number === "02") {
    return (
      <svg viewBox="0 0 240 168" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="three-bg" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#111827" />
            <stop offset="1" stopColor="#30204d" />
          </linearGradient>
          <linearGradient id="three-cube" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#fde68a" />
            <stop offset="1" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <rect width="240" height="168" rx="18" fill="url(#three-bg)" />
        <circle cx="157" cy="79" r="54" fill="#8b5cf6" opacity=".12" />
        <ellipse cx="151" cy="83" rx="64" ry="24" fill="none" stroke="#c4b5fd" strokeOpacity=".52" strokeWidth="1.5" transform="rotate(-24 151 83)" />
        <ellipse cx="151" cy="83" rx="64" ry="24" fill="none" stroke="#38bdf8" strokeOpacity=".5" strokeWidth="1.5" transform="rotate(48 151 83)" />
        <path d="M151 44l29 17v34l-29 17-29-17V61z" fill="url(#three-cube)" opacity=".95" />
        <path d="M151 44v34l29 17V61z" fill="#fcd34d" />
        <path d="M151 78l29 17-29 17-29-17z" fill="#d97706" />
        <path d="M122 61l29 17v34l-29-17z" fill="#f59e0b" />
        <circle cx="88" cy="43" r="3" fill="#fcd34d" />
        <circle cx="202" cy="115" r="4" fill="#38bdf8" />
        <rect x="24" y="27" width="62" height="112" rx="10" fill="#0b1220" stroke="#475569" />
        <circle cx="55" cy="57" r="17" fill="#334155" />
        <circle cx="55" cy="52" r="6" fill="#f1f5f9" />
        <path d="M43 68c2-7 7-10 12-10s10 3 12 10" fill="#cbd5e1" />
        <rect x="36" y="86" width="38" height="4" rx="2" fill="#e2e8f0" />
        <rect x="39" y="95" width="32" height="3" rx="1.5" fill="#94a3b8" />
        <rect x="35" y="108" width="40" height="15" rx="7.5" fill="#7c3aed" />
      </svg>
    );
  }

  if (number === "03") {
    return (
      <svg viewBox="0 0 240 168" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="shop-bg" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#102432" />
            <stop offset="1" stopColor="#164e63" />
          </linearGradient>
        </defs>
        <rect width="240" height="168" rx="18" fill="url(#shop-bg)" />
        <circle cx="187" cy="28" r="42" fill="#38bdf8" opacity=".1" />
        <rect x="24" y="22" width="148" height="124" rx="11" fill="#f8fafc" />
        <rect x="36" y="34" width="78" height="7" rx="3.5" fill="#1e293b" />
        <rect x="36" y="47" width="124" height="4" rx="2" fill="#cbd5e1" />
        <rect x="36" y="61" width="56" height="70" rx="7" fill="#ffedd5" />
        <rect x="101" y="61" width="59" height="31" rx="7" fill="#e0f2fe" />
        <rect x="101" y="100" width="59" height="31" rx="7" fill="#ede9fe" />
        <path d="M56 88h17l5-13H51l-4-7h-8" fill="none" stroke="#b45309" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        <circle cx="57" cy="96" r="3" fill="#b45309" />
        <circle cx="73" cy="96" r="3" fill="#b45309" />
        <path d="M113 82l12-13 12 13z" fill="#38bdf8" />
        <rect x="113" y="115" width="27" height="7" rx="3.5" fill="#8b5cf6" />
        <rect x="181" y="57" width="39" height="53" rx="10" fill="#f59e0b" />
        <path d="M190 57a10 10 0 0 1 20 0" fill="none" stroke="#fde68a" strokeWidth="3" />
        <path d="M193 79h15M193 87h11" stroke="#fff7ed" strokeLinecap="round" strokeWidth="2" />
        <circle cx="200" cy="128" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
        <path d="M193 128l5 5 9-10" fill="none" stroke="#7dd3fc" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
      </svg>
    );
  }

  if (number === "04") {
    return (
      <svg viewBox="0 0 240 168" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="booking-bg" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#1b2039" />
            <stop offset="1" stopColor="#3b2750" />
          </linearGradient>
        </defs>
        <rect width="240" height="168" rx="18" fill="url(#booking-bg)" />
        <circle cx="37" cy="137" r="36" fill="#f59e0b" opacity=".09" />
        <rect x="29" y="19" width="182" height="130" rx="12" fill="#fff" />
        <path d="M29 31a12 12 0 0 1 12-12h158a12 12 0 0 1 12 12v20H29z" fill="#f8fafc" />
        <rect x="44" y="30" width="63" height="6" rx="3" fill="#334155" />
        <rect x="44" y="40" width="41" height="4" rx="2" fill="#94a3b8" />
        <g fill="#64748b" fontFamily="Arial, sans-serif" fontSize="7" textAnchor="middle">
          <text x="54" y="67">M</text><text x="78" y="67">T</text><text x="102" y="67">W</text><text x="126" y="67">T</text><text x="150" y="67">F</text><text x="174" y="67">S</text>
        </g>
        <g fill="#cbd5e1">
          <circle cx="54" cy="84" r="8"/><circle cx="78" cy="84" r="8"/><circle cx="102" cy="84" r="8"/><circle cx="126" cy="84" r="8"/><circle cx="150" cy="84" r="8"/><circle cx="174" cy="84" r="8"/>
          <circle cx="54" cy="108" r="8"/><circle cx="78" cy="108" r="8"/><circle cx="102" cy="108" r="8"/><circle cx="126" cy="108" r="8"/><circle cx="150" cy="108" r="8"/><circle cx="174" cy="108" r="8"/>
        </g>
        <circle cx="126" cy="84" r="8" fill="#f59e0b" />
        <circle cx="78" cy="108" r="8" fill="#0ea5e9" />
        <rect x="43" y="127" width="53" height="11" rx="5.5" fill="#fff7ed" />
        <rect x="102" y="127" width="53" height="11" rx="5.5" fill="#e0f2fe" />
        <rect x="161" y="127" width="35" height="11" rx="5.5" fill="#f1f5f9" />
        <path d="M183 34l4 4 8-9" fill="none" stroke="#10b981" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 240 168" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="custom-bg" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#111827" />
          <stop offset="1" stopColor="#193b46" />
        </linearGradient>
      </defs>
      <rect width="240" height="168" rx="18" fill="url(#custom-bg)" />
      <circle cx="201" cy="39" r="42" fill="#14b8a6" opacity=".1" />
      <rect x="23" y="20" width="194" height="128" rx="12" fill="#f8fafc" />
      <rect x="23" y="20" width="45" height="128" rx="12" fill="#0f172a" />
      <path d="M56 20h12v128H56z" fill="#0f172a" />
      <circle cx="45" cy="38" r="7" fill="#f59e0b" />
      <rect x="35" y="56" width="20" height="4" rx="2" fill="#64748b" />
      <rect x="35" y="68" width="16" height="4" rx="2" fill="#64748b" />
      <rect x="35" y="80" width="21" height="4" rx="2" fill="#64748b" />
      <rect x="35" y="92" width="14" height="4" rx="2" fill="#64748b" />
      <rect x="81" y="34" width="91" height="7" rx="3.5" fill="#1e293b" />
      <rect x="81" y="47" width="121" height="4" rx="2" fill="#cbd5e1" />
      <rect x="81" y="61" width="58" height="36" rx="6" fill="#e0f2fe" />
      <path d="M89 88l12-13 9 7 12-13 10 8" fill="none" stroke="#0ea5e9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <rect x="147" y="61" width="55" height="36" rx="6" fill="#fff7ed" />
      <rect x="155" y="70" width="25" height="5" rx="2.5" fill="#b45309" />
      <rect x="155" y="81" width="37" height="4" rx="2" fill="#cbd5e1" />
      <circle cx="91" cy="116" r="8" fill="#14b8a6" />
      <circle cx="141" cy="116" r="8" fill="#38bdf8" />
      <circle cx="191" cy="116" r="8" fill="#a78bfa" />
      <path d="M99 116h34M149 116h34" stroke="#94a3b8" strokeDasharray="3 3" strokeWidth="2" />
      <rect x="81" y="132" width="121" height="5" rx="2.5" fill="#e2e8f0" />
    </svg>
  );
};

export default ServiceArt;
