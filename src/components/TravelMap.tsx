import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Region {
    id: string;
    name: string;
    lon: number;
    lat: number;
    year: string;
    color: string;
    places: string[];
}

const W = 960;
const H = 500;
const SEGMENT_DUR = 0.5; // Faster speed for better user experience

// Extended viewBox: -15°W → 100°E, 10°N → 65°N
const CROP_VB = "440 69 307 153";

function project(lon: number, lat: number): [number, number] {
    return [((lon + 180) / 360) * W, ((90 - lat) / 180) * H];
}

const REGIONS: Record<string, Region> = {
    bangladesh: {
        id: "bangladesh",
        name: "Bangladesh",
        lon: 90.35, lat: 23.68,
        year: "Home Country",
        color: "#22d3ee",
        places: ["Dhaka", "Chittagong", "Sylhet"],
    },
    sicily: {
        id: "sicily",
        name: "Sicily, Italy",
        lon: 14.2, lat: 37.6,
        year: "Home Base",
        color: "#10b981",
        places: ["Messina", "Taormina", "Palermo", "Catania", "Syracuse", "Mt. Etna"],
    },
    mainland: {
        id: "mainland",
        name: "Mainland Italy",
        lon: 11.5, lat: 44.0,
        year: "2023 — Present",
        color: "#3b82f6",
        places: ["Milan", "Lake Como", "Venice", "Bologna", "Siena", "Turin"],
    },
    saudi: {
        id: "saudi",
        name: "Saudi Arabia",
        lon: 45.07, lat: 23.88,
        year: "2024",
        color: "#f97316",
        places: ["Mecca", "Medina", "Jeddah", "Riyadh"],
    },
    germany: {
        id: "germany",
        name: "Germany",
        lon: 10.45, lat: 51.16,
        year: "2024",
        color: "#eab308",
        places: ["Munich", "Frankfurt", "Nuremberg", "Garmisch-Partenkirchen", "Ingolstadt"],
    },
    switzerland: {
        id: "switzerland",
        name: "Switzerland",
        lon: 8.6, lat: 47.7,
        year: "2024",
        color: "#ef4444",
        places: ["Rhine Falls", "Zurich"],
    }
};

// Bangladesh->Sicily->mainland italy->sicily->saudirabia-> sicily->germany->switzerland->germany-> sicily
const FLIGHT_SEQUENCE = [
    REGIONS.bangladesh,
    REGIONS.sicily,
    REGIONS.mainland,
    REGIONS.sicily,
    REGIONS.saudi,
    REGIONS.sicily,
    REGIONS.germany,
    REGIONS.switzerland,
    REGIONS.germany,
    REGIONS.sicily
];

