require('creeps_prototype');

//main loop
module.exports.loop = function(){
	var pioneer_count = 0;
	var upgrader_count = 0;
	for(const creep in Game.creeps){
		Game.creeps[creep].run();
		if(Game.creeps[creep].memory.role == 'pioneer'){
			pioneer_count = pioneer_count+1;
		}else{
			upgrader_count = upgrader_count+1;
		}
	}
	if(pioneer_count < 2){
		Game.spawns['Spawn1'].spawnCreep([MOVE, MOVE, WORK, CARRY, CARRY], 'pioneer'+Game.time, { memory: { role: 'pioneer' } });
	}
	if(upgrader_count < 3){
		Game.spawns['Spawn1'].spawnCreep([MOVE, MOVE, WORK, CARRY, CARRY], 'upgrader'+Game.time, { memory: { role: 'upgrader' } });
	}
	if(Game.time % 8192 === 0){ //clear creep garbage
		for (my_creep in Memory.creeps) { if( Game.creeps[my_creep] === undefined){ delete Memory.creeps[my_creep]; } }
	}
}
