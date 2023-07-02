import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../config";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
    const { id } = useParams();
    const [restaurantInfo, setRestaurantInfo] = useState(null)
    const [menuList, setMenuList] = useState(null)

    useEffect(() => {
        getRestaurantInfo();
    }, [])

    async function getRestaurantInfo() {
        const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9405997&lng=77.5737633&restaurantId=${id}&submitAction=ENTER`);
        const result = await data.json();
        setRestaurantInfo(result?.data.cards[0].card.card.info);
        setMenuList(result?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards)
        console.log("result", result.data);
    }


    return (restaurantInfo == null && menuList == null) ? <Shimmer/> : (
        <div>
            <div className="restaurant-header-card">
                <h2>{restaurantInfo?.name}</h2>
                <img src={`${IMG_CDN_URL}/${restaurantInfo?.cloudinaryImageId}`} className="restaurant-header-card-img"/>
                <h3>{restaurantInfo?.areaName}</h3>
                <h3>{restaurantInfo?.city}</h3>
                <h3>{restaurantInfo?.avgRatingString} Stars</h3>
                <h3>{restaurantInfo?.costForTwoMessage}</h3>
            </div>
            <div>
                <ul>
                    {console.log(menuList)}
                    {menuList.filter((items) => {
                        return items?.card?.card?.title;
                    }).map((item) => (
                        <div>
                            {/* <h4>{item?.card?.card?.title}</h4> */}
                            {item?.card?.card?.itemCards?.map((subItem) => {
                                return (
                                    <li key={subItem?.card?.info?.id}>{subItem?.card?.info?.name}</li>
                                )
                            })}
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default RestaurantMenu;

{/* <li>{item?.card?.card?.itemCards?.map((subItem) =>(
    <li>{subItem?.card?.info?.name}</li>
))}</li> */}