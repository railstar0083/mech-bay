import React, {Component} from 'react';

class MechClassSelect extends Component {
    constructor(props) {
        super(props);
        //Set local state here from props
        
    }
    
    componentDidMount(props) {
        
    }
    
    render() {
       //console.log("Render Weight Class Select")
       const {updateWeightClass, currentWeightClass} = this.props
       return (
            <div id="mechClassSelect">
                <select defaultValue="Light" onChange={(evt) => updateWeightClass(currentWeightClass, evt.target.value)}>
                    <option value="Light">Light</option>
                    <option value="Medium">Medium</option>
                    <option value="Heavy">Heavy</option>
                    <option value="Assault">Assault</option>
                </select>
            </div>
       )
    
    }
    
}

export default MechClassSelect;