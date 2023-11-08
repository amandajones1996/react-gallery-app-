/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Photo from './Photo'
import { useParams } from "react-router-dom";

const PhotoList = ({ photos, updateUrlWithQuery, title }) => {
    const { queryTag } = useParams();

    // error trying to render when updating state without this. Resources used: https://flaviocopes.com/react-update-while-rendering-different-component/ + https://stackoverflow.com/questions/62336340/cannot-update-a-component-while-rendering-a-different-component-warning
    useEffect(() => {
        if(queryTag){
        updateUrlWithQuery(queryTag)
        } else{
            updateUrlWithQuery(title)
        }
    }, [updateUrlWithQuery])

    return (
        <div className="photo-container">
            <h2>{title}</h2>
            <ul>
                {photos.map((photo) => {
                    return <Photo key={photo.id} id={photo.id} secret={photo.secret} server={photo.server} title={photo.title} />
                })}
            </ul>
        </div>
    )
}

export default PhotoList;