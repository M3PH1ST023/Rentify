import { useEffect, useState } from "react";
import Info from "../../Info";
import Cookies from "js-cookie";
import PropertyNav from "./PropertyNav";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const Property = () => {
    const sellerData = JSON.parse(Cookies.get("sellerData"));
    const token = Cookies.get("authToken");
    const [display, setDisplay] = useState("none");
    const [updateDisplay, setUpdateDisplay] = useState("none");
    const [editData, setEditData] = useState({});
    const [sellerProperties, setSellerProperties] = useState([]);

    useEffect(() => {
        let userId = jwtDecode(token).id;
        axios
            .get(Info.server + "/api/v1/property/" + userId)
            .then((resp) => {
                setSellerProperties(resp.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const displayHandler = (e) => {
        if (display == "") {
            setDisplay("none");
        } else {
            setDisplay("");
        }
    };

    const editHandler = (edit) => {
        setUpdateDisplay("");
        setEditData(edit);
    };

    const editSubmitHandler = (e) => {
        e.preventDefault();
        let type = document.getElementById("editType");
        let patchBody = {
            location: document.getElementById("editLocation").value,
            area: document.getElementById("editArea").value,
            price: document.getElementById("editPrice").value,
            link: document.getElementById("editLink").value,
            type: type.options[type.selectedIndex].text,
            owner: sellerData.owner,
            ownerPhone: sellerData.ownerPhone,
            ownerMail: sellerData.ownerMail,
        };
        axios
            .patch(Info.server + "/api/v1/property/" + editData._id, patchBody)
            .then((resp) => {
                if (resp.data == true) {
                    toast.success("Property Updated !");
                    setTimeout(() => {
                        window.location.replace("/property");
                    }, 2500);
                } else {
                    toast.error(resp.data.error);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const deleteHandler = (deleteId) => {
        let response = prompt(
            "Confirm. Do you want to delete this Property ? Type Yes/No"
        );
        if (response == "yes" || response == "Yes") {
            axios
                .delete(Info.server + "/api/v1/property/" + deleteId)
                .then((resp) => {
                    if (resp.data == true) {
                        toast.success("Data Deleted !");
                        setTimeout(() => {
                            window.location.reload(true);
                        }, 2500);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    const AddPropertyHandler = (e) => {
        e.preventDefault();
        let type = document.getElementById("type");
        let postBody = {
            location: document.getElementById("location").value,
            area: document.getElementById("area").value,
            price: document.getElementById("price").value,
            link: document.getElementById("link").value,
            type: type.options[type.selectedIndex].text,
            owner: sellerData.owner,
            ownerPhone: sellerData.ownerPhone,
            ownerMail: sellerData.ownerMail,
        };
        axios
            .post(Info.server + "/api/v1/property/", postBody)
            .then((resp) => {
                if (resp.data == true) {
                    toast.success("Property Added !");
                    setTimeout(() => {
                        window.location.replace("/property");
                    }, 2500);
                } else {
                    toast.error("Error Occured, Try Again!");
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div className="property-container">
            <ToastContainer theme="dark" autoClose={2000} />
            <PropertyNav />
            <div className="property-content flex f-column">
                <h2>Property Posted</h2>
                <div className="houses flex">
                    <img
                        className="add"
                        src={Info.images.add}
                        onClick={displayHandler}
                    />
                    {sellerProperties.map((house, index) => {
                        return (
                            <div key={index} className="house flex f-column">
                                <div className="icons flex">
                                    <img
                                        src={Info.images.edit}
                                        onClick={(e) => {
                                            editHandler(house);
                                        }}
                                    />
                                    <img
                                        src={Info.images.delete}
                                        onClick={(e) => {
                                            deleteHandler(house._id);
                                        }}
                                    />
                                </div>
                                <h2>Price : {house.price}</h2>
                                <h3>Type : {house.type}</h3>
                                <h2>Location : {house.location} </h2>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Update Property DIV */}
            <div
                className="add-property-container flex f-center"
                style={{ display: updateDisplay }}
            >
                <div
                    className="close-icon"
                    onClick={(e) => {
                        setUpdateDisplay("none");
                    }}
                >
                    X
                </div>
                <form
                    onSubmit={editSubmitHandler}
                    className="add-property-form flex f-column"
                >
                    <h2>Edit Property</h2>
                    <div className="inp flex">
                        <label>Location</label>
                        <input
                            type="text"
                            placeholder="Enter location"
                            id="editLocation"
                            defaultValue={editData.location}
                        />
                    </div>
                    <div className="inp flex">
                        <label>Area</label>
                        <input
                            type="number"
                            placeholder="Enter area in sqft"
                            id="editArea"
                            defaultValue={editData.area}
                        />
                    </div>
                    <div className="inp flex">
                        <label>Price</label>
                        <input
                            type="number"
                            placeholder="Enter Price"
                            id="editPrice"
                            defaultValue={editData.price}
                        />
                    </div>
                    <div className="inp flex">
                        <label>Maps Link</label>
                        <input
                            type="url"
                            placeholder="Enter Link of location"
                            id="editLink"
                            defaultValue={editData.link}
                        />
                    </div>
                    <div className="inp flex">
                        <label>Type</label>
                        <select id="editType">
                            <option value={editData.type}>
                                {editData.type}
                            </option>
                            <option value="">1 BHK</option>
                            <option value="">2 BHK</option>
                            <option value="">3 BHK</option>
                            <option value="">4 BHK</option>
                            <option value="">PG for men</option>
                            <option value="">PG for women</option>
                            <option value="">Villa</option>
                        </select>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>

            {/* ADD PROPERTY DIV */}
            <div
                className="add-property-container flex f-center"
                style={{ display: display }}
            >
                <div className="close-icon" onClick={displayHandler}>
                    X
                </div>
                <form
                    onSubmit={AddPropertyHandler}
                    className="add-property-form flex f-column"
                >
                    <h2>Add Property</h2>
                    <div className="inp flex">
                        <label>Location</label>
                        <input
                            type="text"
                            placeholder="Enter location"
                            id="location"
                        />
                    </div>
                    <div className="inp flex">
                        <label>Area</label>
                        <input
                            type="number"
                            placeholder="Enter area in sqft"
                            id="area"
                        />
                    </div>
                    <div className="inp flex">
                        <label>Price</label>
                        <input
                            type="number"
                            placeholder="Enter Price"
                            id="price"
                        />
                    </div>
                    <div className="inp flex">
                        <label>Maps Link</label>
                        <input
                            type="url"
                            placeholder="Enter Link of location"
                            id="link"
                        />
                    </div>
                    <div className="inp flex">
                        <label>Type</label>
                        <select id="type">
                            <option value="">-- Select type --</option>
                            <option value="">1 BHK</option>
                            <option value="">2 BHK</option>
                            <option value="">3 BHK</option>
                            <option value="">4 BHK</option>
                            <option value="">PG for men</option>
                            <option value="">PG for women</option>
                            <option value="">Villa</option>
                        </select>
                    </div>

                    <button type="submit">Submit</button>
                </form>
                <div className="splitter"></div>
                <div className="owner-content flex f-column">
                    <h2>Owner Details</h2>
                    <div className="inp flex">
                        <label>Owner name: </label>
                        <label>{sellerData.owner}</label>
                    </div>
                    <div className="inp flex">
                        <label>Owner Phone:</label>
                        <label>{sellerData.ownerPhone}</label>
                    </div>
                    <div className="inp flex">
                        <label>Owner Mail:</label>
                        <label>{sellerData.ownerMail}</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Property;
