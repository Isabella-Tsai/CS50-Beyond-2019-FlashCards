
        class CardEditor extends React.Component{
            // the constructor(props){super(props)}
            // was written before write function for input front and back state
            constructor(props){
                super(props);
                this.state = {
                    front: "",
                    back: ""
                }
            }

            render() {
                const rows = this.props.cards.map((card,i) =>{
                    return(
                        <tr key={i}>
                            <td>{card.front}</td>
                            <td>{card.back}</td>
                            <td><button data-index={i} onClick={this.deleteCard}>Delete</button></td>
                        </tr>
                    )
                    // to call directly to the deleteCard function in App
                    // onClick = {() => this.props.deleteCard(i)} just it will regenerating function , not efficient
                })
                return (
                    <div className="container text-center">
                        <h2>Card Editor</h2>
                        <table className="table-bordered">
                            <thead>
                                <tr>
                                    <th> Front </th>
                                    <th> Back </th>
                                    <th> Delete </th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                        <br/>
                        <input onChange={this.handleChange} name="front" placeholder="Front of Card" value={this.state.front}/>
                        <input onChange={this.handleChange} name="back" placeholder="Back of Card" value={this.state.back}/>
                        <button onClick={this.addCard}>Add Card</button>
                        <hr/>
                        <button onClick={this.props.switchMode}>Go To Viewer</button>
                    </div>
                )
            }

            //handleChange function need (event) The event of changing the the input field is important cuz:
            //1. the function need to know the name of the input field that was changing (is it front or back).
            //  and the logic of the programming will depends on that(whether is front or back)
            //2. the function need to know what was typed in because that will be the new value of either front or back
            // the function need the access of the change that the trigerring by the the event then the function need (event)
            handleChange = (event) => {
                // if (event.target.name === "front") {front: event.target.value} else {back: event.target.value}
                // other possibility for setState
                this.setState({
                    [event.target.name] : event.target.value
                })
            }

            addCard = () => {
                this.props.addCard(this.state.front, this.state.back);
                this.setState({
                    front: "",
                    back: ""
                })
            }

            deleteCard = (event) =>{
                // event.target.dataset.index
                // take the click EVENT, get out its TARGET (the button that has been clicked) get at its DATA attribute
                // spesifically get at data-INDEX attribute of button
                // it will give the index of the card to be deleted
                this.props.deleteCard(event.target.dataset.index)
            }
        }

        class CardViewer extends React.Component{

            constructor(props){
                super(props);
                this.state = {
                    front: true,
                    i : 0 // variable to hold the index of the card
                }
            }

            render(){

                const front = this.props.cards.map((card,i)=>{
                        return(
                            card.front
                        )
                })

                const back = this.props.cards.map((card,i)=>{
                    return(
                        card.back
                    )
                })

                if (this.state.front){
                    return (
                        <div className="container text-center">
                            <h2>Card Viewer</h2>
                            <div className="card">
                                <a onClick={this.switchView} className="stretched-link">
                                    {front[this.state.i]}
                                </a>
                            </div>
                            <hr/>
                            <button onClick={this.switchBack} className="space">Previous Card</button>
                            <button onClick={this.props.switchMode} className="space">Go To Editor</button>
                            <button onClick={this.switchNext} className="space">Next Card</button>
                        </div>
                    )
                } else{
                    return(
                        <div className="container text-center">
                            <h2>Card Viewer</h2>
                            <div className="card">
                                <a onClick={this.switchView} className="stretched-link">
                                    {back[this.state.i]}
                                </a>
                            </div>
                            <hr/>
                            <button onClick={this.switchBack} className="space">Previous Card</button>
                            <button onClick={this.props.switchMode} className="space">Go To Editor</button>
                            <button onClick={this.switchNext} className="space">Next Card</button>
                        </div>
                    )
                }
            }

            switchView = () => {
                this.setState(state => ({
                    front: !state.front
                }))
            }

            switchNext = () => {
                this.setState(state => ({
                    i: state.i+1
                }))
            }

            switchBack =() =>{
                this.setState(state =>({
                    i: state.i-1
                }))
            }

        }

        class App extends React.Component{

            constructor(props){
                super(props);
                this.state = {
                    editor: true,
                    cards: []
                }
            }
            render(){
                if(this.state.editor){
                    return(
                        <CardEditor
                        cards = {this.state.cards}
                        switchMode = {this.switchMode}
                        // the same the cardEditor need to access to switchMode function and show cards
                        // cardEditor also need to know how to addCard and deleteCard
                        addCard = {this.addCard}
                        deleteCard = {this.deleteCard}
                        />
                    )
                }else{
                    return(
                        <CardViewer
                        cards = {this.state.cards}
                        switchMode = {this.switchMode}
                        />
                    )
                }
            }

            switchMode = () => {
                this.setState(state => ({
                    editor: !state.editor
                }))
            }

            addCard = (front, back) => {
                this.setState(state =>({
                    cards: [...state.cards, {front: front, back: back}] // we can simplyfly {front, back}
                }))
            }

            deleteCard = (index) => {
                this.setState(state =>{
                    const cards = [...state.cards];
                    cards.splice(index,1);
                    return {cards:cards} // can be simplified {cards}
                })
            }
        }

        ReactDOM.render(<App/>,document.querySelector("#app"))