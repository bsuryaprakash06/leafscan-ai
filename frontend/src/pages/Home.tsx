import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { getTranslation } from "../data/i18n"
import type { Language } from "../data/i18n"
import leafBg from "../assets/leaf-bg.png"

const diseaseData = {
    Tomato: ["Early blight", "Late blight", "Leaf Mold", "Septoria leaf spot", "Healthy"],
    Potato: ["Early blight", "Late blight", "Healthy"],
    Apple: ["Apple scab", "Black rot", "Cedar apple rust", "Healthy"],
    Corn: ["Cercospora leaf spot", "Common rust", "Northern Leaf Blight", "Healthy"],
    Grape: ["Black rot", "Esca", "Leaf blight", "Healthy"],
    Pepper: ["Bacterial spot", "Healthy"]
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const LeafIcon = ({ size = 20, color = "#22C55E" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
)

const GitHubIcon = ({ size = 16 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
)

const UploadIcon = ({ size = 16 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
)

const BoltIcon = ({ size = 12, color = "#22C55E" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
)

const PowerIcon = ({ size = 15, color = "#22C55E" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" /><line x1="12" y1="2" x2="12" y2="12" />
    </svg>
)

const NetworkIcon = ({ size = 15, color = "#22C55E" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="3" /><line x1="12" y1="8" x2="12" y2="12" />
        <circle cx="6" cy="17" r="3" /><circle cx="18" cy="17" r="3" />
        <line x1="9" y1="13.5" x2="6.5" y2="14.5" /><line x1="15" y1="13.5" x2="17.5" y2="14.5" />
    </svg>
)

const MobileIcon = ({ size = 15, color = "#22C55E" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
)

const GridIcon = ({ size = 15, color = "#22C55E" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
)

const MenuIcon = () => (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
)

// ─── Circular Progress (donut chart) ─────────────────────────────────────────

function CircularProgress({ value = 95.2 }: { value?: number }) {
    const size = 116, sw = 9
    const r = (size - sw * 2) / 2
    const c = 2 * Math.PI * r
    const off = c - (value / 100) * c
    return (
        <div className="relative mx-auto overflow-hidden rounded-full w-[116px] h-[116px] flex items-center justify-center">
            <svg width={size} height={size} className="block -rotate-90 absolute">
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(34,197,94,0.12)" strokeWidth={sw} />
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" className="stroke-green-500" strokeWidth={sw}
                    strokeDasharray={`${c}`} strokeDashoffset={`${off}`} strokeLinecap="round"
                    style={{ filter: "drop-shadow(0 0 4px rgba(34,197,94,0.6))" }} />
            </svg>
            <div className="flex flex-col items-center justify-center z-10">
                <span className="text-white font-bold text-[21px] leading-none">{value}%</span>
                <span className="text-center text-[#6B7280] text-[9.5px] mt-1 leading-tight">
                    Test<br />Accuracy
                </span>
            </div>
        </div>
    )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ icon, value, label, glassStyle }: { icon: React.ReactNode; value: string; label: string; glassStyle?: string }) {
    return (
        <div className={`flex items-center gap-6 rounded-xl transition-all duration-300 ease-out cursor-default p-3 ${glassStyle}`}>
            <div className="flex items-center justify-center flex-shrink-0 rounded-lg w-[34px] h-[34px] bg-green-500/10 border border-green-500/20">
                {icon}
            </div>
            <div>
                <div className="text-white font-bold text-[21px] leading-none tracking-tight">{value}</div>
                <div className="text-[10px] text-white/40 mt-0.5">{label}</div>
            </div>
        </div>
    )
}

// ─── Mouse Glow (Isolated for performance) ────────────────────────────────────

function MouseGlow() {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMouse({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            className="hidden lg:block"
            style={{
                position: "fixed",
                top: mouse.y - 150,
                left: mouse.x - 150,
                width: 300,
                height: 300,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(34,197,94,0.15), transparent 70%)",
                pointerEvents: "none",
                transition: "all 0.05s linear",
                zIndex: 0
            }}
        />
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LeafScanLanding() {
    const navigate = useNavigate();
    const [openPlant, setOpenPlant] = useState<string | null>(null);

    const [lang, setLang] = useState<Language>(() => {
        return (localStorage.getItem("leafscan_lang") as Language) || "en";
    });

    const handleLangChange = (l: Language) => {
        setLang(l);
        localStorage.setItem("leafscan_lang", l);
    };

    const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(lang, key);

    const [activeNav, setActiveNav] = useState("nav_home")
    const NAV: { key: Parameters<typeof getTranslation>[1], route: string, id?: string }[] = [
        { key: "nav_home", route: "/" },
        { key: "nav_detect", route: "/detect" },
        { key: "nav_how", route: "/", id: "how-it-works" },
        { key: "nav_about", route: "/", id: "about" },
        { key: "nav_contact", route: "/", id: "contact" }
    ];

    return (
        <div className="min-h-screen text-white w-full font-sans bg-[#050E07] relative overflow-hidden">

            {/* Global Background System */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent pointer-events-none" />

            {/* Mouse Tracking Glow */}
            <MouseGlow />

            <style>{`
                *{box-sizing:border-box}
                @keyframes floatLeaf {
                    0% { transform: translateY(-50%) translateX(0px); }
                    50% { transform: translateY(-48%) translateX(-10px); }
                    100% { transform: translateY(-50%) translateX(0px); }
                }
            `}</style>

            {/* ══ NAV ══════════════════════════════════════════════════════════════════ */}
            <nav className="flex items-center sticky top-0 z-50 w-full px-4 sm:px-6 xl:px-16 2xl:px-24 justify-between min-h-[62px] py-3 lg:py-0 border-b border-green-500/10 bg-[#050E07]/92 backdrop-blur-xl flex-wrap">
                {/* Logo */}
                <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                    <div className="flex items-center justify-center rounded-lg border border-[#4ade80]/32 bg-[#4ade80]/14 w-8 h-8 md:w-[34px] md:h-[34px]">
                        <LeafIcon size={18} />
                    </div>
                    <span className="text-white font-bold text-sm md:text-base tracking-[-0.3px]">LeafScan AI</span>
                    <span className="text-[8px] md:text-[10px] font-mono text-[#4ADE80] bg-[#4ade80]/10 border border-[#4ade80]/20 px-1.5 md:px-2 py-0.5 rounded tracking-wider hidden sm:inline-block">v1.0</span>
                </div>

                {/* Nav links (hide on mobile) */}
                <div className="hidden lg:flex items-center gap-8">
                    {NAV.map((item, idx) => (
                        <motion.button
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + idx * 0.1 }}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            key={item.key}
                            onClick={() => {
                                setActiveNav(item.key);
                                if (item.route && item.route !== window.location.pathname) {
                                    navigate(item.route);
                                }
                                if (item.id) {
                                    setTimeout(() => document.getElementById(item.id as string)?.scrollIntoView({ behavior: "smooth" }), 100);
                                }
                            }}
                            className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-300 ease-out border border-transparent ${activeNav === item.key
                                ? "text-green-400 bg-green-500/10 border-green-500/30"
                                : "text-white/60 hover:text-white"
                                }`}
                        >
                            {t(item.key)}
                        </motion.button>
                    ))}
                </div>

                <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
                    <select
                        value={lang}
                        onChange={(e) => handleLangChange(e.target.value as Language)}
                        className="bg-white/5 border border-green-500/20 text-white rounded-md px-2 py-1 text-xs md:text-sm outline-none hover:border-green-500/50 transition"
                    >
                        <option value="en">English</option>
                        <option value="ta">தமிழ்</option>
                        <option value="hi">हिंदी</option>
                    </select>

                    <a href="https://github.com/bsuryaprakash06/leafscan-ai" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 bg-transparent border border-green-500/40 text-green-400 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ease-out hover:bg-green-500/10 active:scale-95">
                        <GitHubIcon size={15} />
                        GitHub
                    </a>
                    <button className="lg:hidden bg-transparent border-none cursor-pointer text-white/65 p-1 flex items-center transition-all duration-300 ease-out hover:text-green-400 active:scale-95">
                        <MenuIcon />
                    </button>
                </div>
            </nav>

            {/* ══ HERO ═════════════════════════════════════════════════════════════════ */}
            <section className="relative w-full overflow-hidden min-h-[520px] py-12 md:py-20">

                {/* Background image layer - Responsive */}
                <img
                    src={leafBg}
                    alt="leaf"
                    className="absolute right-[-10%] md:right-[30%] top-3/4 md:top-3/4 -translate-y-1/2 w-[80%] md:w-[40%] max-w-[850px] opacity-20 md:opacity-65 pointer-events-none z-0 brightness-[1.2] contrast-[1.2] animate-[floatLeaf_6s_ease-in-out_infinite]"
                />

                {/* Glow overlays */}
                <div className="fixed inset-0 pointer-events-none z-[1] bg-[radial-gradient(circle_at_70%_50%,rgba(34,197,94,0.15),transparent_60%)]" />
                <div className="fixed right-[-10%] top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-green-500/25 blur-[120px] z-0" />

                <div className="w-full px-4 sm:px-6 xl:px-16 2xl:px-24 relative z-[2]">
                    <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] items-center gap-12 md:gap-16 w-full pl-0 ml-0">

                        {/* ── Left ── */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-left"
                        >
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-green-500/30 bg-green-500/5 mb-6 md:mb-8"
                            >
                                <BoltIcon size={12} />
                                <span className="text-[8px] md:text-[10px] font-mono uppercase tracking-[2px] text-green-400 font-bold">{t('hero_badge')}</span>
                            </motion.div>

                            {/* Headline */}
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-4xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold leading-[1.1] md:leading-[1.05] tracking-tight mb-6 md:mb-8"
                            >
                                <span className="block text-white">{t('hero_title1')}</span>
                                <span className="block bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(34,197,194,0.4)]">{t('hero_title2')}</span>
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="text-sm sm:text-base xl:text-lg text-white/50 leading-relaxed mb-10 md:mb-12 max-w-xl"
                            >
                                {t('hero_subtitle')}
                            </motion.p>

                            {/* CTA buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 md:gap-6 mb-10 md:mb-12"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(34,197,94,0.4)" }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate("/detect")}
                                    className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-3 shadow-lg shadow-green-500/20 w-full sm:w-auto"
                                >
                                    <UploadIcon size={18} />
                                    {t('btn_upload')}
                                </motion.button>
                            </motion.div>

                            {/* Bullet pills */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 1 }}
                                className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-8 md:gap-12"
                            >
                                {[`14 ${t('stats_crops')}`, `38 ${t('stats_classes')}`, "97% Accuracy"].map(text => (
                                    <div key={text} className="flex items-center gap-4 md:gap-6">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.9)] shrink-0" />
                                        <span className="text-[11px] md:text-[13px] font-bold text-white/40 tracking-wide uppercase">{text}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* ── Right: Stats ── */}
                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={{
                                hidden: { opacity: 0, x: 40 },
                                show: {
                                    opacity: 1,
                                    x: 0,
                                    transition: {
                                        staggerChildren: 0.15,
                                        delayChildren: 0.5
                                    }
                                }
                            }}
                            className="flex flex-col gap-6 md:gap-8 w-full h-full justify-center lg:max-w-[340px] xl:justify-self-end self-center mt-8 xl:mt-0"
                        >
                            {/* AI Model card (Important) */}
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, scale: 0.9 },
                                    show: { opacity: 1, scale: 1 }
                                }}
                                className="rounded-[32px] p-6 md:p-8 transition-all duration-300 ease-out hover:scale-[1.02] backdrop-blur-[18px] bg-green-500/5 border border-green-500/30 shadow-lg"
                            >
                                <div className="text-[10px] text-green-400 tracking-[3px] font-mono uppercase mb-2 font-black text-center">AI MODEL SYSTEM</div>
                                <div className="text-white font-black text-lg md:text-xl mb-6 text-center">MobileNetV2</div>
                                <CircularProgress value={97} />
                            </motion.div>

                            {/* Metric cards */}
                            {[
                                { icon: <LeafIcon size={16} />, value: "54,306", label: t("stats_images") },
                                { icon: <GridIcon size={16} />, value: "38", label: t("stats_classes") },
                                { icon: <LeafIcon size={16} />, value: "14", label: t("stats_crops") }
                            ].map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        show: { opacity: 1, y: 0 }
                                    }}
                                    className="transition-all duration-300 ease-out hover:scale-[1.02] rounded-2xl"
                                >
                                    <StatCard icon={stat.icon} value={stat.value} label={stat.label} glassStyle="backdrop-blur-[18px] bg-white/[0.03] border border-white/[0.06] shadow-md" />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══ BOTTOM SECTION ══════════════════════════════════════════════════════ */}
            <section className="w-full pb-16 md:pb-32">
                <div className="w-full px-4 sm:px-6 xl:px-16 2xl:px-24 grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-8 md:gap-12">

                    {/* ── Smart Agriculture Card ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="transition-all duration-300 ease-out hover:scale-[1.01] rounded-[32px] md:rounded-[40px] overflow-hidden p-6 sm:p-8 md:p-12 backdrop-blur-[18px] bg-white/[0.03] border border-white/[0.06] shadow-2xl"
                    >
                        <div className="flex flex-col xl:flex-row gap-8 md:gap-12">

                            {/* Text Content */}
                            <div className="flex-1 min-w-0 text-left">
                                {/* Badge */}
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-green-500/30 bg-green-500/5 mb-6 md:mb-8">
                                    <UploadIcon size={11} />
                                    <span className="text-[8px] md:text-[10px] font-mono uppercase tracking-[2px] text-green-400 font-black">TRUSTED BY FARMERS</span>
                                </div>

                                <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight leading-[1.1] mb-4 md:mb-6 text-white">
                                    {t('smart_title1')}<br />
                                    <span className="text-[#22C55E]">{t('smart_title2')}</span>
                                </h2>

                                <p className="text-sm md:text-base text-white/40 leading-relaxed mb-8 md:mb-10 max-w-sm font-medium">
                                    Early disease detection helps prevent crop loss and increases yield by up to 30%.
                                </p>

                                {/* Stats Row */}
                                <div className="flex flex-wrap items-center gap-6 md:gap-10 mb-8 md:mb-12">
                                    <div>
                                        <div className="text-green-400 text-xl md:text-2xl font-black transition-all duration-300 ease-out hover:scale-110 cursor-default">97%</div>
                                        <div className="text-white/30 text-[9px] md:text-[10px] uppercase tracking-wider font-bold">Accuracy</div>
                                    </div>
                                    <div>
                                        <div className="text-green-400 text-xl md:text-2xl font-black transition-all duration-300 ease-out hover:scale-110 cursor-default">2s</div>
                                        <div className="text-white/30 text-[9px] md:text-[10px] uppercase tracking-wider font-bold">Detection</div>
                                    </div>
                                    <div>
                                        <div className="text-green-400 text-xl md:text-2xl font-black transition-all duration-300 ease-out hover:scale-110 cursor-default">38+</div>
                                        <div className="text-white/30 text-[9px] md:text-[10px] uppercase tracking-wider font-bold">Diseases</div>
                                    </div>
                                </div>

                                {/* Mini Quote */}
                                <div className="border-l-2 border-green-500/40 pl-4 md:pl-6 mb-8 md:mb-12">
                                    <p className="text-white/60 text-xs md:text-sm italic leading-relaxed font-medium">
                                        “AI-powered detection is transforming how farmers protect crops and maximize yield.”
                                    </p>
                                </div>

                                {/* Technology Badge */}
                                <div className="inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-[8px] md:text-[10px] font-bold tracking-widest uppercase mb-8 md:mb-12">
                                    Powered by Deep Learning & Computer Vision
                                </div>

                                {/* Features List */}
                                <div className="flex flex-col gap-6 md:gap-8">
                                    {[
                                        { Icon: PowerIcon, title: "Instant Results", desc: "Get diagnosis in under 2 seconds" },
                                        { Icon: NetworkIcon, title: "Expert Recommendations", desc: "Treatment and prevention tips" },
                                        { Icon: MobileIcon, title: "Mobile Friendly", desc: "Works on all devices" },
                                    ].map(({ Icon, title, desc }) => (
                                        <div key={title} className="flex items-start gap-4 md:gap-5">
                                            <div className="flex items-center justify-center flex-shrink-0 rounded-2xl bg-green-500/10 border border-green-500/20 w-10 h-10 md:w-12 md:h-12 mt-0.5">
                                                <Icon size={18} />
                                            </div>
                                            <div>
                                                <div className="text-white font-black text-sm md:text-base mb-1">{title}</div>
                                                <div className="text-xs md:text-sm text-white/30 font-medium">{desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Logo strip */}
                                <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-green-500/10">
                                    <p className="text-[9px] md:text-[11px] text-white/30 uppercase tracking-[2px] md:tracking-[3px] mb-4 md:mb-6 font-black">
                                        Powered by Industry Tools
                                    </p>
                                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-10 transition-opacity duration-300">
                                        {[
                                            { src: "/logos/pytorch.svg", link: "https://pytorch.org", name: "PyTorch" },
                                            { src: "/logos/huggingface.svg", link: "https://huggingface.co", name: "HuggingFace" },
                                            { src: "/logos/kaggle.svg", link: "https://kaggle.com", name: "Kaggle" },
                                            { src: "/logos/vercel.svg", link: "https://vercel.com", name: "Vercel" },
                                            { src: "/logos/python.svg", link: "https://python.org", name: "Python" },
                                        ].map((logo) => (
                                            <a key={logo.name} href={logo.link} target="_blank" rel="noopener noreferrer" className="block">
                                                <img
                                                    src={logo.src}
                                                    alt={logo.name}
                                                    title={logo.name}
                                                    className="h-4 sm:h-5 md:h-7 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition duration-300 cursor-pointer"
                                                />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Scanning Panel (Hidden on small mobile) */}
                            <div className="hidden sm:block w-full xl:w-[320px] h-[300px] md:h-[380px] shrink-0 rounded-[24px] md:rounded-[32px] overflow-hidden border border-white/10 bg-black/40 relative shadow-2xl mt-8 xl:mt-0">
                                <div className="ImprovedScanningPlant relative w-full h-full overflow-hidden">
                                    <style>{`
                                        @keyframes scanMove { 0%{top:12%} 50%{top:72%} 100%{top:12%} }
                                        @keyframes pulseCircle { 0%,100%{opacity:0.35} 50%{opacity:0.75} }
                                        @keyframes blinkScan { 0%,49%{opacity:1} 50%,100%{opacity:0.35} }
                                        .scan-bar { position:absolute; left:12%; right:12%; height:2px; background:linear-gradient(90deg, transparent 5%, rgba(239, 68, 68, 0.9) 50%, transparent 95%); animation:scanMove 3.2s ease-in-out infinite; z-index:10; box-shadow:0 0 20px rgba(239, 68, 68, 0.7); }
                                        .scan-txt { animation:blinkScan 1.1s step-end infinite; }
                                    `}</style>

                                    {/* Plant SVG illustration */}
                                    <svg viewBox="0 0 300 220" className="w-full h-full block bg-transparent opacity-80 mt-4 md:mt-8">
                                        <rect x="0" y="196" width="300" height="24" fill="#091209" />
                                        <path d="M 150 196 C 150 176 150 156 149 136 C 148 116 147 98 145 78" stroke="#214f26" strokeWidth="4" fill="none" strokeLinecap="round" />
                                        <path d="M 145 78 C 138 60 137 40 143 24 C 152 24 157 40 155 60 Z" fill="#34853b" />
                                        <path d="M 142 118 C 124 108 112 92 110 74 C 122 70 136 84 140 102 Z" fill="#23602d" />
                                        <path d="M 154 108 C 172 96 188 84 194 66 C 182 62 169 74 164 92 Z" fill="#23602d" />
                                    </svg>

                                    {/* HUD Overlays */}
                                    <div className="scan-bar" />
                                    <div className="absolute top-4 md:top-6 left-4 md:left-6 w-6 md:w-8 h-6 md:h-8 border-t-2 border-l-2 border-red-500/60" />
                                    <div className="absolute top-4 md:top-6 right-4 md:right-6 w-6 md:w-8 h-6 md:h-8 border-t-2 border-r-2 border-red-500/60" />
                                    <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 w-6 md:w-8 h-6 md:h-8 border-b-2 border-l-2 border-red-500/60" />
                                    <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 w-6 md:w-8 h-6 md:h-8 border-b-2 border-r-2 border-red-500/60" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 md:w-20 h-16 md:h-20 rounded-full border-2 border-red-500/20 animate-[pulseCircle_2.2s_ease-in-out_infinite]" />
                                    <div className="scan-txt absolute bottom-6 md:bottom-8 inset-x-0 text-center text-[8px] md:text-[10px] font-mono text-red-500 font-black tracking-[3px] md:tracking-[4px] uppercase">
                                        SCANNING...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Right column (Supported Crops & How it works) ── */}
                    <div className="flex flex-col gap-6 md:gap-10 text-left">
                        {/* Supported Crops & Diseases */}
                        <div className="transition-all duration-300 ease-out hover:scale-[1.02] rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-10 backdrop-blur-[18px] bg-white/[0.03] border border-white/[0.06] shadow-xl">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-green-500/30 bg-green-500/5 mb-6 md:mb-8">
                                <BoltIcon size={10} />
                                <span className="text-[8px] md:text-[10px] font-mono uppercase tracking-[2px] text-green-400 font-black">SUPPORTED DATASET</span>
                            </div>

                            <h3 className="text-xl sm:text-2xl xl:text-3xl font-black tracking-tight mb-8 md:mb-10 text-white leading-none">Crops & Diseases</h3>

                            <div className="flex flex-col gap-4 md:gap-6">
                                {Object.entries(diseaseData).map(([plant, diseases]) => (
                                    <div key={plant} className="group">
                                        <button
                                            onClick={() => setOpenPlant(openPlant === plant ? null : plant)}
                                            className="w-full text-left px-4 md:px-6 py-4 md:py-5 rounded-xl md:rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-green-500/40 hover:bg-green-500/[0.03] transition-all duration-300 ease-out flex items-center justify-between group active:scale-[0.98]"
                                        >
                                            <span className={`text-sm md:text-[15px] font-black transition-colors ${openPlant === plant ? 'text-green-400' : 'text-white/70 group-hover:text-white'}`}>
                                                {plant}
                                            </span>
                                            <span className={`text-[10px] transition-transform duration-500 ${openPlant === plant ? 'rotate-180 text-green-400' : 'text-white/30'}`}>
                                                ▼
                                            </span>
                                        </button>

                                        {openPlant === plant && (
                                            <div className="mt-3 md:mt-4 ml-4 md:ml-5 pl-4 md:pl-6 border-l-2 border-white/10">
                                                <ul className="grid grid-cols-1 gap-2 md:gap-3">
                                                    {diseases.map((disease, i) => (
                                                        <li key={i} className="text-xs md:text-[13px] text-white/50 flex items-center gap-4 md:gap-6 font-medium">
                                                            <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-green-500/40 shrink-0" />
                                                            {disease}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* How it works */}
                        <div id="how-it-works" className="scroll-mt-24 transition-all duration-300 ease-out hover:scale-[1.02] rounded-[24px] md:rounded-[32px] p-6 sm:p-8 md:p-10 backdrop-blur-[18px] bg-white/[0.03] border border-white/[0.06] shadow-xl">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-green-500/30 bg-green-500/5 mb-6 md:mb-8">
                                <BoltIcon size={10} />
                                <span className="text-[8px] md:text-[10px] font-mono uppercase tracking-[2px] text-green-400 font-black">HOW IT WORKS</span>
                            </div>

                            <h3 className="text-xl sm:text-2xl xl:text-3xl font-black tracking-tight mb-8 md:mb-12 text-white leading-none">Simple as 1, 2, 3</h3>

                            <div className="flex flex-col gap-6 md:gap-10">
                                {[
                                    { n: 1, title: "Upload", desc: "Upload a clear leaf image" },
                                    { n: 2, title: "Analyze", desc: "AI analyzes in seconds" },
                                    { n: 3, title: "Get Results", desc: "View diagnosis & treatment" },
                                ].map(({ n, title, desc }) => (
                                    <div key={n} className="flex items-center gap-4 md:gap-8">
                                        <div className="flex items-center justify-center rounded-xl md:rounded-2xl bg-green-500 text-black font-black text-sm md:text-base w-10 h-10 md:w-14 md:h-14 shrink-0 shadow-lg shadow-green-500/40">
                                            {n}
                                        </div>
                                        <div>
                                            <div className="text-white font-black text-sm md:text-lg mb-1">{title}</div>
                                            <div className="text-xs md:text-[13px] text-white/30 leading-relaxed font-medium">{desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ ABOUT & CONTACT ═══════════════════════════════════════════════════════ */}
            <section id="about" className="w-full pb-16 md:pb-24 scroll-mt-24">
                <div className="w-full px-4 sm:px-6 xl:px-16 2xl:px-24">
                    <div className="rounded-[32px] md:rounded-[40px] p-8 md:p-14 backdrop-blur-[18px] bg-green-500/[0.02] border border-green-500/[0.05] flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 text-center md:text-left relative overflow-hidden">
                        {/* decorative bg */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full pointer-events-none" />

                        <div className="relative z-10 max-w-xl">
                            <h3 className="text-2xl md:text-4xl font-black mb-4">About the Developer</h3>
                            <p className="text-white/50 text-sm md:text-base leading-relaxed mb-6 font-medium">
                                Hi, I'm <span className="text-white font-bold">Surya Prakash B</span>. I built LeafScan AI to blend cutting-edge computer vision with a beautiful, accessible interface to empower farmers and agronomists globally.
                            </p>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                <a href="mailto:suryaprakashb2006@gmail.com" className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-green-500/40 hover:bg-green-500/10 text-xs md:text-sm font-bold transition-all flex items-center gap-2">
                                    📧 suryaprakashb2006@gmail.com
                                </a>
                                <a href="https://www.linkedin.com/in/bsuryaprakash06" target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-xl bg-[#0077b5]/10 border border-[#0077b5]/30 hover:bg-[#0077b5]/20 text-xs md:text-sm font-bold text-[#0077b5] transition-all flex items-center gap-2">
                                    💼 LinkedIn
                                </a>
                                <a href="https://github.com/bsuryaprakash06" target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/20 hover:border-green-500/40 hover:bg-white/10 text-xs md:text-sm font-bold transition-all flex items-center gap-2">
                                    <GitHubIcon size={16} /> GitHub
                                </a>
                                <a href="https://huggingface.co/xshane" target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/30 hover:bg-yellow-500/20 text-xs md:text-sm font-bold text-yellow-500 transition-all flex items-center gap-2">
                                    🤗 HuggingFace
                                </a>
                            </div>
                        </div>

                        <div className="relative z-10 shrink-0 opacity-80 mix-blend-screen hidden md:block">
                            <LeafIcon size={120} color="rgba(34,197,94,0.15)" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ FOOTER ════════════════════════════════════════════════════════════════ */}
            <footer id="contact" className="w-full py-12 md:py-20 border-t border-white/5 bg-black/40">
                <div className="w-full px-4 sm:px-6 xl:px-16 2xl:px-24 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 text-center md:text-left">
                    <span className="text-[10px] md:text-[12px] text-white/40 tracking-widest uppercase font-black flex flex-col gap-1 items-center md:items-start">
                        <span>© 2024 LeafScan AI. Built for Farmers.</span>
                        <span className="text-green-500/80">Built By: Surya Prakash B</span>
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
                        {[
                            { label: "Privacy Policy", msg: "Privacy Policy:\n\nAll images processed via LeafScan AI are evaluated locally and ephemerally. We do not store or track your plant images to respect farmer data privacy." },
                            { label: "Terms of Service", msg: "Terms of Service:\n\nLeafScan AI is an open-source educational tool. Predictions are powered by deep learning but should not serve as an absolute substitute for professional agronomist advice." },
                            { label: "Support", msg: "Support:\n\nFor any inquiries or bug reports, please contact me directly at suryaprakashb2006@gmail.com." }
                        ].map(link => (
                            <button
                                key={link.label}
                                onClick={() => alert(link.msg)}
                                className="text-[10px] md:text-[12px] text-white/20 hover:text-green-400 transition-all duration-300 ease-out bg-transparent border-none cursor-pointer tracking-widest uppercase font-black active:scale-95"
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    )
}