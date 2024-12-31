import { useEffect, useState } from "react"
// import { useFormRegister } from "../customHooks/useFormRegister"

export function ToyFilter({ filterBy, onSetFilterBy }) {
    
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { name: field, value, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
            default:
                break;
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }
    const { toyName, maxPrice } = filterByToEdit
    return (
        <form className="toy-filter">
            <section>
                <label htmlFor="toyName">Toy Name </label>
                <input value={toyName} name="toyName" id="toyName" onChange={handleChange} />
            </section>
            <section>
                <label htmlFor="maxPrice">Max. Toy Price </label>
                <input value={maxPrice} onChange={handleChange} name="maxPrice" id="maxPrice" />
            </section>
            <section>
                <button>Submit</button>
            </section>
        </form>
    )
}   