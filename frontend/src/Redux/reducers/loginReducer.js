//state=false not logged in 
//state=true logged in 
const reducer = (state=false, action) => {
  switch (action.type) {
    case 'loginSuccess':
      return true;
    case 'logoutSuccess':
      return false;
    default:
      return false;
  }

}

export default reducer;