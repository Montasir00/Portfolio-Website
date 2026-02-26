# Wiki Encyclopedia

This simple Django-based web application allows users to create, view, and search for entries in an encyclopedia-style platform. The application supports features like creating pages, searching entries, and displaying content in a user-friendly format. Markdown content is supported, and each entry page renders its Markdown content as HTML.

## Features

- **Home Page**: Displays a list of all available entries in the encyclopedia.
- **Create Page**: Allows users to create a new entry by providing a title and content in Markdown format.
- **Search**: Users can search for specific entries. Partial matches (case-insensitive) are supported.
- **Random Page**: Users can view a random entry from the encyclopedia.
- **Markdown to HTML**: Converts Markdown content into HTML for proper rendering.
  
## Technologies Used

- **Django**: Web framework for building the application.
- **Python**: Programming language used for backend development.
- **HTML/CSS**: For front-end design and structure.
- **Markdown**: Content format for entries.
- **markdown2**: (Optional) Used for Markdown to HTML conversion.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- Python 3.x
- Django (Installation instructions below)
- `markdown2` library (Optional, for Markdown conversion)

## Installation
## Setup Instructions

### Set up a virtual environment (optional but recommended):

```bash
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```
Install dependencies using pip
Install markdown2 for Markdown to HTML conversion (if using Option 1):
```bash
Copy code
pip install markdown2
```
Run migrations to set up the database:
```bash
Copy code
python manage.py migrate
```
Start the Django development server:
```bash
Copy code
python manage.py runserver
```
Open the application in your web browser by navigating to http://127.0.0.1:8000/.


1. **Clone the repository** to your local machine:

   ```bash
   [   git clone https://github.com/your-username/wiki-encyclopedia.git
   cd wiki-encyclopedia](https://github.com/Montasir00/Wiki-Encyclopedia.git)
   ```
   Application Overview
1. Home Page (index.html)
The home page displays a list of all available entries. Users can click on any entry to view its details. The sidebar contains links to the home page, create new pages, and a random page feature.

2. Search Results (search_results.html)
The sidebar's search bar allows users to search for entries by title. The results are displayed as a list of matching entries. If a match is found, the user is redirected to the entry’s page.

3. Entry Page (entry.html)
Each entry is displayed on a separate page. If the content is in Markdown format, it is converted to HTML using markdown2 or a custom Markdown-to-HTML converter. This allows the content to be rendered properly.

4. Create Page (create.html)
Users can create a new entry by entering a title and content in Markdown format. The form validates to ensure that no duplicate entry titles are used. The new entry is saved as a .md file in the entries/ folder.

5. Random Page (random_page)
Clicking the "Random Page" link will redirect the user to a randomly selected entry in the encyclopedia.

Markdown to HTML Conversion
The application uses the markdown2 library (or a custom function) to handle the Markdown conversion. Markdown syntax is processed into corresponding HTML tags for proper rendering, including:

Headings: ## Heading becomes <h2>Heading</h2>
Bold text: **Bold** becomes <strong>Bold</strong>
Unordered lists: * Item becomes <ul><li>Item</li></ul>
Links: [Link](url) becomes <a href="url">Link</a>
Paragraphs: Separate paragraphs with two newlines are wrapped in <p> tags.
# Application Overview

## 1. Home Page (index.html)
The home page displays a list of all available entries. Users can click on any entry to view its details. The sidebar contains links to the home page, create new pages, and a random page feature.

## 2. Search Results (search_results.html)
The search bar in the sidebar allows users to search for entries by title. The results are displayed as a list of matching entries. If a match is found, the user is redirected to the entry’s page.

## 3. Entry Page (entry.html)
Each entry is displayed on a separate page. If the content is in Markdown format, it is converted to HTML using markdown2 or a custom Markdown-to-HTML converter. This allows the content to be rendered properly.

## 4. Create Page (create.html)
Users can create a new entry by entering a title and content in Markdown format. The form validates to ensure that no duplicate entry titles are used. The new entry is saved as a .md file in the entries/ folder.

## 5. Random Page (random_page)
Clicking the "Random Page" link will redirect the user to a randomly selected entry in the encyclopedia.

## Markdown to HTML Conversion
To handle the Markdown conversion, the application uses the `markdown2` library (or a custom function). Markdown syntax is processed into corresponding HTML tags for proper rendering, including:

- **Headings**: `## Heading` becomes `<h2>Heading</h2>`
- **Bold text**: `**Bold**` becomes `<strong>Bold</strong>`
- **Unordered lists**: `* Item` becomes `<ul><li>Item</li></ul>`
- **Links**: `[Link](url)` becomes `<a href="url">Link</a>`
- **Paragraphs**: Separate paragraphs with two newlines are wrapped in `<p>` tags.

# File Structure
The project is organized as follows:
```bash
wiki-encyclopedia/
├── encyclopedia/
│   ├── migrations/
│   ├── static/
│   │   ├── encyclopedia/
│   │   │   └── styles.css
│   ├── templates/
│   │   └── encyclopedia/
│   │       ├── create.html
│   │       ├── entry.html
│   │       ├── error.html
│   │       ├── index.html
│   │       ├── search_results.html
│   ├── entries/        # Contains .md files for each entry
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py       # You may use models in the future
│   ├── tests.py
│   ├── views.py
│   └── util.py         # Helper functions for accessing files
├── manage.py
├── requirements.txt
└── README.md
```
## entries/ Folder
This folder contains all the Markdown files for the encyclopedia entries. Each file should be named as the title of the entry (e.g., JavaScript.md).

## Util Functions (util.py)
**list_entries()**: Returns a list of all entry titles.
**get_entry(title)**: Returns the content of a specific entry based on its title. If the file doesn't exist, it returns None.

