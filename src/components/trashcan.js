import React, {Component} from 'react';

class Trashcan extends Component {
    constructor(props) {
        super(props);
        //Set Local State Here
        this.state = {
            
        }
        this.handleDragLeave = this.handleDragLeave.bind(this);
    }
    
    handleDragLeave(evt){
        if(this.props.isDropValid === true){
            evt.preventDefault();
        } else {
            this.props.validDropToggle(evt, "exit")
        }
    }
    
    render() {
        
        return (
        
            <div id="trashcan" className="component-box" onDrop={(evt)=> evt.preventDefault()} onDragOver={(e)=>e.preventDefault()} onDragEnter={(evt) => this.props.validDropToggle(evt, "enter")} onDragLeave={(evt) => this.handleDragLeave(evt) }></div>
        
        )
        
    }
    
}

export default Trashcan;