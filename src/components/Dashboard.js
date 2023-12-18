import CreateOffer from "./CreateOffer";
import Register from "./auth/Register";

const Dashboard = function () {
    return (
        <div>
            <Register />
            <CreateOffer />
        </div>
    );
};

export default Dashboard;