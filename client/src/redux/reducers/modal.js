

const modalReducer = (state = { modal: false }, action) => {
    switch (action.type) {
        case "MODAL":
            localStorage.setItem('auth', JSON.stringify(action.payload))
            return {
                modal: action.payload
            }
        default:
            return state;
    }
}

export default modalReducer;