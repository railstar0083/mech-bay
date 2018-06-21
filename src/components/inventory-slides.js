import React from 'react';


function modType(type) {
    /*<img src="img/JumpJetSymbol.png" alt="Jump Jet Icon" />*/
    if(type.includes("arm")){
        return <img src="img/ArmModSymbol.png" alt="Arm Mod Icon" />
    } else if (type.includes("leg")){
        return <img src="img/LegModSymbol.png" alt="Leg Mod Icon" />
    } else if (type.includes("range")){
        return <img src="img/RangefinderModSymbol.png" alt="RangeFinder Mod Icon" />
    } else if (type.includes("com")){
        return <img src="img/CommsModSymbol.png" alt="Comms Mod Icon" />
    } else if (type.includes("tts")){
        return <img src="img/TtsModSymbol.png" alt="TTS Mod Icon" />
    } else if (type.includes("cockpit")){
        return <img src="img/CockpitModSymbol.png" alt="Cockpit Mod Icon" />
    } else if (type.includes("gyro")){
        return <img src="img/GyroModSymbol.png" alt="Gyro Mod Icon" />
    }
}

export const energySlide = (type, name, manufacture, damage, stab, heat, mods, mods2, slots, weight) => {
    return (
        <div className={type} title={name} slidetype="energy" ammo="false" weight={weight} slots={slots}>
            <div className="slide-icon"><img src="img/EnergyWeaponSymbol.png" alt="Energy Icon" /></div>
            <div className="slide-left">
                <div className="slide-manufacture green">
                    <div className="slide-manufacture-name">{manufacture}</div>
                    <div className="slide-manufacture-endcap"></div>
                </div>
                <div className="slide-name">
                    <span>{name}</span>
                </div>
            </div>
            <div className="slide-mods">
                <span className="slide-mods-text1">{mods}</span><br/>
                <span className="slide-mods-text2">{mods2}</span>
            </div>
            <div className="slide-stats">
                <div>
                    <div className="slide-stats-damage"><span>DAMAGE</span><br/>{damage}</div>
                </div>
                <div>
                    <div className="slide-stats-stab"><span>STABILITY</span><br/>{stab}</div>
                </div>
                <div>
                    <div className="slide-stats-heat"><span>HEAT</span><br/>{heat}</div>
                </div>
            </div>
        </div>
    )
}

export const ballisticSlide = (type, name, manufacture, damage, stab, heat, mods, mods2, slots, weight, isAmmo) => {
    return (
        <div className={type} title={name} slidetype="ballistic" ammo={isAmmo? "true" : "false"} weight={weight} slots={slots}>
            <div className="slide-icon">{isAmmo ? <img src="img/BallisticAmmoSymbol.png" alt="Ballistic Icon" /> : <img src="img/BallisticWeaponSymbol.png" alt="Ballistic Icon" />}</div>
            <div className="slide-left">
                <div className="slide-manufacture blue">
                    <div className="slide-manufacture-name">{manufacture}</div>
                    <div className="slide-manufacture-endcap"></div>
                </div>
                <div className="slide-name">
                    <span>{name}</span>
                </div>
            </div>
            { isAmmo === undefined &&
            <div className="slide-mods">
                <span className="slide-mods-text1">{mods}</span><br/>
                <span className="slide-mods-text2">{mods2}</span>
            </div>}
            { isAmmo === undefined &&
            <div className="slide-stats">
                <div>
                    <div className="slide-stats-damage"><span>DAMAGE</span><br/>{damage}</div>
                </div>
                <div>
                    <div className="slide-stats-stab"><span>STABILITY</span><br/>{stab}</div>
                </div>
                <div>
                    <div className="slide-stats-heat"><span>HEAT</span><br/>{heat}</div>
                </div>
            </div>}
        </div>
    )
}

export const missileSlide = (type, name, manufacture, damage, stab, heat, mods, mods2, slots, weight, isAmmo) => {
    return (
        <div className={type} title={name} slidetype="missile" ammo={isAmmo? "true" : "false"} weight={weight} slots={slots}>
            <div className="slide-icon">{isAmmo ? <img src="img/MissileAmmoSymbol.png" alt="Missile Icon" /> : <img src="img/MissileWeaponSymbol.png" alt="Missile Icon" />}</div>
            <div className="slide-left">
                <div className="slide-manufacture purple">
                    <div className="slide-manufacture-name">{manufacture}</div>
                    <div className="slide-manufacture-endcap"></div>
                </div>
                <div className="slide-name">
                    <span>{name}</span>
                </div>
            </div>
            { isAmmo === undefined &&
            <div className="slide-mods">
                <span className="slide-mods-text1">{mods}</span><br/>
                <span className="slide-mods-text2">{mods2}</span>
            </div>}
            { isAmmo === undefined &&
            <div className="slide-stats">
                <div>
                    <div className="slide-stats-damage"><span>DAMAGE</span><br/>{damage}</div>
                </div>
                <div>
                    <div className="slide-stats-stab"><span>STABILITY</span><br/>{stab}</div>
                </div>
                <div>
                    <div className="slide-stats-heat"><span>HEAT</span><br/>{heat}</div>
                </div>
            </div>}
        </div>
    )
}

