import { useNavigate } from "react-router-dom";
import Info from "../../Info";

const PropertyNav = () => {
    const navigate = useNavigate();
    return (
        <nav className="flex f-column">
            <img
                src={Info.images.homeIcon}
                onClick={(e) => {
                    navigate("/");
                }}
            />
        </nav>
    );
};

export default PropertyNav;
