import { Link } from "react-router-dom";



export function ToyPreview({ toy }) {

    return (
        <article className="toy-preview">
            <Link to={`/toy/${toy.id}`}>
                <h4>Name: {toy.name}</h4>
                <h4>Price: {toy.price}</h4>
                <h4>Labels: {toy.labels}</h4>
            </Link>
        </article>
    )
}