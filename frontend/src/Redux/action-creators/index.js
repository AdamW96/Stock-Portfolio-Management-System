export const login = ()=>{
  return (dispatch) =>{
    dispatch({
      type:"loginSuccess",
      payload:""
    })
  }
}

export const logout = ()=>{
  return (dispatch) =>{
    dispatch({
      type:"logoutSuccess",
      payload:""
    })
  }
}