# 🌤️ Multi-Input Data Collection for Weather Forecast Predictions

An environmental data science internship project analyzing atmospheric composition and air quality in **Milan, Italy (2018–2024)** using satellite-based reanalysis data from the **Copernicus Atmosphere Monitoring Service (CAMS)**.

> **Student:** Fazlur Rahman  
> **Supervisor:** Prof. Armando Ruggeri  
> **Program:** Bachelor in Data Analysis — Academic Year 2025/2026

---

## 📖 Table of Contents

- [Project Overview](#project-overview)
- [Objectives](#objectives)
- [Data Source](#data-source)
- [Technologies Used](#technologies-used)
- [Project Structure & Workflow](#project-structure--workflow)
- [Key Findings](#key-findings)
- [Getting Started](#getting-started)
- [Dataset Variables](#dataset-variables)

---

## 🔍 Project Overview

This project focuses on the acquisition, processing, and statistical analysis of large-scale atmospheric datasets to investigate the relationship between **temperature and air pollutant concentrations** in Milan, Italy.

Milan serves as an ideal case study due to its position in the Po Valley — surrounded by the Alps and Apennines — which creates atmospheric stagnation conditions that trap pollutants, making temperature-pollutant interactions particularly pronounced.

The study covers **7 years of data (2018–2024)** at **3-hour intervals**, totaling over **20,000 temporal observations**.

---

## 🎯 Objectives

1. **Data Acquisition** — Retrieve multi-year atmospheric data using the Copernicus Data Store (CDS) API
2. **Data Processing** — Clean, convert, and structure time-series data using `xarray` and `pandas`
3. **Impact Assessment** — Examine bidirectional relationships between temperature and pollutants (including COVID-19 lockdown effects)
4. **Predictive Modelling** — Build linear regression models to forecast pollutant levels based on temperature

---

## 🛰️ Data Source

**Copernicus Atmosphere Monitoring Service (CAMS) — EAC4 Global Reanalysis Dataset**

| Attribute | Value |
|---|---|
| Provider | ECMWF / European Space Agency (ESA) |
| Dataset | CAMS Global Reanalysis (EAC4) |
| Temporal Coverage | 2018–2024 (dataset goes back to 2003) |
| Temporal Resolution | 3-hourly |
| Spatial Resolution | 0.75° × 0.75° (~80 km) |
| File Format | NetCDF (.nc) |
| Access Method | CDS API (`cdsapi`) |
| Study Location | Milan, Italy (45.46°N, 9.19°E) |

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **Python** | Core programming language |
| **cdsapi** | Automated data download from Copernicus CDS |
| **xarray** | Multi-dimensional NetCDF array handling |
| **pandas** | Tabular data manipulation and time-series analysis |
| **matplotlib / seaborn** | Data visualization (heatmaps, histograms, time series) |
| **scipy / statsmodels** | Correlation analysis and linear regression |
| **NetCDF (.nc)** | Raw data storage format |
| **CSV** | Processed data export |

---

## 🔄 Project Structure & Workflow

```
weather-forecast-data/
├── Final.ipynb                   # Integrated notebook: Download, Exploration, & Analysis
├── internship.pdf                # Full internship technical report
├── milan_air_quality_2018_2024.csv # Final processed dataset (Tabular)
├── milan_temp_2018_2024.nc       # Raw Temperature data (NetCDF)
├── milan_pm10_2018_2024.nc       # Raw PM10 data (NetCDF)
├── milan_no2_2018_2024.nc       # Raw Nitrogen Dioxide data (NetCDF)
├── milan_o3_2018_2024.nc        # Raw Ozone data (NetCDF)
├── milan_co_2018_2024.nc        # Raw Carbon Monoxide data (NetCDF)
├── LICENSE                       # MIT License
└── README.md                     # Project documentation
```

### Pipeline Overview

```
CDS API → NetCDF Files → xarray Loading → pandas DataFrame
    → Unit Conversion → EDA & Visualization → Correlation Analysis
    → Linear Regression Models → Insights & Reporting
```

---

## 📊 Key Findings

### Dataset Summary

| Variable | Mean | Range |
|---|---|---|
| Temperature | 13.2°C | -8°C to 36°C |
| PM₁₀ | 2.35 × 10⁻⁸ kg/m³ | High seasonal variability |
| NO₂ | 1.56 × 10⁻⁸ kg/m³ | Higher in winter |
| CO | 2.16 × 10⁻⁷ kg/m³ | Strongest winter peaks |
| O₃ | 3.93 × 10⁻⁸ kg/m³ | Higher in summer |

### Temperature–Pollutant Correlations (Pearson r)

| Pollutant | r | R² | Relationship |
|---|---|---|---|
| **O₃** | +0.73 | 0.53 | Strong positive — photochemical production |
| **CO** | -0.66 | 0.44 | Strong negative — combustion & mixing |
| **NO₂** | -0.63 | 0.39 | Strong negative — heating & dispersion |
| **PM₁₀** | -0.07 | 0.004 | Negligible — governed by other factors |

### Seasonal Patterns

- **Winter:** Elevated NO₂, CO, and PM₁₀ driven by residential heating, vehicle cold-start emissions, and shallow atmospheric mixing layers
- **Summer:** Peak ozone levels (60–80 μg/m³) driven by photochemical reactions at higher temperatures
- **Ozone** and primary pollutants show a clear **inverse seasonality**

### COVID-19 Natural Experiment (2020–2021)

- **Spring 2020 lockdown** caused measurable drops in NO₂, CO, and PM₁₀ from reduced traffic and industrial activity
- **Ozone paradoxically increased** during lockdowns due to reduced NO-O₃ titration in NOₓ-saturated urban air
- By **2022–2023**, pollutant concentrations had fully reverted to pre-pandemic levels, confirming that improvements require sustained behavioral change

### Regression Model Results

| Pollutant | Slope | Intercept | R² |
|---|---|---|---|
| O₃ | +2.914 μg/m³ per °C | 1.50 μg/m³ | 0.532 |
| CO | -7.422 μg/m³ per °C | 313.75 μg/m³ | 0.441 |
| NO₂ | -0.805 μg/m³ per °C | 26.35 μg/m³ | 0.394 |
| PM₁₀ | -0.098 μg/m³ per °C | 24.82 μg/m³ | 0.004 |

---

## ⚙️ Getting Started

### Prerequisites

- Python 3.8+
- A [Copernicus CDS account](https://cds.climate.copernicus.eu) with an API key

### Installation

```bash
git clone https://github.com/your-username/weather-forecast-data.git
cd weather-forecast-data
pip install cdsapi xarray netCDF4 pandas matplotlib seaborn scipy
```

### CDS API Configuration

Create a `.cdsapirc` file in your home directory:

```
url: https://cds.climate.copernicus.eu/api/v2
key: {UID}:{API_KEY}
```

Replace `{UID}` and `{API_KEY}` with your credentials from the CDS portal.

### Download Data

```python
import cdsapi

c = cdsapi.Client()

area_milan = [45.55, 8.95, 45.35, 9.30]  # [North, West, South, East]

c.retrieve(
    'cams-global-reanalysis-eac4',
    {
        'variable': 'nitrogen_dioxide',
        'type': 'analysis',
        'date': '2018-01-01/2024-12-31',
        'time': ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
        'model_level': '60',
        'format': 'netcdf',
        'area': area_milan,
    },
    'milan_no2_2018_2024.nc'
)
```

### Load and Process Data

```python
import xarray as xr
import pandas as pd

# Load NetCDF
ds = xr.open_dataset('milan_atmospheric_data_2018_2024.nc')

# Convert to DataFrame
df = ds.to_dataframe().reset_index()

# Convert units: Kelvin → Celsius, kg/m³ → μg/m³
df['Temperature (°C)'] = df['temp_2m'] - 273.15
df['NO₂ (μg/m³)'] = df['no2'] * 1e9

# Export
df.to_csv('milan_processed_2018_2024.csv', index=False)
```

---

## 📋 Dataset Variables

| Column | Unit | Description |
|---|---|---|
| `datetime` | — | Timestamp (3-hourly) |
| `Temperature (°C)` | °C | 2-meter air temperature |
| `PM10 (μg/m³)` | μg/m³ | Particulate matter ≤10 μm |
| `NO₂ (μg/m³)` | μg/m³ | Nitrogen dioxide (combustion) |
| `CO (μg/m³)` | μg/m³ | Carbon monoxide (incomplete combustion) |
| `O₃ (μg/m³)` | μg/m³ | Ozone (photochemical secondary pollutant) |

---

## 🙏 Acknowledgments

- **Prof. Armando Ruggeri** — For supervision and guidance throughout the internship
- **Copernicus / ECMWF** — For providing open-access atmospheric reanalysis data via the CAMS EAC4 dataset
