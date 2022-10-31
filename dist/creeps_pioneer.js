var creepsPioneer =  {
    /*
    state:
    MINING, STORING
     */
    /** @param {Creep} creep **/
    execute: function(creep){
        if(creep.memory.state === 'MINING'){
            if (creep.harvest(creep.room.find(FIND_SOURCES_ACTIVE)[0]) === ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.find(FIND_SOURCES_ACTIVE)[0]);
            }
            if(creep.store.getFreeCapacity() === 0){
                creep.memory.state = 'STORING';
            }
        }
        if(creep.memory.state === 'STORING') {
            if (creep.transfer(creep.room.find(FIND_MY_SPAWNS)[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.find(FIND_MY_SPAWNS)[0]);
            }

        }
        if (creep.store.getUsedCapacity() === 0){
            creep.memory.state = 'MINING';
        }
    }
};

module.exports = creepsPioneer;