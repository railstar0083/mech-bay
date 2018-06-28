import React, {Component} from 'react';
import EquipmentSlots from '../components/paper-doll-box.js';
import Trashcan from '../components/trashcan.js';
import {energy} from '../json/armory.json';
import {ballistic} from '../json/armory.json';
import {missile} from '../json/armory.json';
import {support} from '../json/armory.json';
import {heatsinks} from '../json/armory.json';
import {jumpjets} from '../json/armory.json';
import {misc} from '../json/armory.json';
import {initializeHardpoints} from '../json/initialize.js'


const inventoryLocation = (index) => {
    switch(index){
        case 0:
            return "head"
        case 1:
            return "centerTorso"
        case 2:
            return "rightTorso"
        case 3:
            return "leftTorso"
        case 4:
            return "rightArm"
        case 5:
            return "leftArm"
        case 6:
            return "rightLeg"
        case 7:
            return "leftLeg"
        default:
            return false
    }
}

class MechWireframe extends Component {
    constructor(props) {
        super(props);
        //Set Local State Here
        this.state = {
            currentName: props.currentMechData.name,
            currentVariant: props.currentMechData.variant,
            currentTons: props.currentMechData.currentTons,
            currentHeadArmor: props.currentMechData.armor.head,
            currentCenterTorsoArmor: props.currentMechData.armor.centerTorso,
            currentCenterTorsoRearArmor: props.currentMechData.armor.centerTorsoRear,
            currentLeftTorsoArmor: props.currentMechData.armor.leftTorso,
            currentLeftTorsoRearArmor: props.currentMechData.armor.leftTorsoRear,
            currentRightTorsoArmor: props.currentMechData.armor.rightTorso,
            currentRightTorsoRearArmor: props.currentMechData.armor.rightTorsoRear,
            currentLeftArmArmor: props.currentMechData.armor.leftArm,
            currentRightArmArmor: props.currentMechData.armor.rightArm,
            currentLeftLegArmor: props.currentMechData.armor.leftLeg,
            currentRightLegArmor: props.currentMechData.armor.rightLeg,
            currentHardpoints: initializeHardpoints,
            currentAlphaStrike: 0,
            transferActive: false,
            validDrop: false,
            defaultLoadout: []
        }
        this.updateArmorTotal = this.updateArmorTotal.bind(this);
        this.updateHardpoints = this.updateHardpoints.bind(this);
        this.calculateTonnage = this.calculateTonnage.bind(this);
        this.calculateAlphaStrike = this.calculateAlphaStrike.bind(this);
        this.createDefaultLoadout= this.createDefaultLoadout.bind(this);
        this.validDropToggle = this.validDropToggle.bind(this);
    }
    
    componentDidMount() {
       this.createDefaultLoadout();
    }
    
    componentDidUpdate() {
        //If props is out of sync with state, make it right.
        if (this.props.currentMechData.variant !== this.state.currentVariant){
            this.setState({
                currentName: this.props.currentMechData.name,
                currentVariant: this.props.currentMechData.variant,
                currentTons: this.props.currentMechData.currentTons,
                currentHeadArmor: this.props.currentMechData.armor.head,
                currentCenterTorsoArmor: this.props.currentMechData.armor.centerTorso,
                currentCenterTorsoRearArmor: this.props.currentMechData.armor.centerTorsoRear,
                currentLeftTorsoArmor: this.props.currentMechData.armor.leftTorso,
                currentLeftTorsoRearArmor: this.props.currentMechData.armor.leftTorsoRear,
                currentRightTorsoArmor: this.props.currentMechData.armor.rightTorso,
                currentRightTorsoRearArmor: this.props.currentMechData.armor.rightTorsoRear,
                currentLeftArmArmor: this.props.currentMechData.armor.leftArm,
                currentRightArmArmor: this.props.currentMechData.armor.rightArm,
                currentLeftLegArmor: this.props.currentMechData.armor.leftLeg,
                currentRightLegArmor: this.props.currentMechData.armor.rightLeg,
                currentHardpoints: initializeHardpoints,
                //currentAlphaStrike: 0,
                transferActive: false,
                validDrop: false,
                defaultLoadout: []
            }, function(){
                this.createDefaultLoadout();
            })
        }
    }
    
