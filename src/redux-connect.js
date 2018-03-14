import { connect } from "react-redux";

function mapDispatchToProps(){
    return({
        add_todo :()=>{
            dispatch(add_todo())
        }

    })
}
export default connect(null, mapDispatchToProps)(App);