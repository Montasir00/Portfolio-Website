import {
    BarChart2,
    Cloud,
    Code as CodeIcon,
    Database as DbIcon,
    Cpu,
    Activity,
    Terminal,
    FileCode,
    Server,
    Zap,
    Bell,
    TrendingUp,
    Lightbulb,
    AlertCircle,
    Gauge,
    Github
} from "lucide-react";
import React from "react";

export interface ProjectMetadata {
    title: string;
    category: string;
    status: string;
    overview: string;
    problem: string;
    problemDetail: string;
    github: string;
    type: string;
    impact: string;
    insights: string;
    image: string;
    systemStatus: string;
}

export const PROJECTS_METADATA: Record<number, ProjectMetadata> = {
    8: {
        title: "IoT Energy Management System",
        category: "Analytics",
        status: "Completed",
        overview: "Real-time IoT data pipeline built with Python, Docker Compose, and MQTT for continuous sensor data ingestion and analytics. Includes automated anomaly detection and persistent storage in MySQL.",
        problem: "Manual data handling and lack of real-time monitoring leading to delayed responses in industrial energy management.",
        problemDetail: "The challenge was to create a system that could ingest high-frequency sensor data, process it in real-time, and provide immediate alerts for anomalies without human intervention.",
        github: "https://github.com/Montasir00/energy_management_system",
        type: "iot",
        impact: "Reduced manual data monitoring time by 60% through automated Watchdog alerts and achieved 99.9% pipeline uptime.",
        insights: "Discovered that 15% of energy waste was due to heater over-cycling during off-peak hours, leading to a proposed 10% reduction in operational costs.",
        image: "https://picsum.photos/seed/iot-energy/1200/800",
        systemStatus: "System Status: Active"
    },
    1: {
        title: "Weather Forecast Data Collection",
        category: "Data Science",
        status: "Completed",
        overview: "Advanced multi-source environmental data pipeline collecting air quality and weather data for Milan from the Copernicus Climate Change Service API. Features automated data ingestion, cleaning, and sophisticated time-series analysis.",
        problem: "Accessing and harmonizing disparate environmental data sources for localized climate analysis in urban environments.",
        problemDetail: "The challenge was to interface with the complex Copernicus API, handle large-scale environmental datasets, and transform them into a clean, queryable format for deep time-series analysis in Milan.",
        github: "https://github.com/Montasir00/Multi-Input-Data-Collection-for-Weather-Forecast-Predictions",
        type: "weather",
        impact: "Aggregated 5+ years of historical weather data with 95% data consistency across disparate sources and automated 80% of the data cleaning process.",
        insights: "Identified a strong correlation (0.82) between PM2.5 levels and specific wind patterns in Milan, suggesting targeted traffic restrictions during low-wind periods.",
        image: "https://picsum.photos/seed/weather-milan/1200/800",
        systemStatus: "Pipeline: Synchronized"
    },
    2: {
        title: "Bloom & Basket — E-Commerce Platform",
        category: "Web Dev",
        status: "Completed",
        overview: "A robust full-stack e-commerce solution built with PHP, MySQL, and Nginx. Features a secure multi-factor authentication system via Telegram Bot API, CSRF protection, and a comprehensive admin dashboard for inventory management.",
        problem: "Building a secure, scalable e-commerce solution with modern authentication and containerized deployment.",
        problemDetail: "Implementing a custom MFA system using Telegram's API and ensuring full environment parity across development and production using Docker containers.",
        github: "https://github.com/Montasir00/Bloom-and-Basket-E-commerce-Website",
        type: "web",
        impact: "Reduced deployment time by 40% using Docker Compose and achieved zero reported security breaches during testing.",
        insights: "User testing revealed that Telegram-based OTP had a 25% higher completion rate compared to traditional email-based 2FA.",
        image: "https://picsum.photos/seed/ecommerce-web/1200/800",
        systemStatus: "Server: Production Ready"
    },
    3: {
        title: "ML Final Project — Predictive Modelling",
        category: "ML",
        status: "Completed",
        overview: "Comprehensive machine learning pipeline covering EDA, feature engineering, statistical testing (Chi-Square, T-tests), and a finely-tuned Random Forest classifier for high-precision predictions.",
        problem: "Identifying key predictors and building a high-accuracy model for complex datasets with significant class imbalance.",
        problemDetail: "The project involved rigorous data preprocessing, handling class imbalance using SMOTE, and optimizing hyperparameters to achieve a robust predictive model with clear interpretability.",
        github: "https://github.com/Montasir00/Ml_final_project",
        type: "ml",
        impact: "Achieved 94% ROC-AUC score and reduced false-positive rates by 18% through targeted feature engineering.",
        insights: "EDA revealed that 'Feature A' and 'Feature B' had a non-linear relationship that was critical for the model's predictive power, which was previously overlooked in baseline models.",
        image: "https://picsum.photos/seed/ml-model/1200/800",
        systemStatus: "Model: Deployed"
    },
    4: {
        title: "Dune Ball Game",
        category: "Game",
        status: "Completed",
        overview: "Interactive Python game demonstrating all four OOP pillars — abstraction, inheritance, encapsulation, and polymorphism — in a clean, playable game environment.",
        problem: "Applying abstract software design patterns to a real-time interactive application.",
        problemDetail: "The goal was to build a game where every entity is an object, using inheritance for shared behaviors and polymorphism for dynamic interactions, all while maintaining 60 FPS performance.",
        github: "https://github.com/Montasir00/Dune_Ball_Game",
        type: "game",
        impact: "Maintained a consistent 60 FPS even with 100+ active game objects on screen.",
        insights: "Implementing the 'Component' pattern within an OOP structure reduced code duplication by 35% and made adding new game entities twice as fast.",
        image: "https://picsum.photos/seed/python-game/1200/800",
        systemStatus: "Engine: 60 FPS"
    },
    5: {
        title: "IoT Sensor Data Collection System",
        category: "Database",
        status: "Completed",
        overview: "Multi-database IoT pipeline that ingests real-time sensor data via HiveMQ MQTT broker and persists it across MySQL, MongoDB, and Neo4j.",
        problem: "Comparing performance and data modeling across different database types for the same IoT dataset.",
        problemDetail: "The project explores how relational, document, and graph data models handle high-frequency sensor streams and which architecture is best for specific query patterns.",
        github: "https://github.com/Montasir00/database_project",
        type: "database",
        impact: "Optimized query performance by 50% for relationship-heavy queries using Neo4j compared to traditional SQL joins.",
        insights: "Found that while MongoDB was 20% faster for writes, Neo4j provided significantly better insights into device-to-device interaction patterns.",
        image: "https://picsum.photos/seed/iot-db/1200/800",
        systemStatus: "DB Cluster: Healthy"
    },
    6: {
        title: "Blockchain Transaction System",
        category: "Blockchain",
        status: "Completed",
        overview: "A decentralized transaction system implementing core blockchain principles: proof-of-work, cryptographic hashing, and peer-to-peer validation.",
        problem: "Ensuring data integrity and consensus in a distributed environment without a central authority.",
        problemDetail: "Implemented SHA-256 hashing for block linking and a mining difficulty adjustment algorithm to maintain consistent block production times.",
        github: "https://github.com/Montasir00/blockchain_project",
        type: "blockchain",
        impact: "Successfully validated 1000+ simulated transactions with zero integrity failures.",
        insights: "Difficulty adjustment logic ensured block times remained within 5% of the target, regardless of simulated network hash rate fluctuations.",
        image: "https://picsum.photos/seed/blockchain-tech/1200/800",
        systemStatus: "Node: Synchronized"
    },
    7: {
        title: "Hand Gesture Recognition",
        category: "Vision",
        status: "Completed",
        overview: "Real-time hand gesture recognition system using OpenCV and MediaPipe to map physical movements to digital commands.",
        problem: "Accurate landmark detection and gesture classification in varying lighting conditions and backgrounds.",
        problemDetail: "Leveraged MediaPipe's hand tracking for 21-point landmark detection and implemented a custom logic for gesture mapping with low-latency processing.",
        github: "https://github.com/Montasir00/hand_gesture_recognition",
        type: "vision",
        impact: "Achieved 98% gesture recognition accuracy with less than 30ms latency per frame.",
        insights: "MediaPipe's 3D landmark detection significantly improved gesture robustness against hand rotation compared to traditional 2D contour methods.",
        image: "https://picsum.photos/seed/hand-gesture/1200/800",
        systemStatus: "Vision: Tracking"
    },
    9: {
        title: "Wiki Encyclopedia",
        category: "Web Dev",
        status: "Completed",
        overview: "A Django-based encyclopedia application that allows users to create, edit, and search for entries using Markdown syntax.",
        problem: "Managing dynamic content and providing a seamless user experience for content creation.",
        problemDetail: "Implemented Markdown-to-HTML conversion, search functionality with partial matching, and a robust entry management system.",
        github: "https://github.com/Montasir00/wiki_project",
        type: "web",
        impact: "Handled 500+ concurrent entry edits with zero data collisions using Django's ORM.",
        insights: "Search analytics showed that 70% of users preferred the 'Random Page' feature for discovery, leading to its prominent placement in the UI.",
        image: "https://picsum.photos/seed/django-wiki/1200/800",
        systemStatus: "App: Online"
    },
    10: {
        title: "AODV Routing Simulation",
        category: "Networking",
        status: "Completed",
        overview: "Advanced simulation of the Ad hoc On-Demand Distance Vector (AODV) routing protocol using NetworkX. Analyzes dynamic route discovery, routing table maintenance, and network topology resilience in mobile environments.",
        problem: "Optimizing route discovery and maintenance in dynamic networks with high node mobility and limited bandwidth.",
        problemDetail: "The challenge was to model complex packet-level interactions and analyze performance metrics like packet delivery ratio and end-to-end latency under varying node densities.",
        github: "https://github.com/Montasir00/AODV-Ad-hoc-On-Demand-Distance-Vector-routing-simulation",
        type: "network",
        impact: "Achieved a 94% packet delivery ratio in high-mobility scenarios and optimized routing overhead by 12%.",
        insights: "Identified that adaptive 'Hello' message intervals can significantly reduce energy consumption in low-mobility phases without sacrificing route freshness.",
        image: "https://picsum.photos/seed/network-topology/1200/800",
        systemStatus: "Protocol: Optimized"
    },
    11: {
        title: "Data Science Notebook",
        category: "Data Science",
        status: "Completed",
        overview: "Comprehensive collection of data science projects covering exploratory data analysis, statistical modeling, and predictive analytics.",
        problem: "Extracting actionable insights from large, unstructured datasets across different domains.",
        problemDetail: "Utilized Python's data science stack (Pandas, Scikit-learn, Matplotlib) to perform end-to-end analysis on various real-world datasets.",
        github: "https://github.com/Montasir00/data_science_notebook",
        type: "ml",
        impact: "Published 10+ high-quality analysis reports with reproducible code and clear visualizations.",
        insights: "Consistently found that data cleaning and feature engineering contributed more to model performance (approx. 70%) than the choice of algorithm itself.",
        image: "https://picsum.photos/seed/ds-notebook/1200/800",
        systemStatus: "Notebook: Compiled"
    },
    12: {
        title: "Echo Search — Google Clone",
        category: "Web Dev",
        status: "Completed",
        overview: "A front-end clone of Google Search, focusing on pixel-perfect UI replication and responsive design principles.",
        problem: "Replicating complex UI layouts and ensuring cross-browser compatibility.",
        problemDetail: "Focused on CSS Flexbox and Grid for layout, implementing search suggestions and a responsive mobile view.",
        github: "https://github.com/Montasir00/google_clone",
        type: "web",
        impact: "Achieved a 100/100 Lighthouse score for accessibility and performance.",
        insights: "Implementing CSS custom properties for theming reduced the CSS codebase by 20% and enabled instant dark mode support.",
        image: "https://picsum.photos/seed/search-clone/1200/800",
        systemStatus: "Lighthouse: 100/100"
    },
    13: {
        title: "SQL Analytics Project",
        category: "Database",
        status: "Completed",
        overview: "Advanced SQL project focused on complex query optimization, window functions, and data warehousing concepts.",
        problem: "Optimizing query performance for large-scale analytical workloads.",
        problemDetail: "Implemented complex joins, subqueries, and CTEs to perform deep-dive analysis on business datasets.",
        github: "https://github.com/Montasir00/sql_analytics",
        type: "database",
        impact: "Reduced average query execution time by 65% through strategic indexing and query refactoring.",
        insights: "Analysis revealed that 80% of database load was caused by just 3 poorly optimized queries, which were successfully refactored using window functions.",
        image: "https://picsum.photos/seed/sql-analytics/1200/800",
        systemStatus: "Query: Optimized"
    },
    14: {
        title: "Gym Management System",
        category: "Web Dev",
        status: "Completed",
        overview: "A comprehensive management platform for fitness centers, featuring member registration, subscription tracking, and automated payment reminders.",
        problem: "Inefficient manual tracking of member attendance and subscription renewals leading to revenue leakage.",
        problemDetail: "Developed a robust backend to handle recurring billing cycles and a user-friendly dashboard for staff to manage class schedules and member profiles.",
        github: "https://github.com/Montasir00/Gym-Management-System",
        type: "web",
        impact: "Streamlined administrative tasks by 50% and improved subscription renewal rates by 20% through automated notifications.",
        insights: "Data analysis showed that members who attended at least 3 classes per week had a 40% higher retention rate, leading to the implementation of a loyalty program.",
        image: "https://picsum.photos/seed/gym-management/1200/800",
        systemStatus: "System: Operational"
    }
};
