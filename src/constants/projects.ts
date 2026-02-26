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
    id: number;
    title: string;
    desc: string;
    tags: string[];
    category: string;
    img: string;
    github: string;
    status: string;
    overview: string;
    problem: string;
    problemDetail: string;
    type: string;
    impact: string;
    insights: string;
    systemStatus: string;
}

export const PROJECTS_METADATA: Record<number, ProjectMetadata> = {
    1: {
        id: 1,
        title: "Student Dropout Prediction (ML)",
        desc: "End-to-end binary classification pipeline to predict student dropout risk based on behavioral and engagement data. Features extensive EDA, hyperparameter tuning, and SHAP/LIME interpretation.",
        tags: ["PYTHON", "RANDOM FOREST", "SHAP", "MACHINE LEARNING"],
        category: "ML",
        img: "assets/images/ml.jpg",
        github: "https://github.com/Montasir00/Ml_final_project",
        status: "Completed",
        overview: "A complete machine learning pipeline covering EDA, feature engineering, and multiple models (Random Forest, Gradient Boosting, Voting Classifier) developed as a final academic project by a team of three.",
        problem: "Identifying key behavioral predictors of student dropout to enable early intervention.",
        problemDetail: "The project involved rigorous data preprocessing, handling missing values, engineering new features (e.g., 'Number of Missed Deadlines'), and optimizing models using GridSearchCV.",
        type: "ml",
        impact: "Tuned Random Forest and Gradient Boosting models provided high accuracy, validated through 5-Fold Stratified Cross-Validation.",
        insights: "SHAP and LIME interpretation revealed that 'Course Engagement Score' (Avg Impact: 0.65) and 'Number of Missed Deadlines' (0.40) were the strongest predictors of dropout risk.",
        systemStatus: "Model: Deployed"
    },
    2: {
        id: 2,
        title: "Gym Management System",
        desc: "Web-based administrative application to streamline gym operations. Built with a containerized LAMP architecture (Docker, PHP, MySQL) to manage members, trainers, and payments.",
        tags: ["PHP", "MYSQL", "DOCKER", "APACHE", "WEB DEV"],
        category: "Web Dev",
        img: "assets/images/gym-web.jpg",
        github: "https://github.com/Montasir00/Gym_Management_System",
        status: "Completed",
        overview: "A web-based administrative application designed to streamline and centralize gym operations. It enables administrators to manage gym locations, members, trainers, and payments through a secure, session-based interface.",
        problem: "Inefficient manual tracking of diverse entities (locations, members, trainers, payments) leading to operational overhead.",
        problemDetail: "Developed a structural CRUD backend using procedural PHP and raw MySQL queries. Handled referential integrity through manual cascading PHP operations since database-level `ON DELETE CASCADE` constraints were omitted.",
        type: "web",
        impact: "Successfully orchestrated a 3-tier containerized architecture (PHP-Apache, MySQL, phpMyAdmin) mapping complex relationships (e.g., One gym → many payments, One payment → many trainers).",
        insights: "Extensive use of `mysqli_real_escape_string()` and manual referential integrity checks hardened understanding of database mechanics over relying exclusively on modern ORMs.",
        systemStatus: "System: Operational"
    },
    3: {
        id: 3,
        title: "Weather Forecast Data Collection",
        desc: "Environmental data science internship project analyzing atmospheric composition in Milan using Copernicus CAMS data to investigate temperature-pollutant relationships and build predictive regression models.",
        tags: ["PYTHON", "XARRAY", "PANDAS", "COPERNICUS", "DATA SCIENCE"],
        category: "Data Science",
        img: "assets/images/weather.jpg",
        github: "https://github.com/Montasir00/Multi-Input-Data-Collection-for-Weather-Forecast-Predictions",
        status: "Completed",
        overview: "An internship project focusing on the acquisition, processing, and statistical analysis of large-scale atmospheric datasets to investigate the relationship between temperature and air pollutant concentrations in Milan, Italy.",
        problem: "Understanding temperature-pollutant interactions in Milan, an area prone to atmospheric stagnation, and predicting pollutant levels based on temperature changes.",
        problemDetail: "The challenge involved acquiring 7 years of 3-hourly data via the Copernicus API, processing multidimensional NetCDF files with xarray, and building linear regression models to forecast pollutants (O3, CO, NO2, PM10).",
        type: "data",
        impact: "Successfully analyzed over 20,000 temporal observations and built predictive regression models explaining variance in pollutant levels (e.g., O3 r=+0.73, R²=0.53).",
        insights: "Revealed a strong positive correlation (+0.73) for Ozone and negative for CO/NO2 with temperature. During COVID lockdowns, primary pollutants dropped significantly, while Ozone paradoxically increased due to reduced NO-O3 titration.",
        systemStatus: "Analysis Complete"
    },
    4: {
        id: 4,
        title: "Bloom & Basket — E-Commerce",
        desc: "Production-style PHP e-commerce platform for selling foods. Features secure authentication, role-based access control, and a fully containerized Docker environment.",
        tags: ["PHP", "MYSQL", "DOCKER", "NGINX", "WEB DEV"],
        category: "Web Dev",
        img: "assets/images/ecommerce.jpg",
        github: "https://github.com/Montasir00/Bloom-And-Basket",
        status: "Completed",
        overview: "A robust full-stack e-commerce solution built with PHP, MySQL, and Docker. It delivers a complete shopping workflow alongside a protected administrative dashboard for inventory, users, and orders.",
        problem: "Building a secure, scalable e-commerce solution with modern authentication and containerized deployment.",
        problemDetail: "Implementing secure authentication, CSRF protection, session management, and ensuring full environment parity across development and production using Docker containers.",
        type: "web",
        impact: "Successfully implemented a defense-in-depth security model including PDO prepared statements, bcrypt hashing, and CSRF synchronizer tokens.",
        insights: "Containerizing the LAMP stack (PHP, MySQL, phpMyAdmin) with Docker Compose ensured deterministic builds and eliminated 'works on my machine' issues.",
        systemStatus: "Server: Production Ready"
    },
    5: {
        id: 5,
        title: "AODV Routing Protocol Simulation",
        desc: "Animated visualization of the Ad-hoc On-Demand Distance Vector (AODV) routing protocol for MANETs using Python, NetworkX, and Matplotlib.",
        tags: ["PYTHON", "NETWORKX", "MATPLOTLIB", "NETWORKING"],
        category: "Data Science",
        img: "assets/images/network.jpg",
        github: "https://github.com/Montasir00/AODV_Routing_Simulation",
        status: "Completed",
        overview: "Advanced simulation of the Ad hoc On-Demand Distance Vector (AODV) routing protocol using NetworkX. Analyzes dynamic route discovery (RREQ) and route replies (RREP) in mobile environments.",
        problem: "Visualizing complex packet-level interactions and topological changes in dynamic Ad-hoc networks.",
        problemDetail: "The goal was to generate a fully connected random graph and animate a proper Breadth-First Search (BFS) flood mimicking RREQ propagation, followed by a traceback RREP, using Matplotlib's `FuncAnimation`.",
        type: "network",
        impact: "Created an educational tool that clearly visualizes the three phases of reactive routing: Initialization, RREQ Flood, and RREP Traceback.",
        insights: "Implementing graph generation with `nx.fast_gnp_random_graph` combined with an automatic connectivity repair algorithm ensured isolated components were bridged, guaranteeing the simulation never failed to find a path.",
        systemStatus: "Protocol: Animated"
    },
    6: {
        id: 6,
        title: "House Price Prediction Pipeline",
        desc: "End-to-end ML pipeline on the Ames Housing dataset. Features extensive imputation, feature engineering (10 new features), PCA, and a tuned Random Forest regressor.",
        tags: ["PYTHON", "SCIKIT-LEARN", "PCA", "PANDAS", "REGRESSION"],
        category: "ML",
        img: "assets/images/house-price.jpg",
        github: "https://github.com/Montasir00/House-Price-Prediction",
        status: "Completed",
        overview: "A complete machine learning pipeline for predicting residential house prices based on 80 features. It demonstrates a full workflow from raw CSV, EDA, handling missing values/outliers, preprocessing, feature engineering, PCA, to final model predictions.",
        problem: "Identifying key predictors and building a high-accuracy regression model for complex structured datasets with right-skewed targets.",
        problemDetail: "The project involved robust median/most-frequent imputation via `ColumnTransformer`, dropping illogical outliers, engineering 10 domain-specific features (e.g., `Qual_TotalSF`), dimensionality reduction via PCA(n=50), and comparing Linear/Ridge regression against Random Forest.",
        type: "ml",
        impact: "The tuned Random Forest model achieved an RMSE of ~$26,000 and an R² of ~0.89 on the validation set, improving over the baseline by ~67%.",
        insights: "Domain-informed feature engineering was critical: 7 out of the 10 engineered features (led by `Qual_TotalSF`) ranked in the top 30 out of 312 post-processing features according to PCA loadings.",
        systemStatus: "Model: Validated"
    },
    7: {
        id: 7,
        title: "Dune Ball Game (Java OOP)",
        desc: "Physics-based 2D side-scrolling platform game developed in Java/JavaFX. Demonstrates all four OOP pillars through a procedurally generated desert terrain.",
        tags: ["JAVA", "JAVAFX", "OOP", "GAME DEV"],
        category: "Game",
        img: "assets/images/retro.jpg",
        github: "https://github.com/Montasir00/Dune_Ball_Game",
        status: "Completed",
        overview: "Interactive Java game demonstrating abstraction, inheritance, encapsulation, and polymorphism. Features physics-based movement, dynamic cameras, and procedurally generated sine-wave terrain.",
        problem: "Applying abstract software design patterns to a real-time interactive application.",
        problemDetail: "The goal was to build a game where every entity is an object, using inheritance for shared behaviors and polymorphism for dynamic interactions, all while maintaining smooth performance.",
        type: "game",
        impact: "Successfully implemented 6 distinct entity types utilizing dynamic method dispatch, dual collection architecture, and robust custom exception handling.",
        insights: "Implementing a single heterogeneous `List<GameObject>` with polymorphic `update()` and `render()` methods dramatically simplified the core game loop and enabled easy extensibility (Open-Closed Principle).",
        systemStatus: "Engine: Operational"
    },
    8: {
        id: 8,
        title: "IoT Sensor Data Collection",
        desc: "Distributed IoT pipeline that ingests real-time sensor data via HiveMQ MQTT broker and persists it across MySQL, MongoDB, and Neo4j architectures using Docker.",
        tags: ["DOCKER", "MYSQL", "MONGODB", "NEO4J", "MQTT", "PYTHON"],
        category: "Database",
        img: "assets/images/iot-db.jpg",
        github: "https://github.com/Montasir00/IoT_Sensor_Data_Collection_System",
        status: "Completed",
        overview: "Multi-database IoT pipeline that simulates 6 distinct environmental sensors and stores their data across Relational (MySQL), Document (MongoDB), and Graph (Neo4j) databases for optimized handling.",
        problem: "Comparing performance and data modeling across different database paradigms for high-frequency IoT datasets.",
        problemDetail: "The project explores how relational, document, and graph data models handle high-frequency sensor streams (Soil Moisture, pH, Temp, Humidity, Light, Nutrients) publishing over MQTT.",
        type: "database",
        impact: "Successfully orchestrated 4 Docker containers (MySQL, MongoDB, Neo4j, MQTT Broker) to handle distributed data ingestion simultaneously.",
        insights: "Demonstrated the utility of polyglot persistence: MySQL effectively handled structured Soil/pH data, MongoDB naturally stored flexible Temp/Humidity documents, while Neo4j offered unique query patterns for Light/Nutrient relationships.",
        systemStatus: "DB Cluster: Healthy"
    },
    9: {
        id: 9,
        title: "Blockchain Transaction System",
        desc: "Crypto trading platform demonstrating on-chain ETH transactions on the Ganache network via Web3.php. Includes OTP-based multi-factor authentication (MFA).",
        tags: ["PHP", "ETHEREUM", "WEB3.PHP", "MYSQL", "MFA", "BLOCKCHAIN"],
        category: "Web Dev",
        img: "assets/images/crypto.jpg",
        github: "https://github.com/Montasir00/Blockchain-Transaction-System-with-Multi-Factor-Login",
        status: "Completed",
        overview: "A secure, full-stack crypto trading platform that combines blockchain technology executing real ETH transfers on a local Ganache network with multi-factor authentication for user protection.",
        problem: "Ensuring transactional integrity and user protection in a simulated exchange environment.",
        problemDetail: "Required implementing raw `eth_sendRawTransaction` calls signed with isolated user private keys (web3p/ethereum-tx), coupled with secure OTP-based login via PHPMailer to prevent unauthorized access.",
        type: "blockchain",
        impact: "Created a secure architecture featuring no unlocked accounts, private key isolation, live blockchain balance syncing (`eth_getBalance`), and SQL sanitization.",
        insights: "Integrating traditional web application security (MFA, SQL injection prevention) with blockchain infrastructure provides defense-in-depth against both web-based and on-chain attacks.",
        systemStatus: "Node: Synchronized"
    },
    10: {
        id: 10,
        title: "Containerized IoT Energy Pipeline",
        desc: "Real-time IoT data pipeline built with Python, Docker Compose, and MQTT. Features sensor simulation, MySQL persistence, and an automated Watchdog email alerting system.",
        tags: ["PYTHON", "DOCKER", "MQTT", "MYSQL", "IOT"],
        category: "Data Science",
        img: "assets/images/pipeline.jpg",
        github: "https://github.com/Montasir00/energy_management_system",
        status: "Completed",
        overview: "A fully containerized IoT data pipeline consisting of three Python services (Publisher, Subscriber, Watchdog) orchestrated with Docker Compose to ingest data over MQTT and persist to MySQL.",
        problem: "Manual data handling and lack of real-time monitoring leading to delayed responses in industrial energy management.",
        problemDetail: "The challenge was to create an isolated, reproducible system that could ingest high-frequency sensor data, process it in real-time, and provide immediate SMTP email alerts for anomalies (e.g., light intensity >130% average) without human intervention.",
        type: "iot",
        impact: "Achieved a scalable, reproducible microservices architecture where containers communicate over a private bridge network (`app-network`).",
        insights: "Separating concerns into dedicated containers (Simulation, Ingestion, Monitoring, Storage) eliminated environment mismatches and made the architecture horizontally scalable.",
        systemStatus: "System Status: Active"
    },
    11: {
        id: 11,
        title: "Wiki Encyclopedia",
        desc: "Django-based web app where users can create, edit, browse, and search encyclopedia entries written in Markdown. Features a custom Markdown-to-HTML parser.",
        tags: ["DJANGO", "PYTHON", "MARKDOWN", "HTML", "WEB DEV"],
        category: "Web Dev",
        img: "assets/images/wiki.jpg",
        github: "https://github.com/Montasir00/Wiki-Encyclopedia",
        status: "Completed",
        overview: "A Django-based encyclopedia application that allows users to create, view, and search for entries using Markdown syntax, converting `.md` files to HTML on the fly.",
        problem: "Managing dynamic content and providing a seamless user experience for content creation.",
        problemDetail: "Implemented a custom file-based storage system utilizing `util.py` to read/write `.md` files, a search engine with case-insensitive partial matching, and a robust Markdown-to-HTML conversion pipeline using the `markdown2` library.",
        type: "web",
        impact: "Successfully delivered a full CRUD application mimicking Wikipedia functionality with proper URL routing and form validation.",
        insights: "Utilizing flat Markdown files instead of a traditional database simplified content management and versioning, while Django's template engine handled the dynamic HTML wrapping effortlessly.",
        systemStatus: "App: Online"
    },
    12: {
        id: 12,
        title: "Hand Gesture Recognition",
        desc: "Real-time hand gesture classifier using OpenCV, cvzone, and a CNN model trained via Google's Teachable Machine and loaded via Keras.",
        tags: ["PYTHON", "OPENCV", "KERAS", "TENSORFLOW", "CNN", "VISION"],
        category: "ML",
        img: "assets/images/vision.jpg",
        github: "https://github.com/Montasir00/hand-gesture-recognition",
        status: "Completed",
        overview: "Real-time hand gesture recognition system using a webcam feed. Combines machine learning and computer vision to map physical movements to digital commands.",
        problem: "Accurate landmark detection and gesture classification in varying lighting conditions and backgrounds.",
        problemDetail: "Leveraged `cvzone.HandTrackingModule` to detect hands, crop/resize them to a standardized format, and feed them into a CNN model trained on an A-Z gesture dataset.",
        type: "vision",
        impact: "Successfully integrated data collection, model training (80-20 split), and real-time testing into a cohesive application.",
        insights: "Standardizing the cropped hand images before feeding them into the CNN significantly improved the model's robustness against varying distances and camera angles.",
        systemStatus: "Vision: Tracking"
    },
    13: {
        id: 13,
        title: "Echo Search — Google Clone",
        desc: "Front-end clone of Google's Search, Image Search, and Advanced Search pages. Replicates functionality by passing GET parameters to Google's actual API.",
        tags: ["HTML", "CSS", "FRONTEND", "UI/UX"],
        category: "Web Dev",
        img: "assets/images/search.jpg",
        github: "https://github.com/Montasir00/Echo_Search",
        status: "Completed",
        overview: "A pixel-perfect front-end clone of Google Search, Image Search, and Advanced Search interfaces, developed as part of the CS50 Web Programming course.",
        problem: "Replicating complex UI layouts and ensuring functional form submissions to external APIs.",
        problemDetail: "Focused on semantic HTML and CSS to match Google's aesthetics while properly structuring forms to pass the correct query parameters (e.g., `?tbm=isch` for images) directly to Google's actual search engine.",
        type: "web",
        impact: "Successfully delivered three functional search pages that accurately interface with real Google endpoints based on user input constraints.",
        insights: "Reverse-engineering Google's URL parameter structures required deep understanding of HTTP GET requests and how HTML forms natively construct query strings.",
        systemStatus: "UI/UX: Pixel Perfect"
    }
};
