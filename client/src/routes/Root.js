
import { Navigate } from 'react-router-dom';
import { getUserFromSession } from '../helpers/api/apiCore';
import { getMenuByRole } from '../constants/menu';

const RootFind = () => {
    const user = getUserFromSession();
    // const forcePasswordCheck = user?.data?.data?.user?.forcePassword;

    if (user?.role === 'User') {
        return 'user/dashboard/boards';
    }
    //  else if (user?.role === 'site-admin') {
    //     return 'siteadmin/dashboard/itdashboard';
    // }
    //  else if (user?.role === 'user') {
    //     return 'user/dashboard/itdashboard';
    // }
    else{
    return 'account/login'

    }


};

const Root = () => {
    const getRootUrl = () => {
        let url = RootFind();
        return url;
    };

    const url = getRootUrl();

    return <Navigate to={`/${url}`} />;
};

export default Root;

// import { Navigate } from 'react-router-dom';

// const Root = () => {
//     const getRootUrl = () => {
//         let url = 'user/dashboard/boards';
//         return url;
//     };

//     const url = getRootUrl();

//     return <Navigate to={`/${url}`} />;
// };

// export default Root;
