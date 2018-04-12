const ADD_BOX = 'ADD_BOX';
const FILTER_BOXES = "FILTER_BOXES";

function addNewBox(color) {
    return {
        type: 'ADD_BOX',
        color,
        visible
    }
}

function toggleBoxes(color) {
    return {
        type: 'FILTER_BOXES',
        color
    }
}

const initialState = {
    boxes: []
}

function addBoxes(state = initialState,action) {
    switch (action.type) {
        case "ADD_BOX":
            return Object.assign({},state, {
                boxes: [
                    ...state.boxes,
                    {
                        color: action.color,
                        visible: true
                    }
                ]
            })
        default:
            return state;
    }
}

function filterBoxes(state = initialState,action) {
    switch (action.type) {
        case "FILTER_BOXES":
            return state.boxes.map( (e) => {
                (e.color === action.color) ? {...e, visible: true} : {...e, visible: false}
            })
        default:
            return state;
    }
}



const thisApp = Redux.combineReducers({
    addBoxes,
    filterBoxes
})


let store = Redux.createStore(thisApp);

const mapDispatchToProps1 = (dispatch) => {
    return {
        addBox: (color) => {
            dispatch(addNewBox(color));
        }
    }
}

class Box extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className={"box " + this.props.color}></div>
        )
    }
}

const mapDispatchToProps2 = (dispatch) => {
    return {
        filterBox: (color) => {
            dispatch(addNewBox(color));
        }
    }
}

class FilterButton extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <button className={"filterBox " + this.props.color}></button>
        )
    }
}

class ConnectedButton extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <button className={"button button"+this.props.color} onClick={(e) => {
                    e.preventDefault();
                    this.props.addBox(this.props.color)
                }}
            >
                Generate {this.props.color} button
            </button>
        )
    }
}

const Button = ReactRedux.connect(null,mapDispatchToProps2)(ConnectedButton)

const mapStateToProps = (state) => {
    console.log(state)
    return {
        boxes: state.filter.boxes
    }
}

class ConnectedArea extends React.Component{
    constructor(props){
        super(props)

    }

    render(){
        console.log(this.props)
        return(
            <div className="area">
                {this.props.boxes.map((box,index) => {
                    return (
                        box.visible ? <Box key={box.color+index} color={box.color}/> : null
                    )
                })}
            </div>
        )
    }
}

const Area = ReactRedux.connect(mapStateToProps)(ConnectedArea)

class MyApp extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <Button color={"red"}/>
                <Button color={"green"}/>
                <Button color={"blue"}/>
                <FilterButton color={"red"}/>
                <FilterButton color={"green"}/>
                <FilterButton color={"blue"}/>
                <Area/>
            </div>
        )
    }
}

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <MyApp/>
    </ReactRedux.Provider>,
  document.getElementById('root')
);