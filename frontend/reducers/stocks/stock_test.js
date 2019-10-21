import {
  RECEIVE_STOCK_PAST_DATA,
  RECEIVE_COMPANY_INFO,
  RECEIVE_STOCK_INTRADAY,
  RECEIVE_STOCK_LISTING
} from '../../actions/stock_actions';
import {merge} from 'lodash';

const stocksReducer = ( state = {}, action) => {

  Object.freeze(state);
  //state will be stocks slice of state
  // payload is data from ajax. payload can be info, historical, etc
  switch (action.type) {

    case RECEIVE_STOCK_INTRADAY:
      // modify stocks.hist slice 
      let intra_slice = Object.assign({}, state.intraday, action.payload);
      // now modify the stocks_slice
      return merge({}, state, { intraday: intra_slice });

    case RECEIVE_STOCK_PAST_DATA:
      // modify stocks.hist slice 
      let hist_slice = Object.assign({}, action.payload);
      // now modify the stocks_slice
      return merge({}, state, { historical: hist_slice });

    case RECEIVE_COMPANY_INFO:
      let info_slice = Object.assign({}, state.info, action.payload);
      return Object.assign({}, state, { info: info_slice });

    case RECEIVE_STOCK_LISTING:
      //this is called whenever search bar is mounted
      let stock_list_arr = Object.values(action.payload).map(stock => {
        return { "ticker" : stock.ticker , "name" : stock.name}
      });
      return merge({}, state, {list: stock_list_arr} );

    default:
      return state
  }
}
export default stocksReducer;







