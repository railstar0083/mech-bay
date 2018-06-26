import React, {Component} from 'react';
import {energy} from '../json/armory.json';
import {ballistic} from '../json/armory.json';
import {missile} from '../json/armory.json';
import {support} from '../json/armory.json';
import {heatsinks} from '../json/armory.json';
import {jumpjets} from '../json/armory.json';
import {misc} from '../json/armory.json';
import Rack from './armory-rack-draggable.js';
import {energySlide} from './inventory-slides';
import {ballisticSlide} from './inventory-slides';
import {missileSlide} from './inventory-slides';
import {supportSlide} from './inventory-slides';
import {heatsinkSlide} from './inventory-slides';
import {jumpjetSlide} from './inventory-slides';
import {modSlide} from './inventory-slides';


class MechArmory extends Component {
    constructor(props) {
        super(props);
        //Set Local State Here
        this.state = {
            energySelected: true,
            ballisticSelected: true,
            missileSelected: true,
            supportSelected: true,
            currentInventory: "weapons",
            heatsinksSelected: true,
            jumpjetsSelected: true,
            miscSelected: true,
            uncommonSelected: true,
            rareSelected: true,
            epicSelected: true,
            stockSelected: true
        }
        this.buildInventoryList = this.buildInventoryList.bind(this);
        this.handleInventorySelection = this.handleInventorySelection.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }
    
    componentDidMount() {
        this.buildInventoryList()
    }
    
    componentDidUpdate(){
        this.buildInventoryList()
    }
    
    buildInventoryList(){
        
    }
    
    handleInventorySelection(evt){
        let selection = evt.target.id;
        if (selection === "selectWeapons" ){
            this.setState({
                currentInventory: "weapons"
            })
        } else {
            this.setState({
                currentInventory: "equipment"
            })
        }
    }
    
    handleFilter(evt) {
        let selection = evt.target.id;
        switch(selection){
          case "filterEnergy":
             this.setState({
                energySelected: !this.state.energySelected
             })
             break;
          case "filterEnergyImg":
             this.setState({
                energySelected: !this.state.energySelected
             })
             break;
          case "filterBallistic":
             this.setState({
                ballisticSelected: !this.state.ballisticSelected
             })
             break;
          case "filterBallisticImg":
             this.setState({
                ballisticSelected: !this.state.ballisticSelected
             })
             break;
          case "filterMissile":
             this.setState({
                missileSelected: !this.state.missileSelected
             })
             break;
          case "filterMissileImg":
             this.setState({
                missileSelected: !this.state.missileSelected
             })
             break;
          case "filterSupport":
             this.setState({
                supportSelected: !this.state.supportSelected
             })
             break;
          case "filterSupportImg":
             this.setState({
                supportSelected: !this.state.supportSelected
             })
             break;
          case "filterHeatsinks":
             this.setState({
                heatsinksSelected: !this.state.heatsinksSelected
             })
             break;
          case "filterHeatsinksImg":
             this.setState({
                heatsinksSelected: !this.state.heatsinksSelected
             })
             break;
          case "filterJumpjets":
             this.setState({
                jumpjetsSelected: !this.state.jumpjetsSelected
             })
             break;
          case "filterJumpjetsImg":
             this.setState({
                jumpjetsSelected: !this.state.jumpjetsSelected
             })
             break;
          case "filterMisc":
             this.setState({
                miscSelected: !this.state.miscSelected
             })
             break;
          case "filterMiscImg":
             this.setState({
                miscSelected: !this.state.miscSelected
             })
             break;
          case "filterUncommon":
             this.setState({
                miscSelected: !this.state.uncommonSelected
             })
             break;
          case "filterUncommonImg":
             this.setState({
                miscSelected: !this.state.uncommonSelected
             })
             break;
          case "filterRare":
             this.setState({
                miscSelected: !this.state.rareSelected
             })
             break;
          case "filterRareImg":
             this.setState({
                miscSelected: !this.state.rareSelected
             })
             break;
          case "filterEpic":
             this.setState({
                miscSelected: !this.state.epicSelected
             })
             break;
          case "filterEpicImg":
             this.setState({
                miscSelected: !this.state.epicSelected
             })
             break;
          case "filterStock":
             this.setState({
                miscSelected: !this.state.stockSelected
             })
             break;
          case "filterStockImg":
             this.setState({
                miscSelected: !this.state.stockSelected
             })
             break;
          default:
             break;
        }
    }

