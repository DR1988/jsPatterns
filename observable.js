class  Observable{

  constructor(subscriptionTypes){
    if(!Array.isArray(subscriptionTypes)) throw('subscriptionTypes must be an array!')
    this.subscriptionTypes = subscriptionTypes
    this.subscriptionTypes.forEach(type =>
      this.subscribers.set(type, new Set())
    )
  }

  subscriptionChecker(type){
    if(!this.subscriptionTypes.includes(type)) throw('there is no such a subscribtion type')
  }

  subscribers = new Map()

  subscribe(type, method){
    this.subscriptionChecker(type)
    if(typeof method !== 'function') throw('method is not a function')
    this.subscribers.get(type).add(method)
  }

  unsubscribe(type, fn){
    this.subscriptionChecker(type)
    this.subscribers.get(type).delete(fn)
  }

  publish(type){
    this.subscriptionChecker(type)
    this.subscribers.get(type).forEach(value => {
      value()
    })
  }
}

const observer = {
  method: () => {
    console.log(1111)
  }
}

class observer2{
  name = 'Vasia'
  method(){
    console.log(this.name, 'drinks coffee')
  }

  weeklyIssues(){
    console.log('take away this trash');
  }
}

const obs2 = new observer2()

const obsbl = new Observable(['dayly', 'weekly'])

obsbl.subscribe('dayly', observer.method)
const obs2Method = obs2.method.bind(obs2)
obsbl.subscribe('dayly', obs2Method)
obsbl.subscribe('weekly', obs2.weeklyIssues)
obsbl.publish('dayly')
obsbl.unsubscribe('dayly', obs2Method)
obsbl.unsubscribe('dayly', observer.method)
obsbl.publish('dayly')
obsbl.publish('weekly')
