export const signup = (data) => {
    return {
        type: 'SIGNUP',
        data:data
    }
};
export const login = (data) => {
    return {
        type: 'LOGIN',
        data:data
    }
};

export const fetchdata = () => {
    return {
        type: 'GETDATA'
    }
};

export const cancel = () => {
    return {
        type: 'CANCEL'
    }
};

export const total_price = (data) => {
    return {
        type: 'TOTALPRICE',
        data:data
    }
};

export const receivegifts = (data) => {
    return {
        type: 'GIFTS',
        data:data
    }
};

export const paymentinfo = (data) => {
    return {
        type: 'PAYMENTINFO',
        data:data
    }
};

export const products = (data) => {
    return {
        type: 'PRODUCTS',
        data:data
    }
};
export const itemcart = (data) => {
    return {
        type: 'CARTS',
        data:data
    }
};
export const newshippingaddress = (data) => {
    return {
        type: 'NEWSHIPPINGADD',
        data:data
    }
};
export const orderID = (data) => {
    return {
        type: 'ORDERID',
        data:data
    }
};
export const orderdetails = (data) => {
    return {
        type: 'ORDERDETAILS',
        data:data
    }
};
export const whichpage = (data) => {
    return {
        type: 'WHICHPAGE',
        data:data
    }
};

export const details = (data) => {
    return {
        type: 'DETAILS',
        data:data
    }
};

export const search = (data) => {
    return {
        type: 'SEARCHBY',
        data:data
    }
};