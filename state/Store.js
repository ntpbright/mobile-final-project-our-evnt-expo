import {observable, action} from 'mobx'

class Store {
  @observable UID = ""
  @observable UserName = ""
  @observable PhotoURL = ""
  @observable EventList = null

  @action EventListIsLoadded(EventList){
    console.log(EventList)
    this.EventList = EventList
  }

  @action userUIDIsLoaded(UID){
    console.log(UID)
    this.UID = UID
  }

  @action UserNameLoaded(name){
    this.UserName = name
  }

  @action PhotoURLLoaded(url){
    console.log('Store : ',url)
    this.PhotoURL = url
  }
}

export default new Store();
