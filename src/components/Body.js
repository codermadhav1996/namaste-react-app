
import { useEffect, useState } from "react";
import { restaurantList } from "../config";
import RestaurantCards from "./RestaurantCards";
import Shimmer from "./Shimmer";



const filterData = (searchInput, restaurantList) => {
    const filterData =  restaurantList.filter(e=> e?.data?.name?.toLowerCase().includes(searchInput.toLowerCase()))
    return filterData;
}


const Body = () => {
    const [filteredRestaurants, setFilteredRestaurants ] = useState([]);
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [searchInput, setSearchInput] = useState();

    useEffect(() => {
        getRestaurants();
    }, []);

    async function getRestaurants() {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9405997&lng=77.5737633&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards)
        setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards)
    }

    if(!allRestaurants) return null;

    if(filteredRestaurants?.length == 0) return <h1>No Restaurant Match your Filter</h1>

    return (allRestaurants.length === 0 ) ? <Shimmer/> :(
        <>
            <div className="search-container">
                <input type="text" className="search-input" placeholder="Search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                <button className="search-btn" 
                onClick={(e) => {
                const data = filterData(searchInput, allRestaurants);
                setFilteredRestaurants(data);
                }}>Search</button>

            </div>
            <div className="restaurant-list">
                {filteredRestaurants.map(e =>
                    <RestaurantCards {...e.data} key={e.data.id} />
                )}
            </div>
        </>
    )
}


export default Body;