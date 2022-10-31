var creepsPioneer = require('creeps_pioneer');
var creepsUpgrader = require('creeps_upgrader');
require('creeps_upgrader')

Creep.prototype.run = function(){
    if(this.memory.role === 'pioneer'){
        creepsPioneer.execute(this);
    }
    if(this.memory.role === 'upgrader'){
        creepsUpgrader.execute(this);
    }
}