export const TravelMap = ({ onLocationClick }: { onLocationClick?: (location: string) => void }) => {
    const [paths, setPaths] = useState<string[]>([]);
    const [hovered, setHovered] = useState<Region | null>(null);

    const TOTAL_CYCLE = (FLIGHT_SEQUENCE.length - 1) * SEGMENT_DUR;

    // Calculate flight paths based on the requested sequence
    const flightPaths = useMemo(() => {
        const results = [];
        for (let i = 0; i < FLIGHT_SEQUENCE.length - 1; i++) {
            const p1 = project(FLIGHT_SEQUENCE[i].lon, FLIGHT_SEQUENCE[i].lat);
            const p2 = project(FLIGHT_SEQUENCE[i + 1].lon, FLIGHT_SEQUENCE[i + 1].lat);
            const dx = p2[0] - p1[0];
            const dy = p2[1] - p1[1];
            const dist = Math.sqrt(dx * dx + dy * dy);
            const dr = dist * 1.5;

            const startT = (i * SEGMENT_DUR) / TOTAL_CYCLE;
            const endT = ((i + 1) * SEGMENT_DUR) / TOTAL_CYCLE;

            results.push({
                id: `path-${i}`,
                d: `M ${p1[0]} ${p1[1]} A ${dr} ${dr} 0 0 1 ${p2[0]} ${p2[1]}`,
                color: FLIGHT_SEQUENCE[i + 1].color,
                keyTimesPosition: `0;${startT};${endT};1`,
                keyTimesOpacity: `0;${startT};${startT + 0.01};${endT - 0.01};${endT};1`,
                valuesOpacity: `0;0;1;1;0;0`
            });
        }
        return results;
    }, [TOTAL_CYCLE]);

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
                <span>{Object.values(REGIONS).reduce((s, c) => s + c.places.length, 0)} cities · {Object.keys(REGIONS).length} regions</span>
            </div>

            <div className="relative w-full rounded-3xl overflow-hidden bg-[#0a0f1d] border border-white/5 shadow-2xl">
                <svg viewBox={CROP_VB} className="w-full block" preserveAspectRatio="xMidYMid meet">
                    <rect x="0" y="0" width={W} height={H} fill="#0a0f1d" />

                    {/* Countries Layer */}
                    {paths.map((d, i) => (
                        <path key={i} d={d} fill="#1a2740" stroke="#253450" strokeWidth={0.3} />
                    ))}

                    {/* Flight Paths Layer */}
                    {flightPaths.map((path) => (
                        <g key={path.id}>
                            <path
                                d={path.d}
                                fill="none"
                                stroke={path.color}
                                strokeWidth="0.5"
                                strokeDasharray="2,2"
                                opacity="0.1"
                            />

                            {/* Plane Visual Group */}
                            <g opacity="0">
                                <animate
                                    attributeName="opacity"
                                    values={path.valuesOpacity}
                                    keyTimes={path.keyTimesOpacity}
                                    dur={`${TOTAL_CYCLE}s`}
                                    repeatCount="indefinite"
                                />

                                <path
                                    d="M -1.5,-1 L 1.5,0 L -1.5,1 L -1,0 Z"
                                    fill={path.color}
                                    stroke="white"
                                    strokeWidth="0.2"
                                >
                                    <animateMotion
                                        path={path.d}
                                        dur={`${TOTAL_CYCLE}s`}
                                        keyPoints="0;0;1;1"
                                        keyTimes={path.keyTimesPosition}
                                        repeatCount="indefinite"
                                        rotate="auto"
                                    />
                                </path>
                                {/* Glow effect */}
                                <circle r="2" fill={path.color} opacity="0.4">
                                    <animateMotion
                                        path={path.d}
                                        dur={`${TOTAL_CYCLE}s`}
                                        keyPoints="0;0;1;1"
                                        keyTimes={path.keyTimesPosition}
                                        repeatCount="indefinite"
                                        rotate="auto"
                                    />
                                </circle>
                            </g>
                        </g>
                    ))}

                    {/* Pins Layer */}
                    {Object.values(REGIONS).map((ch) => {
                        const [x, y] = project(ch.lon, ch.lat);
                        const isHovered = hovered?.id === ch.id;
                        return (
                            <g
                                key={ch.id}
                                transform={`translate(${x.toFixed(1)},${y.toFixed(1)})`}
                                onMouseEnter={() => setHovered(ch)}
                                onMouseLeave={() => setHovered(null)}
                                onClick={() => onLocationClick?.(ch.name)}
                                style={{ cursor: "pointer" }}
                            >
                                <circle r="0" fill={ch.color} opacity="0">
                                    <animate attributeName="r" values="2;5;2" dur="3s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite" />
                                </circle>
                                {isHovered && <circle r="5" fill="none" stroke={ch.color} strokeWidth="0.7" opacity="0.3" />}
                                <circle r={isHovered ? 2.5 : 1.8} fill={ch.color} stroke="#0a0f1d" strokeWidth="0.6" />
                            </g>
                        );
                    })}
                </svg>

                {/* Popover */}
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            key={hovered.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute bottom-3 right-3 bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-2xl min-w-[170px] max-w-[210px] pointer-events-none"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full" style={{ background: hovered.color }} />
                                <div>
                                    <p className="text-xs font-bold text-white leading-none">{hovered.name}</p>
                                    <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest font-bold">{hovered.year}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {hovered.places.map(p => (
                                    <span key={p} className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full text-white/80"
                                        style={{ background: hovered.color + "20", border: `1px solid ${hovered.color}30` }}>
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