import { useEffect, useRef, useState } from "react"
import { Link, Outlet, useSearchParams } from "react-router-dom";
import { toyService } from "../services/toy.service";
import { ToyList } from "../cmps/ToyList";
// import { RobotFilter } from "../cmps/RobotFilter";
// import { RobotFilterType } from "../cmps/RobotFilterType";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { debounce,getExistingProperties } from "../services/util.service";
import { useSelector } from "react-redux";
import { loadToys ,setFilterBy} from "../store/toy/toy.actions"; 
import { ToyFilter } from "../cmps/ToyFilter";

export  function ToyIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const onSetFilterByDebounce = useRef(debounce(onSetFilterBy, 400)).current


    useEffect(() => {
        setFilterBy(toyService.getFilterFromSearchParams(searchParams))
    }, [])

    useEffect(() => {
        loadToys()
        setSearchParams(getExistingProperties(filterBy))
    }, [filterBy])



    async function onRemoveRobot(robotId) {
        try {
            await removeRobot(robotId)
            showSuccessMsg('Robot removed successfully!')
        } catch (error) {
            showErrorMsg(`Having issues removing robot (${robotId})`)
        }
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(filterBy)
    }





    if (!toys) return <div>Loading...</div>

    const { toyName, maxPrice } = filterBy
    return (
        <section className="toy-index">
            <h1>Welcome! this is our toys</h1>
            <ToyFilter onSetFilterBy={onSetFilterByDebounce} filterBy={{ toyName, maxPrice }} />
            {/* <RobotFilterType filterBy={{ type }} onSetFilterBy={onSetFilterByDebounce} /> */} 
            <Link to='/toy/edit'>Add Toy</Link>
            <ToyList toys={toys}  />
        </section>
    )
}
