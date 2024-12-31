import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const toyService = {
    query,
    save,
    remove,
    getById,
    getDefaultFilter,
    getFilterFromSearchParams
}

const STORAGE_KEY = 'toys'

_createToys()

async function query(filterBy) {
    try {
        let toys = await storageService.query(STORAGE_KEY)
        if (filterBy) {
            let { toyName='', maxPrice = '',labels=[]} = filterBy
            maxPrice = maxPrice || 0
            toys = toys.filter(toy =>{
                if (maxPrice) {
                    return toy.name.toLowerCase().includes(toyName.toLowerCase()) && toy.price <= maxPrice
                }else {
                    return toy.name.toLowerCase().includes(toyName.toLowerCase()) 
                }
            }
            
            )
            if (labels &&labels.length>0){
                toys = toys.filter(toy => {
                    let thisLabelCheck=false

                    toy.labels.filter(thisLable=>{

                        if (labels.includes(thisLable)){
                            thisLabelCheck=true
                        }

                        
                    })
                    if (thisLabelCheck){
                        return toy
                    }
                    
                })
            }

        }
        return toys
    } catch (error) {
        console.log('error:', error)
        throw error
    }
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(toyToSave) {
    if (toyToSave._id) {
        return storageService.put(STORAGE_KEY, toyToSave)
    } else {
        return storageService.post(STORAGE_KEY, toyToSave)
    }
}

function createToy(name = '', price = '', labels=[],inStock=true) {
    return {
        name,
        price,
        inStock,
        labels,
    }
}

function getDefaultFilter() {
    return {
        toyName: '',
        maxPrice: '',
        labels: [],
    }
}



function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}




function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        const toys = [
            {
              _id: 't102',
              name: 'Remote Control Car',
              price: 79,
              labels: ['On wheels', 'Doll', 'Outdoor'],
              createdAt: 1672531191000,
              inStock: true,
            },
            {
              _id: 't103',
              name: 'Lego Building Set',
              price: 45,
              labels: ['Outdoor', 'Art', 'Baby'],
              createdAt: 1675209591000,
              inStock: false,
            },
            {
              _id: 't104',
              name: 'Action Figure',
              price: 35,
              labels: ['Doll', 'Baby', 'Battery Powered'],
              createdAt: 1677587991000,
              inStock: true,
            },
          ]
          
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}




