import { Link } from "react-router-dom";
import { ToyPreview } from "./ToyPreview";

export function ToyList({ toys, onRemoveToy }) {

    // console.log('list render');
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li key={toy._id}>
                    <ToyPreview toy={toy} />
                    <section className="toy-actions">
                        <button onClick={() => onRemoveToy(toy._id)}>X</button>
                        <Link style={{ color: 'white' }} to={`/toy/edit/${toy.id}`}>Edit</Link>
                    </section>
                </li>
            )}
        </ul>
    )
}