    render() {
        //console.log("Rendering Armory")
        const { energySelected,
                ballisticSelected,
                missileSelected,
                supportSelected,
                currentInventory,
                heatsinksSelected,
                jumpjetsSelected,
                miscSelected,
                uncommonSelected,
                rareSelected,
                epicSelected,
                stockSelected} = this.state;
        const { maxTons } = this.props;
        //set tonnage for jumpjet render
        let thisJumpJetType = "small";
        if (maxTons < 60){
            thisJumpJetType = "small"; 
        } else if (maxTons > 55 && maxTons < 90){
            thisJumpJetType = "heavy";
        } else if (maxTons > 85){
            thisJumpJetType = "assault";
        }
        
        return (
            <div id="mechArmory">
                <p>Weapons and Equipment</p>
                <div className="inventorySelector">
                    <button id="selectWeapons" className={currentInventory === "weapons" ? "selected" : ""} onClick={(evt) => this.handleInventorySelection(evt)}>WEAPONS</button>
                    <button id="selectEquipment" className={currentInventory === "equipment" ? "selected" : ""} onClick={(evt) => this.handleInventorySelection(evt)}>EQUIPMENT</button>
                </div>
                <div className="inventoryFilter">
                  { currentInventory === "weapons" &&
                    <div className="inventoryGroupWrapper">
                        <button id="filterEnergy" className="weapon-filter" onClick={(evt) => this.handleFilter(evt)}>{energySelected ? <img id="filterEnergyImg" src="/img/FilterEnergyOn.png" alt="Energy Filter On" /> : <img id="filterEnergyImg" src="/img/FilterEnergyOff.png" alt="Energy Filter Off" />}</button>
                        <button id="filterBallistic" className="weapon-filter" onClick={(evt) => this.handleFilter(evt)}>{ballisticSelected ? <img id="filterBallisticImg" src="/img/FilterBallisticOn.png" alt="Ballistic Filter On" /> : <img id="filterBallisticImg" src="/img/FilterBallisticOff.png" alt="Ballistic Filter Off" />}</button>
                        <button id="filterMissile" className="weapon-filter" onClick={(evt) => this.handleFilter(evt)}>{missileSelected ? <img id="filterMissileImg" src="/img/FilterMissileOn.png" alt="Missile Filter On" /> : <img id="filterMissileImg" src="/img/FilterMissileOff.png" alt="Missile Filter Off" />}</button>
                        <button id="filterSupport" className="weapon-filter" onClick={(evt) => this.handleFilter(evt)}>{supportSelected ? <img id="filterSupportImg" src="/img/FilterSupportOn.png" alt="Support Filter On" /> : <img id="filterSupportImg" src="/img/FilterSupportOff.png" alt="Support Filter Off" />}</button>
                    </div> }
                  { currentInventory === "equipment" &&
                    <div className="inventoryGroupWrapper">
                        <button id="filterHeatsinks" className="equipment-filter" onClick={(evt) => this.handleFilter(evt)}>{heatsinksSelected ? <img id="filterHeatsinksImg" src="/img/FilterHeatSinkOn.png" alt="Heat Sinks Filter On" /> : <img id="filterHeatsinksImg" src="/img/FilterHeatSinkOff.png" alt="Heat Sinks Filter Off" />}</button>
                        <button id="filterJumpjets" className="equipment-filter" onClick={(evt) => this.handleFilter(evt)}>{jumpjetsSelected ? <img id="filterJumpjetsImg" src="/img/FilterJumpJetOn.png" alt="Jump Jets Filter On" /> : <img id="filterJumpjetsImg" src="/img/FilterJumpJetOff.png" alt="Jump Jets Filter Off" />}</button>
                        <button id="filterMisc" className="equipment-filter" onClick={(evt) => this.handleFilter(evt)}>{miscSelected ? <img id="filterMiscImg" src="/img/FilterModsOn.png" alt="Mods Filter On" /> : <img id="filterMiscImg" src="/img/FilterModsOff.png" alt="Mods Filter Off" />}</button>
                    </div> }
                </div>
                <div className="weaponRack">
                    { energySelected === true && currentInventory === "weapons" &&
                        <div className="energyWeaponRack">
                            {
                                Object.keys(energy).map((weapon, index) =>
                                    (
                                        <Rack key={index}>
                                            {/*<p id={energy[weapon].type + "_" + index} type={energy[weapon].type} className="energyWeaponDetail">{energy[weapon].name}</p>*/}
                                            {energySlide(energy[weapon].type, energy[weapon].name, energy[weapon].manufacturer, energy[weapon].damage, energy[weapon].stabdamage, energy[weapon].heat, energy[weapon].modifier1, energy[weapon].modifier2, energy[weapon].slots, energy[weapon].weight)}
                                        </Rack>
                                    )                       
                                )
                            }
                        </div>
                    }
                    { ballisticSelected === true && currentInventory === "weapons" &&
                        <div className="ballisticWeaponRack">
                            {
                                Object.keys(ballistic).map((weapon, index) =>
                                    (
                                        <Rack key={index}>
                                            {ballisticSlide(ballistic[weapon].type, ballistic[weapon].name, ballistic[weapon].manufacturer, ballistic[weapon].damage, ballistic[weapon].stabdamage, ballistic[weapon].heat, ballistic[weapon].modifier1, ballistic[weapon].modifier2, ballistic[weapon].slots, ballistic[weapon].weight, ballistic[weapon].shotsper)}
                                        </Rack>
                                    )                       
                                )
                            }
                        </div>
                    }
                    { missileSelected === true && currentInventory === "weapons" &&
                        <div className="missileWeaponRack">
                            {
                                Object.keys(missile).map((weapon, index) =>
                                    (
                                        <Rack key={index}>
                                            {missileSlide(missile[weapon].type, missile[weapon].name, missile[weapon].manufacturer, missile[weapon].damage, missile[weapon].stabdamage, missile[weapon].heat, missile[weapon].modifier1, missile[weapon].modifier2, missile[weapon].slots, missile[weapon].weight, missile[weapon].shotsper)}
                                        </Rack>
                                    )                       
                                )
                            }
                        </div>
                    }
                    { supportSelected === true && currentInventory === "weapons" &&
                        <div className="supportWeaponRack">
                            {
                                Object.keys(support).map((weapon, index) =>
                                    (
                                        <Rack key={index}>
                                            {supportSlide(support[weapon].type, support[weapon].name, support[weapon].manufacturer, support[weapon].damage, support[weapon].stabdamage, support[weapon].heat, support[weapon].modifier1, support[weapon].modifier2, support[weapon].slots, support[weapon].weight, support[weapon].shotsper)}
                                        </Rack>
                                    )                       
                                )
                            }
                        </div>
                    }
                    { heatsinksSelected === true && currentInventory === "equipment" &&
                        <div className="heatsinkEquipmentRack">
                            {
                                Object.keys(heatsinks).map((equipment, index) =>
                                    (
                                        <Rack key={index}>
                                            {heatsinkSlide(heatsinks[equipment].type, heatsinks[equipment].name, heatsinks[equipment].manufacturer, heatsinks[equipment].modifier1, heatsinks[equipment].modifier2, heatsinks[equipment].slots, heatsinks[equipment].weight)}
                                        </Rack>
                                    )                       
                                )
                            }
                        </div>
                    }
                    { jumpjetsSelected === true && currentInventory === "equipment" && thisJumpJetType === "small" &&
                        <div className="jumpjetEquipmentRack">
                            <Rack>
                                {jumpjetSlide(jumpjets[0].type, jumpjets[0].name, jumpjets[0].manufacturer, jumpjets[0].modifier1, jumpjets[0].modifier2, jumpjets[0].slots, jumpjets[0].weight)}
                            </Rack>
                        </div>
                    }
                    { jumpjetsSelected === true && currentInventory === "equipment" && thisJumpJetType === "heavy" &&
                        <div className="jumpjetEquipmentRack">
                            <Rack>
                                {jumpjetSlide(jumpjets[1].type, jumpjets[1].name, jumpjets[1].manufacturer, jumpjets[1].modifier1, jumpjets[1].modifier2, jumpjets[1].slots, jumpjets[1].weight)}
                            </Rack>
                        </div>
                    }
                    { jumpjetsSelected === true && currentInventory === "equipment" && thisJumpJetType === "assault" &&
                        <div className="jumpjetEquipmentRack">
                            <Rack>
                                {jumpjetSlide(jumpjets[2].type, jumpjets[2].name, jumpjets[2].manufacturer, jumpjets[2].modifier1, jumpjets[2].modifier2, jumpjets[2].slots, jumpjets[2].weight)}
                            </Rack>
                        </div>
                    }
                    { miscSelected === true && currentInventory === "equipment" &&
                        <div className="miscEquipmentRack">
                            {
                                Object.keys(misc).map((equipment, index) =>
                                    (
                                        <Rack key={index}>
                                            {modSlide(misc[equipment].type, misc[equipment].name, misc[equipment].manufacturer, misc[equipment].modifier1, misc[equipment].modifier2, misc[equipment].slots, misc[equipment].weight, misc[equipment].restricted)}
                                        </Rack>
                                    )                       
                                )
                            }
                        </div>
                    }
                </div>
            </div>
        )
    
    }
    
}

export default MechArmory