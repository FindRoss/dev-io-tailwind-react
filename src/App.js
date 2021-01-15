import { useState, useEffect } from 'react';
import './App.css';
import { URL } from './config';


function Article({ article }) {

  const {
    title,
    url,
    comments_count,
    cover_image
  } = article;



  return (
    <div className="bg-gray-900 rounded-xl shadow-lg text-white mb-2.5">
      <a target="_blank" rel="noreferrer" href={url}>
        <img className="transition rounded-xl p-1.5 transform -translate-y-2.5 hover:-translate-y-4" src={cover_image} alt={title} />
      </a>
      <div className="p-4 transform -translate-y-2.5">
        <a target="_blank" href={url}>
          <h2 className="text-2xl">{title}</h2>
        </a>
        <p>Comments: {comments_count}</p>
      </div>
    </div>
  )
}

function App() {
  const [data, setData] = useState({ articles: [] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(URL)
        const data = await response.json()
        setData({ articles: data })
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    }
    fetchArticles();
  }, []);


  return (
    <div className="bg-gray-800">
      <div className="container mx-auto px-4">
        <h1 className="text-white">Scotch.io Card Copy</h1>
        <p className="text-gray-200">With cards from the dev.to articles api.</p>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-3.5">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
              data.articles.map(article => <Article article={article} />)
            )}
        </div>
      </div>
    </div>
  );
}

export default App;
