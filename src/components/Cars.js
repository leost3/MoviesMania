import React from 'react'

function Cars({carsList}) {
    // console.log(carsList);

    const mapCars = () =>{
        return carsList.map(car => {
            return (
                <div>
                    id: {car.ID}
                    Year: {car.Year}
                    Make: {car.Make}
                    Model: {car.Model}
                    OldPrice: {car.OldPrice}
                </div>
            )
        })
    }

    console.log(mapCars())
    return (
        <div>
            {mapCars()}
        </div>
    )
}

export default Cars
