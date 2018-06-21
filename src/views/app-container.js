import React, {Component} from 'react';
import MechSelect from '../components/mech-select-component.js';
import MechClassSelect from '../components/mech-class-select-component.js';
import MechWireframe from './mech-wireframe.js';
import MechArmory from '../components/mech-armory-component.js';
import { fetchMechList, fetchMechData } from '../async/mech-data.async.js';

class AppContainer extends Component {
    constructor(props) {
        super(props);
        //Set Flex App State Here
        this.state = {
            currentWeightClass: "Light",
            currentMechFrame: "COM-1B",
            currentMechList: fetchMechList("Light"),
            currentMechData: {},
            renderAction: false,
            resetSelect: true
        }
        //Set AJAX here
        //fetchMechList(this.state.currentWeightClass);
        //define functions here
        this.updateWeightClass = this.updateWeightClass.bind(this);
        this.updateMechFrame = this.updateMechFrame.bind(this);
        
    }
    
    componentDidMount() {
        //console.log("Container Render Did Mount - Firing Async for Mech Data")
        let self = this
        fetchMechData("COM-1B")
        .then(function(data){
            self.setState({
                currentMechData: data
            });
        });
    }
    
    componentDidUpdate() {
        //console.log("update lifecycle - container")
    }
    
    updateWeightClass(currentWeight, newWeight) {
        //console.log("New Weight Class Is: " + newWeight)
        if (currentWeight !== newWeight){
            let newMechList = fetchMechList(newWeight);
            this.setState({
                currentWeightClass: newWeight,
                currentMechList: newMechList,
                resetSelect: true
            }, function(){
                this.updateMechFrame(this.state.currentMechList[0].variant)
            })
            
            return true;
        } else {
            return false;
        }
    }
    
    updateMechFrame(newFrame){
        //console.log("Selected Mech Frame is: " + newFrame)
        if(this.state.currentMechFrame !== newFrame){
            let self = this
            fetchMechData(newFrame)
                .then(function(data){
                    self.setState({
                        currentMechFrame: newFrame,
                        currentMechData: data,
                        resetSelect: false
                    }, function(){
                        //console.log("Mech Upaded")
                        //console.log(this.state.currentMechData)
                    });
            });
            return true;
        } else {
            return false;
        }
    }
    
    render() {
       //const {isLoaded} = this.props.loadState;
       const {currentWeightClass, currentMechFrame, currentMechList, currentMechData} = this.state;
    
       return (
            <div id="mainContainer">
                <div id="leftFrame">
                    <p>WELCOME TO MECH BAY</p>
                    <MechClassSelect updateMechFrame={this.updateMechFrame} updateWeightClass={this.updateWeightClass} currentWeightClass={currentWeightClass}/>
                    <MechSelect updateMechFrame={this.updateMechFrame} currentWeightClass={currentWeightClass} currentMechList={currentMechList} shouldReset={this.state.resetSelect}/>
                    <MechArmory maxTons={currentMechData.maxTons} />
                </div>
                <div id="rightFrame">
                    { currentMechData.variant &&
                    <MechWireframe currentWeightClass={currentWeightClass} currentMechFrame={currentMechFrame} currentMechData={currentMechData}/>}
                </div>
            </div>
       )
    
    }
}

export default AppContainer;

