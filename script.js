
const widgetContainer = document.getElementById('widget-container');
const themeToggle = document.getElementById('theme-toggle');


const widgets = [
    { id: 'weather', title: 'Weather', content: 'Loading weather data...' },
    { id: 'news', title: 'News', content: 'Loading news data...' },
    { id: 'calendar', title: 'Calendar', content: 'No upcoming events' },
    { id: 'tasks', title: 'Tasks', content: 'No tasks available' },
];


function renderWidgets() {
    widgetContainer.innerHTML = ''; 
    widgets.forEach(widget => {
        const widgetElement = document.createElement('div');
        widgetElement.className = 'widget';
        widgetElement.draggable = true;
        widgetElement.innerHTML = `
            <h3>${widget.title}</h3>
            <p>${widget.content}</p>
        `;
        widgetContainer.appendChild(widgetElement);
    });

    
    const widgetElements = document.querySelectorAll('.widget');
    widgetElements.forEach(widget => {
        widget.addEventListener('dragstart', handleDragStart);
        widget.addEventListener('dragover', handleDragOver);
        widget.addEventListener('drop', handleDrop);
    });
}


let draggedWidget = null;

function handleDragStart(e) {
    draggedWidget = this;
    setTimeout(() => (this.style.display = 'none'), 0);
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop() {
    this.style.display = 'block';
    this.parentNode.insertBefore(draggedWidget, this);
}


themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});


async function loadWeather() {
    const apiKey = 'YOUR_API_KEY';
    const category = 'technology';

    fetch(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        const articles = data.articles;

        // Display news articles on the webpage
        articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${article.url}">Read more</a>
        `;
        document.getElementById('news-container').appendChild(newsItem);
        });
    })
    .catch(error => console.error(error));
}


async function loadNews() {
    async function loadNews() {
        const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
        const url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}`;
      
        const response = await fetch(url);
        const data = await response.json();
      
        if (data.status === 'error') {
          console.error("Error fetching news data:", data.message);
          updateWidgetContent('news', 'Error loading news data');
        } else {
          const articles = data.articles;
          let newsContent = '';
          articles.forEach(article => {
            newsContent += `<p>${article.title}</p>`; // Display only titles for simplicity
          });
          updateWidgetContent('news', newsContent);
        }
      }
  }



function updateWidgetContent(id, content) {
    const widget = widgets.find(w => w.id === id);
    if (widget) widget.content = content;
    renderWidgets();
}


document.addEventListener('DOMContentLoaded', () => {
    renderWidgets();
    loadWeather();  
    loadNews();     
});
