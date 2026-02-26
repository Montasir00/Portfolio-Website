import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plane } from "lucide-react";

interface Chapter {
    name: string;
    lon: number;
    lat: number;
    year: string;
    color: string;
    places: string[];
}

const W = 960;
const H = 500;

// Extended viewBox: -15°W → 100°E, 10°N → 65°N (includes Bangladesh + Europe + Middle East)
const CROP_VB = "440 69 307 153";

function project(lon: number, lat: number): [number, number] {
    return [((lon + 180) / 360) * W, ((90 - lat) / 180) * H];
}

const CHAPTERS: Chapter[] = [
    {
        name: "Bangladesh",
        lon: 90.35, lat: 23.68,
        year: "Home Country",
        color: "#22d3ee",
        places: ["Dhaka", "Chittagong", "Sylhet"],
    },
    {
        name: "Sicily, Italy",
        lon: 14.2, lat: 37.6,
        year: "2022 — Present",
        color: "#10b981",
        places: ["Messina", "Taormina", "Palermo", "Mt. Etna", "Milo", "Catania", "Syracuse"],
    },
    {
        name: "Mainland Italy",
        lon: 11.5, lat: 44.0,
        year: "2023 — Present",
        color: "#3b82f6",
        places: ["Calabria", "Siena", "Bologna", "Venice", "Milan", "Turin"],
    },
    {
        name: "Germany",
        lon: 10.45, lat: 51.16,
        year: "2024",
        color: "#eab308",
        places: ["Germany"],
    },
    {
        name: "Saudi Arabia",
        lon: 45.07, lat: 23.88,
        year: "2024",
        color: "#f97316",
        places: ["Saudi Arabia"],
    },
];

