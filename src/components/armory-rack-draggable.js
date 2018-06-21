import React, {Component} from 'react';
import energySlide from './inventory-slides'


export class Rack extends Component {
  constructor(props) {
        super(props);
        //Set Local State Here
        this.state = {
            
        }
        this.onDragStart = this.onDragStart.bind(this);
    }
  
  onDragStart(evt, index){
        let element = JSON.stringify(index);
        evt.dataTransfer.setData("text/html",element);
        //console.log(evt.dataTransfer.getData("text/html"))
    }
    
  render() {
    return (
        <div 
          draggable 
          className=" rack draggable inventory-slide" 
          id={this.props.children.props.id} 
          onDragStart={(evt)=>this.onDragStart(evt, {
              "name": this.props.children.props.className,
              "title": this.props.children.props.title,
              "category": this.props.children.props.slidetype, 
              "restricted": this.props.children.props.restricted,
              "weight": this.props.children.props.weight,
              "slots": this.props.children.props.slots,
              "ammo": this.props.children.props.ammo,
              "origin": "rack"
          })}
          >
              {this.props.children}
        </div>
    );
    
  }
}

export default Rack;