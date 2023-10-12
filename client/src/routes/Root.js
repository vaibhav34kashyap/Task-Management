
import { Navigate } from 'react-router-dom';
import { getUserFromSession } from '../helpers/api/apiCore';
import { getMenuByRole } from '../constants/menu';


const Root = () => {
    const role = sessionStorage.getItem("role");
    console.log(role,"bbbb")
    if (role == "1") {
        return <Navigate to={'/dashboard/projects'} />
    } else if (role == "2") {
        return <Navigate to={'/dashboard/boards'} />
    } else {
        return <Navigate to={'/pageNotFound'} />
    }

    // const getRootUrl = () => {
    //     let url = 'dashboard/admin';
    //     return url;
    // };

    // const url = getRootUrl();

    // return <Navigate to={`/${url}`} />;
};

export default Root;