export const TravelMap = ({ onLocationClick }: { onLocationClick?: (location: string) => void }) => {
    const [paths, setPaths] = useState<string[]>([]);
    const [hovered, setHovered] = useState<Chapter | null>(null);

    // Calculate flight paths
    const flightPaths = useMemo(() => {
        const results = [];
        for (let i = 0; i < CHAPTERS.length - 1; i++) {
            const p1 = project(CHAPTERS[i].lon, CHAPTERS[i].lat);
            const p2 = project(CHAPTERS[i + 1].lon, CHAPTERS[i + 1].lat);
            const dx = p2[0] - p1[0];
            const dy = p2[1] - p1[1];
            const dr = Math.sqrt(dx * dx + dy * dy) * 1.2; // Curve intensity
            results.push({
                id: `path-${i}`,
                d: `M ${p1[0]} ${p1[1]} A ${dr} ${dr} 0 0 1 ${p2[0]} ${p2[1]}`,
                color: CHAPTERS[i + 1].color
            });
        }
        return results;
    }, []);

    useEffect(() => {
        fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
            .then(r => r.json())
            .then(topo => {
                const { scale, translate } = topo.transform as { scale: [number, number]; translate: [number, number] };
                const decodeArc = (arcIdx: number): [number, number][] => {
                    const rev = arcIdx < 0;
                    const arc: number[][] = topo.arcs[rev ? ~arcIdx : arcIdx];
                    let qx = 0, qy = 0;
                    const pts = arc.map(([dx, dy]: number[]) => {
                        qx += dx; qy += dy;
                        return [qx * scale[0] + translate[0], qy * scale[1] + translate[1]] as [number, number];
                    });
                    return rev ? pts.reverse() : pts;
                };
                const ringToD = (ring: number[]) => {
                    const pts = ring.flatMap(decodeArc);
                    if (!pts.length) return "";
                    return pts.map(([lon, lat], i) => {
                        const [x, y] = project(lon, lat);
                        return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
                    }).join(" ") + " Z";
                };
                const result: string[] = [];
                for (const geo of topo.objects.countries.geometries) {
                    if (geo.type === "Polygon") {
                        for (const r of geo.arcs as number[][]) { const d = ringToD(r); if (d) result.push(d); }
                    } else if (geo.type === "MultiPolygon") {
                        for (const p of geo.arcs as number[][][]) for (const r of p) { const d = ringToD(r); if (d) result.push(d); }
                    }
                }
                setPaths(result);
            }).catch(() => { });
    }, []);

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                <span>Europe · Middle East · South Asia</span>
                <span>{CHAPTERS.reduce((s, c) => s + c.places.length, 0)} cities · {CHAPTERS.length} regions</span>
            </div>

            <div className="relative w-full rounded-3xl overflow-hidden bg-[#0a0f1d] border border-white/5 shadow-2xl">
                <svg viewBox={CROP_VB} className="w-full block" preserveAspectRatio="xMidYMid meet">
                    <rect x="0" y="0" width={W} height={H} fill="#0a0f1d" />

                    {/* Countries */}
                    {paths.map((d, i) => (
                        <path key={i} d={d} fill="#1a2740" stroke="#253450" strokeWidth={0.3} />
                    ))}

                    {/* Flight Paths */}
                    {flightPaths.map((path, i) => (
                        <g key={path.id}>
                            <motion.path
                                d={path.d}
                                fill="none"
                                stroke={path.color}
                                strokeWidth="0.5"
                                strokeDasharray="2,2"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.4 }}
                                transition={{
                                    duration: 1,
                                    delay: i * 1,
                                    ease: "easeInOut"
                                }}
                            />
                            {/* Plane Icon Animation */}
                            <motion.g
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: [0, 1, 1, 0]
                                }}
                                transition={{
                                    duration: 1,
                                    delay: i * 1,
                                    repeat: Infinity,
                                    repeatDelay: (CHAPTERS.length - 1) * 1 - 1,
                                    ease: "easeInOut"
                                }}
                            >
                                <motion.path
                                    d="M -1.5,-1 L 1.5,0 L -1.5,1 L -1,0 Z" // Simple plane/arrow shape
                                    fill={path.color}
                                    stroke="white"
                                    strokeWidth="0.2"
                                >
                                    <animateMotion
                                        path={path.d}
                                        dur="1s"
                                        begin={`${i * 1}s`}
                                        repeatCount="indefinite"
                                        rotate="auto"
                                    />
                                </motion.path>
                            </motion.g>
                        </g>
                    ))}

                    {/* Pins — no emojis, subtle glow */}
                    {CHAPTERS.map((ch) => {
                        const [x, y] = project(ch.lon, ch.lat);
                        const isHovered = hovered?.name === ch.name;
                        return (
                            <g
                                key={ch.name}
                                transform={`translate(${x.toFixed(1)},${y.toFixed(1)})`}
                                onMouseEnter={() => setHovered(ch)}
                                onMouseLeave={() => setHovered(null)}
                                onClick={() => onLocationClick?.(ch.name)}
                                style={{ cursor: "pointer" }}
                            >
                                {/* Subtle pulse — low opacity, small range */}
                                <circle r="0" fill={ch.color} opacity="0">
                                    <animate attributeName="r" values="2;6;2" dur="3s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite" />
                                </circle>
                                {/* Hover ring */}
                                {isHovered && <circle r="5" fill="none" stroke={ch.color} strokeWidth="0.7" opacity="0.5" />}
                                {/* Core dot */}
                                <circle r={isHovered ? 3 : 2} fill={ch.color} stroke="#0a0f1d" strokeWidth="0.7" />
                            </g>
                        );
                    })}
                </svg>

                {/* Hover popup */}
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            key={hovered.name}
                            initial={{ opacity: 0, y: 6, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute bottom-3 right-3 bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-2xl min-w-[170px] max-w-[210px]"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: hovered.color }} />
                                <div>
                                    <p className="text-xs font-bold text-white leading-none">{hovered.name}</p>
                                    <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest">{hovered.year}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {hovered.places.map(p => (
                                    <span
                                        key={p}
                                        className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full text-white/80"
                                        style={{ background: hovered.color + "25", border: `1px solid ${hovered.color}40` }}
                                    >
                                        {p}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
