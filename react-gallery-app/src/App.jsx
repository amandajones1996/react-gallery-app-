import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import axios from 'axios';
import apiKey from "./config";
import "./index.css";
import Nav from './components/Nav';
import Search from './components/Search'
import PhotoList from "./components/PhotoList";


function App() {
    const navigate = useNavigate();
    const searchValue = useRef();
    const [query, setQuery] = useState();
    const [photos, setPhotos] = useState([]);
    const [url, setUrl] = useState(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url)
                setPhotos(response.data.photos.photo)
            } catch (error) {
                console.error('Error fetching data', error)
            }
        }
        fetchData();
    }, [url])

    // function to handle url updates 
    const updateUrlWithQuery = (query) => {
        setUrl(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    }

    // after form submit this function updates search and renders to it
    const handleSubmit = (e) => {
        e.preventDefault();
        const tag = searchValue.current.value
        setQuery(tag)
        setUrl(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`)
        navigate(`/search/${tag}`)
        e.currentTarget.reset();
    }
    
    return(
        <div>
            <Search handleSubmit={handleSubmit} searchValue={searchValue}/>
            <Nav updateUrlWithQuery={updateUrlWithQuery}/>
            <Routes>
                <Route path="/" element={<Navigate replace to="/cats" />} />
                <Route path="/dogs" element={<PhotoList photos={photos} title={"dogs"} searchValue={searchValue} updateUrlWithQuery={updateUrlWithQuery} />} />
                <Route path="/computers" element={<PhotoList photos={photos} title={"computers"} searchValue={searchValue} updateUrlWithQuery={updateUrlWithQuery} />} />
                <Route path="/cats" element={<PhotoList photos={photos} title={"cats"} searchValue={searchValue} updateUrlWithQuery={updateUrlWithQuery} />} />
                <Route path="/search/:queryTag" element={<PhotoList title={`${query}`} photos={photos} searchValue={searchValue} updateUrlWithQuery={updateUrlWithQuery} />} />
            </Routes>
        </div>
        );
    }

export default App