    createDefaultLoadout(){
       const { maxTons } = this.props.currentMechData;
       //create default equipment profile
       //0=head,1=CT,2=RT,3=LT,4=RA,5=LA,6=RL,7=LL
       let defaultLoadout = [[],[],[],[],[],[],[],[]];
       let i;
       let hs;
       //cycle through the child arrays
       for(i=0; i < defaultLoadout.length; i++){
           //add heatsinks by inventoryLocation
           let heatsink = {
               "ammo": "false",
                "category": "equipment",
                "name": "heaSink0",
                "origin": "default",
                "slots": 1,
                "title": "Heat Sink",
                "weight": 1
           }
           let numOfHeatsinks = this.props.currentMechData.defaultHeatsinks[inventoryLocation(i)];
           if (numOfHeatsinks > 0){
               for(hs=numOfHeatsinks; hs > 0; hs--){
                   defaultLoadout[i].push(heatsink)
               }
           }
           //add jumpjets by inventoryLocation
           let smallJumpjet = {
               "ammo": "false",
                "category": "equipment",
                "name": "jumpJet-S",
                "origin": "default",
                "slots": 1,
                "title": "Jump Jet(S)",
                "weight": 0.5
           }
           let heavyJumpjet = {
               "ammo": "false",
                "category": "equipment",
                "name": "jumpJet-H",
                "origin": "default",
                "slots": 1,
                "title": "Jump Jet(H)",
                "weight": 1
           }
           let assaultJumpjet = {
               "ammo": "false",
                "category": "equipment",
                "name": "jumpJet-A",
                "origin": "default",
                "slots": 1,
                "title": "Jump Jet(A)",
                "weight": 2
           }
           let numOfJumpJets = this.props.currentMechData.defaultJumpJets[inventoryLocation(i)];
           if (numOfJumpJets > 0){
               for(hs=numOfJumpJets; hs > 0; hs--){
                   if (maxTons < 60){
                       defaultLoadout[i].push(smallJumpjet)
                   } else if (maxTons > 55 && maxTons < 90) {
                       defaultLoadout[i].push(heavyJumpjet)
                   } else if (maxTons > 85){
                       defaultLoadout[i].push(assaultJumpjet)
                   }
               }
           }
           //add equipment by inventoryLocation
           let equipment = this.props.currentMechData.defaultEquipment[inventoryLocation(i)];
           if (equipment !== undefined){
               for(hs=0; hs < equipment.length; hs++){
                   defaultLoadout[i].push(equipment[hs])
               }
           }
           //add weapons by inventoryLocation
           let weapons = this.props.currentMechData.defaultWeapons[inventoryLocation(i)];
           if (weapons !== undefined){
               for(hs=0; hs < weapons.length; hs++){
                   defaultLoadout[i].push(weapons[hs])
               }
           }
       }//end for
       this.setState({
           defaultLoadout: defaultLoadout
       }, function(){
           //console.log("Current Default Loadout")
           //console.log(this.state.defaultLoadout)
       })
    }
    
    validDropToggle(evt, action){
        //Toggle state that tells wether a location is a valid drop point (Inventory or Trashcan)
        if(action === "enter"){
            this.setState({ validDrop: true })
            return true;
        } else if (action === "exit"){
            this.setState({ validDrop: false })
            return true;
        }
    }
    
    calculateTonnage(operation, weight){
        const {currentTons} = this.state;
        if(operation === "add"){
            this.setState({
                currentTons: currentTons + weight
            })
            return true;
        } else if (operation === "subtract"){
            this.setState({
                currentTons: currentTons - weight
            })
            return true;
        } else {
            return false;
        }
    }
    
    updateArmorTotal(evt, currentValue, armorLocation, operation){
        console.log(armorLocation)
        if (operation === "increment"){
            currentValue = ++currentValue;
            console.log(currentValue)
            let newState = {[armorLocation]:currentValue};
            this.setState(
                newState
            )
            this.calculateTonnage("add", 0.0625);
            return true
        } else if (operation === "decrement") {
            currentValue = --currentValue;
            let newState = {[armorLocation]:currentValue};
            this.setState(
                newState
            )
            this.calculateTonnage("subtract", 0.0625);
            return true
        } else {
            return false
        }
    }
    
    updateHardpoints(categoryAdded, location, operation){
        const {currentHardpoints} = this.state;
        let updatedHardpoints = currentHardpoints;
        if(categoryAdded !== "equipment"){
            //updating hardpoints
            let current = 0;
            current = currentHardpoints[location][categoryAdded];
            if (operation === "add"){
                current = current + 1;
            } else if (operation === "subtract"){
                current = current - 1;
            } else if (operation === "reset"){
                current = 0;
            }
            if (current >= 0){
                updatedHardpoints[location][categoryAdded] = current;
                this.setState({
                    currentHardpoints: updatedHardpoints
                })
            }
        }
    }
    
    calculateAlphaStrike(damage) {
        console.log(damage)
        const {currentAlphaStrike} = this.state;
        //totalDamage = totalDamage + damage;
        this.setState({
            currentAlphaStrike: currentAlphaStrike + damage
        }, function(){
            console.log(this.state.currentAlphaStrike)
        })
    }
    