export const supportSlide = (type, name, manufacture, damage, stab, heat, mods, mods2, slots, weight, isAmmo) => {
    return (
        <div className={type} title={name} slidetype="support" ammo={isAmmo? "true" : "false"} weight={weight} slots={slots}>
            <div className="slide-icon">{isAmmo ? <img src="img/SupportAmmoSymbol.png" alt="Support Icon" /> : <img src="img/SupportWeaponSymbol.png" alt="Support Icon" />}</div>
            <div className="slide-left">
                <div className="slide-manufacture tan">
                    <div className="slide-manufacture-name">{manufacture}</div>
                    <div className="slide-manufacture-endcap"></div>
                </div>
                <div className="slide-name">
                    <span>{name}</span>
                </div>
            </div>
            { isAmmo === undefined &&
            <div className="slide-mods">
                <span className="slide-mods-text1">{mods}</span><br/>
                <span className="slide-mods-text2">{mods2}</span>
            </div>}
            { isAmmo === undefined &&
            <div className="slide-stats">
                <div>
                    <div className="slide-stats-damage"><span>DAMAGE</span><br/>{damage}</div>
                </div>
                <div>
                    <div className="slide-stats-stab"><span>STABILITY</span><br/>{stab}</div>
                </div>
                <div>
                    <div className="slide-stats-heat"><span>HEAT</span><br/>{heat}</div>
                </div>
            </div>}
        </div>
    )
}

export const heatsinkSlide = (type, name, manufacture, mods, mods2, slots, weight) => {
    return (
        <div className={type} title={name} slidetype="equipment" ammo="false" weight={weight} slots={slots}>
            <div className="slide-icon"><img src="img/HeatSinkSymbol.png" alt="Heat Sink Icon" /></div>
            <div className="slide-left">
                <div className="slide-manufacture grey">
                    <div className="slide-manufacture-name">{manufacture}</div>
                    <div className="slide-manufacture-endcap"></div>
                </div>
                <div className="slide-name">
                    <span>{name}</span>
                </div>
            </div>
            <div className="slide-mods equipment-mods">
                <span className="slide-mods-text1">{mods}</span><br/>
                <span className="slide-mods-text2">{mods2}</span>
            </div>
        </div>
    )
}

export const jumpjetSlide = (type, name, manufacture, mods, mods2, slots, weight) => {
    return (
        <div className={type} title={name} slidetype="equipment" ammo="false" weight={weight} slots={slots}>
            <div className="slide-icon"><img src="img/JumpJetSymbol.png" alt="Jump Jet Icon" /></div>
            <div className="slide-left">
                <div className="slide-manufacture grey">
                    <div className="slide-manufacture-name">{manufacture}</div>
                    <div className="slide-manufacture-endcap"></div>
                </div>
                <div className="slide-name">
                    <span>{name}</span>
                </div>
            </div>
            <div className="slide-mods equipment-mods">
                <span className="slide-mods-text1">{mods}</span><br/>
                <span className="slide-mods-text2">{mods2}</span>
            </div>
        </div>
    )
}

export const modSlide = (type, name, manufacture, mods, mods2, slots, weight, restricted) => {
    return (
        <div className={type} title={name} slidetype="equipment" ammo="false" restricted={restricted} weight={weight} slots={slots}>
            <div className="slide-icon">{modType(type)}</div>
            <div className="slide-left">
                <div className="slide-manufacture grey">
                    <div className="slide-manufacture-name">{manufacture}</div>
                    <div className="slide-manufacture-endcap"></div>
                </div>
                <div className="slide-name">
                    <span>{name}</span>
                </div>
            </div>
            <div className="slide-mods equipment-mods">
                <span className="slide-mods-text1">{mods}</span><br/>
                <span className="slide-mods-text2">{mods2}</span>
            </div>
        </div>
    )
}