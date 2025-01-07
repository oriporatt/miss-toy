import { useEffect, useState } from "react"
// import { useFormRegister } from "../customHooks/useFormRegister"

export function ToyFilter({ filterBy, onSetFilterBy ,labelsList}) {
    
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
        if (type==='checkbox'){
            let newLabels=labels
            if (value){
                newLabels = [...newLabels,field]
            }else{
                newLabels=newLabels.filter(label=>label!==field)

            }
            

            
            setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels: newLabels  }))

        }else{
            setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
        }
    }
    const { toyName, maxPrice,labels } = filterByToEdit
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
            <div className="label-list">
                {labelsList&&labelsList.map(thisLabel=>{
                    return (
                        <label key={thisLabel}>
                            <input 
                                type="checkbox" 
                                name={thisLabel}
                                value={thisLabel}
                                onChange={handleChange} 
                                checked={labels.includes(thisLabel)} 
                            />
                                {thisLabel}
                        </label>
                    )}
                )}
            </div>


        </form>
    )
}   