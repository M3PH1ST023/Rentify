import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Info from "../../Info";

const Home = () => {
    const [propertyData, setPropertyData] = useState([]);
    const [ownerDataDisplay, setOwnerDataDisplay] = useState("none");
    const [selectedItems, setSelectedItems] = useState([
        "1 BHK",
        "2 BHK",
        "3 BHK",
        "4 BHK",
        "PG for Men",
        "PG for Women",
        "Villa",
    ]);
    const [locations, setLocations] = useState([]);
    const [ownerData, setOwnerData] = useState({
        link: "",
        owner: "",
        ownerPhone: "",
        ownerEmail: "",
    });
    const types = [
        "1 BHK",
        "2 BHK",
        "3 BHK",
        "4 BHK",
        "PG for Men",
        "PG for Women",
        "Villa",
    ];

    useEffect(() => {
        axios
            .get(Info.server + "/api/v1/filters/locations")
            .then((resp) => {
                setLocations(resp.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const handleDisplay = (e) => {
        if (ownerDataDisplay == "none") {
            setOwnerDataDisplay("");
        } else {
            setOwnerDataDisplay("none");
        }
    };

    const handleItemClick = (item) => {
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(item)) {
                return prevSelectedItems.filter(
                    (selectedItems) => selectedItems !== item
                );
            } else {
                return [...prevSelectedItems, item];
            }
        });
    };

    useEffect(() => {
        axios
            .get(Info.server + "/api/v1/property")
            .then((resp) => {
                setPropertyData(resp.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const handleFilter = (e) => {
        e.preventDefault();
        let location = document.getElementById("location");
        let postBody = {
            location: location.options[location.selectedIndex].text,
            type: selectedItems,
            min: document.getElementById("min").value,
            max: document.getElementById("max").value,
        };
        axios
            .post(Info.server + "/api/v1/filters", postBody)
            .then((resp) => setPropertyData(resp.data))
            .catch((err) => console.error(err));
    };

    return (
        <div className="home-container">
            <div className="home-container flex f-center">
                <form
                    onSubmit={handleFilter}
                    className="filter-container flex f-column"
                >
                    <h3>Filters</h3>
                    <hr />
                    <div className="locations">
                        <h4>Locations</h4>
                        <select id="location">
                            {locations.map((location, index) => {
                                return (
                                    <option key={index} value={location}>
                                        {location}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <hr />
                    <div className="type">
                        <h4>Types</h4>
                        <div className="types">
                            {types.map((type, index) => {
                                return (
                                    <button
                                        key={index}
                                        onClick={(e) => {
                                            e.target.classList.toggle(
                                                "selected"
                                            );
                                            handleItemClick(type);
                                        }}
                                    >
                                        {type}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <hr />
                    <div className="optionals">
                        <h4>Price Range</h4>
                        <div className="inp flex f-center">
                            <input
                                type="number"
                                placeholder="Minimum"
                                min={0}
                                defaultValue={500}
                                id="min"
                            />
                            <span>TO</span>
                            <input
                                type="number"
                                placeholder="Maximum"
                                id="max"
                                defaultValue={10000}
                            />
                        </div>
                    </div>
                    <hr />
                    <button type="submit" className="submit">
                        Submit
                    </button>
                </form>
            </div>
            <NavBar />
            <div className="home-content">
                <div className="content">
                    <h2>Properties available</h2>
                    <div className="houses flex">
                        {propertyData.map((house, index) => {
                            return (
                                <div
                                    key={index}
                                    className="house flex f-column"
                                    onClick={(e) => {
                                        setOwnerData({
                                            link: house.link,
                                            owner: house.owner,
                                            ownerPhone: house.ownerPhone,
                                            ownerEmail: house.ownerMail,
                                        });
                                        handleDisplay();
                                    }}
                                >
                                    <h2>Price : {house.price}</h2>
                                    <h3>Type : {house.type}</h3>
                                    <h2>Location : {house.location} </h2>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div
                className="owner-data flex f-center"
                style={{ display: ownerDataDisplay }}
            >
                <div className="owner-content flex f-column">
                    <span onClick={handleDisplay}>X</span>
                    <h2>Location Details</h2>
                    <h3>
                        Location :{" "}
                        <a href={ownerData.link} target="blank">
                            Click to see location
                        </a>
                    </h3>
                    <h3>Owner Name : {ownerData.owner}</h3>
                    <h3>Owner Phone : {ownerData.ownerPhone}</h3>
                    <h3>Owner Mail : {ownerData.ownerEmail}</h3>
                </div>
            </div>
        </div>
    );
};

export default Home;
