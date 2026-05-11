# Requirements Document

## Introduction

The Geopolitical Analytics Dashboard is an interactive browser-based intelligence tool that visualizes governance indicators, conflict events, and corruption data on a 3D globe with accompanying chart panels and an AI-powered country brief sidebar. It extends the existing Sophia Path workspace (vanilla JavaScript, Three.js, dark cinematic UI) with D3.js visualizations and LLM-driven analysis. Data is sourced from the World Bank API, ACLED (Armed Conflict Location & Event Data), and Transparency International's Corruption Perceptions Index.

## Glossary

- **Dashboard**: The single-page browser application that renders the 3D globe, chart panels, and AI sidebar
- **Globe**: The Three.js-rendered 3D Earth sphere displaying country boundaries and conflict event markers
- **AppState**: The centralized pub/sub state manager that coordinates selection and data across all panels
- **DataService**: The module responsible for fetching, normalizing, and caching data from external APIs
- **GlobeRenderer**: The Three.js module that renders the 3D globe, conflict markers, and handles raycasting
- **ChartManager**: The D3.js module that renders governance indicator charts, CPI charts, and time-series visualizations
- **AIBriefPanel**: The sidebar module that sends country context to an LLM API and displays AI-generated briefs
- **NormalizedCountryData**: The unified data structure keyed by ISO 3166-1 alpha-3 country code containing governance, conflict, and corruption data
- **ConflictEvent**: A single ACLED conflict event record with location, type, fatalities, and actor information
- **CPI_Score**: The Corruption Perceptions Index score ranging from 0 (highly corrupt) to 100 (very clean)
- **WGI**: World Governance Indicators from the World Bank, scored on a scale of -2.5 to 2.5
- **Country_Code**: An ISO 3166-1 alpha-3 string (three uppercase letters) uniquely identifying a country

## Requirements

### Requirement 1: Data Fetching and Normalization

**User Story:** As a user, I want the dashboard to load geopolitical data from multiple authoritative sources, so that I can analyze countries using comprehensive governance, conflict, and corruption metrics.

#### Acceptance Criteria

1. WHEN the Dashboard initializes, THE DataService SHALL fetch data from the World Bank API, ACLED API, and Transparency International CPI dataset in parallel
2. WHEN all API responses are received, THE DataService SHALL normalize the responses into a unified NormalizedCountryData map keyed by Country_Code
3. FOR ALL countries in the NormalizedCountryData map, THE DataService SHALL initialize all three data sections (governance, conflict, corruption) even when a source provides no data for that country
4. FOR ALL countries in the NormalizedCountryData map, the conflict totalEvents field SHALL equal the length of the conflict events array
5. FOR ALL countries in the NormalizedCountryData map, the conflict totalFatalities field SHALL equal the sum of fatalities across all individual ConflictEvent records for that country
6. IF an API fetch fails after 3 retry attempts with exponential backoff, THEN THE DataService SHALL load the dashboard with partial data and display a "Data unavailable" placeholder in the affected panel
7. WHEN the DataService caches a successful API response, THE DataService SHALL reuse the cached data for subsequent requests with the same parameters

### Requirement 2: 3D Globe Rendering and Interaction

**User Story:** As a user, I want to interact with a 3D globe showing conflict events, so that I can visually explore geopolitical hotspots and select countries for detailed analysis.

#### Acceptance Criteria

1. WHEN the Dashboard initializes with loaded data, THE GlobeRenderer SHALL render a textured 3D Earth sphere with ambient and directional lighting
2. WHEN conflict events are plotted, THE GlobeRenderer SHALL place one marker per ConflictEvent at the correct latitude and longitude on the globe surface
3. FOR ALL conflict markers on the globe, the marker count SHALL equal the number of ConflictEvent records in the currently active filter set
4. WHEN a user clicks on a country on the globe, THE GlobeRenderer SHALL resolve the Country_Code via raycasting and update AppState with the selected country
5. WHEN a user clicks on empty space (ocean or sky), THE GlobeRenderer SHALL return no selection and preserve the current AppState
6. WHEN a country is selected, THE GlobeRenderer SHALL visually highlight the selected country and smoothly animate the camera to focus on that country
7. FOR ALL valid latitude and longitude pairs, THE GlobeRenderer coordinate conversion (latLngToVector3) SHALL produce a vector whose length equals the specified radius within floating-point tolerance
8. FOR ALL valid latitude and longitude pairs, converting to a 3D vector and back to latitude and longitude SHALL produce values within 0.001 degrees of the original coordinates

### Requirement 3: Shared State Management

**User Story:** As a user, I want all dashboard panels to stay synchronized when I select a country, so that I see consistent information across the globe, charts, and AI sidebar.

#### Acceptance Criteria

