import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

const Title = () => {
    return (
        <div className="title">
            so many things
            <br />
            so little time
        </div>
    )
}

class Adder extends React.Component {
    render() {
        return (
            <div className="adder">
                <form >
                    <input
                        className="input"
                        type="text"
                        value={this.props.item}
                        onChange={this.props.onChange}
                        onFocus="this.value=''"
                    />
                    <br />
                    <button onClick={this.props.onItemSubmit} className="btn">
                        Add
                    </button>
                </form>
            </div>
        )
    }
}

class Lists extends React.Component {

    render() {
        return (
            <div>
                <div className="title-secondary">{this.props.title}</div>
                <div className={this.props.class} onClick={this.props.onListsClick}>
                    <ul>{this.props.value}</ul>
                </div>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: null,
            todoItem: [],
            doneThings: []
        }

        this.onItemSubmit = this.onItemSubmit.bind(this);
    }

    onItemSubmit(item, event) {
        event.preventDefault();
        this.setState({
            todoItem: [...this.state.todoItem, item]
        })
    }

    onItemTodo(item) {
        this.setState({
            doneThings: [...this.state.doneThings, item],
            todoItem: this.state.todoItem.splice()
        })
    }

    onItemDone() {
        console.log('done');
        this.setState({
            doneThings: this.state.doneThings.splice()
        })
    }

    render() {
        return (
            <div className="page" >
                <Title />
                <Adder
                    onChange={(e) => this.setState({ item: e.target.value })}
                    onItemSubmit={(event) => this.onItemSubmit(this.state.item, event)}
                />

                <div className="list-container">
                    <div className="todo-container">
                        <Lists
                            class="item-card-1"
                            title="things to do"
                            value={this.state.todoItem}
                            onListsClick={() => this.onItemTodo(this.state.todoItem[0])}
                        />
                    </div>
                    <div className="done-container">
                        <Lists
                            class="item-card-2"
                            title="things done"
                            value={this.state.doneThings}
                            onListsClick={() => this.onItemDone()}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)