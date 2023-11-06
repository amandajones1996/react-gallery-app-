/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Photo from './Photo'
import { useParams } from "react-router-dom";

const PhotoList = ({ photos, updateUrlWithQuery }) => {
    const { queryTag } = useParams();

    // error trying to render when updating state without this "badstate?"
    useEffect(() => {
        updateUrlWithQuery(queryTag)
    }, [updateUrlWithQuery, queryTag])

    return (
        <div className="photo-container">
            <h2>{queryTag}</h2>
            <ul>
                {photos.map((photo) => {
                    <Photo key={photo.id} id={photo.id} secret={photo.secret} sever={photo.server} title={photo.title} />
                })}
            </ul>
        </div>
    )
}

export default PhotoList;