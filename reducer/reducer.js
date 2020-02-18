const initial_state = {
    userData:{},
    products:[],
    carts:[],
    deals:[],
    orders:[],
    favorites:[],
    shipping:[],
    newshippingaddress:{},
    isFetching:false,
    payment:{},
    featured:[],
    article:[],
    suggested:[],
    searchdata:[],
    productdetails:{},
    carts:[],
    whichpage:'home',
    access_token:'',
    orderid:0,
    orderdetails:{},
    customer:[],
    gifts:{wrappings:0,certificate:0},
    reference:'',
    access_code:'',
    total_price:0,
    arrival:[],
    siteurl:'http://www.thelittlebigkidcompany.com.ng'
};

const Reducer = (state = initial_state, action) => {
   switch(action.type){
        case 'SIGNUP':
           return Object.assign({}, state, {
              isFetching:false,
              userData:action.data.user,
              customer:action.data.customer,
              access_token:action.data.access_token

        });
        case 'LOGIN':
           return Object.assign({}, state, {
              isFetching:false,
              userData:action.data.user,
              favorites:action.data.favorites,
              orders:action.data.orders,
              shipping:action.data.shipping,
              customer:action.data.customer,
              access_token:action.data.access_token

        });
        case 'UPDATELOGIN':
            return Object.assign({}, state, {
               userData:action.data.user,
               access_token:action.data.access_token

         });
        case 'ORDERID':
           return Object.assign({}, state, {
              orderid:action.data,
              customer:action.data.customer
        });
        case 'TOTALPRICE':
           return Object.assign({}, state, {
              total_price:action.data.price
        });
        case 'PAYMENTINFO':
           return Object.assign({}, state, {
              access_code:action.data.access_code,
              reference:action.data.reference
        });
        case 'GIFTS':
         return Object.assign({}, state, {
            gifts:action.data
        });
        case 'ORDERDETAILS':
           return Object.assign({}, state, {
              orderdetails:action.data.order,
              orders:action.data.allorders
        });
        case 'WHICHPAGE':
           return Object.assign({}, state, {
              isFetching:false,
              whichpage:action.data.page
        });
        case 'NEWSHIPPINGADD':
           return Object.assign({}, state, {
              isFetching:false,
              newshippingaddress:action.data
        });
        case 'GETDATA':
           return Object.assign({}, state, {
              isFetching:true
        });
        case 'CANCEL':
           return Object.assign({}, state, {
              isFetching:false
        });
        case 'PRODUCTS':
           return Object.assign({}, state, {
              isFetching:false,
              products:action.data.products == undefined ? state.products : action.data.products,
              deals:action.data.deals,
              featured:action.data.featured,
              article:action.data.article,
              suggested:action.data.suggested,
              arrival:action.data.arrival == undefined ? state.arrival : action.data.arrival,
              favorites:action.data.favorites == undefined ? state.favorites : action.data.favorites
        });   
        case 'SEARCHBY':
           return Object.assign({}, state, {
              isFetching:false,
              searchdata:action.data
        });
        case 'DETAILS':
           return Object.assign({}, state, {
              isFetching:false,
              productdetails:action.data
        });
        case 'CARTS':
           return Object.assign({}, state, {
              isFetching:false,
              carts:action.data
        });            
    } 
   return state;
};

export default Reducer;