1. WHEN a country is selected via AppState, THE AppState SHALL notify all registered listeners for the selectedCountry key
2. FOR ALL country selections, the Country_Code in AppState SHALL match the Country_Code displayed in the ChartManager indicator panel, the highlighted country on the GlobeRenderer, and the context country in the AIBriefPanel
3. WHEN a listener is registered via AppState.on(), THE AppState SHALL store the callback and invoke it on subsequent state changes for that key
4. WHEN a component calls AppState.off() with a previously registered callback, THE AppState SHALL remove that callback and stop invoking it on state changes

### Requirement 4: D3.js Chart Visualizations

**User Story:** As a user, I want to see governance indicators, CPI scores, and trend data in interactive charts, so that I can compare and analyze country-level metrics.

#### Acceptance Criteria

1. WHEN a country is selected, THE ChartManager SHALL render a bar or radar chart displaying World Bank governance indicators (GDP per capita, education expenditure, health expenditure, life expectancy, rule of law, government effectiveness)
2. WHEN a country is selected, THE ChartManager SHALL render a horizontal bar chart comparing the selected country CPI_Score against regional and global averages
3. WHEN a country is selected, THE ChartManager SHALL render a time-series line chart for the selected governance indicator over the configured time range
4. WHEN a country is selected, THE ChartManager SHALL render a breakdown chart of conflict event types for that country
5. WHEN the selected country changes, THE ChartManager SHALL animate transitions between the old and new data using D3 transitions
6. WHEN a user hovers over a chart element, THE ChartManager SHALL display an interactive tooltip with the data value

### Requirement 5: AI-Powered Country Briefs

**User Story:** As a user, I want to ask questions about a country and receive AI-generated analysis, so that I can get contextual insights beyond raw data.

#### Acceptance Criteria

1. WHEN a country is selected, THE AIBriefPanel SHALL automatically generate a summary brief for the selected country by sending country context data to the LLM API
2. WHEN a user submits a question, THE AIBriefPanel SHALL build a prompt containing the country governance, conflict, and corruption data as context alongside the user question
3. FOR ALL generated prompts, THE AIBriefPanel SHALL render null or undefined data values as "N/A" and never include literal "null" or "undefined" strings
4. WHEN the LLM API returns a response, THE AIBriefPanel SHALL render the response in a chat-like interface with markdown formatting
5. WHEN the selected country changes, THE AIBriefPanel SHALL clear the previous chat history and load context for the new country
6. IF the LLM API call fails, THEN THE AIBriefPanel SHALL display "Unable to generate brief. Please try again." and preserve the chat input for resubmission

### Requirement 6: Data Validation and Bounds

**User Story:** As a user, I want the dashboard to display only valid data, so that I can trust the accuracy of the visualizations and analysis.

#### Acceptance Criteria

1. FOR ALL countries with CPI data, THE DataService SHALL ensure the CPI_Score is between 0 and 100 inclusive
2. FOR ALL countries with WGI data, THE DataService SHALL ensure ruleOfLaw and govEffectiveness values are between -2.5 and 2.5 inclusive
3. FOR ALL Country_Code values in the NormalizedCountryData map, THE DataService SHALL validate that the code is a 3-character uppercase alphabetic string
4. FOR ALL ConflictEvent records, THE DataService SHALL validate that latitude is between -90 and 90 and longitude is between -180 and 180
5. FOR ALL ConflictEvent records, THE DataService SHALL validate that the fatalities value is greater than or equal to 0

### Requirement 7: Error Handling and Resilience

**User Story:** As a user, I want the dashboard to handle errors gracefully, so that partial failures do not prevent me from using the available data.

#### Acceptance Criteria

1. WHEN an API fetch fails, THE DataService SHALL retry up to 3 times with exponential backoff (1 second, 2 seconds, 4 seconds)
2. IF all retry attempts for an API fail, THEN THE Dashboard SHALL display a "Retry" button in the affected panel allowing the user to manually re-fetch without reloading the page
3. WHEN a country on the globe has no data in any source, THE Dashboard SHALL display "No data available for [Country Name]" in the chart and AI panels while still highlighting the country on the globe
4. IF the user browser does not support WebGL, THEN THE Dashboard SHALL display a fallback message in the globe container while keeping chart panels and the AI panel functional

### Requirement 8: UI Theme and Layout

**User Story:** As a user, I want the dashboard to have a dark cinematic aesthetic consistent with the existing Sophia Path workspace, so that the experience feels cohesive.

#### Acceptance Criteria

1. THE Dashboard SHALL use a dark cinematic color scheme with a background color of #0a0a0a and accent colors consistent with the existing Sophia Path workspace
2. THE Dashboard SHALL be structured in a dashboard/ subfolder containing index.html, dashboard-app.js, and dashboard-styles.css, mirroring the book/ subfolder pattern
3. THE Dashboard SHALL load Three.js and D3.js from CDN script tags in index.html
4. THE Dashboard SHALL display a loading overlay with progress indication while data is being fetched
5. WHEN data loading completes, THE Dashboard SHALL hide the loading overlay and reveal the interactive panels
