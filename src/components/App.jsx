import React from 'react'
import store, { addRow, addColumn, AVAILABLE_COLORS, pickColor, paintEnd } from '../store'
import Table from './Table.jsx'
import ColorSelector from './ColorSelector.jsx'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = store.getState()

    this.handleAddRowClick = this.handleAddRowClick.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleAddRowClick() {
    store.dispatch(addRow())
  }

  handleAddColumnClick() {
    store.dispatch(addColumn())
  }

  handleColorChange(evt) {
    store.dispatch(pickColor(evt.target.value))
  }

  handleMouseUp(evt) {
    store.dispatch(paintEnd())
  }

  render() {
    return (
      <div id="pixelate" onMouseUp={this.handleMouseUp}>
        <h1>Pixelate</h1>
        <div>
          <button id='add-row' onClick={this.handleAddRowClick}>Add a row</button>
          <button id='add-column' onClick={this.handleAddColumnClick}>Add a column</button>
          <ColorSelector colors={AVAILABLE_COLORS}
                         selectedColor={this.state.selectedColor}
                         onChange={this.handleColorChange}
          />
        </div>
        <Table grid={this.state.grid} />
      </div>
    )
  }
}
