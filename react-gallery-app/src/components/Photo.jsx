/* eslint-disable react/prop-types */


const Photo = ({ id, secret, server, title }) => {
    return (
        <li>
            <img src={`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`} alt={title} />
        </li>
    )
}

export default Photo;