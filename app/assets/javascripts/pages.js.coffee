# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

class MyObject
  constructor: ->
  hello: -> alert 'hello world of coffeescript!'


window.MyObject = MyObject

a = new MyObject

a.hello()
