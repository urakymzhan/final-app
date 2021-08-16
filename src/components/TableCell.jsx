import React from 'react';
import { colorize, paintStart } from '../store';
import { connect } from 'react-redux';

function TableCell(props) {
  const handleMouseDown = () => {
    props.paintStart();
    props.colorize(props.rowIdx, props.colIdx);
  };

  const handleMouseEnter = () => {
    if (props.painting) {
      props.colorize(props.rowIdx, props.colIdx);
    }
  };

  console.log('TABLECELL PROPS', props);
  return (
    <td
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      className={props.color}
    ></td>
  );
}

const mapStateToProps = (reduxState) => {
  console.log('the whole Redux state', reduxState);
  return {
    painting: reduxState.painting,
    lunch: ['blt', 'lettuce salad', 'coffee'],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    paintStart: () => dispatch(paintStart()),
    colorize: (rowIdx, colIdx) => dispatch(colorize(rowIdx, colIdx)),
  };
};

const connectingFunction = connect(mapStateToProps, mapDispatchToProps);
const ConnectedTableCell = connectingFunction(TableCell);

export default ConnectedTableCell;
