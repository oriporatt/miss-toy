import { showErrorMsg } from "../../services/event-bus.service";
import { toyService } from "../../services/toy.service"; 
import { store } from "../store";
import { SET_TOYS,SET_FILTER } from "./toy.reducer";


export async function loadToys() {

    try {
        const filterBy = store.getState().toyModule.filterBy
        const toys = await toyService.query(filterBy)
        store.dispatch({ type: SET_TOYS, toys })
    } catch (err) {
        console.log('Having issues with loading toys:', err)
        showErrorMsg('Having issues with loading toys:')
        throw err
    }
}

// export async function removeRobot(robotId) {
//     try {
//         await robotService.remove(robotId)
//         store.dispatch({ type: REMOVE_ROBOT, robotId })
//     } catch (err) {
//         console.log('Having issues removing robot:', err)
//         throw err
//     }
// }

// export async function removeRobotOptimistic(robotId) {
//     try {
//         store.dispatch({ type: REMOVE_ROBOT, robotId })
//         await robotService.remove(robotId)
//     } catch (err) {
//         console.log('Having issues removing robot:', err)
//         store.dispatch({ type: UNDO_CHANGES })
//         throw err
//     }
// }

// export async function saveRobot(robotToSave) {
//     try {
//         const type = robotToSave.id ? EDIT_ROBOT : ADD_ROBOT
//         const robot = await robotService.save(robotToSave)
//         store.dispatch({ type, robot })
//     } catch (err) {
//         console.log('Having issues saving robot:', err)
//         throw err
//     }
// }

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER, filterBy })
}

