var InputSuggestion = function(selector, options){
  function _InputSuggestion(selector, options){
    this.container = document.querySelector(`.${selector}`)
    this.input = this.container.querySelector('.input-box')
    this.suggestion = this.container.querySelector('.suggestion')
    this.clockId = 0
    this.options = options
    this.bindEvent.call(this)
  }

  _InputSuggestion.prototype.bindEvent = function() {
    this.input.addEventListener('input', event => {
        let itemsStr = ""
        // 函数截流
        if(this.clockId){
          clearTimeout(this.clockId)
        }
        if(event.target.value){
          this.clockId = setTimeout(() => {
            this.search(event.target.value)
          }, 120)
        }
        this.render(itemsStr)
    })
  }

  _InputSuggestion.prototype.search = function(str) {
    this.getData(this.options, str)
  }
  _InputSuggestion.prototype.filterData = function(dataArr, str) {
    let itemsStr = "",
      reg = new RegExp('^' + str + '\\w*')
    dataArr.forEach(item => {
      if(reg.test(item)){
        itemsStr += "<li>" + item +"</li>"
      } 
    })
    this.render(itemsStr) 
  }
  _InputSuggestion.prototype.render = function(str){
    this.suggestion.innerHTML = str
  }
  _InputSuggestion.prototype.getData = function(options, str){
    let method = options.method || 'GET',
      url = options.url,
      httpRequest = new XMLHttpRequest()
    httpRequest.open('GET', url, true)
    httpRequest.send()
    console.log('send')
    httpRequest.onload = () => {
      if(httpRequest.status === 200 || httpRequest.status === 304){
        let ret = JSON.parse(httpRequest.responseText) 
        this.filterData(ret, str)
      }
    }
  }

  return {
    init: function(selector, options){
      new _InputSuggestion(selector, options) 
    }
  }
}()


