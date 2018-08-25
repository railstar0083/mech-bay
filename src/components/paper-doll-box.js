import React, {Component} from 'react';


class EquipmentSlots extends Component {
    constructor(props) {
        super(props);
        //console.log("Inventory props")
        //console.log(props)
        //Set Local State Here
        this.state = {
            currentInventory: [],
            slotsRemaining: parseInt(props.maxSlots, 10),
            defaultRender: false,
            currentVariant: "",
            origin: "",
            destination: ""
        }
        this.isWeaponWithHardpoint = this.isWeaponWithHardpoint.bind(this);
        this.isSlotsFull = this.isSlotsFull.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.renderEquipment = this.renderEquipment.bind(this);
        this.renderDefaultEquipment = this.renderDefaultEquipment.bind(this);
        this.boxInventory = this.boxInventory.bind(this);
    }
    
    componentDidUpdate(prevProps) {
      
         
      const {updateHardpoints, defaultLoadout, mechName} = this.props;
      //console.log(mechName)
      //console.log(this.state.currentVariant)
      //load default equipment
      if(this.state.currentVariant !== mechName){
        if(defaultLoadout === undefined && this.state.defaultRender === true){
          return false;
        } else {
          //count slots used
          let slotsUsed = 0;
          for(let i=0; i < defaultLoadout.length; i++){
            slotsUsed = slotsUsed + defaultLoadout[i].slots
          }
          //push loadout, change mech name and update slots used.
          this.setState({
            currentInventory: defaultLoadout,
            defaultRender: true,
            currentVariant: mechName,
            slotsRemaining: this.state.slotsRemaining - slotsUsed
          })
          //update hardpoints used
          //reset hardpoints
          updateHardpoints("energy", this.props.slotType, "reset");
          updateHardpoints("ballistic", this.props.slotType, "reset");
          updateHardpoints("missile", this.props.slotType, "reset");
          updateHardpoints("support", this.props.slotType, "reset");
          for(let i = 0; i < defaultLoadout.length; i++){
            if(defaultLoadout[i].category !== "equipment" && defaultLoadout[i].ammo === "false"){
              //set new hardpoints
              updateHardpoints(defaultLoadout[i].category, this.props.slotType, "add");
            }
          }
        }
        
        
      }
    }
    
    boxInventory = (name, title, category, restricted, weight, slots, shots, damage, stabdamage, heat, heatdisp, ammo, index, location) => {
      let thisColor = 'transparent';
      switch(category) {
        case "energy":
          thisColor = "#66784e"
          break;
        case "ballistic":
          thisColor = "#5b888e"
          break;
        case "missile":
          thisColor = "#7d607a"
          break;
        case "support":
          thisColor = "#8f7950"
          break;
        case "equipment":
          thisColor = "#545b52"
          break;
        default:
          thisColor = "red"
      }
      //use a different calculation for tablet views.
      let calculatedHeight = window.innerWidth > 1024 ? (slots * 25) : (slots * 20);
      let plateStyle = {
         backgroundColor: thisColor,
         height: calculatedHeight + "px"
      }
      return <div draggable 
                  className="inventory-plate" 
                  style={plateStyle} index={index} 
                  location={location} 
                  onDragStart={(evt)=>{this.onDragStart(evt, { 
                    "name": name,
                    "title": title,
                    "category": category, 
                    "restricted": restricted,
                    "weight": weight,
                    "slots": slots,
                    "ammo": ammo,
                    "damage": damage,
                    "stabdamage": stabdamage,
                    "heat": heat,
                    "heatdisp": heatdisp,
                    "shots": shots,
                    "origin": "doll",
                    "location": location
                  }); this.props.validDropToggle(evt, "exit")}}
                  onDragEnd={(evt)=>this.onDragEnd(evt, index, category, weight, ammo, damage, stabdamage, heat, heatdisp, shots, location)}
                  onDragEnter={(evt)=>this.props.validDropToggle(evt, "exit")} 
                  onDragLeave={(evt)=>this.props.validDropToggle(evt, "enter")}
                  onDrop={(evt)=>evt.preventDefault()}><span>{title}</span></div>
    }
    
    isWeaponWithHardpoint(category, location){
        const {hardpointTypes, currentHardpoints} = this.props;
        switch (category) {
          case "energy":
            return (hardpointTypes[0] > 0 && currentHardpoints[location][category] !== hardpointTypes[0]);
          case "ballistic":
            return (hardpointTypes[1] > 0 && currentHardpoints[location][category] !== hardpointTypes[1]);
          case "missile":
            return (hardpointTypes[2] > 0 && currentHardpoints[location][category] !== hardpointTypes[2]);
          case "support":
            return (hardpointTypes[3] > 0 && currentHardpoints[location][category] !== hardpointTypes[3]);
          default: 
            return false
        }
    }
    
    isSlotsFull(evt){
      //console.log(evt.target.id)
      this.setState({
          destination: evt.target.id
      }, function(){
        //console.log(this.state.destination)
      })
      if (evt.target.className.indexOf("slots0") > -1){
        this.props.validDropToggle(evt, "exit");
      } else if (evt.target.className.indexOf("slots0") === -1) {
        this.props.validDropToggle(evt, "enter");
      }
      
    }
    
    onDragStart(evt, index){
        let element = JSON.stringify(index);
        evt.dataTransfer.setData("text/html",element);
        console.log(evt.dataTransfer.getData("text/html"))
        this.setState({
          origin: index.location
        })
    }
    
