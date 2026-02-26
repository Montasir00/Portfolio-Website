# 📡 AODV Routing Protocol Simulation

![AODV Simulation](aodv_simulation.gif)

> An animated, step-by-step visualization of the **Ad-hoc On-Demand Distance Vector (AODV)** routing protocol using Python, NetworkX, and Matplotlib.

---

## What is AODV?

AODV is a reactive routing protocol designed for **mobile ad-hoc networks (MANETs)**. Unlike proactive protocols that maintain routing tables at all times, AODV only discovers routes *on demand* — when a source node needs to communicate with a destination.

The protocol operates in two phases:

| Phase | Message | Description |
|-------|---------|-------------|
| Route Discovery | `RREQ` | Source broadcasts a **Route Request**, flooding the network via BFS until the target is found |
| Route Reply | `RREP` | Target unicasts a **Route Reply** back along the reverse path to the source |

Once the route is established, data can flow from source → target along the discovered path.

---

## Animation Phases

The simulation visualizes all three stages in sequence:

1. **INITIALIZING** — Source and target nodes are identified on the graph
2. **RREQ Flood** *(cyan)* — BFS expands outward from the source, lighting up each visited node and edge as the route request propagates
3. **RREP Traceback** *(pink)* — Once the target is found, the reply traces back hop-by-hop to the source
4. **COMPLETE** *(gold)* — The final discovered route is highlighted, with the full path displayed

---

## Getting Started

### Prerequisites

```bash
pip install networkx matplotlib numpy
```

### Run the Simulation

Open `aodv_improved.ipynb` in Jupyter and run all cells:

```bash
jupyter notebook aodv_improved.ipynb
```

The animation will render inline as an interactive HTML widget. To save as a GIF, run the final cell — this produces `aodv_simulation.gif` in the working directory.

---

## Configuration

All key parameters are set at the top of the notebook and easy to tweak:

| Parameter | Default | Description |
|-----------|---------|-------------|
| `n` | `60` | Number of nodes in the network |
| `p` | `0.12` | Edge probability (higher = denser graph) |
| `seed` | `42` | Random seed for reproducibility |
| `interval` | `75` | Frame delay in milliseconds |
| `fps` | `12` | GIF output frame rate |

The target node is automatically selected to be **at least 4 hops** from the source, ensuring a meaningful flood animation.

---

## Color Legend

| Color | Meaning |
|-------|---------|
| Sky blue | Source node |
| Yellow | Target node |
| Cyan | RREQ flood edges & active node |
| Pink | RREP reply path |
| Amber | Final established route |
| Dark blue | Visited (explored) nodes |

---

## Project Structure

```
.
├── aodv_improved.ipynb     # Main simulation notebook
├── aodv_simulation.gif     # Exported animation
└── README.md               # This file
```

---

## 🛠️ Implementation Notes

- **Graph generation** uses `nx.fast_gnp_random_graph` with automatic connectivity repair — isolated components are bridged so the graph is always fully connected.
- **Route discovery** is implemented as a proper BFS with depth tracking, matching AODV's hop-count semantics.
- **Animation** uses `FuncAnimation` with `blit=True` for performance. All dynamic edge layers use `LineCollection.set_segments()` for in-place updates — `arrows=False` is explicitly set to prevent matplotlib from returning `FancyArrowPatch` objects, which are incompatible with this update pattern.
- **Edge weights** (1–5) are assigned randomly and available for extension (e.g., weighted shortest path).

---

## References

- [RFC 3561 — AODV Specification](https://www.rfc-editor.org/rfc/rfc3561)
- [NetworkX Documentation](https://networkx.org/documentation/stable/)
- [Matplotlib FuncAnimation](https://matplotlib.org/stable/api/animation_api.html)
