import React, {Component} from 'react';

class MechSelect extends Component {
    constructor(props) {
        super(props);
        //Set local state here from props
        
    }
    
    componentDidUpdate() {
        const {shouldReset} = this.props;
        if(shouldReset){
            document.getElementById("mechSelect").selectedIndex = "0";
        } else {
            return false
        }
    }
    
    render() {
        //console.log("Render Mech Frame Select")
        const {currentMechList, updateMechFrame} = this.props;

        return (
            <div id="mechSelectWrapper">
                <select id="mechSelect" onChange={(evt) => updateMechFrame(evt.target.value)}>
                    {
                       Object.keys(currentMechList).map((mech, index) =>
                            (
                                <option key={index} value={currentMechList[mech].variant}>{currentMechList[mech].name} / {currentMechList[mech].variant}</option>
                            )                       
                       ) 
                    }
                </select>
            </div>
       )
    
    }
    
}

export default MechSelect;