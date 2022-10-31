## 任务系统

`task_manager.js`

既然screep不存在并行计算的问题，那么任务的调度就可以由代码进行，每一tick的时候，任务系统会检测任务池中没有被分配的项目，并调遣合适的creep进行处理。如果不存在符合要求的creep，那么生成子任务来满足要求（如挖矿的creep被打死，此时没有备用矿工，那么生成一个spawn矿工的子任务 ）



结构体

```c
Struct Task{
  status: enum(PENDING, ASSIGNED, ACTIVE, ERROR),
  //PENDING: 等待中，会在某一tick激活
  //ASSIGNED: 有creep正在执行此任务
  //ACTIVE: 等待分配
  //ERROR: 太长时间未被分配，需要人工查看原因（防御性编程）
  assigned_creep: "<name>", //正在执行此工作creep的名字，如果没有的话为空
  priority: usize, //优先级，优先级相同的任务按照预期耗时分配（或者简单的按照时间分配）
  activitad_time: usize, //启用时间，若任务等待时间过长会提高优先级
  type: enum(CARRY, MINE, BUILD, DEFAULT, ATTACK, ...),
  //CARRY: 搬运任务
  //MINE: 挖矿任务等持续需要creep的任务
  //BUILD: 建造任务
  //DEFAULT: 如果creep没有事情做，那么执行此任务
  //ATTACK: 攻击任务
}
```



任务系统会定期进行垃圾清理（如某个creep突然暴毙，此时系统需要重新分配任务）



同时，每个creep的memory中也保存着任务信息，当任务系统重新分配任务时，也要一同修改creep身上的信息



## Spawn队列

`spawn_queue.js`

如果短时间内有很多creep需要生成，那么需要调度spawn的使用，思路类似任务清单，不过不会分配给某个creep，而是某个spawn

Spawn队列需要对所有的spawn的生命周期进行追踪，在某一creep即将死去前提前准备好下一个creep，或分析后决定是否需要升级/降级该岗位的creep

Spawn队列同时维护一个spawn清单，根据任务系统动态调整各个职业creep的数量（这部分的实际processing没确定在哪个系统执行）



## 交通系统

每个creep在移动时将信息交给一个系统统一处理，最后实现能满足最多creep的方案。

交通系统要随时随地了解所有creep的位置以及目的地，最后通过算法找到收益最高的移动方式，同时避免卡死

fatigue应该作为收益算法的一个参数



## 建筑系统

找出房间内能够摆下所有建筑，并使用最少围墙的矩形（能够围住source更好，防止别人攻击时miner被打死）