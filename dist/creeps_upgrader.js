var creepsUpgrader = {
    /*
    states:
    MINING
    UPGRADING
    */
    /** @param {Creep} creep **/
    execute: function(creep){
        if(creep.memory.state === 'MINING'){
            if (creep.harvest(creep.room.find(FIND_SOURCES_ACTIVE)[0]) === ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.find(FIND_SOURCES_ACTIVE)[0]);
            }
            if(creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0){
                creep.memory.state = 'UPGRADING';
            }
        }
        if(creep.memory.state === 'UPGRADING') {
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }

        }
        if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0){
            creep.memory.state = 'MINING';
        }
    }
};

module.exports = creepsUpgrader;