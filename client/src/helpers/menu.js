import MENU_ITEMS, {
    SUPER_ADMIN_MENU_ITEMS,
    COMPANY_MENU_ITEMS,
    ADMIN_MENU_ITEMS,
    EMPLOYEE_MENU_ITEMS,
    HR_MENU_ITEMS,
    MANAGER_MENU_ITEMS
} from '../constants/menu';

const getMenuItems = () => {
    // NOTE - You can fetch from server and return here as well
    const role = sessionStorage.getItem("role");
    if (role == 1) {
        return ADMIN_MENU_ITEMS;
    } else if (role == 2) {
        return EMPLOYEE_MENU_ITEMS;
    } 
    else {
        return MENU_ITEMS
    }
};

const findAllParent = (menuItems, menuItem) => {
    let parents = [];
    const parent = findMenuItem(menuItems, menuItem['parentKey']);

    if (parent) {
        parents.push(parent['key']);
        if (parent['parentKey']) parents = [...parents, ...findAllParent(menuItems, parent)];
    }
    return parents;
};

const findMenuItem = (menuItems, menuItemKey) => {
    if (menuItems && menuItemKey) {
        for (var i = 0; i < menuItems.length; i++) {
            if (menuItems[i].key === menuItemKey) {
                return menuItems[i];
            }
            var found = findMenuItem(menuItems[i].children, menuItemKey);
            if (found) return found;
        }
    }
    return null;
};

export { getMenuItems, findAllParent, findMenuItem };