    onDragEnd(evt, index, category, weight, ammo, damage, stabdamage, heat, heatdisp, shots, location){
        //console.log(location)
        console.log(heatdisp)
        //why is this state changing on drop?
        //console.log(this.state.destination)
        const {updateHardpoints, isDropValid, calculateTonnage, updateAlphaStrike, updateStabAlphaStrike, updateAlphaStrikeHeat, updateHeatDispersion} = this.props;
        let boxLocation = this.props.slotType + "Inventory";
        if(isDropValid === true){
            let newInventory = this.state.currentInventory;
            newInventory.splice(index, 1);
            this.setState({
                currentInventory: newInventory,
                slotsRemaining: this.state.slotsRemaining + 1
            })
            if(ammo === "false"){
              updateHardpoints(category, this.props.slotType, "subtract");
            }
            calculateTonnage("subtract", weight);
            if(category !== "equipment" && ammo === "false"){
              updateAlphaStrike("subtract", (damage * shots));
              updateStabAlphaStrike("subtract", (stabdamage * shots));
              updateAlphaStrikeHeat("subtract", heat);
            }
            if(heatdisp !== undefined){
              updateHeatDispersion("subtract", heatdisp);
            }
            return true;
        } else {
          //return false;
        }
        
    }
    
    onDrop(evt, location){
        const {updateHardpoints, calculateTonnage, updateAlphaStrike, updateStabAlphaStrike, updateAlphaStrikeHeat, updateHeatDispersion} = this.props;
        let boxLocation = this.props.slotType + "Inventory";
        let id = JSON.parse(evt.dataTransfer.getData("text/html"));
        console.log(id)
        let thisSlot = this.props.slotType.toLowerCase();
        //Do Slots remain?
        if(this.state.slotsRemaining > 0 && id.location !== boxLocation){
          //Does the item fit?
          if(id.slots <= this.state.slotsRemaining){
            //Is the item slot restricted?
            if(id.restricted === undefined || thisSlot.includes(id.restricted.toLowerCase())) {
                //Is the item equipment or a weapon (not ammo) with an available hardpoint?
                if(id.category === "equipment" || (this.isWeaponWithHardpoint(id.category, this.props.slotType)) && (id.ammo === ("false" || undefined))){
                    let newInventory = this.state.currentInventory;
                    newInventory.push(id);
                    this.setState({
                      currentInventory: newInventory,
                      slotsRemaining: this.state.slotsRemaining - 1
                    })
                    updateHardpoints(id.category, this.props.slotType, "add");
                    calculateTonnage("add", id.weight);
                    if(id.category !== "equipment"){
                      updateAlphaStrike("add", (id.damage * id.shots));
                      updateStabAlphaStrike("add", (id.stabdamage * id.shots));
                      updateAlphaStrikeHeat("add", id.heat);
                    }
                    if(id.heatdisp !== undefined){
                      updateHeatDispersion("add", id.heatdisp);
                    }
                } else {
                  //No hardpoint is available
                }
                
            } else {
              //item is slot restricted
            }
          } else {
            //does not fit
          }
          
          //exempt ammo, it goes anywhere.
          if(id.ammo === "true" && id.location !== boxLocation){
              let newInventory = this.state.currentInventory;
              newInventory.push(id);
              this.setState({
                currentInventory: newInventory,
                slotsRemaining: this.state.slotsRemaining - 1
              })
              calculateTonnage("add", id.weight);
          }
          
        } else {
          //no slots remain
        }
    }
    
    renderDefaultEquipment(location){
        return Object.keys(this.props.defaultLoadout).map((inventory, index) =>
          (
            <div key={index}>
              {this.boxInventory(this.state.currentInventory[index].name,
                                 this.state.currentInventory[index].title,
                                 this.state.currentInventory[index].category,
                                 this.state.currentInventory[index].restricted,
                                 this.state.currentInventory[index].weight, 
                                 this.state.currentInventory[index].slots,
                                 this.state.currentInventory[index].shots,
                                 this.state.currentInventory[index].damage,
                                 this.state.currentInventory[index].stabdamage,
                                 this.state.currentInventory[index].heat,
                                 this.state.currentInventory[index].heatdisp,
                                 this.state.currentInventory[index].ammo,
                                 index, 
                                 location
                                 )}
            </div>
          )                       
        )
    }
    
    renderEquipment(location) {
        //console.log("current inventory for " + this.props.slotType )
        //console.log(this.state.currentInventory)
        return Object.keys(this.state.currentInventory).map((inventory, index) =>
          (
            <div key={index}>
              {this.boxInventory(this.state.currentInventory[index].name,
                                 this.state.currentInventory[index].title,
                                 this.state.currentInventory[index].category,
                                 this.state.currentInventory[index].restricted,
                                 this.state.currentInventory[index].weight, 
                                 this.state.currentInventory[index].slots,
                                 this.state.currentInventory[index].shots,
                                 this.state.currentInventory[index].damage,
                                 this.state.currentInventory[index].stabdamage,
                                 this.state.currentInventory[index].heat,
                                 this.state.currentInventory[index].heatdisp,
                                 this.state.currentInventory[index].ammo,
                                 index, 
                                 location
                                 )}
            </div>
          )                       
        )
    }
    
    render() {
        const {currentInventory, slotsRemaining} = this.state;
        let boxLocation = this.props.slotType + "Inventory";
        let thisClass = "box-slots droppable slots" + slotsRemaining;
        
        return (
            <div id={boxLocation} className={thisClass} onDragEnter={(e)=>this.isSlotsFull(e)} onDragLeave={(e)=>this.props.validDropToggle(e, "exit")} onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>this.onDrop(e, "inventory")}>
                { currentInventory[0] !== undefined && slotsRemaining >= 0 && 
                    this.renderEquipment(boxLocation)
                }
            </div>
        )
        
    }
    
}

export default EquipmentSlots;