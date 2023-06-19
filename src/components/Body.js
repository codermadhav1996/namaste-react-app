
import { useState } from "react";
import { restaurantList } from "../config";
import RestaurantCards from "./RestaurantCards";



const filterData = (searchInput, restaurantList) => {
    const filterData =  restaurantList.filter(e=> e.data.name.includes(searchInput))
    return filterData;
}


const Body = () => {
    const [searchInput, setSearchInput] = useState();
    const [restaurants, setRestaurants] = useState(restaurantList);


    return (
        <>
            <div className="search-container">
                <input type="text" className="search-input" placeholder="Search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                <button className="search-btn" 
                onClick={(e) => {
                const data = filterData(searchInput, restaurantList);
                setRestaurants(data);
                }}>Search</button>

            </div>
            <div className="restaurant-list">
                {restaurants.map(e =>
                    <RestaurantCards {...e.data} key={e.data.id} />
                )}
            </div>
        </>
    )
}


export default Body;