import { useCallback, useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const url = `https://www.googleapis.com/books/v1/volumes?q=`;
  // const [bookName, setBookName] = useState("");
  const [booksList, setBooksList] = useState([]);

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const fetchingBooks = async (query) => {
    if (!query) return;

    try {
      const result = await axios.get(url + query);
      setBooksList(result.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   fetchingBooks();
  // }, [bookName]);

  const debouncedFetch = useCallback(debounce(fetchingBooks), [])

  const handleInputChange = e => {
    const value = e.target.value
    debouncedFetch(value)
  }

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input type="text" 
      onChange={(e) => (handleInputChange(e))
      } />
      <ul>
        {booksList.map((book) => (
          <li key={book.id}>{book.volumeInfo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
