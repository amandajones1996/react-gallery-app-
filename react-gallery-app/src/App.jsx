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

    const updateUrlWithQuery = (query) => {
        setUrl(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const tag = searchValue.current.value
        setUrl(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`)
        navigate(tag)
        e.currentTarget.reset();
    }

    return(
        <div>
            <Search handleSubmit={handleSubmit} searchValue={searchValue}/>
            <Nav />
            <Routes>
                <Route path="/" element={<Navigate replace to="/cats" />} />
                <Route path="/:query" element={<PhotoList photos={photos} searchValue={searchValue} updateUrlWithQuery={updateUrlWithQuery} />} />
            </Routes>
        </div>
        );
    }

export default App