    render() {
        //console.log("Rendering Paperdoll with this state:")
        //console.log(this.state)
        const {currentWeightClass, currentMechFrame, currentMechData} = this.props;
        const {hardPoints} = this.props.currentMechData;
        const {headMax, 
               centerTorsoMax, 
               centerTorsoRearMax, 
               rightTorsoMax, 
               rightTorsoRearMax, 
               leftTorsoMax, 
               leftTorsoRearMax, 
               rightArmMax, 
               leftArmMax, 
               rightLegMax, 
               leftLegMax} = this.props.currentMechData.armor;
        const {currentTons,
               currentHeadArmor,
               currentCenterTorsoArmor,
               currentCenterTorsoRearArmor,
               currentLeftTorsoArmor,
               currentLeftTorsoRearArmor,
               currentRightTorsoArmor,
               currentRightTorsoRearArmor,
               currentLeftArmArmor,
               currentRightArmArmor,
               currentLeftLegArmor,
               currentRightLegArmor,
               currentName,
               currentVariant,
               currentHardpoints,
               transferActive,
               validDrop,
               defaultLoadout} = this.state;
        const redText = {
            color: "red"
        }
        
        return (
            <div id="mechWireframeWrapper">
                {currentMechData === null ?
                    <div>Loading...</div>
                :   
                    
                    <div id="mechWireframeInnerWrapper">
                    { currentVariant === currentMechData.variant &&
                      <div>
                        <h1 className="mech-name-display">{currentName}</h1>
                        <h3 className="variant-display">{currentMechFrame} - {currentWeightClass} 'Mech</h3>
                        { currentTons > currentMechData.maxTons &&
                        <span className="status-icon"><img src="img/heavywarning.png" alt="Battlemech Is Too Heavy" /></span>}
                        { currentTons < currentMechData.maxTons &&
                        <span className="status-icon"><img src="img/lightwarning.png" alt="Battlemech Is Too Light" /></span>}
                        <p className="tonnage-display" style={currentTons > currentMechData.maxTons ? redText : null}>Tonnage: {currentTons}/{currentMechData.maxTons}</p>
                        <div className="paper-doll">
                            <Trashcan  isDropValid={validDrop} validDropToggle={this.validDropToggle} />
                            <div id="headBox" className="component-box">
                                <p className="component-name">Head</p>
                                <div className="front-armor-counter">
                                    <span>Armor:&nbsp;</span><span id="headArmorCurrent">{currentHeadArmor}</span><span> / </span><span>{headMax}</span>
                                    <div className="counter-buttons">
                                        <button className="button-increment" disabled={currentHeadArmor === headMax ? true : false } onClick={(evt)=> this.updateArmorTotal(evt, currentHeadArmor, "currentHeadArmor", "increment")}><img src="img/increment.png" alt="counter increment"/></button>
                                        <button className="button-decrement" disabled={currentHeadArmor === 0 ? true : false } onClick={(evt)=> this.updateArmorTotal(evt, currentHeadArmor, "currentHeadArmor", "decrement")}><img src="img/decrement.png" alt="counter decrement"/></button>
                                    </div>
                                </div>
                                <div className="hardpoints-wrapper">
                                    { hardPoints.head.energy !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointEnergyOn.png" alt="Energy Hardpoint Icon" /><span>{currentHardpoints.head.energy}/{hardPoints.head.energy}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointEnergyOff.png" alt="Energy Hardpoint Icon" /><span>0</span></span> }
                                    { hardPoints.head.ballistic !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointBallisticOn.png" alt="Ballistic Hardpoint Icon" /><span>{currentHardpoints.head.ballistic}/{hardPoints.head.ballistic}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointBallisticOff.png" alt="Ballistic Hardpoint Icon" /><span>0</span></span> }
                                    { hardPoints.head.missile !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointMissileOn.png" alt="Missile Hardpoint Icon" /><span>{currentHardpoints.head.missile}/{hardPoints.head.missile}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointMissileOff.png" alt="Missile Hardpoint Icon" /><span>0</span></span> }
                                    { hardPoints.head.support !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointSupportOn.png" alt="Support Hardpoint Icon" /><span>{currentHardpoints.head.support}/{hardPoints.head.support}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointSupportOff.png" alt="Support Hardpoint Icon" /><span>0</span></span> }
                                </div>
                                <EquipmentSlots slotType="head" 
                                                maxSlots="1" 
                                                hardpointTypes={[hardPoints.head.energy, 
                                                                 hardPoints.head.ballistic, 
                                                                 hardPoints.head.missile, 
                                                                 hardPoints.head.support]} 
                                                currentHardpoints={currentHardpoints} 
                                                updateHardpoints={this.updateHardpoints} 
                                                calculateTonnage={this.calculateTonnage} 
                                                isDropValid={validDrop}
                                                validDropToggle={this.validDropToggle}
                                                calculateAlphaStrike={this.calculateAlphaStrike}
                                                defaultLoadout={defaultLoadout[0]}
                                                mechName={this.props.currentMechData.variant}
                                />
                            </div>
                            <div id="centerTorsoBox" className="component-box">
                                <p className="component-name">Center Torso</p>
                                <div className="front-armor-counter">
                                    <span>Armor:&nbsp;</span><span id="centerTorsoArmorCurrent">{currentCenterTorsoArmor}</span><span> / </span><span>{centerTorsoMax}</span>
                                    <div className="counter-buttons">
                                        <button className="button-increment" disabled={currentCenterTorsoArmor === centerTorsoMax ? true : false } onClick={(evt)=> this.updateArmorTotal(evt, currentCenterTorsoArmor, "currentCenterTorsoArmor", "increment")}><img src="img/increment.png" alt="counter increment"/></button>
                                        <button className="button-decrement" disabled={currentCenterTorsoArmor === 0 ? true : false } onClick={(evt)=> this.updateArmorTotal(evt, currentCenterTorsoArmor, "currentCenterTorsoArmor", "decrement")}><img src="img/decrement.png" alt="counter decrement"/></button>
                                    </div>
                                </div>
                                <div className="rear-armor-counter">
                                    <span>Rear Armor:&nbsp;</span><span id="centerTorsoRearArmorCurrent">{currentCenterTorsoRearArmor}</span><span> / </span><span>{centerTorsoRearMax}</span>
                                    <div className="counter-buttons">
                                        <button className="button-increment" disabled={currentCenterTorsoRearArmor === centerTorsoRearMax ? true : false } onClick={(evt)=> this.updateArmorTotal(evt, currentCenterTorsoRearArmor, "currentCenterTorsoRearArmor", "increment")}><img src="img/increment.png" alt="counter increment"/></button>
                                        <button className="button-decrement" disabled={currentCenterTorsoRearArmor === 0 ? true : false } onClick={(evt)=> this.updateArmorTotal(evt, currentCenterTorsoRearArmor, "currentCenterTorsoRearArmor", "decrement")}><img src="img/decrement.png" alt="counter decrement"/></button>
                                    </div>
                                </div>
                                <div className="hardpoints-wrapper">
                                    { hardPoints.centerTorso.energy !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointEnergyOn.png" alt="Energy Hardpoint Icon" /><span>{currentHardpoints.centerTorso.energy}/{hardPoints.centerTorso.energy}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointEnergyOff.png" alt="Energy Hardpoint Icon" /><span>0</span></span> }
                                    { hardPoints.centerTorso.ballistic !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointBallisticOn.png" alt="Ballistic Hardpoint Icon" /><span>{currentHardpoints.centerTorso.ballistic}/{hardPoints.centerTorso.ballistic}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointBallisticOff.png" alt="Ballistic Hardpoint Icon" /><span>0</span></span> }
                                    { hardPoints.centerTorso.missile !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointMissileOn.png" alt="Missile Hardpoint Icon" /><span>{currentHardpoints.centerTorso.missile}/{hardPoints.centerTorso.missile}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointMissileOff.png" alt="Missile Hardpoint Icon" /><span>0</span></span> }
                                    { hardPoints.centerTorso.support !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointSupportOn.png" alt="Support Hardpoint Icon" /><span>{currentHardpoints.centerTorso.support}/{hardPoints.centerTorso.support}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointSupportOff.png" alt="Support Hardpoint Icon" /><span>0</span></span> }
                                </div>
                                <EquipmentSlots slotType="centerTorso" 
                                                maxSlots="4" 
                                                hardpointTypes={[hardPoints.centerTorso.energy, 
                                                                 hardPoints.centerTorso.ballistic, 
                                                                 hardPoints.centerTorso.missile, 
                                                                 hardPoints.centerTorso.support]} 
                                                currentHardpoints={currentHardpoints} 
                                                updateHardpoints={this.updateHardpoints} 
                                                calculateTonnage={this.calculateTonnage}
                                                isDropValid={validDrop}
                                                validDropToggle={this.validDropToggle}
                                                calculateAlphaStrike={this.calculateAlphaStrike}
                                                defaultLoadout={this.state.defaultLoadout[1]}
                                                mechName={this.props.currentMechData.variant}
                                />
                            </div>
                            <div id="rightTorsoBox" className="component-box">
                                <p className="component-name">Right Torso</p>
                                <div className="front-armor-counter">
                                    <span>Armor:&nbsp;</span><span id="rightTorsoArmorCurrent">{currentRightTorsoArmor}</span><span> / </span><span>{rightTorsoMax}</span>
                                    <div className="counter-buttons">
                                        <button className="button-increment" disabled={currentRightTorsoArmor === rightTorsoMax ? true : false } onClick={(evt)=> this.updateArmorTotal(evt, currentRightTorsoArmor, "currentRightTorsoArmor", "increment")}><img src="img/increment.png" alt="counter increment"/></button>
                                        <button className="button-decrement" disabled={currentRightTorsoArmor === 0 ? true : false } onClick={(evt)=> this.updateArmorTotal(evt, currentRightTorsoArmor, "currentRightTorsoArmor", "decrement")}><img src="img/decrement.png" alt="counter decrement"/></button>
                                    </div>
                                </div>
                                <div className="rear-armor-counter">
                                    <span>Rear Armor:&nbsp;</span><span id="rightTorsoRearArmorCurrent">{currentRightTorsoRearArmor}</span><span> / </span><span>{rightTorsoRearMax}</span>
                                    <div className="counter-buttons">
                                        <button className="button-increment" disabled={currentRightTorsoRearArmor === rightTorsoRearMax ? true : false } onClick={(evt)=> this.updateArmorTotal(evt, currentRightTorsoRearArmor, "currentRightTorsoRearArmor", "increment")}><img src="img/increment.png" alt="counter increment"/></button>
                                        <button className="button-decrement" disabled={currentRightTorsoRearArmor === 0 ? true : false } onClick={(evt)=> this.updateArmorTotal(evt, currentRightTorsoRearArmor, "currentRightTorsoRearArmor", "decrement")}><img src="img/decrement.png" alt="counter decrement"/></button>
                                    </div>
                                </div>
                                <div className="hardpoints-wrapper">
                                    { hardPoints.rightTorso.energy !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointEnergyOn.png" alt="Energy Hardpoint Icon" /><span>{currentHardpoints.rightTorso.energy}/{hardPoints.rightTorso.energy}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointEnergyOff.png" alt="Energy Hardpoint Icon" /><span>0</span></span> }
                                    { hardPoints.rightTorso.ballistic !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointBallisticOn.png" alt="Ballistic Hardpoint Icon" /><span>{currentHardpoints.rightTorso.ballistic}/{hardPoints.rightTorso.ballistic}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointBallisticOff.png" alt="Ballistic Hardpoint Icon" /><span>0</span></span> }
                                    { hardPoints.rightTorso.missile !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointMissileOn.png" alt="Missile Hardpoint Icon" /><span>{currentHardpoints.rightTorso.missile}/{hardPoints.rightTorso.missile}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointMissileOff.png" alt="Missile Hardpoint Icon" /><span>0</span></span> }
                                    { hardPoints.rightTorso.support !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointSupportOn.png" alt="Support Hardpoint Icon" /><span>{currentHardpoints.rightTorso.support}/{hardPoints.rightTorso.support}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointSupportOff.png" alt="Support Hardpoint Icon" /><span>0</span></span> }
                                </div>
                                <EquipmentSlots slotType="rightTorso" 
                                                maxSlots="10" 
                                                hardpointTypes={[hardPoints.rightTorso.energy, 
                                                                 hardPoints.rightTorso.ballistic, 
                                                                 hardPoints.rightTorso.missile, 
                                                                 hardPoints.rightTorso.support]} 
                                                currentHardpoints={currentHardpoints} 
                                                updateHardpoints={this.updateHardpoints} 
                                                calculateTonnage={this.calculateTonnage}
                                                isDropValid={validDrop}
                                                validDropToggle={this.validDropToggle}
                                                calculateAlphaStrike={this.calculateAlphaStrike}
                                                defaultLoadout={this.state.defaultLoadout[2]}
                                                mechName={this.props.currentMechData.variant}
                                />
                            </div>
                            <div id="leftTorsoBox" className="component-box">
                                <p className="component-name">Left Torso</p>
                                <div className="front-armor-counter">
                                    <span>Armor:&nbsp;</span><span id="leftTorsoArmorCurrent">{currentLeftTorsoArmor}</span><span> / </span><span>{leftTorsoMax}</span>
                                    <div className="counter-buttons">
                                        <button className="button-increment" disabled={currentLeftTorsoArmor === leftTorsoMax ? true : false } onClick={(evt)=> this.updateArmorTotal(evt, currentLeftTorsoArmor, "currentLeftTorsoArmor", "increment")}><img src="img/increment.png" alt="counter increment"/></button>
                                        <button className="button-decrement" disabled={currentLeftTorsoArmor === 0 ? true : false } onClick={(evt)=> this.updateArmorTotal(evt, currentLeftTorsoArmor, "currentLeftTorsoArmor", "decrement")}><img src="img/decrement.png" alt="counter decrement"/></button>
                                    </div>
                                </div>
                                <div className="rear-armor-counter">
                                    <span>Rear Armor:&nbsp;</span><span id="leftTorsoRearArmorCurrent">{currentLeftTorsoRearArmor}</span><span> / </span><span>{leftTorsoRearMax}</span>
                                    <div className="counter-buttons">
                                        <button className="button-increment" disabled={currentLeftTorsoRearArmor === leftTorsoRearMax ? true : false } onClick={(evt)=> this.updateArmorTotal(evt, currentLeftTorsoRearArmor, "currentLeftTorsoRearArmor", "increment")}><img src="img/increment.png" alt="counter increment"/></button>
                                        <button className="button-decrement" disabled={currentLeftTorsoRearArmor === 0 ? true : false } onClick={(evt)=> this.updateArmorTotal(evt, currentLeftTorsoRearArmor, "currentLeftTorsoRearArmor", "decrement")}><img src="img/decrement.png" alt="counter decrement"/></button>
                                    </div>
                                </div>
                                <div className="hardpoints-wrapper">
                                    { hardPoints.leftTorso.energy !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointEnergyOn.png" alt="Energy Hardpoint Icon" /><span>{currentHardpoints.leftTorso.energy}/{hardPoints.leftTorso.energy}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointEnergyOff.png" alt="Energy Hardpoint Icon" /><span>0</span></span> }
                                    { hardPoints.leftTorso.ballistic !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointBallisticOn.png" alt="Ballistic Hardpoint Icon" /><span>{currentHardpoints.leftTorso.ballistic}/{hardPoints.leftTorso.ballistic}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointBallisticOff.png" alt="Ballistic Hardpoint Icon" /><span>0</span></span> }
                                    { hardPoints.leftTorso.missile !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointMissileOn.png" alt="Missile Hardpoint Icon" /><span>{currentHardpoints.leftTorso.missile}/{hardPoints.leftTorso.missile}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointMissileOff.png" alt="Missile Hardpoint Icon" /><span>0</span></span> }
                                    { hardPoints.leftTorso.support !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointSupportOn.png" alt="Support Hardpoint Icon" /><span>{currentHardpoints.leftTorso.support}/{hardPoints.leftTorso.support}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointSupportOff.png" alt="Support Hardpoint Icon" /><span>0</span></span> }
                                </div>
                                <EquipmentSlots slotType="leftTorso" 
                                                maxSlots="10" 
                                                hardpointTypes={[hardPoints.leftTorso.energy, 
                                                                 hardPoints.leftTorso.ballistic, 
                                                                 hardPoints.leftTorso.missile, 
                                                                 hardPoints.leftTorso.support]} 
                                                currentHardpoints={currentHardpoints} 
                                                updateHardpoints={this.updateHardpoints} 
                                                calculateTonnage={this.calculateTonnage}
                                                isDropValid={validDrop}
                                                validDropToggle={this.validDropToggle}
                                                calculateAlphaStrike={this.calculateAlphaStrike}
                                                defaultLoadout={this.state.defaultLoadout[3]}
                                                mechName={this.props.currentMechData.variant}
                                />
                            </div>
                            <div id="leftArmBox" className="component-box">
                                <p className="component-name">Left Arm</p>
                                <div className="front-armor-counter">
                                    <span>Armor:&nbsp;</span><span id="leftArmArmorCurrent">{currentLeftArmArmor}</span><span> / </span><span>{leftArmMax}</span>
                                    <div className="counter-buttons">
                                        <button className="button-increment" disabled={currentLeftArmArmor === leftArmMax ? true : false } onClick={(evt)=> this.updateArmorTotal(evt, currentLeftArmArmor, "currentLeftArmArmor", "increment")}><img src="img/increment.png" alt="counter increment"/></button>
                                        <button className="button-decrement" disabled={currentLeftArmArmor === 0 ? true : false } onClick={(evt)=> this.updateArmorTotal(evt, currentLeftArmArmor, "currentLeftArmArmor", "decrement")}><img src="img/decrement.png" alt="counter decrement"/></button>
                                    </div>
                                </div>
                                <div className="hardpoints-wrapper">
                                    { hardPoints.leftArm.energy !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointEnergyOn.png" alt="Energy Hardpoint Icon" /><span>{currentHardpoints.leftArm.energy}/{hardPoints.leftArm.energy}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointEnergyOff.png" alt="Energy Hardpoint Icon" /><span>0</span></span> }
                                    { hardPoints.leftArm.ballistic !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointBallisticOn.png" alt="Ballistic Hardpoint Icon" /><span>{currentHardpoints.leftArm.ballistic}/{hardPoints.leftArm.ballistic}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointBallisticOff.png" alt="Ballistic Hardpoint Icon" /><span>0</span></span> }
                                    { hardPoints.leftArm.missile !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointMissileOn.png" alt="Missile Hardpoint Icon" /><span>{currentHardpoints.leftArm.missile}/{hardPoints.leftArm.missile}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointMissileOff.png" alt="Missile Hardpoint Icon" /><span>0</span></span> }
                                    { hardPoints.leftArm.support !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointSupportOn.png" alt="Support Hardpoint Icon" /><span>{currentHardpoints.leftArm.support}/{hardPoints.leftArm.support}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointSupportOff.png" alt="Support Hardpoint Icon" /><span>0</span></span> }
                                </div>
                                <EquipmentSlots slotType="leftArm" 
                                                maxSlots="8" 
                                                hardpointTypes={[hardPoints.leftArm.energy, 
                                                                 hardPoints.leftArm.ballistic, 
                                                                 hardPoints.leftArm.missile, 
                                                                 hardPoints.leftArm.support]} 
                                                currentHardpoints={currentHardpoints} 
                                                updateHardpoints={this.updateHardpoints} 
                                                calculateTonnage={this.calculateTonnage}
                                                isDropValid={validDrop}
                                                validDropToggle={this.validDropToggle}
                                                calculateAlphaStrike={this.calculateAlphaStrike}
                                                defaultLoadout={this.state.defaultLoadout[5]}
                                                mechName={this.props.currentMechData.variant}
                                />
                            </div>
                            <div id="rightArmBox" className="component-box">
                                <p className="component-name">Right Arm</p>
                                <div className="front-armor-counter">
                                    <span>Armor:&nbsp;</span><span id="rightArmArmorCurrent">{currentRightArmArmor}</span><span> / </span><span>{rightArmMax}</span>
                                    <div className="counter-buttons">
                                        <button className="button-increment" disabled={currentRightArmArmor === rightArmMax ? true : false } onClick={(evt)=> this.updateArmorTotal(evt, currentRightArmArmor, "currentRightArmArmor", "increment")}><img src="img/increment.png" alt="counter increment"/></button>
                                        <button className="button-decrement" disabled={currentRightArmArmor === 0 ? true : false } onClick={(evt)=> this.updateArmorTotal(evt, currentRightArmArmor, "currentRightArmArmor", "decrement")}><img src="img/decrement.png" alt="counter decrement"/></button>
                                    </div>
                                </div>
                                <div className="hardpoints-wrapper">
                                    { hardPoints.rightArm.energy !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointEnergyOn.png" alt="Energy Hardpoint Icon" /><span>{currentHardpoints.rightArm.energy}/{hardPoints.rightArm.energy}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointEnergyOff.png" alt="Energy Hardpoint Icon" /><span>0</span></span> }
                                    { hardPoints.rightArm.ballistic !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointBallisticOn.png" alt="Ballistic Hardpoint Icon" /><span>{currentHardpoints.rightArm.ballistic}/{hardPoints.rightArm.ballistic}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointBallisticOff.png" alt="Ballistic Hardpoint Icon" /><span>0</span></span> }
                                    { hardPoints.rightArm.missile !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointMissileOn.png" alt="Missile Hardpoint Icon" /><span>{currentHardpoints.rightArm.missile}/{hardPoints.rightArm.missile}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointMissileOff.png" alt="Missile Hardpoint Icon" /><span>0</span></span> }
                                    { hardPoints.rightArm.support !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointSupportOn.png" alt="Support Hardpoint Icon" /><span>{currentHardpoints.rightArm.support}/{hardPoints.rightArm.support}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointSupportOff.png" alt="Support Hardpoint Icon" /><span>0</span></span> }
                                </div>
                                <EquipmentSlots slotType="rightArm" 
                                                maxSlots="8" 
                                                hardpointTypes={[hardPoints.rightArm.energy, 
                                                                 hardPoints.rightArm.ballistic, 
                                                                 hardPoints.rightArm.missile, 
                                                                 hardPoints.rightArm.support]} 
                                                currentHardpoints={currentHardpoints} 
                                                updateHardpoints={this.updateHardpoints} 
                                                calculateTonnage={this.calculateTonnage}
                                                isDropValid={validDrop}
                                                validDropToggle={this.validDropToggle}
                                                calculateAlphaStrike={this.calculateAlphaStrike}
                                                defaultLoadout={this.state.defaultLoadout[4]}
                                                mechName={this.props.currentMechData.variant}
                                />
                            </div>
                            <div id="leftLegBox" className="component-box">
                                <p className="component-name">Left Leg</p>
                                <div className="front-armor-counter">
                                    <span>Armor:&nbsp;</span><span id="leftLegArmorCurrent">{currentLeftLegArmor}</span><span> / </span><span>{leftLegMax}</span>
                                    <div className="counter-buttons">
                                        <button className="button-increment" disabled={currentLeftLegArmor === leftLegMax ? true : false } onClick={(evt)=> this.updateArmorTotal(evt, currentLeftLegArmor, "currentLeftLegArmor", "increment")}><img src="img/increment.png" alt="counter increment"/></button>
                                        <button className="button-decrement" disabled={currentLeftLegArmor === 0 ? true : false } onClick={(evt)=> this.updateArmorTotal(evt, currentLeftLegArmor, "currentLeftLegArmor", "decrement")}><img src="img/decrement.png" alt="counter decrement"/></button>
                                    </div>
                                </div>
                                <div className="hardpoints-wrapper">
                                    { hardPoints.leftLeg.energy !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointEnergyOn.png" alt="Energy Hardpoint Icon" /><span>{currentHardpoints.leftLeg.energy}/{hardPoints.leftLeg.energy}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointEnergyOff.png" alt="Energy Hardpoint Icon" /><span>0</span></span> }
                                    { hardPoints.leftLeg.ballistic !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointBallisticOn.png" alt="Ballistic Hardpoint Icon" /><span>{currentHardpoints.leftLeg.ballistic}/{hardPoints.leftLeg.ballistic}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointBallisticOff.png" alt="Ballistic Hardpoint Icon" /><span>0</span></span> }
                                    { hardPoints.leftLeg.missile !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointMissileOn.png" alt="Missile Hardpoint Icon" /><span>{currentHardpoints.leftLeg.missile}/{hardPoints.leftLeg.missile}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointMissileOff.png" alt="Missile Hardpoint Icon" /><span>0</span></span> }
                                    { hardPoints.leftLeg.support !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointSupportOn.png" alt="Support Hardpoint Icon" /><span>{currentHardpoints.leftLeg.support}/{hardPoints.leftLeg.support}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointSupportOff.png" alt="Support Hardpoint Icon" /><span>0</span></span> }
                                </div>
                                <EquipmentSlots slotType="leftLeg" 
                                                maxSlots="4" 
                                                hardpointTypes={[hardPoints.leftLeg.energy, 
                                                                 hardPoints.leftLeg.ballistic, 
                                                                 hardPoints.leftLeg.missile, 
                                                                 hardPoints.leftLeg.support]} 
                                                currentHardpoints={currentHardpoints} 
                                                updateHardpoints={this.updateHardpoints} 
                                                calculateTonnage={this.calculateTonnage}
                                                isDropValid={validDrop}
                                                validDropToggle={this.validDropToggle}
                                                calculateAlphaStrike={this.calculateAlphaStrike}
                                                defaultLoadout={this.state.defaultLoadout[7]}
                                                mechName={this.props.currentMechData.variant}
                                />
                            </div>
                            <div id="rightLegBox" className="component-box">
                                <p className="component-name">Right Leg</p>
                                <div className="front-armor-counter">
                                    <span>Armor:&nbsp;</span><span id="rightLegArmorCurrent">{currentRightLegArmor}</span><span> / </span><span>{rightLegMax}</span>
                                    <div className="counter-buttons">
                                        <button className="button-increment" disabled={currentRightLegArmor === rightLegMax ? true : false } onClick={(evt)=> this.updateArmorTotal(evt, currentRightLegArmor, "currentRightLegArmor", "increment")}><img src="img/increment.png" alt="counter increment"/></button>
                                        <button className="button-decrement" disabled={currentRightLegArmor === 0 ? true : false } onClick={(evt)=> this.updateArmorTotal(evt, currentRightLegArmor, "currentRightLegArmor", "decrement")}><img src="img/decrement.png" alt="counter decrement"/></button>
                                    </div>
                                </div>
                                <div className="hardpoints-wrapper">
                                    { hardPoints.rightLeg.energy !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointEnergyOn.png" alt="Energy Hardpoint Icon" /><span>{currentHardpoints.rightLeg.energy}/{hardPoints.rightLeg.energy}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointEnergyOff.png" alt="Energy Hardpoint Icon" /><span>0</span></span> }
                                    { hardPoints.rightLeg.ballistic !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointBallisticOn.png" alt="Ballistic Hardpoint Icon" /><span>{currentHardpoints.rightLeg.ballistic}/{hardPoints.rightLeg.ballistic}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointBallisticOff.png" alt="Ballistic Hardpoint Icon" /><span>0</span></span> }
                                    { hardPoints.rightLeg.missile !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointMissileOn.png" alt="Missile Hardpoint Icon" /><span>{currentHardpoints.rightLeg.missile}/{hardPoints.rightLeg.missile}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointMissileOff.png" alt="Missile Hardpoint Icon" /><span>0</span></span> }
                                    { hardPoints.rightLeg.support !== 0 ? 
                                        <span className="hardpoint-counter"><img src="img/HardpointSupportOn.png" alt="Support Hardpoint Icon" /><span>{currentHardpoints.rightLeg.support}/{hardPoints.rightLeg.support}</span></span> 
                                        : <span className="hardpoint-counter hardpoint-inactive"><img src="img/HardpointSupportOff.png" alt="Support Hardpoint Icon" /><span>0</span></span> }
                                </div>
                                <EquipmentSlots slotType="rightLeg" 
                                                maxSlots="4" 
                                                hardpointTypes={[hardPoints.rightLeg.energy, 
                                                                 hardPoints.rightLeg.ballistic, 
                                                                 hardPoints.rightLeg.missile, 
                                                                 hardPoints.rightLeg.support]} 
                                                currentHardpoints={currentHardpoints} 
                                                updateHardpoints={this.updateHardpoints} 
                                                calculateTonnage={this.calculateTonnage}
                                                isDropValid={validDrop}
                                                validDropToggle={this.validDropToggle}
                                                calculateAlphaStrike={this.calculateAlphaStrike}
                                                defaultLoadout={this.state.defaultLoadout[6]}
                                                mechName={this.props.currentMechData.variant}
                                />
                            </div>
                        </div></div>}
                    </div>
                }
            </div>
        )
    
    }
}

export default MechWireframe;